import { FC } from "react";

interface IconProps {
	color?: string;
	size?: number;
}

const NewSurveysIcon: FC<IconProps> = props => {
	return (
		<svg
			width={props.size ? props.size : 24}
			height={props.size ? props.size : 24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.1865 19.9591C8.32053 19.9591 5.18652 16.8251 5.18652 12.9591C5.18652 9.09311 8.32053 5.95911 12.1865 5.95911C16.0525 5.95911 19.1865 9.09311 19.1865 12.9591C19.1865 16.8251 16.0525 19.9591 12.1865 19.9591Z"
				stroke={props.color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default NewSurveysIcon;
