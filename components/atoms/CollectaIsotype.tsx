import React, { FC } from "react";
import { motion } from "framer-motion";

interface CollectaIsotype {
    scale?: number;
    w?: number;
    h?: number;
    dark?: boolean;
    onlyIsotype?: boolean;
}

const CollectaIsotype: FC<CollectaIsotype> = (props: CollectaIsotype) => {
    const color1 = props.dark ? "#f0f0f0" : "#353739";
    const color2 = props.dark ? "#CDCFD6" : "#555A5F";

    let width = props.w || 208;
    let height = props.h || 246;

    if (props.scale && !props.w && !props.h) {
        width *= props.scale;
        height *= props.scale;
    }

    return (
        <svg width={width} height={height} viewBox={"0 0 208 246"} fill={"none"} xmlns="http://www.w3.org/2000/svg">
            <motion.rect
                initial={{ opacity: 0, transform: "scale(0.5)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                transition={{ delay: 0.1 }}
                x="70"
                y="0.126862"
                width="68"
                height="245.244"
                fill={color2}
            />
            <motion.path
                initial={{ opacity: 0, transform: "scale(0.6)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                transition={{ delay: 0.4 }}
                d="M160 200.061L160 46.4371L208 20.8209L208 224.677L160 200.061Z"
                fill={color1}
            />
            <motion.path
                initial={{ opacity: 0, transform: "scale(0.6)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                transition={{ delay: 0.4 }}
                d="M48 200.061L48 46.4371L-2.14577e-06 20.8209L6.76087e-05 224.677L48 200.061Z"
                fill={color1}
            />
        </svg>
    );
};

export default CollectaIsotype;
