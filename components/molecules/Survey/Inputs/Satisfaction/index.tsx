import React, { FC, useEffect, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import SatisfactionElement, { SatisfactionOption } from "./Element";

interface SatisfactionInputProps {
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswers?: (answers: string[]) => void;
}

const defaultOptions: SatisfactionOption[] = [
    { value: -1, text: "NADA", color: "#ff7a84" },
    { value: -0.5, text: "POCO", color: "#ff9c85" },
    { value: 0, text: "REGULAR", color: "#ffd7a1" },
    { value: 0.5, text: "SUFICIENTE", color: "#b8f7a1" },
    { value: 1, text: "BASTANTE", color: "#89eeae" },
];

const SatisfactionInput: FC<SatisfactionInputProps> = (props) => {
    const [answer, setAnswer] = useState<string[]>(props.answers || []);

    useEffect(() => {
        console.log(answer);
    }, [answer]);

    const onSatisfactionSelect = (satisfaction: number) => {
        setAnswer([satisfaction.toFixed(1)]);
    };
    return (
        <div>
            <div>{`ANSWER: ${answer[0] || "nodata"}`}</div>
            <SatisfactionElement options={defaultOptions} onChangeValue={onSatisfactionSelect} dynamicRatio={0.6} />
        </div>
    );
};

export default SatisfactionInput;
