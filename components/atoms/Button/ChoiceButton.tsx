import React, { FC, useState } from "react";
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
	border-width: var(--border-width);
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

interface ChoiceProps {
	activeColor?: string;
	secondaryColor?: string;
	option: { key: string; text: string; value: string };
	checked?: boolean;
	onChecked?: () => void;
}

const ChoiceButton: FC<ChoiceProps> = (props: ChoiceProps) => {
	const [ mouseOver, setOnMouse ] = useState<boolean>(false);
	const theme = useTheme();
	return (
		<motion.div
			onMouseOver={() => {
				setOnMouse(true);
			}}
			onMouseLeave={() => {
				setOnMouse(false);
			}}
		>
			<motion.div
				className={buttonContainer}
				transition={{ type: "spring", damping: 0 }}
				//@ts-ignore
				style={{
					//@ts-ignore
					"--background-color": props.checked ? theme.primaryColor : "transparent",
					"--border-color": props.checked ? theme.primaryColor : theme.secondaryColor,
					"--border-width": props.checked ? "0px" : "2px"
				}}
				onClick={() => {}}
			>
				<div
					className={text}
					style={{
						//@ts-ignore
						"--text-color": props.checked ? theme.primaryColorText : theme.secondaryTextColor,
						"--font-family": theme.fontFamilyText
					}}
				>
					{props.option.text}
				</div>
				{props.checked ? (
					<CheckFilledIcon color={theme.primaryColorText} checkColor={theme.primaryColor} size={20} />
				) : mouseOver ? (
					<CheckFilledIcon color={theme.secondaryColor} checkColor={theme.textColor} size={20} />
				) : (
					""
				)}
			</motion.div>
		</motion.div>
	);
};

export default ChoiceButton;
