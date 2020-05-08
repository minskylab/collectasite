import React, { FC } from "react";
import { YesNoButton } from "../../../../atoms/Button";
import { styled } from "linaria/react";
import { stringify } from "querystring";

const WrapperYesNoButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const ContainerOption = styled.div`
    padding: 0;
`;

export enum YesNoValue {
    Yes = 1,
    No = 0,
    Undefined = -1,
}

interface BooleanInputsProps {
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswers?: (answers: string[]) => void;
}

const yesStr = "yes";
const noStr = "no";

const BooleanInput: FC<BooleanInputsProps> = (props: BooleanInputsProps) => {
    let ans = "";

    if (props.answers) {
        if (props.answers.length > 0) {
            ans = props.answers[0];
        }
    }

    const callback = (optKind: string) => {
        props.onChangeAnswers && props.onChangeAnswers([optKind]);
    };

    return (
        <WrapperYesNoButtons>
            <ContainerOption key={1} style={{ paddingLeft: "0rem" }}>
                <YesNoButton selected={ans === yesStr} onClick={() => callback(yesStr)}>
                    Si
                </YesNoButton>
            </ContainerOption>
            <ContainerOption key={2} style={{ paddingLeft: "1rem" }}>
                <YesNoButton selected={ans === noStr} onClick={() => callback(noStr)}>
                    No
                </YesNoButton>
            </ContainerOption>
        </WrapperYesNoButtons>
    );
};

export default BooleanInput;
