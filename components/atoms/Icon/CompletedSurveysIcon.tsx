import { FC } from "react";

interface IconProps {
	color?: string;
	size?: number;
}

const CompletedSurveysIcon: FC<IconProps> = props => {
	return (
		<svg
			width={props.size ? props.size : 24}
			height={props.size ? props.size : 24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19.0005 12.3191V12.9631C18.9996 14.4726 18.5108 15.9414 17.607 17.1504C16.7032 18.3594 15.4328 19.2438 13.9852 19.6718C12.5377 20.0998 10.9906 20.0484 9.57462 19.5253C8.15866 19.0022 6.94975 18.0354 6.12816 16.7691C5.30657 15.5027 4.91634 14.0048 5.01566 12.4985C5.11498 10.9923 5.69853 9.55854 6.67928 8.41106C7.66003 7.26359 8.98544 6.46388 10.4578 6.13122C11.9302 5.79855 13.4707 5.95075 14.8495 6.56511M19.0005 7.36311L12.0005 14.3701L9.90049 12.2701"
				stroke={props.color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default CompletedSurveysIcon;
