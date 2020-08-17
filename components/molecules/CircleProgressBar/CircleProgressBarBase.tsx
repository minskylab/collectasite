import React, { FC, useState, useEffect } from "react";
import { useTheme } from "../../../general/theming";
import { css } from "linaria";

const INITIAL_OFFSET = 25;

const circleConfig = {
    viewBox: "0 0 38 38",
    x: "19",
    y: "19",
    radio: "15.91549430918954",
};

const chartText = css`
    font-family: var(--font-family);
    fill: var(--text-color);
    transform: translateY(0.25rem);
`;

const chartNumber = css`
    font-size: 0.8rem;
    line-height: 1;
    text-anchor: middle;
    transform: translate(0.1rem, 0rem);
    text-align: right;
`;

const chartPercentage = css`
    font-size: 0.35rem;
    line-height: 1;
    /* transform: translate(0.5rem, -0.2rem); */
`;

const chartLabel = css`
    font-size: 0.18rem;
    text-transform: uppercase;
    text-anchor: middle;
    transform: translateY(1em);
`;

const figureKey = css`
    margin-right: 8px;
`;

const figureKeyList = css`
    list-style: none;
    display: flex;
    justify-content: space-between;
`;

const figureKeyListLi = css`
    margin: 5px auto;
`;

const shapeCircle = css`
    display: inline-block;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: var(--stroke-color);
    text-transform: capitalize;
`;

interface CircleProgressBarBaseProps {
    className?: any;
    style?: any;
    strokeColor?: string;
    strokeWidth?: number;
    innerText?: string;
    legendText?: string;
    percentage?: number;
    trailStrokeWidth?: number;
    trailStrokeColor?: string;
    trailSpaced?: boolean;
    speed?: number;
    chartText?: any;
    chartNumber?: any;
    chartLabel?: any;
    size?: number;
    fontFamily?: string;
}

const CircleProgressBarBase: FC<CircleProgressBarBaseProps> = (props: CircleProgressBarBaseProps) => {
    const theme = useTheme();
    const defaultProps = {
        strokeColor: theme.primaryColor,
        strokeWidth: 1,
        innerText: "Completed",
        legendText: "",
        percentage: 0,
        trailStrokeWidth: 1,
        trailStrokeColor: theme.trailStrokeColor,
        trailSpaced: false,
        speed: 1,
        size: 40,
    };

    const className = props.className || "";
    const percentage = props.percentage || defaultProps.percentage;
    const speed = props.speed || defaultProps.speed;
    const trailStrokeColor = props.trailStrokeColor || defaultProps.trailStrokeColor;
    const trailStrokeWidth = props.trailStrokeWidth || defaultProps.trailStrokeWidth;
    const trailSpaced = props.trailSpaced || defaultProps.trailSpaced;
    const strokeColor = props.strokeColor || defaultProps.strokeColor;
    const strokeWidth = props.strokeWidth || defaultProps.strokeWidth;
    const innerText = props.innerText || defaultProps.innerText;
    const legendText = props.legendText || defaultProps.legendText;
    const size = props.size || defaultProps.size;

    const [progressBar, setProgressBar] = useState(0);
    const pace = percentage / speed;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (percentage > 0) {
                setProgressBar(progressBar + 1);
            }
        }, pace);
        return () => {
            clearTimeout(timer);
        };
    }, [percentage]);

    useEffect(() => {
        const timer2 = setTimeout(() => {
            if (progressBar < percentage) {
                setProgressBar(progressBar + 1);
            }
            if (progressBar > percentage) {
                setProgressBar(progressBar - 1);
            }
        }, pace);
        return () => {
            clearTimeout(timer2);
        };
    }, [progressBar]);

    useEffect(() => {}, [progressBar]);

    return (
        <figure className={className} style={props.style}>
            <svg viewBox={circleConfig.viewBox} width={size} height={size}>
                <circle
                    className="ring"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    stroke={trailStrokeColor}
                    strokeWidth={trailStrokeWidth}
                    strokeDasharray={trailSpaced ? 1 : 0}
                />
                <circle
                    className="path"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${progressBar} ${100 - progressBar}`}
                    strokeDashoffset={INITIAL_OFFSET}
                />
                <g
                    className={chartText}
                    style={
                        {
                            "--text-color": theme.textColor,
                            "--font-family": props.fontFamily || theme.fontFamilyText,
                        } as React.CSSProperties
                    }
                >
                    <text x="50%" y="50%" className={chartNumber}>
                        <tspan>{progressBar}</tspan>{" "}
                        <tspan dy="-0.25rem" dx="-2.1px" className={chartPercentage}>
                            {"%"}
                        </tspan>
                    </text>
                    {/* <text x="50%" y="50%" className={chartLabel}>
						{innerText}
					</text> */}
                </g>
            </svg>
            {legendText && (
                <figcaption className={figureKey}>
                    <ul className={figureKeyList} aria-hidden="true" role="presentation">
                        <li className={figureKeyListLi}>
                            <span
                                className={shapeCircle}
                                style={
                                    {
                                        "--stroke-color": strokeColor,
                                    } as React.CSSProperties
                                }
                            />
                            <span>{legendText}</span>
                        </li>
                    </ul>
                </figcaption>
            )}
        </figure>
    );
};

export default CircleProgressBarBase;
