import React, { FC } from "react";
import icons from "./icons";

interface Props {
    name: string;
    color?: string;
    size?: number;
    checkColor?: string;
}

const Icon: FC<Props> = (props) => {
    const { name, color, size, checkColor } = props;
    const icon = icons.find((icon) => icon.name === name);

    if (icon) {
        return icon.code(color, size, checkColor);
    } else {
        return <span>Icon not found!</span>;
    }
};

export default Icon;
