import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const ListModeIcon: FC<IconProps> = (props: IconProps) => {
    return (
        <svg
            width={props.size ? props.size : 24}
            height={props.size ? props.size : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.23682 6.80029H21.2368M8.23682 12.8003H21.2368M8.23682 18.8003H21.2368M3.23682 6.80029H3.24682M3.23682 12.8003H3.24682M3.23682 18.8003H3.24682"
                stroke={props.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ListModeIcon;
