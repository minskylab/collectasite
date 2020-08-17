import React, { FC, useState, useEffect, ReactElement } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { motion } from "framer-motion";
import { Icon } from "../Icon";

const buttonContainer = css`
    position: relative;
    background-color: var(--background-color);
    border-radius: 5px;
    display: flex;
    padding: 1rem 1.2rem;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-touch-callout: none;
    border-color: var(--border-color);
    border-style: solid;
    border-width: 2px;
    transition: 0.3s;
    height: 5em;
    width: 5em;
    text-align: center;
    :hover {
        cursor: pointer;
    }
`;

const text = css`
    color: var(--text-color);
    font-family: var(--font-family);
    font-size: 0.92rem;
    transition: 0.3s;
`;

const CheckIcon = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`;

interface YesNoProps {
    children: any;
    selected: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

// function YesNoButton(props: YesNoProps): ReactElement {
const YesNoButton: FC<YesNoProps> = (props: YesNoProps) => {
    const [mouseOver, setOnMouse] = useState<boolean>(false);
    const [render, setRender] = useState<number>(0);
    const theme = useTheme();

    useEffect(() => {
        setRender((c) => c + 1);
    }, [props.selected]);

    // console.log("render", render)

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
                    {props.children}
                </div>
                <CheckIcon>
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
                </CheckIcon>
            </div>
        </div>
    );
};

export default YesNoButton;
