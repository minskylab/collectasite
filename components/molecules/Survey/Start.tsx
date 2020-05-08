import React, { FC } from "react";
import {FisrtScreenSurveyQuery, Survey, SurveyQuery} from "../../../data/collecta";
import { styled } from "linaria/react";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-flow: column;
    max-width: 35rem;
`;

const Due = styled.p`
    font-family: "Lora", serif;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0;
    color: #30586b;
`;

const Title = styled.h1`
    font-family: "Lora", serif;
    font-size: 2.4rem;
    font-weight: 400;
    color: #023046;
`;

const Description = styled.h3`
    font-family: "Montserrat", sans-serif;
    line-height: 150%;
    font-size: 1rem;
    font-weight: 400;
    color: #1a455a;
`;

const ToCompleteMessage = styled.div`
    font-family: "Montserrat", sans-serif;
    line-height: 150%;
    font-size: 1rem;
    font-weight: 400;
    color: #4259ee;
`;

interface StartSurveyProps {
    data: FisrtScreenSurveyQuery | undefined;
}

const StartSurvey: FC<StartSurveyProps> = (props) => {
    const dueDate = dayjs(props.data?.survey.dueDate);
    const expiredIn = dayjs().to(dueDate);
    const day = dueDate.format("DD");
    const month = dueDate.format("MMMM");

    const percent = (props.data?.surveyPercent as number);
    const surveyIsExpired = dueDate.isBefore(new Date());
    const surveyIsDone = percent == 1 || props.data?.survey.done; // TODO: Use that to splash a "completed survey" message
    const surveyIsInProgress = percent < 1;

    let dueMessage: string;
    let titleMessage: string;
    let descriptionMessage = "";

    if (surveyIsExpired) {
        dueMessage =`Vencio el ${day} de ${month}.`;
        titleMessage = "Encuesta no vigente";
    } else {
        dueMessage =`Vence ${expiredIn}, el ${day} de ${month}.`;
        titleMessage = props.data?.survey.title || "";
        descriptionMessage = props.data?.survey.description || "";
    }

    return (
        <Wrapper>
            <Content>
                <Due>
                    {props.data ? dueMessage : (<Skeleton height="20px" width="200px" />)}
                </Due>
                <Title>{props.data ? titleMessage : <Skeleton height="40px" width="320px" />}</Title>
                <Description>
                    {props.data ? (
                        <div dangerouslySetInnerHTML={{ __html: descriptionMessage }} />
                    ) : (
                        <Skeleton height="20px" width="100%" count={3} />
                    )}
                </Description>
                {surveyIsInProgress && !surveyIsExpired?<ToCompleteMessage>
                    Su encuesta esta completada al <b>{`${(percent*100).toFixed(0)}%`}</b>.<br/>
                    Puede continuarla donde la dejo la última vez.
                </ToCompleteMessage>:<></>}
            </Content>
        </Wrapper>
    );
};

export default StartSurvey;
