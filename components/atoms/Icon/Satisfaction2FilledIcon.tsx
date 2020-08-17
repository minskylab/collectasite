import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const Satisfaction2FilledIcon: FC<IconProps> = (props: IconProps) => {
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
                d="M22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22C17.5227 22 22 17.5227 22 12ZM8.36364 8.81817C9.11545 8.81817 9.72727 9.42999 9.72727 10.1818C9.72727 10.9336 9.11545 11.5454 8.36364 11.5454C7.61182 11.5454 7 10.9336 7 10.1818C7 9.42999 7.61182 8.81817 8.36364 8.81817ZM15.6364 8.81817C14.8846 8.81817 14.2728 9.42999 14.2728 10.1818C14.2728 10.9336 14.8846 11.5454 15.6364 11.5454C16.3882 11.5454 17.0001 10.9336 17.0001 10.1818C17.0001 9.42999 16.3882 8.81817 15.6364 8.81817ZM7.57109 16.2418C8.69473 14.9904 10.3093 14.2727 12.0002 14.2727C13.6956 14.2727 15.3102 14.9909 16.4297 16.2427C16.597 16.43 16.5811 16.7168 16.3943 16.8845C16.3075 16.9618 16.1988 17 16.0911 17C15.9665 17 15.842 16.949 15.7525 16.8486C14.8052 15.7891 13.4375 15.1818 12.0002 15.1818C10.567 15.1818 9.19882 15.7895 8.24746 16.849C8.08019 17.0359 7.79246 17.0513 7.60564 16.8836C7.41882 16.7159 7.40337 16.4286 7.57109 16.2418Z"
                fill={props.color ? props.color : "#000000"}
            />
        </svg>
    );
};

export default Satisfaction2FilledIcon;
