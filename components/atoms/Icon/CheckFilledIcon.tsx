import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
    checkColor?: string;
}

const CheckFilledIcon: FC<IconProps> = (props) => {
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
                d="M20 9H4V11H20V9ZM14 13H4V15H14V13Z"
                fill={props.color ? props.color : "#000000"}
            />
            <circle cx="12" cy="12" r="12" fill={props.color ? props.color : "#000000"} />
            <path
                d="M11.1304 14.2604L8.6979 11.8279L7.86957 12.6504L11.1304 15.9113L18.1304 8.91128L17.3079 8.08878L11.1304 14.2604Z"
                fill={props.checkColor ? props.checkColor : "#000000"}
                fillOpacity="0.6"
            />
        </svg>
    );
};

export default CheckFilledIcon;
