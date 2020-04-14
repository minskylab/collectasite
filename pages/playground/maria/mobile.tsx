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
import { SatisfactionChoice, SatisfactionChoiceMobile } from "../../../components/molecules/Choices";
import { SatisfactionMode } from "../../../components/molecules/Choices/SatisfactionChoice";

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

const PlaygroundMobile = () => {
  const [value, setValue] = useState<number | undefined>(0);
  const [satisfactionValue, setSatisfactionValue] = useState<number>(0);

  // console.log(singleOptions);
  return (
    <div>
      <Head>
        <title>Minsky | Lab</title>
      </Head>
      <div style={{ textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div style={{ opacity: 1 }}>
          <SatisfactionChoice
            onChange={s => {
              setValue(s);
            }}
            unitValue={value}
            iconSize={100}
            satisfactionOptionsSize={SatisfactionMode.Short}
            alternativeNames={["a", "b", 'c']}
          />
        </div>
        <br />
        <br />
        <div>
          <SatisfactionChoiceMobile onChange={s => {
            setSatisfactionValue(s);
          }}
            unitValue={satisfactionValue}
            iconSize={100}
            satisfactionOptionsSize={SatisfactionMode.Large}
          // alternativeNames={["a", "b", 'c']} 
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundMobile;
