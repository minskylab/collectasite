import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { styled } from "linaria/react";
import Head from "next/head";
// import { css } from "linaria";
import { motion } from "framer-motion";
import CollectaLogo from "../components/atoms/CollectaLogo";
import CollectaIsotype from "../components/atoms/CollectaIsotype";
// import { Choices } from "../components/molecules/Choices";

// export const globals = css`
// 	:global() {
// 		html {
// 			box-sizing: border-box;
// 		}
// 		body {
// 			margin: 0px;
// 		}

// 		*,
// 		*:before,
// 		*:after {
// 			box-sizing: inherit;
// 		}
// 	}
// `;

const Center = styled.div`
	width: 100%;
	height: 100vh;
	max-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const OPTIONSSINGLE = [
	{ key: "06", text: "Breakout Rooms", value: "breakoutrooms", checked: true },
	{ key: "07", text: "Chat", value: "chat", checked: false },
	{ key: "08", text: "Juego-simulación", value: "juegosimulacion", checked: false },
	{ key: "09", text: "Kahoot u otra encuesta", value: "kahootuotraencuesta", checked: false },
	{ key: "10", text: "Otra", value: "otra", checked: false }
];

interface OptionValue {
	key: string;
	text: string;
	value: string;
	checked: boolean;
}

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
	const [singleOptions, setSingleOptions] = useState<OptionValue[]>(OPTIONSSINGLE);
	const [clicks, setClicks] = useState(0);

	useEffect(() => {
		console.log("useEffect singleOptions => ", singleOptions);
	}, [singleOptions])

	return (
		<>
			<Head>
				<title>Collecta Surveys | Minsky</title>
			</Head>
			<Center>
				<div>
					<CollectaLogo scale={0.6} />
					{/* <Choices
						options={singleOptions}
						onChange={options => {
							console.log("options", options.map(({ checked }) => checked))
							setSingleOptions(options);
						}}
					/> */}
				</div>
			</Center>
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
	return { userAgent };
};

export default Home;
