import React, { useState, useEffect, ReactElement } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";

export type InputMode = "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";

export type InputType =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

const inputStyle = css`
    background-color: var(--main-color);
    font-size: 0.93rem;
    /* border-radius: 8px; */
    border: none;
    padding-top: 0.75rem;
    padding-bottom: 0.7rem;
    padding-left: 4px;
    padding-right: 4px;
    font-family: var(--font-family);
    color: var(--text-color);
    transition: 0.3s;
    text-align: var(--text-align);
    ::placeholder {
        color: var(--placeholder-color);
    }
    :focus {
        outline: none;
        background-color: var(--focus-color);
        ::placeholder {
            color: var(--placeholder-focus-color);
        }
    }
`;

interface LabelProps {
    focus?: boolean;
    fontFamily?: string;
}

const Label = styled.label<LabelProps>`
    font-size: 0.75rem;
    transition: 0.3s;
    //@ts-ignore
    font-family: ${(props) => props.fontFamily || ""};
    //@ts-ignore
    color: ${(props) => (props.focus ? "#3D3D3D" : "#939393")};
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
`;

interface InputWrapperProps {
    borderBottomColor?: string;
    borderBottomFocusColor?: string;
    focus?: boolean;
}

const InputWrapper = styled.div<InputWrapperProps>`
    display: flex;
    flex-flow: column;
    font-family: "Karla", sans-serif;
    margin: 0.2rem 0;
    border-bottom: 1px;
    //@ts-ignore
    border-bottom-color: ${(props) =>
        props.focus ? props.borderBottomFocusColor || "" : props.borderBottomColor || ""};
    border-bottom-style: solid;
    transition: 0.3s;
    /* height: calc(3rem + 2rem + 0.5rem); */
`;

const ErrorMessage = styled.div`
    font-size: 0.75rem;
    transition: 0.3s;
    color: #ff6445;
    margin-bottom: 0.1rem;
`;

const HelpMessage = styled.div`
    font-size: 0.75rem;
    transition: 0.3s;
    color: #8f8f8f;
    margin-bottom: 0.1rem;
`;

export interface InputProps {
    value?: string | number | string[];
    onChange?: React.ChangeEventHandler;
    onFocusChange?: (focus: boolean) => void;
    type?: InputType;
    name?: string;
    inputMode?: InputMode;
    placeholder?: string;
    label?: string;
    textAlign?: string;
    helperText?: string;
    errorMessage?: string;

    prefix?: string;
    suffix?: string;

    forwardedRef?: any;
    defaultValue?: string | number | string[];
}

function BaseInput(props: InputProps): ReactElement {
    const [focus, setFocus] = useState<boolean>(false);
    const theme = useTheme();

    useEffect(() => {
        props.onFocusChange && props.onFocusChange(focus);
    }, [focus]);

    return (
        <InputWrapper
            focus={focus}
            borderBottomColor={theme.inputBorderBottomColor}
            borderBottomFocusColor={theme.inputBorderBottomFocusColor}
        >
            {props.label ? (
                <Label focus={focus} fontFamily={theme.fontFamilyText}>
                    {props.label}
                </Label>
            ) : null}
            <input
                ref={props.forwardedRef}
                className={inputStyle}
                defaultValue={props.defaultValue}
                type={props.type as string}
                name={props.name}
                inputMode={props.inputMode}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={{
                    //@ts-ignore
                    "--main-color": theme.inputColor,
                    "--font-family": theme.fontFamilyText,
                    "--text-color": theme.textColor,
                    "--focus-color": theme.inputFocusColor,
                    "--placeholder-color": theme.inputPlaceholderColor,
                    "--placeholder-focus-color": theme.inputPlaceholderFocusColor,
                    "--text-align": props.textAlign || "left",
                }}
            />
            {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            {!props.errorMessage && props.helperText && <HelpMessage>{props.helperText}</HelpMessage>}
        </InputWrapper>
    );
}

export default BaseInput;
