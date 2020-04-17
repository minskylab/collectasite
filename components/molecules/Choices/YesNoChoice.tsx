import React, { FC } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { YesNoButton } from "../../atoms/Button";

const WrapperYesNoButtons = styled.div`
	display: flex;
	justify-content: space-evenly;
`;
const ContainerOption = styled.div`padding: 0em;`;

export enum YesNoValue {
	Yes = 1,
	No = 0,
	Undefined = -1
}

interface YesNoChoicesProps {
	value: YesNoValue;
	onChange: ((response: YesNoValue) => void);
	positiveOptionName?: string;
	negativeOptionName?: string;
}

const YesNoChoice: FC<YesNoChoicesProps> = (props: YesNoChoicesProps) => {
	return (
		<WrapperYesNoButtons>
			<ContainerOption key={1} style={{ paddingLeft: "0rem" }}>
				<YesNoButton
					selected={props.value === YesNoValue.Yes ? true : false}
					onClick={() => {
						if (props.value === YesNoValue.Yes ? true : false) {
							props.onChange(YesNoValue.Undefined);
						} else {
							props.onChange(YesNoValue.Yes);
						}
					}}
				>
					{props.positiveOptionName || "Si"}
				</YesNoButton>
			</ContainerOption>
			<ContainerOption key={2} style={{ paddingLeft: "1rem" }}>
				<YesNoButton
					selected={props.value === YesNoValue.No ? true : false}
					onClick={() => {
						if (props.value === YesNoValue.No ? true : false) {
							props.onChange(YesNoValue.Undefined);
						} else {
							props.onChange(YesNoValue.No);
						}
					}}
				>
					{props.negativeOptionName || "No"}
				</YesNoButton>
			</ContainerOption>
		</WrapperYesNoButtons>
	);
};

export default YesNoChoice;
