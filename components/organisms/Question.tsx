import React, { FC, useState, useEffect } from "react";
import QuestionInput, { QuestionInputProps, QuestionType } from "./QuestionInput";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../general/theming";
import { Icon } from "../atoms/Icon";

const QuestionWrapper = styled.div`
    text-align: center;
    @media (max-width: 400px) {
        text-align: left;
    }
`;

const TextWrapper = styled.div`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    max-width: 25rem;
    margin: 0 auto;
    @media (max-width: 400px) {
        padding-left: 1.7rem;
        padding-right: 1.7rem;
        max-width: 100%;
    }
`;

const title = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 0.8rem;
    text-align: center;
    text-transform: uppercase;
    @media (max-width: 400px) {
        text-align: center;
        width: 100%;
    }
`;

const description = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 1.56rem;
    text-align: center;
    @media (max-width: 400px) {
        text-align: left;
        width: 100%;
    }
`;

const anonymous = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 0.8rem;
    text-align: center;
    @media (max-width: 400px) {
        text-align: left;
        width: 100%;
    }
`;

interface Answer {
    id: string;
    question: QuestionInputProps;
    at: string;
    by: string;
    responses: string[];
}

export interface Input {
    kind: QuestionType;
    multiple?: boolean;
    options?: any;
    defaults: string[];
}

export interface QuestionInterface {
    id: string | number;
    title: string;
    description: string;
    anonymous: boolean;
    input: Input;
}

export interface QuestionProps {
    title: string;
    description: string;
    anonymous: boolean;
    input?: Input;
    answer: (answer: any) => void;
    isComplete?: (complete: boolean) => void;
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
    const theme = useTheme();
    let options;

    // TODO: Revisar si se incluyeron los defaults en cada caso que es un array []
    if (props.input) {
        if (props.input.kind === QuestionType.OPTIONS) {
            const keys = Object.keys(props.input.options);
            options = keys.map((key) => ({
                key: key,
                text: props.input ? props.input.options[key] : "",
                value: key,
                checked: false,
            }));
        } else if (props.input.kind === QuestionType.SATISFACTION) {
            options = props.input.defaults.length === 0 ? 0 : props.input.defaults[0];
        } else if (props.input.kind === QuestionType.TEXT) {
            options = props.input.defaults.length === 0 ? "" : props.input.defaults[0];
        } else if (props.input.kind === QuestionType.YESNO) {
            options = props.input.defaults.length === 0 ? -1 : props.input.defaults[0] === "true" ? 1 : 0;
        } else {
            options = props.input.defaults.length === 0 ? "" : props.input.defaults[0];
        }
    }
    const [value, setValue] = useState<any>(props.input ? options : null);

    // console.log("value: ", value, value >= -1 && value <= 1 ? true : false);
    useEffect(() => {
        if (props.input) {
            if (props.input.kind === QuestionType.OPTIONS) {
                const filteredArray = value.filter((v: any) => {
                    return v.checked === true;
                });
                const keys = filteredArray.map((v: any) => v.key);
                props.answer(keys);
                if (props.isComplete) {
                    props.isComplete(!!keys.length);
                }
            } else if (props.input.kind === QuestionType.SATISFACTION) {
                if (props.isComplete) {
                    props.isComplete(value >= -1 && value <= 1 ? true : false);
                }
                props.answer([String(value)]);
            } else if (props.input.kind === QuestionType.TEXT) {
                if (props.isComplete) {
                    props.isComplete(!!value);
                }
                props.answer([value]);
            } else if (props.input.kind === QuestionType.YESNO) {
                const _isComplete = value !== -1 ? true : false;
                const _value = value === -1 ? [] : value === 1 ? ["true"] : ["false"];
                if (props.isComplete) {
                    props.isComplete(_isComplete);
                }
                props.answer(_value);
            } else {
                if (props.isComplete) {
                    props.isComplete(!!value);
                }
                props.answer([value]);
            }
        }
    }, []);

    return (
        <QuestionWrapper>
            <TextWrapper>
                <div
                    className={title}
                    style={{
                        //@ts-ignore
                        "--font-family": theme.fontFamilyText,
                        "--color-text": theme.secondaryTextColor,
                        paddingBottom: "1.5rem",
                    }}
                >
                    {props.title || ""}
                </div>
                <div
                    className={description}
                    style={{
                        //@ts-ignore
                        "--font-family": theme.fontFamilyText,
                        "--color-text": theme.textColor,
                    }}
                >
                    {props.description || ""}
                </div>
                {props.input && props.anonymous ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingTop: "1rem",
                        }}
                    >
                        <Icon name="alert-filled" color={theme.primaryColor} size={20} />
                        <div
                            className={anonymous}
                            style={{
                                //@ts-ignore
                                "--font-family": theme.fontFamilyText,
                                "--color-text": theme.primaryColor,
                                paddingLeft: "0.5rem",
                            }}
                        >
                            {props.anonymous ? "La respuesta a esta pregunta será almacenada como anónima." : null}
                        </div>
                    </div>
                ) : null}
            </TextWrapper>
            <div style={{ paddingTop: "2rem" }}>
                {props.input ? (
                    <QuestionInput
                        value={value}
                        onChangeValue={(newValue) => {
                            setValue(newValue);
                            if (props.input) {
                                if (props.input.kind === QuestionType.OPTIONS) {
                                    const filteredArray = newValue.filter((v: any) => {
                                        return v.checked === true;
                                    });
                                    const keys = filteredArray.map((v: any) => v.key);
                                    props.answer(keys);
                                    if (props.isComplete) {
                                        props.isComplete(!!keys.length);
                                    }
                                } else if (props.input.kind === QuestionType.YESNO) {
                                    const _isComplete = newValue !== -1 ? true : false;
                                    const _newValue = newValue === -1 ? [] : newValue === 1 ? ["true"] : ["false"];
                                    if (props.isComplete) {
                                        props.isComplete(_isComplete);
                                    }
                                    props.answer(_newValue);
                                } else if (props.input.kind === QuestionType.TEXT) {
                                    const _isComplete = !!newValue;
                                    const _newValue = [newValue];
                                    if (props.isComplete) {
                                        props.isComplete(_isComplete);
                                    }
                                    props.answer(_newValue);
                                } else if (props.input.kind === QuestionType.SATISFACTION) {
                                    const _isComplete = newValue >= -1 && newValue <= 1 ? true : false;
                                    const _newValue = [String(newValue)];
                                    if (props.isComplete) {
                                        props.isComplete(_isComplete);
                                    }
                                    props.answer(_newValue);
                                } else {
                                    props.answer(newValue);
                                }
                            }
                        }}
                        type={props.input.kind}
                        multiple={props.input.multiple}
                    />
                ) : null}
            </div>
        </QuestionWrapper>
    );
};

export default Question;
