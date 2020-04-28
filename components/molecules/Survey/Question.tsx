import React, { FC, useState } from "react";
import { LastQuestionOfSurveyQuery } from "../../../data/collecta";
import { styled } from "linaria/react";
import Skeleton from "react-loading-skeleton";
import { CircleProgressBar } from "../CircleProgressBar";
import OptionsInput from "./Inputs/Options";

const Top = styled.div`
    position: fixed;
    width: 100%;
    top: 2rem;
    display: flex;
    justify-content: flex-start;
    left: 2rem;
    right: 2rem;
    @media only screen and (max-width: 680px) {
        left: 0;
        justify-content: center;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    /* height: 100%; */
    margin-top: calc(2rem + 6rem + 1rem);
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-flow: column;
    max-width: 35rem;
`;

const Title = styled.h1`
    font-family: "Lora", serif;
    font-size: 2.4rem;
    font-weight: 400;
    margin: 0;
    margin-bottom: 0.6rem;
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
`;

interface QuestionViewProps {
    question: LastQuestionOfSurveyQuery | undefined;
    answers: string[];
    onAnswerChange: (answers: string[]) => void;
}

const QuestionView: FC<QuestionViewProps> = (props) => {
    let options = new Map<string, string>();
    if (props.question) {
        for (let k in props.question.lastQuestionOfSurvey.lastQuestion.input.options) {
            options.set(k, props.question.lastQuestionOfSurvey.lastQuestion.input.options[k]);
        }
    }

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
            <Wrapper>
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
                            <OptionsInput
                                options={options}
                                multiple={props.question.lastQuestionOfSurvey.lastQuestion.input.multiple}
                                answers={props.answers}
                                onChangeAnswers={props.onAnswerChange}
                            />
                        ) : (
                            <Skeleton height="20px" width="100%" count={3} />
                        )}
                    </Input>
                </Content>
            </Wrapper>
        </>
    );
};

export { QuestionView };
