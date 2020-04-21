import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useQuery, useMutation } from "urql";
import { motion } from "framer-motion";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../general/theming";
import Question, { QuestionInterface } from "../../components/organisms/Question";
import { QuestionType } from "../../components/organisms/QuestionInput";
import { OPTIONS } from "../playground/maria";
import { YesNoValue } from "../../components/molecules/Choices/YesNoChoice";
import { BaseButton } from "../../components/atoms/Button";
import { ArrowRightIcon, ArrowLeftIcon } from "../../components/atoms/Icon";
import { CircleProgressBar } from "../../components/molecules/CircleProgressBar";
import { querySurvey, queryLastQuestionOfSurvey } from "../../general/queries";
import { answerQuestion } from "../../general/mutations";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

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
	@media (max-width: 400px) {
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

const CircleProgressWrapper = styled.div`
	position: fixed;
	top: 2rem;
	left: 2rem;
	@media (max-width: 400px) {
		position: relative;
		top: 0;
		left: 0;
		padding-bottom: 2em;
	}
`;

const QuestionTopWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	@media (max-width: 400px) {
		min-height: 80vh;
		justify-content: flex-start;
	}
`;

const thanks = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 1.5rem;
	text-align: center;
`;

interface SurveyProps {
	title: string;
	description: string;
	dueDate: string;
	questions: QuestionInterface;
	percentState: number;
	currentIndexQuestion: number;
	totalQuestions: number;
}

const Survey: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const theme = useTheme();
	// const [ question, setQuestion ] = useState<QuestionInterface>(QUESTIONS[0]);
	const [ page, setPage ] = useState<string>("begin");
	const [ isComplete, setComplete ] = useState<boolean>(false);
	const [ answer, setAnswer ] = useState<any>(null);
	console.log("answer ====> ", answer);

	const [ surveyResult, reexecuteSurvey ] = useQuery<any>({
		query: querySurvey,
		variables: { id: id }
	});
	const [ questionResult, reexecuteQuestion ] = useQuery({
		query: queryLastQuestionOfSurvey,
		variables: { id: id }
	});
	const { data: dataSurvey, fetching: fetchingSurvey, error: errorSurvey } = surveyResult;
	const { data: dataQuestion, fetching: fetchingQuestion, error: errorQuestion } = questionResult;

	const [ updateAnswerQuestionResult, updateAnswerQuestion ] = useMutation(answerQuestion);

	if (page === "begin") {
		if (fetchingSurvey)
			return (
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}
				>
					Loading...
				</div>
			);
		if (errorSurvey)
			return (
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}
				>
					Oh no... {errorSurvey.message}
				</div>
			);
		if (dataSurvey)
			return (
				<Layout key={page}>
					<SurveyBegin
						title={dataSurvey && dataSurvey.survey ? dataSurvey.survey.title : ""}
						description={dataSurvey && dataSurvey.survey ? dataSurvey.survey.description : ""}
						dueDate={dataSurvey && dataSurvey.survey ? dataSurvey.survey.dueDate : ""}
					/>
					<QuestionButtonFirst>
						<div />
						<motion.div className={questionButton}>
							<BaseButton
								text={"INICIAR"}
								onClick={() => {
									setPage("questions");
								}}
								iconElement={<ArrowRightIcon color={"#ffffff95"} size={20} />}
							/>
						</motion.div>
					</QuestionButtonFirst>
				</Layout>
			);
	}

	if (page === "questions") {
		if (fetchingQuestion)
			return (
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}
				>
					Loading...
				</div>
			);
		if (errorQuestion)
			return (
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}
				>
					Oh no... {errorQuestion.message}
				</div>
			);
		if (dataQuestion)
			return (
				<Layout key={page}>
					<QuestionTopWrapper>
						<div style={{ height: 50 }} />
						<CircleProgressWrapper>
							<CircleProgressBar
								strokeWidth={2}
								percentage={
									dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 1/4" ? (
										25
									) : dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 2/4" ? (
										50
									) : dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 3/4" ? (
										75
									) : dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 4/4" ? (
										100
									) : (
										0
									)
								}
								speed={3}
								size={90}
							/>
						</CircleProgressWrapper>
						<motion.div
							key={dataQuestion.lastQuestionOfSurvey.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: [ 0, 1 ] }}
							transition={{ delay: 0.05, stiffness: 8, duration: 0.4 }}
						>
							<Question
								title={dataQuestion.lastQuestionOfSurvey.title}
								description={dataQuestion.lastQuestionOfSurvey.description}
								anonymous={dataQuestion.lastQuestionOfSurvey.anonymous}
								input={dataQuestion.lastQuestionOfSurvey.input}
								answer={s => {
									setAnswer(s);
								}}
								isComplete={c => {
									setComplete(c);
								}}
							/>
						</motion.div>
					</QuestionTopWrapper>
					<QuestionButtons>
						<motion.div className={questionButtonLeft}>
							<BaseButton
								iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
								iconPosition={"left"}
								text={"Anterior"}
								colorText={"#B1B1B1"}
								backgroundColor={"transparent"}
								onClick={() => {
									if (dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 1/4") {
										setPage("begin");
									} else {
										// setQuestion(QUESTIONS[Number(question.id) > 0 ? Number(question.id) - 1 : Number(question.id)]);
									}
								}}
							/>
						</motion.div>
						<motion.div className={questionButtonRight}>
							<BaseButton
								disabled={!isComplete}
								iconElement={<ArrowRightIcon color={!isComplete ? theme.textColor : "#ffffff95"} size={20} />}
								text={dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 4/4" ? "FINALIZAR" : "SIGUIENTE"}
								onClick={() => {
									let variables = { input: { id: dataQuestion.lastQuestionOfSurvey.id, answer: answer } };
									updateAnswerQuestion(variables).then(result => {
										if (result.error) {
											console.error("Oh no!", result.error);
										}
										if (result.data) {
											if (dataQuestion.lastQuestionOfSurvey.title === "PREGUNTA 4/4") {
												router.push("/s/done");
											}
											reexecuteSurvey({ requestPolicy: "network-only" });
											reexecuteQuestion({ requestPolicy: "network-only" });
										}
									});
									// setQuestion(
									// 	QUESTIONS[
									// 		Number(question.id) < QUESTIONS.length - 1 ? Number(question.id) + 1 : Number(question.id)
									// 	]
									// );
								}}
							/>
						</motion.div>
					</QuestionButtons>
					<div style={{ height: 50 }} />
				</Layout>
			);
	}
	return (
		<Layout>
			<div style={{ paddingTop: "4em" }}>
				<div
					className={thanks}
					style={{
						//@ts-ignore
						"--font-family": theme.fontFamilyText,
						"--color-text": theme.textColor,
						paddingBottom: "3em"
					}}
				>
					¡Gracias!
				</div>
				<div>
					<BaseButton
						onClick={() => router.push("/")}
						iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
						iconPosition={"left"}
						text={"Volver a inicio"}
						colorText={"#B1B1B1"}
						backgroundColor={"transparent"}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Survey;

const SurveyWrapper = styled.div`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	@media (max-width: 400px) {
		padding-left: 1.7rem;
		padding-right: 1.7rem;
	}
`;

const surveyDueDate = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 0.95rem;
	text-align: center;
	@media (max-width: 400px) {
		text-align: left;
		width: 100%;
	}
`;

const surveyTitle = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 0.95rem;
	text-align: center;
	@media (max-width: 400px) {
		text-align: left;
	}
`;

const SurveyDescriptionWrapper = styled.div`
	display: flex;
	justify-content: center;
	@media (max-width: 400px) {
		justify-content: flex-start;
	}
`;

const surveyDescription = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 1.6rem;
	text-align: center;
	width: 25rem;
	max-width: 45%;
	min-width: 22rem;
	@media (max-width: 400px) {
		text-align: left;
		width: 100%;
		max-width: 100%;
		min-width: 18rem;
	}
`;

interface SurveyBeginProps {
	title: string;
	description: string;
	dueDate: string;
}

dayjs.extend(relativeTime);
dayjs.locale("es");

const SurveyBegin: FC<SurveyBeginProps> = (props: SurveyBeginProps) => {
	const theme = useTheme();
	const expiredIn = dayjs().to(dayjs(props.dueDate));
	const expiredDay = dayjs(props.dueDate).format("DD");
	const expiredMonth = dayjs(props.dueDate).format("MMMM");
	return (
		<SurveyWrapper>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.05, stiffness: 8, duration: 0.4 }}
				className={surveyDueDate}
				style={{
					//@ts-ignore
					"--font-family": theme.fontFamilyText,
					"--color-text": theme.secondaryTextColor,
					paddingBottom: "0.7rem"
				}}
			>
				Vence {expiredIn}, el {expiredDay} de {expiredMonth}
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.08, stiffness: 8, duration: 0.5 }}
				className={surveyTitle}
				style={{
					//@ts-ignore
					"--font-family": theme.fontFamilyText,
					"--color-text": theme.textColor,
					paddingBottom: "1.8rem"
				}}
			>
				{props.title}
			</motion.div>
			<SurveyDescriptionWrapper>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, stiffness: 8, duration: 0.6 }}
					className={surveyDescription}
					style={{
						//@ts-ignore
						"--font-family": theme.fontFamilyText,
						"--color-text": theme.textColor
					}}
				>
					<div dangerouslySetInnerHTML={{ __html: props.description }} />
				</motion.div>
			</SurveyDescriptionWrapper>
		</SurveyWrapper>
	);
};

const QUESTIONS = [
	{
		id: 0,
		title: "PREGUNTA 1/4",
		description: "Selecciona las dinámicas que usó el profesor y fueron de provecho.",
		anonymous: false,
		input: {
			value: OPTIONS,
			type: QuestionType.OPTIONS,
			multiple: true
		}
	},
	{
		id: 1,
		title: "PREGUNTA 2/4",
		description: "Por problemas de conectividad, ¿crees que es necesario repetir la clase?",
		anonymous: false,
		input: {
			value: YesNoValue.Undefined,
			type: QuestionType.YESNO,
			multiple: false
		}
	},
	{
		id: 2,
		title: "PREGUNTA 3/4",
		description: "Si tienes algún comentario extra, por favor escríbelo a continuación.",
		anonymous: true,
		input: {
			value: "",
			type: QuestionType.TEXT,
			multiple: false
		}
	},
	{
		id: 3,
		title: "PREGUNTA 4/4",
		description: "¿Qué tan provechosa fue esta clase para tu aprendizaje?",
		anonymous: false,
		input: {
			value: 1,
			type: QuestionType.SATISFACTION,
			multiple: false
		}
	}
];
