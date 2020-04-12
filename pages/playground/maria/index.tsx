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
import { ClassroomCard } from "../../../components/molecules/Cards";
import { Choices } from "../../../components/molecules/Choices";
import { OptionValue } from "../../../components/atoms/Button/ChoiceButton";

const surveys = [
	{
		expiredAt: "Vence el 24 de Marzo a las 23:59",
		surveyName: "Feedback por Sesión | Estudiantes",
		course: "Teoría de Decisiones",
		teacher: "Profesor José Larco",
		createdAt: "Inicia: Martes 23 de Marzo",
		availableFrom: "Disponible desde las 16:00"
	},
	{
		expiredAt: "Vence el 24 de Marzo a las 23:59",
		surveyName: "Feedback por Sesión | Estudiantes",
		course: "Teoría de Decisiones",
		teacher: "Profesor José Larco",
		createdAt: "Inicia: Martes 23 de Marzo",
		availableFrom: "Disponible desde las 16:00"
	},
	{
		expiredAt: "Vence el 24 de Marzo a las 23:59",
		surveyName: "Feedback por Sesión | Estudiantes",
		course: "Teoría de Decisiones",
		teacher: "Profesor José Larco",
		createdAt: "Inicia: Martes 23 de Marzo",
		availableFrom: "Disponible desde las 16:00"
	}
];

const OPTIONS = [
	{ key: "01", text: "Breakout Rooms", value: "breakoutrooms", checked: false },
	{ key: "02", text: "Chat", value: "chat", checked: true },
	{ key: "03", text: "Juego-simulación", value: "juegosimulacion", checked: false },
	{ key: "04", text: "Kahoot u otra encuesta", value: "kahootuotraencuesta", checked: true },
	{ key: "05", text: "Otra", value: "otra", checked: false }
];

const OPTIONSSINGLE = [
	{ key: "06", text: "Breakout Rooms", value: "breakoutrooms", checked: true },
	{ key: "07", text: "Chat", value: "chat", checked: false },
	{ key: "08", text: "Juego-simulación", value: "juegosimulacion", checked: false },
	{ key: "09", text: "Kahoot u otra encuesta", value: "kahootuotraencuesta", checked: false },
	{ key: "10", text: "Otra", value: "otra", checked: false }
];

const Playground = () => {
	const [ username, setUsername ] = useState<string>("");
	const [ multipleOptions, setMultipleOptions ] = useState<OptionValue[]>(OPTIONS);
	const [ singleOptions, setSingleOptions ] = useState<OptionValue[]>(OPTIONSSINGLE);
	const [ change, setChange ] = useState(false);

	console.log(singleOptions);
	return (
		<div>
			<Head>
				<title>Minsky | Lab</title>
			</Head>
			<div style={{ textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
				<div>Bebita playground</div>
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
						type={"text"}
						value={username}
						//@ts-ignore
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<br />
				<div style={{ display: "flex" }}>
					{surveys.map((survey, s) => (
						<div key={s} style={{ width: "207px", margin: "0.3rem" }}>
							<ClassroomCard {...survey} />
						</div>
					))}
				</div>
				<br />
				<br />
				MULTIPLE
				<br />
				<br />
				<div style={{ width: "360px" }}>
					<Choices
						options={multipleOptions}
						onChange={options => {
							setMultipleOptions(options);
						}}
						multiple={true}
					/>
				</div>
				<br />
				SINGLE
				<br />
				<br />
				<div style={{ width: "360px" }}>
					<Choices
						options={singleOptions}
						onChange={options => {
							setSingleOptions(options);
						}}
					/>
				</div>
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
};

export default Playground;
