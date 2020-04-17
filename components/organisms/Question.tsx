import React, { FC, useState } from "react";
import QuestionInput, { QuestionInputProps, QuestionType } from "./QuestionInput";

interface Answer {
	id: string;
	question: QuestionInputProps;
	at: string;
	by: string;
	responses: string[];
}

interface Input {
	value: any;
	type: QuestionType;
	multiple?: boolean;
}

export interface QuestionInterface {
	id: string | number;
	title: string;
	anonymous: boolean;
	input: Input;
}

export interface QuestionProps {
	title: string;
	anonymous: boolean;
	input?: Input;
	answer: (answer: any) => void;
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
	const [ value, setValue ] = useState<any>(props.input ? props.input.value : null);
	return (
		<div>
			<div>{props.title || "TITULO"}</div>
			{props.input ? <div>{props.anonymous ? "ES ANONIMO" : null}</div> : null}
			{props.input ? (
				<QuestionInput
					value={value}
					onChangeValue={v => {
						// console.log(v);
						setValue(v);
						// cambiar el estado para actualizar el value
						props.answer(v); // dependiendo del tipo estandarizar esto para subirlo denuevo
					}}
					type={props.input.type}
					multiple={props.input.multiple}
				/>
			) : null}
		</div>
	);
};

export default Question;
