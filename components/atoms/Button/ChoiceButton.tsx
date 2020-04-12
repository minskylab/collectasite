import React, { FC, useState, useEffect, ReactElement } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import { CheckFilledIcon } from "../Icon";

const buttonContainer = css`
	background-color: var(--background-color);
	border-radius: 5px;
	display: flex;
	padding: 0.8rem 1.25rem;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	-webkit-touch-callout: none;
	border-color: var(--border-color);
	border-style: solid;
	border-width: 2px;
	transition: 0.3s;
	height: 20px;
	:hover {
		cursor: pointer;
	}
`;

const text = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.92rem;
	transition: 0.3s;
`;

export interface OptionValue {
	key: string;
	text: string;
	value: string;
	checked: boolean;
}

interface ChoiceProps {
	option: OptionValue;
	onClick?: (e: React.MouseEvent) => void;
}

function ChoiceButton(props: ChoiceProps): ReactElement {
	// const ChoiceButton: FC<ChoiceProps> = (props: ChoiceProps) => {
	const [ mouseOver, setOnMouse ] = useState<boolean>(false);
	const [ render, setRender ] = useState<number>(0);
	const theme = useTheme();

	useEffect(
		() => {
			setRender(c => c + 1);
		},
		[ props.option.checked, props.option.value ]
	);

	// console.log(render);

	// console.log(props.option);

	return (
		<div onClick={props.onClick}>
			<div
				onMouseOver={() => {
					setOnMouse(true);
				}}
				onMouseLeave={() => {
					setOnMouse(false);
				}}
				className={buttonContainer}
				style={{
					//@ts-ignore
					"--background-color": props.option.checked ? theme.primaryColor : "transparent",
					"--border-color": props.option.checked ? theme.primaryColor : theme.secondaryColor
				}}
			>
				<div
					className={text}
					style={{
						//@ts-ignore
						"--text-color": props.option.checked ? theme.primaryColorText : theme.secondaryTextColor,
						"--font-family": theme.fontFamilyText
					}}
				>
					{props.option.text}
				</div>
				{props.option.checked ? (
					<motion.div
						animate={
							render > 1 ? (
								{
									scale: [ 1, 1.5, 1 ]
								}
							) : (
								{}
							)
						}
						transition={{ duration: 0.3 }}
					>
						<CheckFilledIcon color={theme.primaryColorText} checkColor={theme.primaryColor} size={20} />
					</motion.div>
				) : mouseOver ? (
					<CheckFilledIcon color={theme.secondaryColor} checkColor={theme.textColor} size={20} />
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default ChoiceButton;
