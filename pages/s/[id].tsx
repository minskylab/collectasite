import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
    useFisrtScreenSurveyQuery,
    useLastQuestionOfSurveyQuery,
    useAnswerQuestionMutation,
    useBackwardSurveyMutation
} from "data/collecta";

import { SurveyTemplate } from "components";

const SurveyPage: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isBegin, setIsBegin] = useState<boolean>(true);
    const [surveyID, setSurveyID] = useState<string>("");

    const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
    const router = useRouter();

    const [{ data: firstScreen, fetching: fetchingSurvey }, getSurvey] = useFisrtScreenSurveyQuery({
        variables: { id: surveyID },
        pause: true,
    });

    const [{ data: lastQuestion, fetching: fetchingQuestion }, getLastQuestion] = useLastQuestionOfSurveyQuery({
        variables: { surveyID },
        pause: true,
    });

    const [{ fetching: executingAnswerMutation }, answerQuestion] = useAnswerQuestionMutation();

    const [{ fetching: executingBackwardMutation }, backwardQuestion] = useBackwardSurveyMutation();

    const anyLoading: boolean = loading || fetchingQuestion || fetchingSurvey || executingAnswerMutation || executingBackwardMutation;

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
            if (firstScreen) {
                if (firstScreen.survey.flow?.initialState === firstScreen.survey.flow?.state) {
                    setIsBegin(true);
                }
            }
        }
    }, [firstScreen]);

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
        // setLoading(true);
        const answers = [...currentAnswers];
        setCurrentAnswers([]); // TODO: Review this
        answerQuestion({
            questionID: lastQuestion.lastQuestionOfSurvey.lastQuestion.id,
            answer: answers,
        }).finally(() => {
            setLoading(false);
        });
    };

    const onBack = () => {
        console.log("back")
        // setLoading(true);
        backwardQuestion({
            surveyID: surveyID,
        }).finally(() => {
            setLoading(false);
        });
    }

    if (loading) {
        // return <div>Loading</div>;
        return <div />;
    }

    return (
        <SurveyTemplate
            answers={currentAnswers}
            onAnswersChange={(ans) => setCurrentAnswers(ans)}
            begin={isBegin}
            onStart={onStart}
            onBack={onBack}
            onNext={onNext}
            firstScreen={firstScreen}
            currentQuestion={lastQuestion}
            disabled={anyLoading}
        />
    );
};

export default SurveyPage;
