import React, { useState } from "react";
import Head from "next/head";
import { GoogleButton, BaseButton } from "../../../components/atoms/Button";
import {
	ArrowRightIcon,
	ArrowLeftIcon,
	AlertFilledIcon,
	MenuIcon,
	CheckIcon,
	CheckFilledIcon
} from "../../../components/atoms/Icon";
import { BaseInput } from "../../../components/atoms/Input";

const Playground = () => {
	const [username, setUsername] = useState<string>("");

	return (
		<div>
			<Head>
				<title>Minsky | Lab</title>
			</Head>
			<div style={{ textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
				<div>Maria playground</div>
				<br />
				<div style={{ width: "200px" }}>
					<GoogleButton />
				</div>
				<br />
				<div>
					<BaseButton iconElement={<ArrowRightIcon color={"#ffffff95"} size={20} />} text={"SIGUIENTE"} />
				</div>
				<br />
				<div>
					<BaseButton
						iconElement={<ArrowLeftIcon color={"#BBBBBB"} size={20} />}
						iconPosition={"left"}
						text={"Anterior"}
						colorText={"#B1B1B1"}
						backgroundColor={"transparent"}
					/>
				</div>
				<br />
				<div>
					<BaseButton text={"Botón"} />
				</div>
				<br />
				<div>
					<AlertFilledIcon />
					<MenuIcon />
					<CheckIcon />
					<CheckFilledIcon color={"#4258ED"} />
				</div>
				<br />
				<div style={{ width: "217px" }}>
					<BaseInput
						placeholder={"Pon tu código de ingreso aquí"}
						type={"email"}
						value={username}
						//@ts-ignore
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Playground;
