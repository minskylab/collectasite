import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { BaseButton } from "../../atoms/Button";
import { useRouter } from "next/router";
import { CircleProgressBar } from "../../molecules/CircleProgressBar";

const CircleProgressWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding-bottom: 2em;
`;

const thanks = css`
    font-family: var(--font-family);
    color: var(--color-text);
    font-size: 1.5rem;
    text-align: center;
    line-height: 150%;
`;

export interface SurveyEndProps {}

const SurveyEnd: FC<SurveyEndProps> = (props: SurveyEndProps) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <div>
            <CircleProgressWrapper>
                <CircleProgressBar strokeWidth={2} percentage={100} speed={5} size={90} />
            </CircleProgressWrapper>
            <div
                className={thanks}
                style={{
                    //@ts-ignore
                    "--font-family": theme.fontFamilyText,
                    "--color-text": theme.textColor,
                    paddingBottom: "3em",
                }}
            >
                <b>Encuesta completada</b> <div style={{ fontSize: "1rem" }}>Gracias a ti continuaremos mejorando.</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <BaseButton onClick={() => router.push("/")} iconPosition={"left"} text={"Volver a mis encuestas"} />
            </div>
        </div>
    );
};

export default SurveyEnd;
