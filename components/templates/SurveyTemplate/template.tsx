import React, { FC, useState, useEffect } from "react";
import {
    QuestionQuery,
    SurveyQuery,
    useLastQuestionOfSurveyQuery,
    LastQuestionOfSurveyQuery,
} from "../../../data/collecta";
import { StartSurvey } from "../../molecules/Survey/Start";
import { styled } from "linaria/react";
import { NextButton, BackButton, StartButton } from "../../molecules/Survey/Buttons";
import { QuestionView } from "../../molecules/Survey/Question";

const Screen = styled.div`
    width: 100%;
    height: 100vh;
`;

const CurrentView = styled.div`
    width: 100%;
    height: 100%;

    @media only screen and (max-width: 680px) {
        width: 80%;
        margin-left: 10%;
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    position: fixed;
    width: 100%;
    bottom: 2rem;
`;

const BackButtonContainer = styled.div`
    margin-right: 1rem;
`;

const NextButtonContainer = styled.div`
    margin-right: 3rem;
`;

interface SurveyTemplateProps {
    begin: boolean;
    survey: SurveyQuery | undefined;
    currentQuestion: LastQuestionOfSurveyQuery | undefined;
    answers: string[];
    onAnswersChange: (answers: string[]) => void;
    onStart?: () => void;
    onNext?: () => void;
    onBack?: () => void;
}

const SurveyTemplate: FC<SurveyTemplateProps> = (props) => {
    return (
        <Screen>
            <CurrentView>
                {props.begin && <StartSurvey survey={props.survey} />}
                {!props.begin && (
                    <QuestionView
                        question={props.currentQuestion}
                        answers={props.answers}
                        onAnswerChange={props.onAnswersChange}
                    />
                )}
            </CurrentView>
            <ButtonsWrapper>
                {props.begin ? (
                    <NextButtonContainer>
                        <StartButton onStartClick={props.onStart} />
                    </NextButtonContainer>
                ) : (
                    <>
                        {props.currentQuestion?.lastQuestionOfSurvey.lastQuestion.flow.state ===
                        props.survey?.survey.flow.initialState ? null : (
                            <BackButtonContainer>
                                <BackButton onBackClick={props.onBack} experimental />
                            </BackButtonContainer>
                        )}
                        <NextButtonContainer>
                            <NextButton onNextClick={props.onNext} isFinalQuestion={false} experimental />
                        </NextButtonContainer>
                    </>
                )}
            </ButtonsWrapper>
        </Screen>
    );
};

export default SurveyTemplate;
