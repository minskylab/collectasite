import React, { FC } from "react";
import { BaseInput } from "../atoms/Input";
import { Choices } from "../molecules/Choices";

export enum QuestionType {
	TEXT,
	OPTIONS,
	SATISFACTION,
	YESNO
}

export interface QuestionInputProps {
	type: QuestionType;
	defaults: string[];
	multiple?: boolean;
	values: any[];
	// onChange:
}

const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
	let component;
	switch (props.type) {
		case QuestionType.TEXT:
			component = (
				<BaseInput
					placeholder={"Escribe tu respuesta aquí"}
					type={"text"}
					value={"props.value.lenght"}
					//@ts-ignore
					onChange={e => props.onChange([ e.target.value ])}
				/>
			);
			break;
		case QuestionType.OPTIONS:
			component = (
				<Choices
					options={props.values}
					onChange={options => {
						// props.onChange(options);
					}}
					multiple={true}
				/>
			);
			break;
		default:
			break;
	}
	return <div>Render question input</div>;
};

export default QuestionInput;
