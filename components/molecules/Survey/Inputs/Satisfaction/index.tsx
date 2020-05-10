import React, { FC } from "react";
import SatisfactionElement, { SatisfactionOption } from "./Element";
import Faces, { SatisfactionIcon } from "./Faces";
import { Icon } from 'components';
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
    position: relative;
`;


let defaultColors: Map<number, string> = new Map<number, string>();
defaultColors.set(-1, "#ff7a84");
defaultColors.set(-0.5, "#ff9c85");
defaultColors.set(0, "#ffd7a1");
defaultColors.set(0.5, "#b8f7a1");
defaultColors.set(1, "#89eeae");

const defaultOptions: SatisfactionOption[] = [
    { value: -1, text: "NADA", color: "#ff7a84" },
    { value: -0.5, text: "POCO", color: "#ff9c85" },
    { value: 0, text: "REGULAR", color: "#ffd7a1" },
    { value: 0.5, text: "SUFICIENTE", color: "#b8f7a1" },
    { value: 1, text: "BASTANTE", color: "#89eeae" },
];

const defaultFaces: SatisfactionIcon[] = [
    { value: -1, face: <Icon name='satisfaction-1-filled' color='#ff7a84' size={80} /> },
    { value: -0.5, face: <Icon name='satisfaction-2-filled' color={"#ff9c85"} size={80} /> },
    { value: 0, face: <Icon name='satisfaction-3-filled' color={"#ffd7a1"} size={80} /> },
    { value: 0.5, face: <Icon name='satisfaction-4-filled' color={"#b8f7a1"} size={80} /> },
    { value: 1.0, face: <Icon name='satisfaction-5-filled' color={"#89eeae"} size={80} /> },
];

interface SatisfactionInputProps {
    options?: Map<string, string>;
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswers?: (answers: string[]) => void;
}

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

    const onSatisfactionSelect = (satisfaction: number) => {
        props.onChangeAnswers && props.onChangeAnswers([satisfaction.toFixed(1)]);
    };

    const currentFace = parseFloat(props.answers?props.answers[0]:"0.0") || 0.0;

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
