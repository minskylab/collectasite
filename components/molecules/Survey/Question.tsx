import React, { FC, useState } from "react";
import { LastQuestionOfSurveyQuery } from "data/collecta";
import { styled } from "linaria/react";
import Skeleton from "react-loading-skeleton";
import { CircleProgressBar } from "../CircleProgressBar";
import GenericInput from "./Inputs";

const Top = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    left: 2rem;
    right: 2rem;
    background-color: white;
    @media only screen and (max-width: 680px) {
        left: 0;
        justify-content: center;
    }
`;

const InputContainer = styled.div`
    width: 100%;
    /* height: 100%; */
    margin-top: calc(2rem + 6rem + 1rem);
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    max-width: 35rem;
    align-items: center;
`;

const Title = styled.h1`
    font-family: "Lora", serif;
    font-size: 2.4rem;
    font-weight: 400;
    margin: 0 0 0.6rem;
    color: #023046;
`;

const Description = styled.div`
    font-family: "Montserrat", sans-serif;
    line-height: 150%;
    font-size: 1rem;
    font-weight: 400;
    color: #1a455a;
`;

const Input = styled.div`
    margin-top: 4rem;
    width: 80%;
    @media only screen and (max-width: 680px) {
        width: 100%;
    }
`;

interface QuestionViewProps {
    question: LastQuestionOfSurveyQuery | undefined;
    answers: string[];
    onChangeAnswer: (answers: string[]) => void;
}

const QuestionView: FC<QuestionViewProps> = (props) => {
    let options = new Map<string, string>();

    for (let k in props.question?.lastQuestionOfSurvey.lastQuestion.input.options) {
        options.set(k || "", props.question?.lastQuestionOfSurvey.lastQuestion.input.options[k || ""]);
    }

    const inputKind = props.question?.lastQuestionOfSurvey.lastQuestion.input.kind;
    const multiple = props.question?.lastQuestionOfSurvey.lastQuestion.input.multiple;

    return (
        <>
            <Top>
                <CircleProgressBar
                    strokeWidth={2}
                    percentage={props.question?.lastQuestionOfSurvey.percent}
                    speed={3}
                    size={90}
                    fontFamily={"Lora"}
                />
            </Top>
            <InputContainer>
                <Content>
                    <Title>
                        {props.question ? (
                            props.question.lastQuestionOfSurvey.lastQuestion.title
                        ) : (
                            <Skeleton height="40px" width="320px" />
                        )}
                    </Title>
                    <Description>
                        {props.question ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: props.question.lastQuestionOfSurvey.lastQuestion.description,
                                }}
                            />
                        ) : (
                            <Skeleton height="20px" width="100%" count={3} />
                        )}
                    </Description>
                    <Input>
                        {props.question ? (
                            <GenericInput kind={inputKind || ""}
                                          options={options}
                                          multiple={multiple}
                                          answers={props.answers}
                                          onChangeAnswer={props.onChangeAnswer}
                            />
                        ) : (
                            <Skeleton height="20px" width="100%" count={3} />
                        )}
                    </Input>
                </Content>
            </InputContainer>
        </>
    );
};

export default QuestionView;
