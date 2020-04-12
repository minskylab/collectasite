import React, { FC, useState, useEffect } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import { YesNoButton } from "../../atoms/Button";
import { OptionValue } from "../../atoms/Button/ChoiceButton";

const WrapperYesNoButtons = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ContainerOption = styled.div`padding: 0em;`;

enum Response {
	Yes,
	No,
	Undefined
}

interface YesNoChoicesProps {
	onChange: ((response: string) => void);
	positiveOptionName?: string;
	negativeOptionName?: string;
	initialState?: Response;
}

const YesNoChoices: FC<YesNoChoicesProps> = (props: YesNoChoicesProps) => {
	const [ options, setOptions ] = useState([
		{
			value: "yes",
			label: props.positiveOptionName || "Si",
			selected: props.initialState === Response.Yes ? true : false
		},
		{
			value: "no",
			label: props.negativeOptionName || "No",
			selected: props.initialState === Response.No ? true : false
		}
	]);

	useEffect(() => {
		props.onChange(Response[3]);
	}, []);

	return (
		<WrapperYesNoButtons>
			{options.map((option, key) => (
				<ContainerOption key={key} style={{ paddingLeft: key % 2 ? "1rem" : "0rem" }}>
					<YesNoButton
						selected={option.selected}
						onClick={() => {
							let _options = [ ...options ];
							_options.forEach(_option => {
								if (option.value === _option.value) {
									if (_option.selected) {
										_option.selected = false;
										props.onChange(Response[3]);
									} else {
										_option.selected = true;
										props.onChange(Response[key]);
									}
								} else {
									_option.selected = false;
								}
							});
							setOptions(_options);
						}}
					>
						{option.label}
					</YesNoButton>
				</ContainerOption>
			))}
		</WrapperYesNoButtons>
	);
};

export default YesNoChoices;
