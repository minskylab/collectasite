import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import { Icon } from "components";

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
`;

interface WrapperIconProps {
    size?: number;
}

const WrapperIcon = styled.div<WrapperIconProps>`
    padding-bottom: 3em;
    height: ${(props) => (props.size ? `${props.size}px` : "70px")};
    width: ${(props) => (props.size ? `${props.size}px` : "70px")};
    position: "relative";
`;

const SatisfactionButton = styled.div<SatisfactionButtonProps>`
    font-family: ${(props: SatisfactionButtonProps) => props.fontFamily || ""};
    color: ${(props: SatisfactionButtonProps) =>
        !props.selected
            ? props.focus
                ? props.textFocusColor || ""
                : props.textColor || ""
            : props.textFocusColor || ""};
    border-color: ${(props) =>
        !props.selected
            ? props.focus
                ? props.borderFocusColor || ""
                : props.borderColor || ""
            : props.borderFocusColor || ""};
    background-color: ${(props: SatisfactionButtonProps) =>
        props.selected ? props.borderFocusColor || "" : "transparent"};
    transition: 0.3s;
    padding-top: 0.9rem;
    padding-bottom: 0.95rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-style: solid;
    border-width: 2px;
    /* border-radius: 5px; */
    cursor: pointer;
    user-select: none;
    width: 5rem;
    text-align: center;
`;

export enum ViewMode {
    Desktop = 1,
    Mobile = 0,
}

export enum SatisfactionMode {
    Short = 3,
    Large = 5,
}

export enum SatisfactionValue {
    VeryDissatisfied = 1,
    SomewhatDissatisfied = 2,
    Neutral = 3,
    SomewhatSatistied = 4,
    VerySatisfied = 5,
    Undefined = -1,
}

interface SatisfactionProps {
    value?: SatisfactionValue;
    unitValue: number | undefined;
    onChange: (response: number | undefined) => void;
    viewMode?: ViewMode; // 1 or mobile 0
    satisfactionOptionsSize?: SatisfactionMode; // 3 or 5
    alternativeNames?: string[]; // [Nada, Poco, Regular, Mucho, Bastante]
    iconSize?: number;
}

const basicNames = ["NADA", "POCO", "REGULAR", "SUFICIENTE", "BASTANTE"];

const SatisfactionChoice: FC<SatisfactionProps> = (props: SatisfactionProps) => {
    const theme = useTheme();
    const sizeMode = props.satisfactionOptionsSize || SatisfactionMode.Large;
    const step = 2 / (sizeMode - 1);
    const _value =
        props.unitValue !== undefined
            ? Math.round((props.unitValue / step + Math.round(sizeMode / 2) + Number.EPSILON) * 100) / 100
            : undefined;
    const names = props.alternativeNames
        ? props.alternativeNames.length === sizeMode
            ? props.alternativeNames
            : sizeMode === SatisfactionMode.Short
            ? [basicNames[0], basicNames[2], basicNames[4]]
            : [...basicNames]
        : sizeMode === SatisfactionMode.Short
        ? [basicNames[0], basicNames[2], basicNames[4]]
        : [...basicNames];
    const arrayOptions = sizeMode === SatisfactionMode.Short ? [1, 2, 3] : [1, 2, 3, 4, 5];
    const [focus, setFocus] = useState<boolean[]>(
        sizeMode === SatisfactionMode.Short ? [false, false, false] : [false, false, false, false, false],
    );

    const handleClick = (value: SatisfactionValue | undefined, optionValue: SatisfactionValue) => {
        if (value === optionValue) {
            props.onChange(undefined);
        } else {
            const newValue: number =
                Math.round(((optionValue - Math.round(sizeMode / 2)) * step + Number.EPSILON) * 100) / 100;
            props.onChange(newValue);
        }
    };

    const GetIcon = (value: SatisfactionValue | undefined, iconSize?: number) => {
        const icons =
            sizeMode === SatisfactionMode.Short
                ? [
                      <Icon
                          key={"s-1-f"}
                          name="satisfaction-1-filled"
                          color={theme.satisfactionColors[0]}
                          size={iconSize || 70}
                      />,
                      <Icon
                          key={"s-3-f"}
                          name="satisfaction-3-filled"
                          color={theme.satisfactionColors[2]}
                          size={iconSize || 70}
                      />,
                      <Icon
                          key={"s-5-f"}
                          name="satisfaction-5-filled"
                          color={theme.satisfactionColors[4]}
                          size={iconSize || 70}
                      />,
                  ]
                : [
                      <Icon
                          key={"s-1-f"}
                          name="satisfaction-1-filled"
                          color={theme.satisfactionColors[0]}
                          size={iconSize || 70}
                      />,
                      <Icon
                          key={"s-2-f"}
                          name="satisfaction-2-filled"
                          color={theme.satisfactionColors[1]}
                          size={iconSize || 70}
                      />,
                      <Icon
                          key={"s-3-f"}
                          name="satisfaction-3-filled"
                          color={theme.satisfactionColors[2]}
                          size={iconSize || 70}
                      />,
                      <Icon
                          key={"s-4-f"}
                          name="satisfaction-4-filled"
                          color={theme.satisfactionColors[3]}
                          size={iconSize || 70}
                      />,
                      <Icon
                          key={"s-5-f"}
                          name="satisfaction-5-filled"
                          color={theme.satisfactionColors[4]}
                          size={iconSize || 70}
                      />,
                  ];
        return icons.map((icon, key) => (
            <motion.div
                style={{ position: "absolute", opacity: value === key + 1 ? 1 : 0 }}
                key={key}
                animate={
                    value === key + 1
                        ? { scale: [1, 1, 1], zIndex: 1, opacity: 1 }
                        : { scale: 1, zIndex: 0, opacity: 0 }
                }
            >
                {icon}
            </motion.div>
        ));
    };

    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <WrapperIcon size={props.iconSize}>{GetIcon(_value, props.iconSize)}</WrapperIcon>
            <WrapperSatisfaction>
                {arrayOptions.map((optionValue, key) => (
                    <motion.div
                        key={key}
                        style={{ marginLeft: "-2px" }}
                        animate={_value === optionValue || focus[key] ? { zIndex: 1 } : { zIndex: 0 }}
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
                                    _focus[key] = true;
                                    setFocus(_focus);
                                }}
                                onMouseLeave={() => {
                                    const _focus = [...focus];
                                    _focus[key] = false;
                                    setFocus(_focus);
                                }}
                                fontFamily={theme.fontFamilyText}
                                textColor={theme.secondaryTextColor}
                                textFocusColor={
                                    theme.satisfactionTextColors[
                                        ((theme.satisfactionTextColors.length - 1) / (sizeMode - 1)) * key
                                    ]
                                }
                                borderColor={theme.satisfactionBorderColor}
                                borderFocusColor={
                                    theme.satisfactionColors[
                                        ((theme.satisfactionTextColors.length - 1) / (sizeMode - 1)) * key
                                    ]
                                }
                                focus={focus[key]}
                            >
                                {names[key]}
                            </SatisfactionButton>
                        </motion.div>
                    </motion.div>
                ))}
            </WrapperSatisfaction>
        </div>
    );
};

export default SatisfactionChoice;
