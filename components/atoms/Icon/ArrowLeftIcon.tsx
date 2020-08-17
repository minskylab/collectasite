import { FC } from "react";

interface IconProps {
    color?: string;
    size?: number;
}

const ArrowLeftIcon: FC<IconProps> = (props) => {
    return (
        <svg
            width={props.size ? props.size : 24}
            height={props.size ? props.size : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2.5 12L6.5 16V13L21.5 13V11L6.5 11L6.5 8L2.5 12Z" fill={props.color ? props.color : "#000000"} />
        </svg>
    );
};

export default ArrowLeftIcon;
