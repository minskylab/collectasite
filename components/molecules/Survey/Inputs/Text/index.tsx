import React, { FC } from "react";
import { styled } from "linaria/react";

const InputContainer = styled.div`
    width: 100%;
`;

const Input = styled.input`
    padding: 0.8rem 1.2rem;
    border: none;
    :focus {
        outline: none;
    }
    font-family: "Montserrat";
    color: #023046;
    font-size: 1rem;
    border-radius: 4px;
    background-color: #f8f9fa;
    width: -webkit-fill-available;
`;

const Label = styled.label`
    font-size: 0.75rem;
    font-family: "Montserrat";
    color: #356076;
`;

interface TextInputProps {
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswers?: (answers: string[]) => void;
}

const TextInput: FC<TextInputProps> = (props) => {
    let value = undefined;
    if (props.answers) {
        if (props.answers.length > 0) {
            value = props.answers[0];
        }
    }

    return (
        <InputContainer>
            <Label>Tu respuesta</Label>
            <Input
                value={value}
                placeholder={"Escribe tu respuesta aquí"}
                onChange={(e) => props.onChangeAnswers && props.onChangeAnswers([e.target.value])}
            ></Input>
        </InputContainer>
    );
};

export default TextInput;
