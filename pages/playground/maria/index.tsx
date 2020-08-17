import React, { useState } from "react";
import Head from "next/head";
import { OptionValue } from "../../../components/atoms/Button/ChoiceButton";
import { YesNoValue } from "../../../components/molecules/Choices/YesNoChoice";
import { SatisfactionMode } from "../../../components/molecules/Choices/SatisfactionChoice";

import {
    BaseInput,
    GoogleButton,
    BaseButton,
    ClassroomCard,
    Choices,
    YesNoChoice,
    SatisfactionChoice,
    CircleProgressBar,
    Icon,
} from "components";

const surveys = [
    {
        id: "1",
        expiredAt: "Vence el 24 de Marzo a las 23:59",
        surveyName: "Feedback por Sesión | Estudiantes",
        course: "Teoría de Decisiones",
        teacher: "Profesor José Larco",
        createdAt: "Inicia: Martes 23 de Marzo",
        availableFrom: "Disponible desde las 16:00",
    },
    {
        id: "2",
        expiredAt: "Vence el 24 de Marzo a las 23:59",
        surveyName: "Feedback por Sesión | Estudiantes",
        course: "Teoría de Decisiones",
        teacher: "Profesor José Larco",
        createdAt: "Inicia: Martes 23 de Marzo",
        availableFrom: "Disponible desde las 16:00",
    },
    {
        id: "3",
        expiredAt: "Vence el 24 de Marzo a las 23:59",
        surveyName: "Feedback por Sesión | Estudiantes",
        course: "Teoría de Decisiones",
        teacher: "Profesor José Larco",
        createdAt: "Inicia: Martes 23 de Marzo",
        availableFrom: "Disponible desde las 16:00",
    },
];

export const OPTIONS = [
    { key: "01", text: "Breakout Rooms", value: "breakoutrooms", checked: false },
    { key: "02", text: "Chat", value: "chat", checked: false },
    { key: "03", text: "Juego-simulación", value: "juegosimulacion", checked: false },
    { key: "04", text: "Kahoot u otra encuesta", value: "kahootuotraencuesta", checked: false },
    { key: "05", text: "Otra", value: "otra", checked: false },
];

export const OPTIONSSINGLE = [
    { key: "06", text: "Breakout Rooms", value: "breakoutrooms", checked: true },
    { key: "07", text: "Chat", value: "chat", checked: false },
    { key: "08", text: "Juego-simulación", value: "juegosimulacion", checked: false },
    { key: "09", text: "Kahoot u otra encuesta", value: "kahootuotraencuesta", checked: false },
    { key: "10", text: "Otra", value: "otra", checked: false },
];

const Playground = () => {
    const [username, setUsername] = useState<string>("");
    const [multipleOptions, setMultipleOptions] = useState<OptionValue[]>(OPTIONS);
    const [singleOptions, setSingleOptions] = useState<OptionValue[]>(OPTIONSSINGLE);
    const [yesNoValue, setYesNoValue] = useState<YesNoValue>(YesNoValue.Undefined);
    const [satisfactionValue, setSatisfactionValue] = useState<number | undefined>(0);

    // console.log(singleOptions);
    return (
        <div>
            <Head>
                <title>Minsky | Lab</title>
            </Head>
            <div style={{ textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <br />
                <div style={{ width: "200px" }}>
                    <GoogleButton />
                </div>
                <br />
                <div>
                    <BaseButton
                        iconElement={<Icon name="arrow-right" color="#ffffff95" size={20} />}
                        text="SIGUIENTE"
                    />
                </div>
                <br />
                <div>
                    <BaseButton
                        iconElement={<Icon name="arrow-left" color="#BBBBBB" size={20} />}
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
                    <Icon name="alert-filled" />
                    <Icon name="menu" />
                    <Icon name="check" />
                    <Icon name="check-filled" color="#4258ED" />
                </div>
                <br />
                <div style={{ width: "217px" }}>
                    <BaseInput
                        placeholder={"Pon tu código de ingreso aquí"}
                        type={"text"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <br />
                <div style={{ display: "flex" }}>
                    {surveys.map((survey, s) => (
                        <div key={s} style={{ width: "207px", margin: "0.3rem" }}>
                            <ClassroomCard {...survey} onSelected={(s) => console.log(s)} />
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
                        onChange={(options) => {
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
                        onChange={(options) => {
                            setSingleOptions(options);
                        }}
                    />
                </div>
                <br />
                <br />
                YES - NO
                <br />
                <br />
                <div>
                    <YesNoChoice
                        positiveOptionName={"SI"}
                        negativeOptionName={"NO"}
                        value={yesNoValue}
                        onChange={(selectedOption) => {
                            setYesNoValue(selectedOption);
                        }}
                    />
                </div>
                <br />
                <br />
                SATISFACTION
                <br />
                <br />
                <div>
                    <SatisfactionChoice
                        onChange={(s) => {
                            setSatisfactionValue(s);
                        }}
                        unitValue={satisfactionValue}
                        iconSize={100}
                        satisfactionOptionsSize={SatisfactionMode.Large}
                        // alternativeNames={["a", "b", 'c']}
                    />
                </div>
                <br />
                <br />
                Circle progress bar base
                <br />
                <br />
                <div>
                    <CircleProgressBar strokeWidth={2} percentage={75} innerText="completado" speed={1} size={150} />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};

export default Playground;
