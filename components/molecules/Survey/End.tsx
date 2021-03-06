import React, { FC } from "react";
import { styled } from "linaria/react";
import { SurveyQuery } from "../../../data/collecta";
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
    font-size: 1rem;
    font-weight: 400;
    color: #1a455a;
`;

interface EndSurveyProps {
    survey: SurveyQuery | undefined;
}

const EndSurvey: FC<EndSurveyProps> = ({ survey }: EndSurveyProps) => {
    const dueDate = dayjs(survey?.survey.dueDate);
    const expiredIn = dayjs().to(dueDate);
    const day = dueDate.format("DD");
    const month = dueDate.format("MMMM");

    return (
        <Wrapper>
            <Content>
                <Due>
                    {survey ? `Vence ${expiredIn}, el ${day} de ${month}.` : <Skeleton height="20px" width="200px" />}
                </Due>
                <Title>{survey ? survey.survey.title : <Skeleton height="20px" width="280px" />}</Title>
                <Description>
                    {survey ? (
                        <div dangerouslySetInnerHTML={{ __html: survey?.survey.description || "" }} />
                    ) : (
                        <Skeleton height="20px" width="100%" count={3} />
                    )}
                </Description>
            </Content>

            {/* <div>
                <div></div>
            </div> */}
        </Wrapper>
    );
};

export { EndSurvey };
