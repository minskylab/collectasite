import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import {
	Satisfaction1FilledIcon,
	Satisfaction2FilledIcon,
	Satisfaction3FilledIcon,
	Satisfaction4FilledIcon,
	Satisfaction5FilledIcon
} from "../../atoms/Icon";

interface SatisfactionButtonProps {
	focus?: boolean;
	fontFamily?: string;
	textColor?: string;
	textFocusColor?: string;
	borderColor?: string;
	borderFocusColor?: string;
	selected?: boolean;
}

const WrapperSatisfaction = styled.div`
	display: flex;
	justify-content: center;
	width: 100vw;
`;

interface WrapperIconProps {
	size?: number;
}

const WrapperIcon =
	styled.div <
		WrapperIconProps >
		`
	padding-bottom: 3em;
	height: ${props => (props.size ? `${props.size}px` : "70px")};
	width: ${props => (props.size ? `${props.size}px` : "70px")};
	position: "relative";
`;

const SatisfactionButton =
	styled.div <
		SatisfactionButtonProps >
		`
    //@ts-ignore
    font-family: ${props => props.fontFamily};
    //@ts-ignore
    color: ${props =>
			!props.selected ? (props.focus ? props.textFocusColor : props.textColor) : props.textFocusColor};
    //@ts-ignore
    border-color: ${props =>
			!props.selected ? (props.focus ? props.borderFocusColor : props.borderColor) : props.borderFocusColor};
    //@ts-ignore
    background-color: ${props => (props.selected ? props.borderFocusColor : "transparent")};
    transition: 0s;
    padding-top: 1.3rem;
    padding-bottom: 1.4rem;
    padding-left: 2rem;
    padding-right: 2rem;
	  border-style: solid;
	  border-width: 2px;
    /* border-radius: 5px; */
    cursor: pointer;
		user-select: none;
		width: 30vw;
		text-align: center;
`;

export enum ViewMode {
	Desktop = 1,
	Mobile = 0
}

export enum SatisfactionMode {
	Short = 3,
	Large = 5
}

export enum SatisfactionValue {
	VeryDissatisfied = 1,
	SomewhatDissatisfied = 2,
	Neutral = 3,
	SomewhatSatistied = 4,
	VerySatisfied = 5,
	Undefined = -1
}

interface SatisfactionProps {
	value?: SatisfactionValue;
	unitValue: number;
	onChange: ((response: number) => void);
	viewMode?: ViewMode; // 1 or mobile 0
	satisfactionOptionsSize?: SatisfactionMode; // 3 or 5
	alternativeNames?: string[]; // [Nada, Poco, Regular, Mucho, Bastante]
	iconSize?: number;
}

const basicNames = ["NADA", "POCO", "REGULAR", "SUFICIENTE", "BASTANTE"];

