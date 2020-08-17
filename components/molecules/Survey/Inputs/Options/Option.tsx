import React, { FC, useState, useEffect } from "react";
import { css } from "linaria";
import { useTheme } from "../../../../../general/theming";
import { motion } from "framer-motion";
import { Icon } from "components";

const buttonContainer = css`
    background-color: var(--background-color);
    border-radius: 5px;
    display: flex;
    padding: 0.8rem 1.25rem;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    -webkit-touch-callout: none;
    border-color: var(--border-color);
    border-style: solid;
    border-width: 2px;
    transition: 0.3s;
    height: 20px;
    :hover {
        cursor: pointer;
    }
`;

const text = css`
    color: var(--text-color);
    font-family: "Montserrat";
    font-size: 1rem;
    transition: 0.3s;
`;

interface OptionProps {
    key: string;
    text: string;
    selected?: boolean;
    onClick?: () => void;
}

const Option: FC<OptionProps> = (props) => {
    const [mouseOver, setOnMouse] = useState<boolean>(false);
    const [render, setRender] = useState<number>(0);
    const theme = useTheme();

    useEffect(() => {
        setRender((c) => c + 1);
    }, [props.selected, props.text]);

    return (
        <div onClick={props.onClick}>
            <div
                onMouseOver={() => {
                    setOnMouse(true);
                }}
                onMouseLeave={() => {
                    setOnMouse(false);
                }}
                className={buttonContainer}
                style={{
                    //@ts-ignore
                    "--background-color": props.selected ? theme.primaryColor : "transparent",
                    "--border-color": props.selected ? theme.primaryColor : theme.secondaryColor,
                }}
            >
                <div
                    className={text}
                    style={{
                        //@ts-ignore
                        "--text-color": props.selected ? theme.primaryColorText : theme.secondaryTextColor,
                        "--font-family": theme.fontFamilyText,
                    }}
                >
                    {props.text}
                </div>
                <motion.div
                    animate={
                        props.selected
                            ? render > 1
                                ? {
                                      scale: [1, 1.5, 1],
                                  }
                                : {}
                            : { scale: 1, opacity: mouseOver ? [0, 1] : render <= 1 ? 0 : [1, 0] }
                    }
                    style={{
                        opacity: render <= 1 ? (props.selected ? 1 : 0) : mouseOver ? 0 : 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <Icon
                        name="check-filled"
                        color={props.selected ? theme.primaryColorText : theme.secondaryColor}
                        checkColor={props.selected ? theme.primaryColor : theme.textColor}
                        size={20}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Option;
