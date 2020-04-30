import React, { FC, useEffect } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { css } from "linaria";

const wheel = css`
    /* background-color: green; */
    display: flex;
`;

const getSectorPath = (x: number, y: number, outerDiameter: number, a1: number, a2: number): string => {
    const degtorad = Math.PI / 180;
    const halfOuterDiameter = outerDiameter / 2;
    const cr = halfOuterDiameter - 5;
    const cx1 = Math.cos(degtorad * a2) * cr + x;
    const cy1 = -Math.sin(degtorad * a2) * cr + y;
    const cx2 = Math.cos(degtorad * a1) * cr + x;
    const cy2 = -Math.sin(degtorad * a1) * cr + y;
    return "M" + x + " " + y + " " + cx1 + " " + cy1 + " A" + cr + " " + cr + " 0 0 1 " + cx2 + " " + cy2 + "Z";
};

interface SatisfactionInputProps {
    defaults?: string[];
    answers?: string[];
    multiple?: boolean;
    onChangeAnswers?: (answers: string[]) => void;
}

let lastValue: number = 0;

const totalSections = 5;
let counter = 0;
const SatisfactionInput: FC<SatisfactionInputProps> = (props) => {
    // const bounds = [-200, 200];
    const nBound = 200;
    const r = useMotionValue(0);
    const d = 800;

    const arr = new Array(totalSections).fill(0);
    const ratio = 360 / totalSections;
    const angles = arr.map((v, i) => Math.round((i + 1) * ratio - ratio / 4));
    console.log(angles);
    const colors = { 0: "#ff7a84", 1: "#ff9c85", 2: "#ffd7a1", 3: "#b8f7a1", 4: "#89eeae" };
    const names = { 0: "NADA", 1: "POCO", 2: "REGULAR", 3: "SUFICIENTE", 4: "BASTANTE" };

    const onPan = (event: Event, info: PanInfo) => {
        const alpha = 0.0025;
        let rot = alpha * info.offset.x * 360;
        r.set(lastValue + rot);
    };

    const onPanEnd = (event: Event, info: PanInfo) => {
        console.log("----------------");
        const angle = Math.abs(r.get() % 360);
        for (let i = 0; i < totalSections; i++) {
            const ci = i * ratio;
            const left = ci - 20;
            const right = ci + 20;
            console.log(`ci: ${ci} | l: ${left} | r: ${right}, angle: ${angle} `);
            if (angle > left && angle < right) {
                r.set(i * ratio);
            }
        }

        lastValue = r.get();
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <motion.div
                onPan={onPan}
                onPanEnd={onPanEnd}
                className={wheel}
                style={{ rotate: r }}
                transition={{
                    type: "inertia",
                    power: 0.6,
                    bounceStiffness: 400,
                    bounceDamping: 20,
                    max: 1000,
                    min: -1000,
                }}
            >
                <svg width={d} height={d}>
                    <g>
                        {angles.map((angle, i) => {
                            return (
                                <path
                                    key={i}
                                    d={getSectorPath(
                                        d / 2,
                                        d / 2,
                                        d,
                                        angle,
                                        angles[i + 1 === angles.length ? 0 : i + 1]
                                    )}
                                    fill={colors[i as keyof typeof colors]}
                                />
                            );
                        })}
                        <circle cx={d / 2} cy={d / 2} r={d / 3} strokeWidth="0" fill="white" />
                    </g>
                    <g>
                        {angles.map((angle, i) => {
                            return (
                                <g transform={`rotate(${ratio * (i + 1)} ${d / 2} ${d / 2})`}>
                                    <text
                                        fontFamily="Montserrat"
                                        fontWeight="bold"
                                        fontSize="32"
                                        opacity={"0.42"}
                                        x={d / 2 - Math.round(10 * names[i as keyof typeof names].length)}
                                        y={88}
                                    >
                                        {names[i as keyof typeof names]}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </motion.div>
        </div>
    );
};

export default SatisfactionInput;
