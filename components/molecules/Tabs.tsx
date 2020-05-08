import React, { FC, useEffect } from "react";
import { styled } from "linaria/react";
import { useTheme } from "../../general/theming";
import { css } from "linaria";
import { motion } from "framer-motion";
import { NewSurveysIcon, InProgressSurveysIcon, CompletedSurveysIcon } from "components/atoms";

const Wrapper = styled.div`display: block;`;

const TabItem = styled.div`display: block;`;

interface TabsProps {
	selected?: string;
	onClick?: (select?: string) => void;
}

const Tabs: FC<TabsProps> = (props: TabsProps) => {
	const theme = useTheme();
	const handleClick = (select: string) => {
		if (props.onClick) {
			props.onClick(select);
		}
	};

	const options = [
		{ name: "Nuevos", iconComponent: <NewSurveysIcon /> },
		{ name: "En progreso", iconComponent: <InProgressSurveysIcon /> },
		{ name: "Completados", iconComponent: <CompletedSurveysIcon /> }
	];

	const getActive = (active: boolean) => {
		if (active) {
			return true;
		}
		return false;
	};

	return (
		<Wrapper>
			{options.map((option, i) => (
				<TabItem key={i} onClick={() => handleClick(option.name)} active={selected === option.name}>
					<div>{option.iconComponent}</div>
					<div>{option.name}</div>
					<div>Linea</div>
				</TabItem>
			))}
		</Wrapper>
	);
};

export default Tabs;
