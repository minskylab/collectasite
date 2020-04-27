import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useQuery, useMutation } from "urql";
import { motion } from "framer-motion";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../general/theming";
import { BaseButton } from "../../components/atoms/Button";
import { ArrowRightIcon, ArrowLeftIcon } from "../../components/atoms/Icon";
import { querySurvey, queryLastQuestionOfSurvey } from "../../general/queries";
import { answerQuestion } from "../../general/mutations";
import { SurveyBegin, SurveyQuestion } from "../../components/organisms/SurveyFlow";
import Head from "next/head";

const Layout = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	max-height: 100vh;
	width: 100vw;
	overflow: hidden;
	@media (max-width: 600px) {
		min-height: 100vh;
	}
`;

const QuestionButtonFirst = styled.div`
	position: fixed;
	bottom: 2rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;

	width: 100vw;
	@media (max-width: 400px) {
		justify-content: space-between;
	}
`;

const QuestionButtons = styled.div`
	position: absolute;
	bottom: 2rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100vw;
	@media (max-width: 400px) {
		position: relative;
		bottom: 0;
		justify-content: space-between;
		padding-top: 3em;
	}
`;

const questionButton = css`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	@media (max-width: 400px) {
		padding-left: 1.5rem;
		padding-right: 2.5rem;
	}
`;

const questionButtonLeft = css`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	@media (max-width: 400px) {
		padding-left: 1.5rem;
		padding-right: 0;
	}
`;

const questionButtonRight = css`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	@media (max-width: 400px) {
		padding-left: 0;
		padding-right: 1.5rem;
	}
`;

const Survey: NextPage = () => {
	const theme = useTheme();
	const router = useRouter();
	const surveyId = typeof router.query.id === "string" ? router.query.id : "";

	const [ isCompleted, setIsCompleted ] = useState<boolean>(false);

	// const [ question, setQuestion ] = useState<QuestionInterface>(QUESTIONS[0]);
	const [ page, setPage ] = useState<string>("begin");
	const [ answer, setAnswer ] = useState<any>(null);

	const [ updateAnswerQuestionResult, updateAnswerQuestion ] = useMutation(answerQuestion);

	if (!surveyId) {
		console.log("Obteniendo datos de la encuesta...");
		return <div />;
	}

	if (page === "begin") {
		return (
			<ViewSurveyBegin
				id={surveyId}
				onNextClick={() => {
					setPage("questions");
				}}
			/>
		);
	} else if (page === "questions") {
		return (
			<ViewSurveyQuestion
				id={surveyId}
				getIsCompleted={isCompleted => setIsCompleted(isCompleted)}
				isCompleted={isCompleted}
				answer={answer => setAnswer(answer)}
				onBackClick={() => {}}
				onNextClick={() => {}}
			/>
		);
	}

	return null;
};

interface ViewSurveyBeginProps {
	id: string;
	onNextClick?: () => void;
}
const ViewSurveyBegin: FC<ViewSurveyBeginProps> = (props: ViewSurveyBeginProps) => {
	const [ { data, fetching, error }, run ] = useQuery({
		query: querySurvey,
		variables: { id: props.id },
		pause: true
	});
	useEffect(() => {
		run();
	}, []);
	if (fetching) {
		// console.log("FETCHING....");
		return <div>{`LOADING`}</div>;
	} else if (error) {
		// console.log("ERROR....");
		if (error.graphQLErrors.length !== 0) {
			return <div>{`Oh no! Error: ${error}`}</div>;
		}
	}
	if (!data) {
		return null;
	}
	return (
		<div>
			<Head>
				<title>{data.survey.title}</title>
			</Head>
			<Layout>
				<SurveyBegin title={data.survey.title} description={data.survey.description} dueDate={data.survey.dueDate} />
				<QuestionButtonFirst>
					<div />
					<motion.div className={questionButton}>
						<BaseButton
							text={"INICIAR"}
							onClick={props.onNextClick}
							iconElement={<ArrowRightIcon color={"#ffffff95"} size={20} />}
						/>
					</motion.div>
				</QuestionButtonFirst>
			</Layout>
		</div>
	);
};

interface ViewSurveyQuestionProps {
	id: string;
	answer: (answer: any) => void;
	getIsCompleted: (complete: boolean) => void;
	isCompleted: boolean;
	onBackClick: () => void;
	onNextClick: () => void;
}
const ViewSurveyQuestion: FC<ViewSurveyQuestionProps> = (props: ViewSurveyQuestionProps) => {
	const [ { data, fetching, error }, run ] = useQuery({
		query: queryLastQuestionOfSurvey,
		variables: { surveyID: props.id },
		pause: true
	});

	useEffect(() => {
		run();
	}, []);

	if (fetching) {
		// console.log("FETCHING....");
		return <div>{`LOADING`}</div>;
	} else if (error) {
		// console.log("ERROR....");
		if (error.graphQLErrors.length !== 0) {
			return <div>{`Oh no! Error: ${error}`}</div>;
		}
	}

	if (!data) {
		return null;
	}

	console.log(data);

	return (
		<div>
			<Head>
				<title>{data.lastQuestionOfSurvey.title}</title>
			</Head>
			<Layout>
				<SurveyQuestion
					id={data.lastQuestionOfSurvey.id}
					percentage={data.lastQuestionOfSurvey.percentage}
					title={data.lastQuestionOfSurvey.title}
					description={data.lastQuestionOfSurvey.description}
					anonymous={data.lastQuestionOfSurvey.anonymous}
					input={data.lastQuestionOfSurvey.input}
					answer={props.answer}
					isComplete={props.getIsCompleted}
				/>
				<QuestionButtons>
					<motion.div className={questionButtonLeft}>
						<ButtonBack onBackClick={props.onBackClick} />
					</motion.div>
					<motion.div className={questionButtonRight}>
						<ButtonNext onNextClick={props.onNextClick} isComplete={props.isCompleted} isLastQuestion={false} />
					</motion.div>
				</QuestionButtons>
				<div style={{ height: 50 }} />
			</Layout>
		</div>
	);
};

interface ButtonBackProps {
	onBackClick: () => void;
}
const ButtonBack: FC<ButtonBackProps> = (props: ButtonBackProps) => {
	return (
		<BaseButton
			iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
			iconPosition={"left"}
			text={"Anterior"}
			colorText={"#B1B1B1"}
			backgroundColor={"transparent"}
			onClick={props.onBackClick}
		/>
	);
};

interface ButtonNextProps {
	onNextClick: () => void;
	isComplete: boolean;
	isLastQuestion: boolean;
}
const ButtonNext: FC<ButtonNextProps> = (props: ButtonNextProps) => {
	const theme = useTheme();
	return (
		<BaseButton
			iconElement={<ArrowRightIcon color={!props.isComplete ? theme.textColor : "#ffffff95"} size={20} />}
			text={props.isLastQuestion ? "FINALIZAR" : "SIGUIENTE"}
			onClick={props.onNextClick}
			disabled={!props.isComplete}
		/>
	);
};

export default Survey;
