import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
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
	const theme = useTheme();
	const { id } = router.query;
	const [ question, setQuestion ] = useState<QuestionInterface>(QUESTIONS[0]);
	const [ page, setPage ] = useState<string>("begin");

	if (page === "begin") {
		return (
			<Layout key={page}>
				<SurveyBegin
					title={"Feedback por Sesión | Estudiantes"}
					description={
						"María, responde esta pequeña encuesta sobre tu clase de Teoría de Decisiones del día martes 23 de Marzo."
					}
					dueDate={"Vence el 24 de Marzo a las 23:00 h."}
				/>
				<QuestionButtonFirst>
					<div />
					<motion.div className={questionButton} whileTap={{ scale: [ 1, 0.9, 1 ] }}>
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
		return (
			<Layout key={page}>
				<QuestionTopWrapper>
					<div style={{ height: 50 }} />
					<CircleProgressWrapper>
						<CircleProgressBar strokeWidth={2} percentage={(Number(question.id) + 1) / 4 * 100} speed={3} size={90} />
					</CircleProgressWrapper>
					<motion.div
						key={question.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: [ 0, 1 ] }}
						transition={{ delay: 0.05, stiffness: 8, duration: 0.4 }}
					>
						<Question
							title={question.title}
							description={question.description}
							anonymous={question.anonymous}
							input={question.input}
							answer={s => {
								console.log(s);
							}}
						/>
					</motion.div>
				</QuestionTopWrapper>
				<QuestionButtons>
					<motion.div className={questionButtonLeft} whileTap={{ scale: [ 1, 0.9, 1 ] }}>
						<BaseButton
							iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
							iconPosition={"left"}
							text={"Anterior"}
							colorText={"#B1B1B1"}
							backgroundColor={"transparent"}
							onClick={() => {
								if (Number(question.id) === 0) {
									setPage("begin");
								} else {
									setQuestion(QUESTIONS[Number(question.id) > 0 ? Number(question.id) - 1 : Number(question.id)]);
								}
							}}
						/>
					</motion.div>
					<motion.div className={questionButtonRight} whileTap={{ scale: [ 1, 0.9, 1 ] }}>
						<BaseButton
							iconElement={<ArrowRightIcon color={"#ffffff95"} size={20} />}
							text={Number(question.id) === QUESTIONS.length - 1 ? "FINALIZAR" : "SIGUIENTE"}
							onClick={() => {
								if (Number(question.id) === QUESTIONS.length - 1) {
									setPage("end");
								} else {
									setQuestion(
										QUESTIONS[
											Number(question.id) < QUESTIONS.length - 1 ? Number(question.id) + 1 : Number(question.id)
										]
									);
								}
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
			<div>THANKS</div>
			<br />
			<br />
			<br />
			<div>
				<BaseButton
					onClick={() => router.push("/")}
					iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
					iconPosition={"left"}
					text={"Volver al inicio"}
					colorText={"#B1B1B1"}
					backgroundColor={"transparent"}
				/>
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

const SurveyBegin: FC<SurveyBeginProps> = (props: SurveyBeginProps) => {
	const theme = useTheme();

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
				{props.dueDate}
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
					{props.description}
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
