import { NextPage } from "next";
import { styled } from "linaria/react";
import { SurveyEnd } from "../../components/organisms/SurveyFlow";
import Head from "next/head";

const Layout = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	max-height: 100vh;
	width: 100vw;
	overflow: hidden;
	@media (max-width: 600px) {
		min-height: 100vh;
	}
`;

const SurveyDone: NextPage = () => {
	return (
		<div>
			<Head>
				<title>¡Gracias!</title>
			</Head>
			<Layout>
				<div style={{ paddingTop: "4em" }}>
					<SurveyEnd />
				</div>
			</Layout>
		</div>
	);
};

export default SurveyDone;
