import React, { FC } from "react";
import { styled } from "linaria/react";
import Layout from "./Layout";
import { useTheme } from "../../../general/theming";
import { css } from "linaria";
import { motion } from "framer-motion";

const Container = styled.div`
	padding-top: 1.5em;
	padding-bottom: 1.8em;
	padding-left: 1.2em;
	padding-right: 1.2em;
	text-align: left;
	cursor: pointer;
`;

const textExpiredAt = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.65em;
	padding-bottom: 0.7em;
`;

const textSurveyName = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.9em;
	padding-bottom: 1.7em;
	line-height: 130%;
`;

const textCourse = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 1.4em;
	font-weight: 500;
	padding-bottom: 0.5em;
	line-height: 130%;
`;

const textTeacher = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.84em;
	padding-bottom: 2.3em;
`;

const textCreatedAt = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.7em;
	padding-bottom: 0.2em;
	/* text-align: right; */
`;

const textAvailableFrom = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.7em;
	/* text-align: right; */
`;

interface CardClassroomProps {
	expiredAt?: string;
	surveyName?: string;
	course?: string;
	teacher?: string;
	createdAt?: string;
	availableFrom?: string;
	isShadow?: boolean;
}

const ClassroomCard: FC<CardClassroomProps> = (props: CardClassroomProps) => {
	const theme = useTheme();
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: [1, 0.9, 1] }}
		>
			<Layout isShadow={props.isShadow}>
				<Container>
					<div
						className={textExpiredAt}
						style={{
							//@ts-ignore
							"--text-color": theme.secondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.expiredAt}
					</div>
					<div
						className={textSurveyName}
						style={{
							//@ts-ignore
							"--text-color": theme.darkSecondaryTextColor,
							"--font-family": theme.fontFamilyTitle
						}}
					>
						{props.surveyName}
					</div>
					<div
						className={textCourse}
						style={{
							//@ts-ignore
							"--text-color": theme.textColor,
							"--font-family": theme.fontFamilyTitle
						}}
					>
						{props.course}
					</div>
					<div
						className={textTeacher}
						style={{
							//@ts-ignore
							"--text-color": theme.darkSecondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.teacher}
					</div>
					<div
						className={textCreatedAt}
						style={{
							//@ts-ignore
							"--text-color": theme.secondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.createdAt}
					</div>
					<div
						className={textAvailableFrom}
						style={{
							//@ts-ignore
							"--text-color": theme.secondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.availableFrom}
					</div>
				</Container>
			</Layout>
		</motion.div>
	);
};

export default ClassroomCard;
