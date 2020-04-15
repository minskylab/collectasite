// estado interno manipulado por su padre
// // initial state
// initial state???
// title
// anonymous
// callback

import React, { FC } from "react";
import { QuestionType, QuestionInputProps } from "./QuestionInput";

interface Answer {
	id: string;
	question: QuestionInputProps;
	at: string;
	by: string;
	responses: string[];
}

interface QuestionProps {
	type?: QuestionType;
	defaults?: string[];
	multiple?: boolean;
	initialState?: any;
	title: string;
	anonymous?: boolean;
	input: QuestionInputProps[];
	answer: (answer: Answer) => void[];
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
	return <div>Render question input</div>;
};

export default Question;
