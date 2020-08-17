import React, { FC } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import CollectaIsotype from "../CollectaIsotype";

interface LoadingMessageProps {
    text?: string;
    image?: string;
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
    font-size: 0.92rem;
    transition: 0.3s;
    text-align: center;
    padding-top: 1rem;
`;

const LoadingMessage: FC<LoadingMessageProps> = (props) => {
    const theme = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.7, duration: 1.3, loop: Infinity, ease: "circIn" }}
        >
            {props.image ? <Image src={props.image} alt={"Loading image"} /> : <CollectaIsotype scale={0.5} />}
            <div
                className={text}
                style={{
                    //@ts-ignore
                    "--text-color": theme.textColor,
                    "--font-family": theme.fontFamilyText,
                }}
            >
                {props.text ? props.text : "Cargando..."}
            </div>
        </motion.div>
    );
};

export default LoadingMessage;
