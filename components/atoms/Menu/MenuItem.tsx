import React, { FC } from "react";
import { motion } from "framer-motion";
import { css } from "linaria";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const liClass = css`
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const iconPlaceholder = css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex: 40px 0;
    margin-right: 20px;
`;

const textPlaceholder = css`
    border-radius: 5px;
    width: 200px;
    height: 20px;
    flex: 1;
`;

interface MenuItemProps {
    i: number;
}

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem: FC<MenuItemProps> = (props) => {
    const style = { border: `2px solid ${colors[props.i]}` };
    return (
        <motion.li className={liClass} variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <div className={iconPlaceholder} style={style} />
            <div className={textPlaceholder} style={style} />
        </motion.li>
    );
};

export default MenuItem;
