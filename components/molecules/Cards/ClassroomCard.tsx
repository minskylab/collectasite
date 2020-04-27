import React, { FC, useEffect } from "react";
import { styled } from "linaria/react";
import Layout from "./Layout";
import { useTheme } from "../../../general/theming";
import { css } from "linaria";
import { motion } from "framer-motion";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import "dayjs/locale/es";

const Container = styled.div`
	padding-top: 1.5em;
	padding-bottom: 1.8em;
	padding-left: 1.2em;
	padding-right: 1.2em;
	text-align: left;
	cursor: pointer;
	min-height: 14.85rem;
`;

const textdueDate = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.85em;
	padding-bottom: 1.2em;
`;

const textSurveyName = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 1.2em;
	padding-bottom: 1.5em;
	line-height: 120%;
	@media (max-width: 600px) {
		font-weight: 500;
	}
`;

const textTags = css`
	color: var(--text-color);
	font-family: var(--font-family);
	background-color: var(--background-color);
	font-size: 0.8em;
	font-weight: 300;
	padding: 0.7em 0.5em;
	margin-bottom: 0.5em;
	line-height: 100%;
	text-transform: uppercase;
	border-radius: 5px;
	width: fit-content;
`;

interface CardClassroomProps {
	id: string | number;
	onSelected: ((id?: string | number) => void);
	dueDate?: string;
	title?: string;
	tags?: string[];
	isShadow?: boolean;
}

dayjs.extend(relativeTime)
dayjs.locale('es');

const ClassroomCard: FC<CardClassroomProps> = (props: CardClassroomProps) => {
	const theme = useTheme();
	const expiredIn = dayjs().to(dayjs(props.dueDate));
	const handleClick = (id: string | number) => {
		props.onSelected(id);
	};


	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: [1, 0.9, 1] }}
		>
			<Layout isShadow={props.isShadow} onClick={() => handleClick(props.id)}>
				<Container>
					<div
						className={textdueDate}
						style={{
							//@ts-ignore
							"--text-color": theme.textColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						Expira {expiredIn}
					</div>
					<div
						className={textSurveyName}
						style={{
							//@ts-ignore
							"--text-color": theme.textColor,
							"--font-family": theme.fontFamilyTitle
						}}
					>
						{props.title}
					</div>
					{props.tags ? props.tags.map((tag, i) => <div key={i}
						className={textTags}
						style={{
							//@ts-ignore
							"--font-family": theme.fontFamilyTitle,
							"--background-color": `${theme.primaryColor}20`,
							"--text-color": theme.textColor,
						}}
					>
						{tag}
					</div>) : null}

					{/* <div
						className={textTeacher}
						style={{
							//@ts-ignore
							"--text-color": theme.darkSecondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.teacher}
					</div> */}
					{/* <div
						className={textCreatedAt}
						style={{
							//@ts-ignore
							"--text-color": theme.secondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.createdAt}
					</div> */}
					{/* <div
						className={textAvailableFrom}
						style={{
							//@ts-ignore
							"--text-color": theme.secondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						{props.availableFrom}
					</div> */}
				</Container>
			</Layout>
		</motion.div>
	);
};

export default ClassroomCard;
