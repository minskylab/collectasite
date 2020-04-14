import { FC } from "react";

interface IconProps {
	color?: string;
	size?: number;
}

const Satisfaction3FilledIcon: FC<IconProps> = props => {
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
				d="M22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22C17.5227 22 22 17.5227 22 12ZM9.72727 10.1818C9.72727 10.9336 9.11545 11.5454 8.36364 11.5454C7.61182 11.5454 7 10.9336 7 10.1818C7 9.42999 7.61182 8.81817 8.36364 8.81817C9.11545 8.81817 9.72727 9.42999 9.72727 10.1818ZM15.6364 8.81817C14.8846 8.81817 14.2728 9.42999 14.2728 10.1818C14.2728 10.9336 14.8846 11.5454 15.6364 11.5454C16.3882 11.5454 17.0001 10.9336 17.0001 10.1818C17.0001 9.42999 16.3882 8.81817 15.6364 8.81817ZM7 14.7272C7 14.4763 7.20364 14.2727 7.45455 14.2727H16.5455C16.7964 14.2727 17 14.4763 17 14.7272C17 14.9781 16.7964 15.1818 16.5455 15.1818H7.45455C7.20364 15.1818 7 14.9781 7 14.7272Z"
				fill={props.color ? props.color : "#000000"}
			/>
		</svg>
	);
};

export default Satisfaction3FilledIcon;
