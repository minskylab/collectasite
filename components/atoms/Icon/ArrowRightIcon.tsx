import { FC } from "react";

interface IconProps {
	color?: string;
	size?: number;
}

const ArrowRightIcon: FC<IconProps> = props => {
	return (
		<svg
			width={props.size ? props.size : 24}
			height={props.size ? props.size : 24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M21.5 12L17.5 8V11H2.5V13H17.5V16L21.5 12Z" fill={props.color ? props.color : "#000000"} />
		</svg>
	);
};

export default ArrowRightIcon;
