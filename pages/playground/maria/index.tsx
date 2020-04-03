import React from "react";
import Head from "next/head";
import GoogleButton from "../../../components/atoms/Button/GoogleButton";

const Playground = () => {
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
			</div>
		</div>
	);
};

export default Playground;
