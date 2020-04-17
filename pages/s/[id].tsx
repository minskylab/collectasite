import React, { useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Question, { QuestionInterface } from "../../components/organisms/Question";
import { QuestionType } from "../../components/organisms/QuestionInput";
import { OPTIONS, OPTIONSSINGLE } from "../playground/maria";
import { YesNoValue } from "../../components/molecules/Choices/YesNoChoice";
import { BaseButton } from "../../components/atoms/Button";

interface SurveyProps {
	title: string;
	questions: QuestionInterface;
	percentState: number;
	currentIndexQuestion: number;
	totalQuestions: number;
}

const QUESTIONS = [
	{
		id: 0,
		title: "QUESTION 1",
		anonymous: true,
		input: {
			value: "Question 1",
			type: QuestionType.TEXT,
			multiple: false
		}
	},
	{
		id: 1,
		title: "QUESTION 2",
		anonymous: false,
		input: {
			value: OPTIONSSINGLE,
			type: QuestionType.OPTIONS,
			multiple: false
		}
	},
	{
		id: 2,
		title: "QUESTION 3",
		anonymous: false,
		input: {
			value: OPTIONS,
			type: QuestionType.OPTIONS,
			multiple: true
		}
	},
	{
		id: 3,
		title: "QUESTION 4",
		anonymous: false,
		input: {
			value: YesNoValue.Undefined,
			type: QuestionType.YESNO,
			multiple: false
		}
	},
	{
		id: 4,
		title: "QUESTION 5",
		anonymous: false,
		input: {
			value: 1,
			type: QuestionType.SATISFACTION,
			multiple: false
		}
	}
];

const Survey: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [ question, setQuestion ] = useState<QuestionInterface>(QUESTIONS[0]);

	return (
		<div>
			<div>Survey: {id}</div>
			<div key={question.id}>
				<Question
					title={question.title}
					anonymous={question.anonymous}
					input={question.input}
					answer={s => {
						console.log(s);
					}}
				/>
			</div>
			<br />
			<br />
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<BaseButton
					text={"ANTERIOR"}
					onClick={() =>
						setQuestion(QUESTIONS[Number(question.id) > 0 ? Number(question.id) - 1 : Number(question.id)])}
				/>
				<BaseButton
					text={"SIGUIENTE"}
					onClick={() =>
						setQuestion(
							QUESTIONS[Number(question.id) < QUESTIONS.length - 1 ? Number(question.id) + 1 : Number(question.id)]
						)}
				/>
			</div>
			<div style={{ display: "none" }}>
				<div>
					<Question
						title={"QUESTION 3"}
						anonymous={false}
						input={{
							value: OPTIONS,
							type: QuestionType.OPTIONS,
							multiple: true
						}}
						answer={s => {
							console.log(s);
						}}
					/>
				</div>
				<br />
				<br />
				<br />
				<div>
					<Question
						title={"QUESTION 4"}
						anonymous={false}
						input={{
							value: YesNoValue.Undefined,
							type: QuestionType.YESNO,
							multiple: false
						}}
						answer={s => {
							console.log(s);
						}}
					/>
				</div>
				<br />
				<br />
				<br />
				<div>
					<Question
						title={"QUESTION 5"}
						anonymous={false}
						input={{
							value: 1,
							type: QuestionType.SATISFACTION,
							multiple: false
						}}
						answer={s => {
							console.log(s);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Survey;
