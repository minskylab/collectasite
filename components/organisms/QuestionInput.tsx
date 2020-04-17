import React, { FC } from "react";
import { BaseInput } from "../atoms/Input";
import { Choices, YesNoChoice, SatisfactionChoice } from "../molecules/Choices";
import { OptionValue } from "../atoms/Button/ChoiceButton";
import { YesNoValue } from "../molecules/Choices/YesNoChoice";
import { SatisfactionMode } from "../molecules/Choices/SatisfactionChoice";

export enum QuestionType {
	TEXT,
	OPTIONS,
	SATISFACTION,
	YESNO
}

export interface onChange {
	onChange: (value: any) => void;
}

export interface QuestionInputProps {
	value: any;
	type: QuestionType;
	multiple?: boolean;
	onChangeValue: (value: any) => void;
}

const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
	if (props.type === QuestionType.TEXT) {
		const valueText: string = props.value;
		return (
			<BaseInput
				placeholder={"Escribe tu respuesta aquí"}
				type={"text"}
				value={valueText}
				//@ts-ignore
				onChange={e => props.onChangeValue(e.target.value)}
			/>
		);
	}
	if (props.type === QuestionType.OPTIONS) {
		const valueOptions: OptionValue[] = props.value;
		return (
			<Choices
				options={valueOptions}
				onChange={options => {
					props.onChangeValue(options);
				}}
				multiple={props.multiple}
			/>
		);
	}
	if (props.type === QuestionType.YESNO) {
		const yesNoValue: YesNoValue = props.value;
		return (
			<YesNoChoice
				positiveOptionName={"SI"}
				negativeOptionName={"NO"}
				value={yesNoValue}
				onChange={selectedOption => {
					props.onChangeValue(selectedOption);
				}}
			/>
		);
	}
	if (props.type === QuestionType.SATISFACTION) {
		const satisfactionValue: number | undefined = props.value;
		return (
			<SatisfactionChoice
				onChange={s => {
					props.onChangeValue(s);
				}}
				unitValue={satisfactionValue}
				iconSize={100}
				satisfactionOptionsSize={SatisfactionMode.Large}
				// alternativeNames={["a", "b", 'c']}
			/>
		);
	}
	return null;
};

export default QuestionInput;