const SatisfactionChoiceMobile: FC<SatisfactionProps> = (props: SatisfactionProps) => {
	const theme = useTheme();

	const sizeMode = props.satisfactionOptionsSize || SatisfactionMode.Large;
	const step = 2 / (sizeMode - 1);
	const _value =
		Math.round((props.unitValue / step + Math.round(sizeMode / 2) + Number.EPSILON) * 100) / 100;
	const names = props.alternativeNames
		? props.alternativeNames.length === sizeMode
			? props.alternativeNames
			: sizeMode === SatisfactionMode.Short ? [basicNames[0], basicNames[2], basicNames[4]] : [...basicNames]
		: sizeMode === SatisfactionMode.Short ? [basicNames[0], basicNames[2], basicNames[4]] : [...basicNames];
	const arrayOptions = sizeMode === SatisfactionMode.Short ? [1, 2, 3] : [1, 2, 3, 4, 5];
	const [focus, setFocus] = useState<boolean[]>(
		sizeMode === SatisfactionMode.Short ? [false, false, false] : [false, false, false, false, false]
	);


	const insert = (list: any, newListItem: any) => {
		// let _focus = [...focus];
		// _focus = sizeMode === SatisfactionMode.Short ? [false, false, false] : [false, false, false, false, false];
		// setFocus(_focus);
		let sidesNumber = ((sizeMode - 1) / 2);
		let first;
		let last;
		const _alist = list.filter((n: any) => n < newListItem);
		const _rest = list.filter((n: any) => n > newListItem);
		if (_alist.length >= sidesNumber) {
			last = _rest.concat(_alist.slice(0, Math.max(_alist.length - sidesNumber, 0)));
			first = _alist.slice(Math.max(_alist.length - sidesNumber, 0));
		} else {
			first = (_rest.slice(Math.max(_rest.length + _alist.length - sidesNumber, 0))).concat(_alist);
			last = _rest.slice(0, Math.max(_rest.length + _alist.length - sidesNumber));
		}
		return [
			...first,
			newListItem,
			...last
		]
	};

	const filtered = arrayOptions.filter(i => i !== _value);
	const result = [...insert(filtered, _value)];

	const handleClick = (value: SatisfactionValue, optionValue: SatisfactionValue) => {
		if (value === optionValue) {
			// props.onChange(undefined);
		} else {
			let newValue: number = Math.round(((optionValue - Math.round(sizeMode / 2)) * step + Number.EPSILON) * 100) / 100;
			props.onChange(newValue);
		}
	};

	const GetIcon = (value: SatisfactionValue | undefined, iconSize?: number) => {
		let icons =
			sizeMode === SatisfactionMode.Short
				? [
					<Satisfaction1FilledIcon color={theme.satisfactionColors[0]} size={iconSize || 70} />,
					<Satisfaction3FilledIcon color={theme.satisfactionColors[2]} size={iconSize || 70} />,
					<Satisfaction5FilledIcon color={theme.satisfactionColors[4]} size={iconSize || 70} />
				]
				: [
					<Satisfaction1FilledIcon color={theme.satisfactionColors[0]} size={iconSize || 70} />,
					<Satisfaction2FilledIcon color={theme.satisfactionColors[1]} size={iconSize || 70} />,
					<Satisfaction3FilledIcon color={theme.satisfactionColors[2]} size={iconSize || 70} />,
					<Satisfaction4FilledIcon color={theme.satisfactionColors[3]} size={iconSize || 70} />,
					<Satisfaction5FilledIcon color={theme.satisfactionColors[4]} size={iconSize || 70} />
				];
		return icons.map((icon, key) => (
			<motion.div
				style={{ position: "absolute", opacity: value === key + 1 ? 1 : 0 }}
				key={key}
				animate={
					value === key + 1 ? { scale: [1, 1, 1], zIndex: 1, opacity: 1 } : { scale: 1, zIndex: 0, opacity: 0 }
				}
			>
				{icon}
			</motion.div>
		));
	};

	return (
		<div style={{ paddingBottom: "2em", display: "flex", alignItems: "center", flexDirection: "column", width: "100vw", overflow: "hidden" }}>
			<WrapperIcon size={props.iconSize}>{GetIcon(_value, props.iconSize)}</WrapperIcon>
			<WrapperSatisfaction>
				{result.map((optionValue, key) => (
					<motion.div
						key={optionValue}
						style={{ marginLeft: "-2px" }}
						animate={_value === optionValue || focus[optionValue - 1] ? { zIndex: 1 } : { zIndex: 0 }}
					>
						<motion.div
							animate={_value === optionValue ? { scale: [1, 1.15, 1] } : { scale: 1 }}
							transition={{ duration: 0.4 }}
						>
							<SatisfactionButton
								selected={_value === optionValue}
								onClick={() => handleClick(_value, optionValue)}
								onMouseOver={() => {
									const _focus = [...focus];
									_focus[optionValue - 1] = true;
									setFocus(_focus);
								}}
								onMouseLeave={() => {
									const _focus = [...focus];
									_focus[optionValue - 1] = false;
									setFocus(_focus);
								}}
								fontFamily={theme.fontFamilyText}
								textColor={theme.secondaryTextColor}
								textFocusColor={
									theme.satisfactionTextColors[(theme.satisfactionTextColors.length - 1) / (sizeMode - 1) * (optionValue - 1)]
								}
								borderColor={theme.satisfactionBorderColor}
								borderFocusColor={
									theme.satisfactionColors[(theme.satisfactionTextColors.length - 1) / (sizeMode - 1) * (optionValue - 1)]
								}
								focus={focus[optionValue - 1]}
							>
								{names[optionValue - 1]}
							</SatisfactionButton>
						</motion.div>
					</motion.div>
				))}
			</WrapperSatisfaction>
		</div>
	);
};

export default SatisfactionChoiceMobile;
