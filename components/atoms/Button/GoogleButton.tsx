import React, { FC } from "react";
import { motion } from "framer-motion";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { GoogleIcon } from "../Icon";

const buttonContainer = css`
	background-size: 200% 100%;
	background-image: linear-gradient(to right, var(--bg-color) 50%, var(--sec-color) 50%);
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.24);
	border-radius: 5px;
	display: flex;
	padding: 0.6rem 1rem;
	align-items: center;
	user-select: none;
	-webkit-touch-callout: none;
	:hover {
		cursor: pointer;
	}
`;

interface ButtonGoogleProps {
	loading?: boolean;
	onClick?: () => void;
}

const GoogleButton: FC<ButtonGoogleProps> = (props: ButtonGoogleProps) => {
	const theme = useTheme();

	return (
		<motion.div whileHover={props.loading ? {} : { scale: 1.1 }} onClick={props.onClick}>
			<motion.div
				className={buttonContainer}
				transition={{ type: "spring", damping: 0 }}
				//@ts-ignore
				style={{ "--bg-color": theme.backgroundCards, "--sec-color": theme.backgroundCards }}
			>
				<motion.div
					animate={
						props.loading ? (
							{
								transform: "rotateZ(20deg)"
							}
						) : (
							{
								transform: "rotateZ(0)"
							}
						)
					}
					transition={{ type: "spring", damping: 0 }}
				>
					<GoogleIcon />
				</motion.div>

				<div
					style={{
						color: props.loading ? theme.secondaryTextColor : theme.textColor,
						fontFamily: theme.fontFamilyText,
						fontWeight: "normal",
						fontSize: "0.85rem",
						marginLeft: "1rem"
					}}
				>
					Ingresa con Google
				</div>
			</motion.div>
		</motion.div>
	);
};

export default GoogleButton;
