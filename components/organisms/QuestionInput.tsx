import React, { FC } from "react";
import { BaseInput } from "../atoms/Input";
import { Choices, YesNoChoice, SatisfactionChoice, SatisfactionChoiceMobile } from "../molecules/Choices";
import { OptionValue } from "../atoms/Button/ChoiceButton";
import { YesNoValue } from "../molecules/Choices/YesNoChoice";
import { SatisfactionMode } from "../molecules/Choices/SatisfactionChoice";
import { styled } from "linaria/react";

const Layout = styled.div`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	max-width: 25rem;

	@media (max-width: 400px) {
		padding-left: 1.7rem;
		padding-right: 1.7rem;
	}
`;

export enum QuestionType {
	TEXT = "Text",
	OPTIONS = "Options",
	SATISFACTION = "Satisfaction",
	YESNO = "Boolean"
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
			<Layout style={{ paddingTop: "2em", paddingBottom: "3em" }}>
				<BaseInput
					placeholder={"Escribe tu respuesta aquí"}
					type={"text"}
					value={valueText}
					//@ts-ignore
					onChange={e => props.onChangeValue(e.target.value)}
				/>
			</Layout>
		);
	}
	if (props.type === QuestionType.OPTIONS) {
		const valueOptions: OptionValue[] = props.value;
		return (
			<Layout>
				<Choices
					options={valueOptions}
					onChange={options => {
						props.onChangeValue(options);
					}}
					multiple={props.multiple}
				/>
			</Layout>
		);
	}
	if (props.type === QuestionType.YESNO) {
		const yesNoValue: YesNoValue = props.value;
		return (
			<Layout>
				<YesNoChoice
					positiveOptionName={"SI"}
					negativeOptionName={"NO"}
					value={yesNoValue}
					onChange={selectedOption => {
						props.onChangeValue(selectedOption);
					}}
				/>
			</Layout>
		);
	}
	if (props.type === QuestionType.SATISFACTION) {
		const satisfactionValueDesktop: number | undefined = props.value;
		const satisfactionValueMobile: number = props.value;
		const isMobile: boolean = window.innerWidth < 600;

		return (
			<div style={{ paddingBottom: "3em" }}>
				{isMobile ? (
					<SatisfactionChoiceMobile
						onChange={s => {
							props.onChangeValue(s);
						}}
						unitValue={satisfactionValueMobile}
						iconSize={100}
						satisfactionOptionsSize={SatisfactionMode.Large}
					/>
				) : (
						<SatisfactionChoice
							onChange={s => {
								props.onChangeValue(s);
							}}
							unitValue={satisfactionValueDesktop}
							iconSize={100}
							satisfactionOptionsSize={SatisfactionMode.Large}
						// alternativeNames={["a", "b", 'c']}
						/>
					)}
			</div>
		);
	}
	return null;
};

export default QuestionInput;
