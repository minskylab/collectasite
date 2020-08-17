import React, { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const MenuIcon: FC<IconProps> = (props: IconProps) => {
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
        </svg>
    );
};

export default MenuIcon;
