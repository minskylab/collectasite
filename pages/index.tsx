import { NextPage } from "next";
import { styled } from "linaria/react";
import { css } from "linaria";
// import { motion } from "framer-motion";
import CollectaLogo from "../components/atoms/CollectaLogo";
import CollectaIsotype from "../components/atoms/CollectaIsotype";

export const globals = css`
	:global() {
		html {
			box-sizing: border-box;
		}
		body {
			margin: 0px;
		}

		*,
		*:before,
		*:after {
			box-sizing: inherit;
		}
	}
`;

const Center = styled.div`
	width: 100%;
	height: 100vh;
	max-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
	return (
		<Center>
			<div>
				<CollectaLogo scale={0.6} />
			</div>
		</Center>
	);
};

Home.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
	return { userAgent };
};

export default Home;
