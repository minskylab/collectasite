import React, { FC, useState } from "react";
import { css } from "linaria";
import { useTheme } from "../../../general/theming";
import { BaseButton } from "../../atoms/Button";
import { ArrowLeftIcon } from "../../atoms/Icon";
import { useRouter } from "next/router";

const thanks = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 1.5rem;
	text-align: center;
`;

export interface SurveyEndProps {}

const SurveyEnd: FC<SurveyEndProps> = (props: SurveyEndProps) => {
	const theme = useTheme();
	const router = useRouter();

	return (
		<div>
			<div
				className={thanks}
				style={{
					//@ts-ignore
					"--font-family": theme.fontFamilyText,
					"--color-text": theme.textColor,
					paddingBottom: "3em"
				}}
			>
				¡Gracias!
			</div>
			<div>
				<BaseButton
					onClick={() => router.push("/")}
					iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
					iconPosition={"left"}
					text={"Volver a inicio"}
					colorText={"#B1B1B1"}
					backgroundColor={"transparent"}
				/>
			</div>
		</div>
	);
};

export default SurveyEnd;
