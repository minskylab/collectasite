import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "urql";

import { styled } from "linaria/react";
import { css } from "linaria";
import { motion, useCycle } from "framer-motion";
import { Avatar } from "../components/atoms/Avatar";
import { MenuIcon } from "../components/atoms/Icon";
import { useTheme } from "../general/theming";

import { useDimensions } from "../components/atoms/Menu/use-dimensions";
import MenuToggle from "../components/atoms/Menu/MenuToogle";
import { Navigation } from "../components/atoms/Menu/Navigation";
import { ClassroomCard } from "../components/molecules/Cards";
import { queryUser, userByToken } from "../general/queries";

const WrapperHome = styled.div`
	position: relative;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const Container = styled.div`
	position: relative;

	padding-left: 1.8rem;
	padding-right: 1.8rem;
`;

const AvatarPosition = styled.div`
	position: absolute;
	right: 2em;
	top: 1.5em;
`;

const menuWrapper = css`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 300px;
`;

const background = css`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100vw;
	background: white;
	display: var(--display);
`;

const ContentWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	padding-top: 2.5rem;
	@media (max-width: 400px) {
		padding-top: 0rem;
		align-items: flex-start;
	}
`;

const textTitle = css`
	font-family: var(--font-family);
	color: var(--color-text);
	font-size: 2rem;
	text-align: center;
	width: 100%;
	@media (max-width: 400px) {
		text-align: left;
	}
`;

const text = css`
	font-family: var(--font-family);
	line-height: 130%;
	width: 100%;
	color: var(--color-text);
	font-size: 0.9rem;
	text-align: center;
	max-width: 20rem;
	padding-bottom: 1.5rem;
	max-width: 18rem;
	@media (max-width: 400px) {
		text-align: left;
		padding-bottom: 2rem;
		max-width: 300px;
	}
`;

const cardsWrapper = css`
	display: flex;
	width: 100vw;
	overflow-x: scroll;
	justify-content: center;
	-webkit-overflow-scrolling: touch;
	::-webkit-scrollbar {
		height: 0px;
		width: 0px;
	}

	@media (max-width: 400px) {
		justify-content: flex-start;
	}
`;

const cardsContainer = css`
	display: flex;
	padding-top: 1rem;
	padding-bottom: 1rem;
	@media (max-width: 400px) {
		padding-left: 1.25rem;
	}
`;

const cardItem = css`
	width: 207px;
	font-size: 16px;
	margin: 0.3rem;
	@media (max-width: 400px) {
		width: 60vw;
		font-size: 19px;
	}
`;

const surveys = [
	{
		id: "1",
		expiredAt: "Vence el 24 de Marzo a las 23:59",
		surveyName: "Feedback por Sesión | Estudiantes",
		course: "Teoría de Decisiones",
		teacher: "Profesor José Larco",
		createdAt: "Inicia: Martes 23 de Marzo",
		availableFrom: "Disponible desde las 16:00"
	},
	{
		id: "2",
		expiredAt: "Vence el 24 de Marzo a las 23:59",
		surveyName: "Feedback por Sesión | Estudiantes",
		course: "Teoría de Decisiones",
		teacher: "Profesor José Larco",
		createdAt: "Inicia: Martes 23 de Marzo",
		availableFrom: "Disponible desde las 16:00"
	},
	{
		id: "3",
		expiredAt: "Vence el 24 de Marzo a las 23:59",
		surveyName: "Feedback por Sesión | Estudiantes",
		course: "Teoría de Decisiones",
		teacher: "Profesor José Larco",
		createdAt: "Inicia: Martes 23 de Marzo",
		availableFrom: "Disponible desde las 16:00"
	}
];

const Home: NextPage = () => {
	const theme = useTheme();
	const router = useRouter();

	const { token } = router.query;

	useEffect(
		() => {
			if (!token) {
				router.push("/login");
			}
		},
		[ token ]
	);

	const [ userByTokenResult ] = useQuery({
		query: userByToken,
		variables: { token: token }
	});

	const { data: dataUserByToken, fetching: fetchingUserByToken, error: errorUserByToken } = userByTokenResult;

	const [ userResult ] = useQuery({
		query: queryUser,
		variables: { id: dataUserByToken ? (dataUserByToken.userByToken ? dataUserByToken.userByToken.id : null) : null }
	});

	const { data: dataUser, fetching: fetchingUser, error: errorUser } = userResult;

	if (fetchingUserByToken)
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
				Loading...
			</div>
		);
	if (errorUserByToken)
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
				Oh no... {errorUserByToken.message}
			</div>
		);

	if (fetchingUser)
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
				Loading...
			</div>
		);
	if (errorUser)
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
				Oh no... {errorUser.message}
			</div>
		);

	if (dataUser) {
		return (
			<div>
				<Head>
					<title>Collecta Surveys</title>
				</Head>
				<motion.div className={menuWrapper} initial={false}>
					<div style={{ padding: 30 }}>
						<MenuIcon size={30} color={theme.textColor} />
					</div>
				</motion.div>
				<WrapperHome>
					<AvatarPosition>
						<Avatar size={"2.5rem"} image={dataUser.user.picture} />
					</AvatarPosition>
					<ContentWrapper>
						<Container>
							<div
								className={textTitle}
								style={{
									//@ts-ignore
									"--font-family": theme.fontFamilyTitle,
									"--color-text": theme.textColor,
									paddingBottom: "1.8rem"
								}}
							>
								Hola {dataUser.user.name ? dataUser.user.name.split(" ", 1)[0] : ""}
							</div>
							<div
								className={text}
								style={{
									//@ts-ignore
									"--font-family": theme.fontFamilyText,
									"--color-text": theme.secondaryTextColor
								}}
							>
								Esta es una lista de tus encuestas pendientes, trata de contestarlas antes de que culminen.
							</div>
						</Container>
						<div className={cardsWrapper}>
							<div className={cardsContainer}>
								{dataUser.user ? dataUser.user.surveys ? (
									dataUser.user.surveys.map((survey: any, s: number) => (
										<div key={s} className={cardItem}>
											<ClassroomCard
												{...survey}
												isShadow={true}
												onSelected={id => {
													// console.log(id);
													router.push(`/s/${id}`);
												}}
											/>
										</div>
									))
								) : null : null}
							</div>
						</div>
					</ContentWrapper>
				</WrapperHome>
			</div>
		);
	}

	return null;
};

Home.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
	return { userAgent };
};

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2
		}
	}),
	closed: {
		clipPath: "circle(30px at 40px 40px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40
		}
	}
};

export default Home;
