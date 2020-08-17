import React, { FC, ReactElement } from "react";
import { motion } from "framer-motion";

export interface SatisfactionIcon {
    face: ReactElement;
    value: number;
}

interface FacesProps {
    faces: SatisfactionIcon[];
    currentFace: number;
}

const Faces: FC<FacesProps> = (props: FacesProps) => {
    return (
        <div>
            {props.faces.map((face, key) => {
                return (
                    <motion.div
                        style={{
                            position: "absolute",
                            opacity: face.value === props.currentFace ? 1 : 0,
                        }}
                        key={key}
                        animate={
                            face.value === props.currentFace
                                ? { scale: [1, 1, 1], zIndex: 1, opacity: 1 }
                                : { scale: 1, zIndex: 0, opacity: 0 }
                        }
                    >
                        {face.face}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Faces;
