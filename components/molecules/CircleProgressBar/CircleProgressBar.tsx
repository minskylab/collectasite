import React, { FC } from "react";
import CircleProgressBarBase from "./CircleProgressBarBase";
import { css } from "linaria";

const classN = css`
    max-width: var(--max-size);
    vertical-align: middle;
    margin: 0;
`;

interface CircleProgressBarBaseProps {
    maxSize?: string;
    className?: object;
    strokeColor?: string;
    strokeWidth?: number;
    innerText?: string;
    legendText?: string;
    percentage?: number;
    trailStrokeWidth?: number;
    trailStrokeColor?: string;
    trailSpaced?: boolean;
    speed?: number;
    size?: number;
    fontFamily?: string;
}

const CircleProgressBar: FC<CircleProgressBarBaseProps> = (props: CircleProgressBarBaseProps) => {
    let percent = props.percentage;
    if (props.percentage) {
        if (props.percentage <= 1) {
            percent = Math.round(100 * props.percentage);
        }
    }

    return (
        <CircleProgressBarBase
            {...props}
            className={classN}
            percentage={percent}
            style={
                {
                    "--max-size": props.maxSize || "100vh",
                } as React.CSSProperties
            }
            size={props.size}
        />
    );
};

export default CircleProgressBar;
