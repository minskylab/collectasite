import React, { FC } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import { ChoiceButton } from "../../atoms/Button";

const WrapperChoiceButton = styled.div`padding-bottom: 0.9rem;`;

interface DefaultChoicesProps {
	options: { key: string; text: string; value: string; checked: boolean }[];
	secondaryColor?: string;
	typeResponse?: string;
}

// typeResponse: multiple or single

const DefaultChoices: FC<DefaultChoicesProps> = (props: DefaultChoicesProps) => {
	const theme = useTheme();
	return (
		<motion.div>
			{props.options.map(option => (
				<WrapperChoiceButton>
					<ChoiceButton option={option} checked={option.checked} />
				</WrapperChoiceButton>
			))}
		</motion.div>
	);
};

export default DefaultChoices;
