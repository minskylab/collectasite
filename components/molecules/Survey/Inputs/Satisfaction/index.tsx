import React, { FC, useEffect, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import SatisfactionElement, { SatisfactionOption } from "./Element";
import Faces, { SatisfactionIcon } from "./Faces";
import {
    Satisfaction1FilledIcon,
    Satisfaction2FilledIcon,
    Satisfaction3FilledIcon,
    Satisfaction4FilledIcon,
    Satisfaction5FilledIcon,
} from "../../../../atoms/Icon";
import { styled } from "linaria/react";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    /* justify-content: center; */
    align-items: center;
`;

const WrapperFace = styled.div`
    padding-bottom: 2rem;
    height: 5rem;
    width: 5rem;
    position: "relative";
`;

const lerpColor = (color1: string, color2: string, amount: number) => {
    var ah = +color1.replace("#", "0x"),
        ar = ah >> 16,
        ag = (ah >> 8) & 0xff,
        ab = ah & 0xff,
        bh = +color2.replace("#", "0x"),
        br = bh >> 16,
        bg = (bh >> 8) & 0xff,
        bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
};

interface SatisfactionInputProps {
    options?: Map<string, string>;
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

const defaultFaces: SatisfactionIcon[] = [
    { value: -1, face: <Satisfaction1FilledIcon color={"#ff7a84"} size={80} /> },
    { value: -0.5, face: <Satisfaction2FilledIcon color={"#ff9c85"} size={80} /> },
    { value: 0, face: <Satisfaction3FilledIcon color={"#ffd7a1"} size={80} /> },
    { value: 0.5, face: <Satisfaction4FilledIcon color={"#b8f7a1"} size={80} /> },
    { value: 1.0, face: <Satisfaction5FilledIcon color={"#89eeae"} size={80} /> },
];

let defaultColors: Map<number, string> = new Map<number, string>();
defaultColors.set(-1, "#ff7a84");
defaultColors.set(-0.5, "#ff9c85");
defaultColors.set(0, "#ffd7a1");
defaultColors.set(0.5, "#b8f7a1");
defaultColors.set(1, "#89eeae");

const SatisfactionInput: FC<SatisfactionInputProps> = (props) => {
    let satisfactionOptions: SatisfactionOption[] = defaultOptions;
    let options: string[] = [];

    if (props.options) {
        props.options.forEach((_, optKey, __) => {
            options.push(optKey);
        });
        const translated: SatisfactionOption[] = [];
        options.map((val: string) => {
            const v = parseFloat(val);
            translated.push({
                value: v,
                text: props.options?.get(val) || "OK",
                color: defaultColors.get(v),
            });
        });
        satisfactionOptions = [...translated];
    }

    const [answer, setAnswer] = useState<string[]>(props.answers || []);

    useEffect(() => {
        console.log(answer);
    }, [answer]);

    const onSatisfactionSelect = (satisfaction: number) => {
        setAnswer([satisfaction.toFixed(1)]);
    };

    const currentFace = parseFloat(answer[0]) || 0.0;
    console.log(currentFace);

    return (
        <Container>
            <WrapperFace>
                <Faces faces={defaultFaces} currentFace={currentFace} />
            </WrapperFace>
            <SatisfactionElement
                options={satisfactionOptions}
                onChangeValue={onSatisfactionSelect}
                dynamicRatio={0.6}
            />
        </Container>
    );
};

export default SatisfactionInput;
