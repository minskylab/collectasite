import React, {FC} from "react";
import {LastQuestionOfSurveyQuery, FisrtScreenSurveyQuery} from "data/collecta";
import {styled} from "linaria/react";
import {QuestionView, NextButton, BackButton, StartButton, StartSurvey} from "components/molecules";
import dayjs from "dayjs";

const Screen = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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
    firstScreen: FisrtScreenSurveyQuery | undefined;
    currentQuestion: LastQuestionOfSurveyQuery | undefined;
    answers: string[];
    onAnswersChange: (answers: string[]) => void;
    onStart?: () => void;
    onNext?: () => void;
    onBack?: () => void;
    disabled?: boolean;
}

const SurveyTemplate: FC<SurveyTemplateProps> = (props) => {
    const isFirstQuestion = props.currentQuestion?.lastQuestionOfSurvey.lastQuestion.flow.state ===
        props.firstScreen?.survey.flow.initialState;

    const percent = (props.firstScreen?.surveyPercent as number);
    const dueDate = dayjs(props.firstScreen?.survey.dueDate);
    const surveyIsAvailable = percent == 1 || props.firstScreen?.survey.done || dueDate.isBefore(new Date());
    const surveyIsInProgress = percent < 1;

    let nextButtonText = "COMENZAR";

    if (surveyIsInProgress) {
        nextButtonText = "CONTINUAR"
    }

    return (
        <Screen>
            <CurrentView>
                {props.begin && <StartSurvey data={props.firstScreen}/>}
                {!props.begin && (
                    <QuestionView
                        question={props.currentQuestion}
                        answers={props.answers}
                        onChangeAnswer={props.onAnswersChange}
                    />
                )}
            </CurrentView>
            <ButtonsWrapper>
                {!isFirstQuestion && surveyIsAvailable ? <BackButtonContainer>
                    <BackButton onBackClick={props.onBack} experimental disabled={props.disabled}/>
                </BackButtonContainer> : null}
                <NextButtonContainer>
                    {!surveyIsAvailable?
                        props.begin?
                            <StartButton onStartClick={props.onStart} disabled={props.disabled}/>
                            : <NextButton
                                onNextClick={props.onNext}
                                text={nextButtonText}
                                experimental
                                disabled={props.disabled}
                            /> : null}
                </NextButtonContainer>

            </ButtonsWrapper>
        </Screen>
    );
};

export default SurveyTemplate;
