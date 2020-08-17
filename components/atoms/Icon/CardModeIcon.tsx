import { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const CardModeIcon: FC<IconProps> = (props) => {
    return (
        <svg
            width={props.size ? props.size : 24}
            height={props.size ? props.size : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.9322 4.80029H4.70996V11.0225H10.9322V4.80029Z"
                stroke={props.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.71 4.80029H14.4877V11.0225H20.71V4.80029Z"
                stroke={props.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.71 14.5781H14.4877V20.8003H20.71V14.5781Z"
                stroke={props.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.9322 14.5781H4.70996V20.8003H10.9322V14.5781Z"
                stroke={props.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CardModeIcon;
