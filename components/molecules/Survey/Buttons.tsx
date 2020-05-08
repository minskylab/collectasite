import React, { FC } from "react";
import { BaseButton } from "../../atoms/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../../atoms/Icon";
import { useTheme } from "../../../general/theming";

interface BackButtonProps {
    onBackClick?: () => void;
    disabled?: boolean;
    experimental?: boolean;
}
const BackButton: FC<BackButtonProps> = (props: BackButtonProps) => {
    return (
        <BaseButton
            iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
            iconPosition={"left"}
            text={"Anterior"}
            colorText={"#B1B1B1"}
            backgroundColor={"transparent"}
            onClick={props.onBackClick}
            fontFamily={props.experimental ? "Montserrat" : undefined}
        />
    );
};

interface NextButtonProps {
    onNextClick?: () => void;
    disabled?: boolean;
    text: string;
    experimental?: boolean;
}
const NextButton: FC<NextButtonProps> = (props: NextButtonProps) => {
    const theme = useTheme();
    return (
        <BaseButton
            iconElement={<ArrowRightIcon color={props.disabled ? theme.textColor : "#ffffff95"} size={20} />}
            text={props.text}
            onClick={props.onNextClick}
            disabled={props.disabled}
            fontFamily={props.experimental ? "Montserrat" : undefined}
        />
    );
};

interface StartButtonProps {
    onStartClick?: () => void;
    disabled?: boolean;
    experimental?: boolean;
    text?: string;
}
const StartButton: FC<StartButtonProps> = (props: StartButtonProps) => {
    return (
        <BaseButton
            iconElement={<ArrowRightIcon color={"#ffffff95"} size={20} />}
            text={props.text || "INICIAR"}
            onClick={props.onStartClick}
            disabled={props.disabled}
            fontFamily={props.experimental ? "Montserrat" : undefined}
        />
    );
};

export { NextButton, BackButton, StartButton };
