import React, { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";

const buttonContainer = css`
	background-size: 200% 100%;
	border-radius: 5px;
	display: flex;
	padding: 0.8rem 1.2rem;
	align-items: center;
	user-select: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
	:hover {
		cursor: pointer;
	}
`;

interface ButtonDefaultProps {
	loading?: boolean;
	onClick?: () => void;
	iconPosition?: string;
	iconElement?: ReactElement;
	text?: string;
	colorText?: string;
	backgroundColor?: string;
	isShadow?: boolean;
}

const BaseButton: FC<ButtonDefaultProps> = (props: ButtonDefaultProps) => {
	const theme = useTheme();

	return (
		<motion.div whileHover={props.loading ? {} : { scale: 1.1 }} onClick={props.onClick}>
			<motion.div
				className={buttonContainer}
				transition={{ type: "spring", damping: 0 }}
				//@ts-ignore
				style={
					props.isShadow ? (
						{
							backgroundColor: props.backgroundColor ? props.backgroundColor : theme.primaryColor,
							justifyContent: props.iconPosition !== "left" ? "flex-end" : "flex-start",
							boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.24)"
						}
					) : (
							{
								backgroundColor: props.backgroundColor ? props.backgroundColor : theme.primaryColor,
								justifyContent: props.iconPosition !== "left" ? "flex-end" : "flex-start"
							}
						)
				}
			>
				{props.iconElement &&
					props.iconPosition === "left" && (
						<motion.div
							animate={
								props.loading ? (
									{
										transform: "translateX(-5px)"
									}
								) : (
										{
											transform: "translateX(0)"
										}
									)
							}
							transition={{ type: "spring", damping: 0 }}
							style={{ display: "flex" }}
						>
							{props.iconElement}
						</motion.div>
					)}

				<div
					style={{
						color: props.colorText ? props.colorText : theme.primaryColorText,
						fontFamily: theme.fontFamilyText,
						fontWeight: "bold",
						fontSize: "0.82rem",
						marginLeft: props.text ? props.iconElement && props.iconPosition === "left" ? "1.5rem" : "0px" : "0px",
						marginRight: props.text ? props.iconElement && props.iconPosition !== "left" ? "1.5rem" : "0px" : "0px"
					}}
				>
					{props.text ? props.text : ""}
				</div>
				{props.iconElement &&
					props.iconPosition !== "left" && (
						<motion.div
							animate={
								props.loading ? (
									{
										transform: "translateX(5px)"
									}
								) : (
										{
											transform: "translateX(0)"
										}
									)
							}
							transition={{ type: "spring", damping: 0 }}
							style={{ display: "flex" }}
						>
							{props.iconElement}
						</motion.div>
					)}
			</motion.div>
		</motion.div>
	);
};

export default BaseButton;
