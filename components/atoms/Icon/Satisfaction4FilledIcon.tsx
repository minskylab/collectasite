import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const Satisfaction4FilledIcon: FC<IconProps> = (props: IconProps) => {
    return (
        <svg
            width={props.size ? props.size : 34}
            height={props.size ? props.size : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22C17.5227 22 22 17.5227 22 12ZM8.36364 8.81817C9.11545 8.81817 9.72727 9.42999 9.72727 10.1818C9.72727 10.9336 9.11545 11.5454 8.36364 11.5454C7.61182 11.5454 7 10.9336 7 10.1818C7 9.42999 7.61182 8.81817 8.36364 8.81817ZM15.6364 8.81817C14.8846 8.81817 14.2728 9.42999 14.2728 10.1818C14.2728 10.9336 14.8846 11.5454 15.6364 11.5454C16.3882 11.5454 17.0001 10.9336 17.0001 10.1818C17.0001 9.42999 16.3882 8.81817 15.6364 8.81817ZM11.9999 16.0909C13.4371 16.0909 14.8044 15.4837 15.7517 14.4241C15.919 14.2368 16.2062 14.2214 16.394 14.3887C16.5812 14.5564 16.5971 14.8432 16.4299 15.0305C15.3099 16.2818 13.6953 17 11.9999 17C10.309 17 8.69441 16.2823 7.57077 15.0309C7.40304 14.8441 7.4185 14.5568 7.60532 14.3891C7.79213 14.2209 8.07941 14.2364 8.24713 14.4237C9.1985 15.4832 10.5667 16.0909 11.9999 16.0909Z"
                fill={props.color ? props.color : "#000000"}
            />
        </svg>
    );
};

export default Satisfaction4FilledIcon;
