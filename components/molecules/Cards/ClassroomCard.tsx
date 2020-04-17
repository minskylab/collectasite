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
`;

const textdueDate = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.85em;
	padding-bottom: 1.2em;
`;

const texttitle = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 0.9em;
	padding-bottom: 1.5em;
	line-height: 120%;
`;

const textCourse = css`
	color: var(--text-color);
	font-family: var(--font-family);
	font-size: 1.4em;
	font-weight: 500;
	padding-bottom: 0.5em;
	line-height: 100%;
	text-transform: uppercase;
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
							"--text-color": theme.secondaryTextColor,
							"--font-family": theme.fontFamilyText
						}}
					>
						Expira {expiredIn}
					</div>
					<div
						className={texttitle}
						style={{
							//@ts-ignore
							"--text-color": theme.darkSecondaryTextColor,
							"--font-family": theme.fontFamilyTitle
						}}
					>
						{props.title}
					</div>
					{props.tags ? props.tags.map((tag, i) => <div key={i}
						className={textCourse}
						style={{
							//@ts-ignore
							"--text-color": theme.textColor,
							"--font-family": theme.fontFamilyTitle
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
