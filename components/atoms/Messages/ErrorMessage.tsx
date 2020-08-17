import React, { FC } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";

interface ErrorMessageProps {
    image?: string;
    title?: string;
    error?: string;
}

const Image = styled.img`
    padding: 1rem;
    height: 90vw;
    width: 90vw;
    max-height: 400px;
    max-width: 400px;
`;

const text = css`
    color: var(--text-color);
    font-family: var(--font-family);
    font-size: 1.1rem;
    font-weight: 600;
    transition: 0.3s;
    text-align: center;
    padding-top: 1rem;
`;

const errorText = css`
    color: var(--text-color);
    font-family: var(--font-family);
    font-size: 0.92rem;
    transition: 0.3s;
    text-align: center;
    padding-top: 1rem;
`;

const ErrorMessage: FC<ErrorMessageProps> = (props: ErrorMessageProps) => {
    const theme = useTheme();
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {props.image && <Image src={props.image} alt={"Error image"} />}
            <div
                className={text}
                style={
                    {
                        "--text-color": theme.textColor,
                        "--font-family": theme.fontFamilyText,
                    } as React.CSSProperties
                }
            >
                {props.title ? props.title : "Error"}
            </div>
            <div
                className={errorText}
                style={{
                    //@ts-ignore
                    "--text-color": theme.textColor,
                    "--font-family": theme.fontFamilyText,
                }}
            >
                {props.error}
            </div>
        </motion.div>
    );
};

export default ErrorMessage;
