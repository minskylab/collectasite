import React, { FC } from "react";
import OptionsInput from "./Options";
import TextInput from "./Text";
import BooleanInput from "./Boolean";
import SatisfactionInput from "./Satisfaction";

interface GenericInputProps {
    kind: string;
    options?: Map<string, string>;
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswer?: (answers: string[]) => void;
}

const GenericInput: FC<GenericInputProps> = (props) => {
    return (
        <>
            {props.kind?.toLowerCase() === "options" && (
                <OptionsInput
                    options={props.options || new Map<string, string>()}
                    multiple={props.multiple}
                    answers={props.answers}
                    onChangeAnswers={props.onChangeAnswer}
                />
            )}
            {props.kind?.toLowerCase() === "text" && (
                <TextInput multiple={props.multiple} answers={props.answers} onChangeAnswers={props.onChangeAnswer} />
            )}
            {props.kind?.toLowerCase() === "boolean" && (
                <BooleanInput
                    multiple={props.multiple}
                    answers={props.answers}
                    onChangeAnswers={props.onChangeAnswer}
                />
            )}
            {props.kind?.toLowerCase() === "satisfaction" && (
                <SatisfactionInput
                    options={props.options}
                    multiple={props.multiple}
                    answers={props.answers}
                    onChangeAnswers={props.onChangeAnswer}
                />
            )}
        </>
    );
};

export default GenericInput;
