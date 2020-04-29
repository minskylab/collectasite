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

const SatisfactionInput: FC<SatisfactionInputProps> = (props) => {
    const bounds = [-200, 200];
    const r = useMotionValue(0);

    // useEffect(
    //     () =>
    //         r.onChange((latest) => {
    //             console.log(latest);
    //         }),
    //     []
    // );

    const onPan = (event: Event, info: PanInfo) => {
        const norm = info.offset.x < 0 ? info.offset.x / Math.abs(bounds[0]) : info.offset.x / Math.abs(bounds[1]);
        let rot = 0.5 * 360 * norm;
        // console.log(`norm: ${norm} | rot: ${rot}`);
        // if (rot > -50 && rot < 50 && info.velocity.x < 5) {
        //     rot = 0;
        // } else {

        // }
        r.set(lastValue + rot);
    };

    const onPanEnd = (event: Event, info: PanInfo) => {
        if (r.get() > -90 && r.get() < 90) {
            r.set(0);
        }
        lastValue = r.get();
    };

    const d = 800;

    const arr = new Array(totalSections).fill(0);
    const ratio = 360 / totalSections;
    const angles = arr.map((v, i) => Math.round((i + 1) * ratio - ratio / 4));
    console.log(angles);
    const colors = ["#ff7a84", "#ff9c85", "#ffd7a1", "#b8f7a1", "#89eeae"];
    const names = ["NADA", "POCO", "REGULAR", "SUFICIENTE", "BASTANTE"];

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <motion.div onPan={onPan} onPanEnd={onPanEnd} className={wheel} style={{ rotate: r }}>
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
                                    fill={colors[i]}
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
                                        x={d / 2 - Math.round(10 * names[i].length)}
                                        y={88}
                                    >
                                        {names[i]}
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
