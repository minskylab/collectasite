import React, { FC } from "react";
import { styled } from "linaria/react";
import Layout from "./Layout";
import { useTheme } from "../../../general/theming";
import { css } from "linaria";

const Container = styled.div`
	padding-top: 1.5rem;
	padding-bottom: 1.8rem;
	padding-left: 1.2rem;
	padding-right: 1.2rem;
	text-align: left;
	cursor: pointer;
`;

const textExpiredAt = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.65rem;
	padding-bottom: 0.7rem;
`;

const textSurveyName = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.9rem;
	padding-bottom: 1.7rem;
	line-height: 130%;
`;

const textCourse = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 1.4rem;
	font-weight: 500;
	padding-bottom: 0.5rem;
	line-height: 130%;
`;

const textTeacher = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.84rem;
	padding-bottom: 2.3rem;
`;

const textCreatedAt = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.7rem;
	padding-bottom: 0.2rem;
	/* text-align: right; */
`;

const textAvailableFrom = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.7rem;
	/* text-align: right; */
`;

interface CardClassroomProps {
	expiredAt?: string;
	surveyName?: string;
	course?: string;
	teacher?: string;
	createdAt?: string;
	availableFrom?: string;
}

const ClassroomCard: FC<CardClassroomProps> = (props: CardClassroomProps) => {
	const theme = useTheme();
	return (
		<Layout>
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
	);
};

export default ClassroomCard;
