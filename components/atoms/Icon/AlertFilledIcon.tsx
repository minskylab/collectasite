import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const AlertFilledIcon: FC<IconProps> = (props: IconProps) => {
    return (
        <svg
            width={props.size ? props.size : 24}
            height={props.size ? props.size : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z"
                fill={props.color ? props.color : "#000000"}
            />
        </svg>
    );
};

export default AlertFilledIcon;
