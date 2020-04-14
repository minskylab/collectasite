import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { styled } from "linaria/react";
import Head from "next/head";
// import { css } from "linaria";
import { motion } from "framer-motion";
import CollectaLogo from "../components/atoms/CollectaLogo";
import CollectaIsotype from "../components/atoms/CollectaIsotype";

const circleConfig = {
	viewBox: '0 0 38 38',
	x: '19',
	y: '19',
	radio: '15.91549430918954'
};

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
					{/* <figure >
						<svg viewBox={circleConfig.viewBox} width="400" height="400">

							<circle
								className="ring"
								cx={circleConfig.x}
								cy={circleConfig.y}
								r={circleConfig.radio}
								fill="transparent"
								stroke="gray"
							/>

							<circle
								className="path"
								cx={circleConfig.x}
								cy={circleConfig.y}
								r={circleConfig.radio}
								fill="transparent"
								stroke="teal"
							/>

						</svg>
					</figure> */}
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
