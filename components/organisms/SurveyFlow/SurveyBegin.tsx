import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { motion } from "framer-motion";
import { useTheme } from "../../../general/theming";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

const SurveyWrapper = styled.div`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    @media (max-width: 400px) {
        padding-left: 1.7rem;
        padding-right: 1.7rem;
    }
`;

const surveyDueDate = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 0.95rem;
    text-align: center;
    @media (max-width: 400px) {
        text-align: left;
        width: 100%;
    }
`;

const surveyTitle = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 1rem;
    text-align: center;
    @media (max-width: 400px) {
        text-align: left;
    }
`;

const SurveyDescriptionWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 400px) {
        justify-content: flex-start;
    }
`;

const surveyDescription = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 1.6rem;
    text-align: center;
    width: 25rem;
    max-width: 45%;
    min-width: 22rem;
    @media (max-width: 400px) {
        text-align: left;
        width: 100%;
        max-width: 100%;
        min-width: 18rem;
    }
`;

export interface SurveyBeginProps {
    id?: string;
    title: string;
    description: string;
    dueDate: string;
}

dayjs.extend(relativeTime);
dayjs.locale("es");

const SurveyBegin: FC<SurveyBeginProps> = (props: SurveyBeginProps) => {
    const theme = useTheme();
    const expiredIn = dayjs().to(dayjs(props.dueDate));
    const expiredDay = dayjs(props.dueDate).format("DD");
    const expiredMonth = dayjs(props.dueDate).format("MMMM");

    const desc = props.description.replace("{{Name}}", "Nadie");

    return (
        <SurveyWrapper>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, stiffness: 8, duration: 0.4 }}
                className={surveyDueDate}
                style={
                    {
                        "--font-family": theme.fontFamilyText,
                        "--color-text": theme.darkSecondaryTextColor,
                        paddingBottom: "0.7rem",
                    } as React.CSSProperties
                }
            >
                Vence {expiredIn}, el {expiredDay} de {expiredMonth}.
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08, stiffness: 8, duration: 0.5 }}
                className={surveyTitle}
                style={
                    {
                        "--font-family": theme.fontFamilyText,
                        "--color-text": theme.textColor,
                        paddingBottom: "1.8rem",
                    } as React.CSSProperties
                }
            >
                {props.title}
            </motion.div>
            <SurveyDescriptionWrapper>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, stiffness: 8, duration: 0.6 }}
                    className={surveyDescription}
                    style={
                        {
                            "--font-family": theme.fontFamilyText,
                            "--color-text": theme.textColor,
                        } as React.CSSProperties
                    }
                >
                    <div dangerouslySetInnerHTML={{ __html: desc }} />
                </motion.div>
            </SurveyDescriptionWrapper>
        </SurveyWrapper>
    );
};

export default SurveyBegin;
