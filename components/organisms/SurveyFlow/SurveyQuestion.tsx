import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import { motion } from "framer-motion";
import { CircleProgressBar } from "../../molecules/CircleProgressBar";
import Question, { Input } from "../Question";

const CircleProgressWrapper = styled.div`
	position: fixed;
	top: 2rem;
	left: 2rem;
	@media (max-width: 400px) {
		position: relative;
		top: 0;
		left: 0;
		padding-bottom: 2em;
	}
`;

const QuestionTopWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	@media (max-width: 400px) {
		min-height: 80vh;
		justify-content: flex-start;
	}
`;

export interface SurveyQuestionProps {
  id?: string;
  percentage: number;
  title: string;
  description: string;
  anonymous: boolean;
  input: Input;
  answer?: (answer: any) => void;
  isComplete?: (complete: boolean) => void;
}

const SurveyQuestion: FC<SurveyQuestionProps> = (props: SurveyQuestionProps) => {

  return (
    <QuestionTopWrapper>
      <div style={{ height: 50 }} />
      <CircleProgressWrapper>
        <CircleProgressBar
          strokeWidth={2}
          percentage={props.percentage}
          speed={3}
          size={90}
        />
      </CircleProgressWrapper>
      <motion.div
        key={props.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.05, stiffness: 8, duration: 0.4 }}
      >
        <Question
          title={props.title}
          description={props.description}
          anonymous={props.anonymous}
          input={props.input}
          answer={s => {
            if (props.answer) {
              props.answer(s);
            }
          }}
          isComplete={c => {
            if (props.isComplete) {
              props.isComplete(c);
            }
          }}
        />
      </motion.div>
    </QuestionTopWrapper>
  );
};

export default SurveyQuestion;