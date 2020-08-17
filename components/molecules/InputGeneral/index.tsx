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
    onChange?: (input: string) => void;
    labelText?: string;
    placeholderText?: string;
}

const InputGeneral: FC<TextInputProps> = (props: TextInputProps) => {
    const value = undefined;

    return (
        <InputContainer>
            <Label>{props.labelText}</Label>
            <Input
                value={value}
                placeholder={props.placeholderText}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
            ></Input>
        </InputContainer>
    );
};

export default InputGeneral;
