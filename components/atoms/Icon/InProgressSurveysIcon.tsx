import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const InProgressSurveysIcon: FC<IconProps> = (props: IconProps) => {
    return (
        <svg
            width={props.size ? props.size : 24}
            height={props.size ? props.size : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.0933 8.75911V12.9591L14.8933 14.3591M19.0933 12.9591C19.0933 16.8251 15.9593 19.9591 12.0933 19.9591C8.22727 19.9591 5.09326 16.8251 5.09326 12.9591C5.09326 9.09311 8.22727 5.95911 12.0933 5.95911C15.9593 5.95911 19.0933 9.09311 19.0933 12.9591Z"
                stroke={props.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default InProgressSurveysIcon;
