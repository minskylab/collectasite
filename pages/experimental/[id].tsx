import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSurveyQuery, Survey, useLastQuestionOfSurveyQuery, useAnswerQuestionMutation } from "../../data/collecta";

// import SurveyTemplate from "../../components/templates/SurveyTemplate/template";
import { SurveyTemplate } from "components";

const SurveyPage: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isBegin, setIsBegin] = useState<boolean>(true);
    const [surveyID, setSurveyID] = useState<string>("");

    const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
    const router = useRouter();

    const [{ data: survey, fetching: fetchingSurvey }, getSurvey] = useSurveyQuery({
        variables: { id: surveyID },
        pause: true,
    });

    const [{ data: lastQuestion, fetching: fetchingQuestion }, getLastQuestion] = useLastQuestionOfSurveyQuery({
        variables: { surveyID },
        pause: true,
    });

    const [{ fetching: executingMutation }, answerQuestion] = useAnswerQuestionMutation();

    const anyLoading: boolean = loading || fetchingQuestion || fetchingSurvey || executingMutation;

    useEffect(() => {
        if (typeof router.query.id === "string") {
            // console.log(router.query.id);
            setSurveyID(router.query.id);
        }
    }, [router]);

    useEffect(() => {
        if (surveyID != "") {
            // Is valid surveyID
            getSurvey({});
        }
    }, [surveyID]);

    useEffect(() => {
        if (!fetchingSurvey) {
            setLoading(false);
            // console.log(survey?.survey);
            if (survey) {
                if (survey.survey.flow.initialState === survey.survey.flow.state) {
                    setIsBegin(true);
                }
            }
        }
    }, [survey]);

    useEffect(() => {
        if (lastQuestion && !fetchingQuestion) {
            setIsBegin(false);
        }
    }, [lastQuestion]);

    const onStart = () => {
        getLastQuestion({});
    };

    const onNext = () => {
        if (!lastQuestion) {
            console.log("invalid last question");
            return;
        }
        if (currentAnswers.length === 0) {
            console.log("no answer");
            return;
        }

        const answers = [...currentAnswers];
        answerQuestion({
            questionID: lastQuestion.lastQuestionOfSurvey.lastQuestion.id,
            answer: answers,
        });

        setCurrentAnswers([]);
    };

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <SurveyTemplate
                answers={currentAnswers}
                onAnswersChange={(ans) => setCurrentAnswers(ans)}
                begin={isBegin}
                onStart={onStart}
                onNext={onNext}
                survey={survey}
                currentQuestion={lastQuestion}
                disabled={anyLoading}
            />
        </div>
    );
};

export default SurveyPage;
