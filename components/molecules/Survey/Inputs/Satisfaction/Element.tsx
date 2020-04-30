import React, { FC, useEffect, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { css } from "linaria";

const wheel = css`
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

export interface SatisfactionOption {
    text: string;
    value: number;
    color?: string;
}

interface SatisfactionElementProps {
    options: SatisfactionOption[];
    diameter?: number;
    dynamicRatio?: number;
    // value?:  number
    onChangeValue?: (val: number) => void;
}

let lastValue: number = 0;

const SatisfactionElement: FC<SatisfactionElementProps> = (props) => {
    const d = props.diameter || 700;
    const totalSections = props.options.length || 5;
    const alpha = props.dynamicRatio || 0.0025;

    const arr = new Array(totalSections).fill(0);
    const ratio = 360 / totalSections;
    const angles = arr.map((v, i) => Math.round((i + 1) * ratio - ratio / 4));

    let colors: any = {};
    let names: any = {};

    const sortedOptions = props.options.sort((opt1, opt2) => opt2.value - opt1.value);
    sortedOptions.map((opt, i) => {
        names[i] = opt.text;
        colors[i] = opt.color || "#ffd7a1";
    });

    const [value, setValue] = useState<number>(0);

    const r = useMotionValue(2 * ratio);
    lastValue = r.get();

    useEffect(() => {
        props.onChangeValue && props.onChangeValue(value);
    }, [value]);

    const onPan = (event: Event, info: PanInfo) => {
        let rot = alpha * info.offset.x * 360;
        r.set(lastValue + rot);
    };

    const onPanEnd = (event: Event, info: PanInfo) => {
        const neg = r.get() / Math.abs(r.get());
        const angle = Math.abs(r.get() % 360);
        const bound = 40;
        for (let i = 0; i < totalSections; i++) {
            const ci = i * ratio;
            const left = ci - bound;
            const right = ci + bound;
            if (angle > left && angle < right) {
                r.set(neg * i * ratio);
            }
        }

        let m = r.get() % 360;
        const center = Math.round(totalSections % 2 === 0 ? totalSections : (totalSections - 1) / 2) * ratio;

        m = m < 0 ? 360 - m * -1 : m;
        m = (totalSections - 1) * ratio - m;
        m = (m - center) / center; // Normalization to (0 -1)

        setValue(m);

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
                                        angles[i === angles.length - 1 ? 0 : i + 1]
                                    )}
                                    fill={colors[i]}
                                />
                            );
                        })}
                        <circle cx={d / 2} cy={d / 2} r={d / 2.6} strokeWidth="0" fill="white" />
                    </g>
                    <g>
                        {angles.map((angle, i) => {
                            return (
                                <g transform={`rotate(${ratio * (angles.length - i)} ${d / 2} ${d / 2})`}>
                                    <text
                                        fontFamily="Montserrat"
                                        fontWeight="bold"
                                        fontSize="20"
                                        opacity={"0.42"}
                                        textAnchor="middle"
                                        x={d / 2}
                                        y={50}
                                    >
                                        {names[i] || "Nothing"}
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

export default SatisfactionElement;
