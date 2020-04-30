import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useQuery, useMutation } from "urql";
import { motion } from "framer-motion";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../general/theming";
import {
	querySurvey,
	queryLastQuestionOfSurvey,
	queryIsFirstQuestion,
	queryIsFinalQuestion
} from "../../general/queries";
import { answerQuestion } from "../../general/mutations";
import { SurveyBegin, SurveyQuestion } from "../../components/organisms/SurveyFlow";
import { BaseButton, ArrowRightIcon, ArrowLeftIcon } from "components";
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
	const router = useRouter();
	const surveyId = typeof router.query.id === "string" ? router.query.id : "";
	const [page, setPage] = useState<string>("");
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [isSurveyCompleted, setIsSurveyCompleted] = useState<boolean>(false);
	const [questionPosition, setQuestionPosition] = useState<string>("");
	const [answer, setAnswer] = useState<any>(null);
	const [questionId, setQuestionId] = useState<any>(null);
	const [updateSurveyResult, updateAnswer] = useMutation(answerQuestion);

	useEffect(
		() => {
			if (isSurveyCompleted) {
				router.push("/s/done");
			}
		},
		[isSurveyCompleted]
	);

	useEffect(
		() => {
			if (!isSurveyCompleted) {
				if (questionPosition === "first") {
					setPage("begin");
				} else {
					setPage("questions");
				}
			}
		},
		[questionPosition]
	);

	const submitAnswer = () => {
		const variables = { questionID: questionId, answer: answer };
		updateAnswer(variables).then(result => {
			if (result.error) {
				console.error("Oh no!", result.error);
			}
			if (result.data) {
				if (questionPosition === "final") {
					router.push("/s/done");
				}
			}
		});
	};

	if (!surveyId) {
		console.log("Obteniendo datos de la encuesta...");
		return <div />;
	}

	console.log("Datos obtenidos.. Survey Id: ", surveyId);

	return (
		<div>
			<div style={{ display: page === "begin" ? "block" : "none" }}>
				<ViewSurveyBegin
					id={surveyId}
					onNextClick={() => {
						setPage("questions");
					}}
				/>
			</div>
			<div style={{ display: page === "questions" ? "block" : "none" }}>
				<ViewSurveyQuestion
					id={surveyId}
					getIsCompleted={isCompleted => setIsCompleted(isCompleted)}
					isCompleted={isCompleted}
					getIsSurveyCompleted={isCompleted => setIsSurveyCompleted(isCompleted)}
					answer={answer => setAnswer(answer)}
					questionId={questionId => setQuestionId(questionId)}
					getQuestionPosition={questionPosition => setQuestionPosition(questionPosition)}
					onBackClick={() => {
						if (questionPosition === "first") {
							setPage("begin");
						} else {
							// TODO: regresar a la pregunta anterior
						}
					}}
					onNextClick={submitAnswer}
				/>
			</div>
		</div>
	);
};

interface ViewSurveyBeginProps {
	id: string;
	onNextClick?: () => void;
}
const ViewSurveyBegin: FC<ViewSurveyBeginProps> = (props: ViewSurveyBeginProps) => {
	const [{ data, fetching, error }, run] = useQuery({
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
	answer: (answer: []) => void;
	questionId: (questionId: string) => void;
	getIsCompleted: (complete: boolean) => void;
	isCompleted: boolean;
	getIsSurveyCompleted: (complete: boolean) => void;
	getQuestionPosition: (questionPosition: string) => void;
	onBackClick: () => void;
	onNextClick: () => void;
}
const ViewSurveyQuestion: FC<ViewSurveyQuestionProps> = (props: ViewSurveyQuestionProps) => {
	const router = useRouter();

	const [{ data, fetching, error }, run] = useQuery({
		query: queryLastQuestionOfSurvey,
		variables: { surveyID: props.id },
		pause: true
	});

	const [{ data: dataFirstQuestion, fetching: fetchingFirstQuestion }, runFirstQuestion] = useQuery({
		query: queryIsFirstQuestion,
		variables: { questionID: data ? data.lastQuestionOfSurvey.lastQuestion.id : "" },
		pause: true
	});

	const [{ data: dataFinalQuestion, fetching: fetchingFinalQuestion }, runFinalQuestion] = useQuery({
		query: queryIsFinalQuestion,
		variables: { questionID: data ? data.lastQuestionOfSurvey.lastQuestion.id : "" },
		pause: true
	});

	useEffect(() => {
		run();
	}, []);

	useEffect(
		() => {
			if (data) {
				runFirstQuestion();
				runFinalQuestion();
				if (data.lastQuestionOfSurvey.lastQuestion.id) {
					if (props.questionId) {
						props.questionId(data.lastQuestionOfSurvey.lastQuestion.id);
					}
				}
				if (data.lastQuestionOfSurvey.percent === 1) {
					if (props.getIsSurveyCompleted) {
						props.getIsSurveyCompleted(true);
					}
				}
			}
		},
		[data]
	);

	useEffect(
		() => {
			if (props.getQuestionPosition) {
				if (!fetchingFirstQuestion && !fetchingFinalQuestion) {
					if (dataFirstQuestion && dataFirstQuestion.isFirstQuestion) {
						props.getQuestionPosition("first");
					} else {
						if (dataFinalQuestion && dataFinalQuestion.isFinalQuestion) {
							props.getQuestionPosition("final");
						} else {
							props.getQuestionPosition("middle");
						}
					}
				}
			}
		},
		[dataFirstQuestion, dataFinalQuestion]
	);

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
				<title>{data.lastQuestionOfSurvey.lastQuestion.title}</title>
			</Head>
			<Layout>
				<SurveyQuestion
					id={data.lastQuestionOfSurvey.lastQuestion.id}
					percentage={Math.round(data.lastQuestionOfSurvey.percent * 100)}
					title={data.lastQuestionOfSurvey.lastQuestion.title}
					description={data.lastQuestionOfSurvey.lastQuestion.description}
					anonymous={data.lastQuestionOfSurvey.lastQuestion.anonymous}
					input={data.lastQuestionOfSurvey.lastQuestion.input}
					answer={props.answer}
					isComplete={props.getIsCompleted}
				/>
				<QuestionButtons>
					<motion.div className={questionButtonLeft}>
						<ButtonBack onBackClick={props.onBackClick} />
					</motion.div>
					<motion.div className={questionButtonRight}>
						<ButtonNext onNextClick={props.onNextClick} isComplete={props.isCompleted} isFinalQuestion={false} />
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
	isFinalQuestion: boolean;
}
const ButtonNext: FC<ButtonNextProps> = (props: ButtonNextProps) => {
	const theme = useTheme();
	return (
		<BaseButton
			iconElement={<ArrowRightIcon color={!props.isComplete ? theme.textColor : "#ffffff95"} size={20} />}
			text={props.isFinalQuestion ? "FINALIZAR" : "SIGUIENTE"}
			onClick={props.onNextClick}
			disabled={!props.isComplete}
		/>
	);
};

export default Survey;
