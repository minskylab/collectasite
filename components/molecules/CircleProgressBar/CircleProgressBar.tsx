import React, { FC } from "react";
import CircleProgressBarBase from "./CircleProgressBarBase";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";

interface CircleProgressBarProps {
	maxSize: string;
	textColor: string;
	strokeColor: string;
}

const classN = css`
	max-width: var(--max-size);
	vertical-align: middle;
`;

interface CircleProgressBarBaseProps {
	maxSize?: string;
	className?: object;
	strokeColor?: string;
	strokeWidth?: number;
	innerText?: string;
	legendText?: string;
	percentage?: number;
	trailStrokeWidth?: number;
	trailStrokeColor?: string;
	trailSpaced?: boolean;
	speed?: number;
	size?: number;
}

const CircleProgressBar: FC<CircleProgressBarBaseProps> = (props: CircleProgressBarBaseProps) => {
	const theme = useTheme();
	return (
		<CircleProgressBarBase
			{...props}
			className={classN}
			style={{
				//@ts-ignore
				"--max-size": props.maxSize || "100vh"
			}}
			size={props.size}
		/>
	);
};

export default CircleProgressBar;
