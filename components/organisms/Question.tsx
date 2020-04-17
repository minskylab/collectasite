import React, { FC, useState } from "react";
import QuestionInput, { QuestionInputProps, QuestionType } from "./QuestionInput";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../general/theming";
import { AlertFilledIcon } from "../atoms/Icon";

const QuestionWrapper = styled.div`
	text-align: center;
	@media (max-width: 400px) {
		text-align: left;
	}
`;

const TextWrapper = styled.div`
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	max-width: 25rem;
	margin: 0 auto;
	@media (max-width: 400px) {
		padding-left: 1.7rem;
		padding-right: 1.7rem;
		max-width: 100%;
	}
`;

const title = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 0.8rem;
	text-align: center;
	text-transform: uppercase;
	@media (max-width: 400px) {
		text-align: center;
		width: 100%;
	}
`;

const description = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 1.56rem;
	text-align: center;
	@media (max-width: 400px) {
		text-align: left;
		width: 100%;
	}
`;

const anonymous = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 0.8rem;
	text-align: center;
	@media (max-width: 400px) {
		text-align: left;
		width: 100%;
	}
`;

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
	description: string;
	anonymous: boolean;
	input: Input;
}

export interface QuestionProps {
	title: string;
	description: string;
	anonymous: boolean;
	input?: Input;
	answer: (answer: any) => void;
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
	const theme = useTheme();
	const [ value, setValue ] = useState<any>(props.input ? props.input.value : null);
	return (
		<QuestionWrapper>
			<TextWrapper>
				<div
					className={title}
					style={{
						//@ts-ignore
						"--font-family": theme.fontFamilyText,
						"--color-text": theme.secondaryTextColor,
						paddingBottom: "1.5rem"
					}}
				>
					{props.title || ""}
				</div>
				<div
					className={description}
					style={{
						//@ts-ignore
						"--font-family": theme.fontFamilyText,
						"--color-text": theme.textColor
					}}
				>
					{props.description || ""}
				</div>
				{props.input && props.anonymous ? (
					<div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", paddingTop: "1rem" }}>
						<AlertFilledIcon color={theme.primaryColor} size={20} />
						<div
							className={anonymous}
							style={{
								//@ts-ignore
								"--font-family": theme.fontFamilyText,
								"--color-text": theme.primaryColor,
								paddingLeft: "0.5rem"
							}}
						>
							{props.anonymous ? "La respuesta a esta pregunta será almacenada como anónima." : null}
						</div>
					</div>
				) : null}
			</TextWrapper>
			<div style={{ paddingTop: "2rem" }}>
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
		</QuestionWrapper>
	);
};

export default Question;
