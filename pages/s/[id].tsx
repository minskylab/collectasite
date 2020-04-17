import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../general/theming";
import Question, { QuestionInterface } from "../../components/organisms/Question";
import { QuestionType } from "../../components/organisms/QuestionInput";
import { OPTIONS, OPTIONSSINGLE } from "../playground/maria";
import { YesNoValue } from "../../components/molecules/Choices/YesNoChoice";
import { BaseButton } from "../../components/atoms/Button";
import { ArrowRightIcon, ArrowLeftIcon } from "../../components/atoms/Icon";

const Layout = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	@media (max-width: 400px) {
	}
`;

const QuestionButtons = styled.div`
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

const questionButton = css`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	@media (max-width: 400px) {
		padding-left: 1.7rem;
		padding-right: 1.7rem;
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
				<QuestionButtons>
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
				</QuestionButtons>
			</Layout>
		);
	}

	if (page === "questions") {
		return (
			<Layout key={page}>
				<motion.div
					key={question.id}
					initial={{ opacity: 0 }}
					animate={{ opacity: [ 0, 1 ] }}
					transition={{ delay: 0.05, stiffness: 8, duration: 0.4 }}
				>
					<Question
						title={question.title}
						anonymous={question.anonymous}
						input={question.input}
						answer={s => {
							console.log(s);
						}}
					/>
				</motion.div>
				<QuestionButtons>
					<motion.div className={questionButton} whileTap={{ scale: [ 1, 0.9, 1 ] }}>
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
					<motion.div className={questionButton} whileTap={{ scale: [ 1, 0.9, 1 ] }}>
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
		title: "QUESTION 1",
		anonymous: false,
		input: {
			value: OPTIONS,
			type: QuestionType.OPTIONS,
			multiple: true
		}
	},
	{
		id: 1,
		title: "QUESTION 2",
		anonymous: false,
		input: {
			value: YesNoValue.Undefined,
			type: QuestionType.YESNO,
			multiple: false
		}
	},
	{
		id: 2,
		title: "QUESTION 3",
		anonymous: true,
		input: {
			value: "Question 1",
			type: QuestionType.TEXT,
			multiple: false
		}
	},
	{
		id: 3,
		title: "QUESTION 4",
		anonymous: false,
		input: {
			value: 1,
			type: QuestionType.SATISFACTION,
			multiple: false
		}
	}
];
