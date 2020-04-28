import React, { useEffect, FC } from "react";
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
import { profile } from "../general/queries";
import { setToken } from "../general/auth";
import ContentLoader from "react-content-loader";
import { useProfileQuery } from "../data/collecta";
import Skeleton from "react-loading-skeleton";

// import dynamic from "next/dynamic";
// const Skeleton = dynamic(() => import("react-loading-skeleton"), { ssr: false });

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
    line-height: 145%;
    width: 100%;
    color: var(--color-text);
    opacity: 0.68;
    font-size: 1.1rem;
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
    width: 240px;
    font-size: 16px;
    margin: 0.3rem;
    @media (max-width: 400px) {
        width: 70vw;
        font-size: 19px;
    }
`;

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { token } = router.query;
        if (typeof token === "string") {
            setToken(token);
            console.log("SET TOKEN: ", localStorage.getItem("jwtToken"))
            window.location.replace(window.location.href.split("?")[0])
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Collecta Surveys</title>
            </Head>
            <div>
                <HomeUserData />
            </div>
        </div>
    );
};

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
    return { userAgent };
};

interface UserData {
    name?: string;
}

const HomeUserData: FC<UserData> = (props: UserData) => {
    const theme = useTheme();
    const router = useRouter();

    const [{ data, fetching, error }, run] = useProfileQuery({
        pause: true,
    });

    useEffect(() => {
        run();
    }, []);

    if (error) {
        console.log("ERROR....");
    }


    return (
        <div>
            <Head>
                <title>Collecta Surveys | {data?.profile.name}</title>
            </Head>
            <motion.div className={menuWrapper} initial={false}>
                <div style={{ padding: 30 }}>
                    <MenuIcon size={30} color={theme.textColor} />
                </div>
            </motion.div>
            <WrapperHome>
                <AvatarPosition>
                    {data ? (
                        <Avatar size={"2.5rem"} image={data.profile.picture} />
                    ) : (
                            <Skeleton key="avatar" height="42px" width="42px" />
                        )}
                </AvatarPosition>
                <ContentWrapper>
                    <Container>
                        <div
                            className={textTitle}
                            style={{
                                //@ts-ignore
                                "--font-family": theme.fontFamilyTitle,
                                "--color-text": theme.textColor,
                                paddingBottom: "1.8rem",
                            }}
                        >
                            {data ? (
                                <>Hola {data.profile.name ? data.profile.name.split(" ", 1)[0] : ""},</>
                            ) : (
                                    <Skeleton height="30px" width="260px" />
                                )}
                        </div>
                        <div
                            className={text}
                            style={{
                                //@ts-ignore
                                "--font-family": theme.fontFamilyText,
                                "--color-text": theme.textColor,
                            }}
                        >
                            {data ? (
                                <>
                                    Esta es una lista de tus <b>encuestas pendientes</b>, trata de contestarlas antes de
                                    que se acabe el tiempo.
                                </>
                            ) : (
                                    <Skeleton key="head" height="80px" width="280px"></Skeleton>
                                )}
                        </div>
                    </Container>
                    <div className={cardsWrapper}>
                        <div className={cardsContainer}>
                            {data ? (
                                data.profile ? (
                                    data.profile.surveys ? (
                                        data.profile.surveys.map((survey: any, s: number) => (
                                            <div key={s} className={cardItem}>
                                                <ClassroomCard
                                                    {...survey}
                                                    isShadow={true}
                                                    onSelected={(id) => {
                                                        router.push(`/s/${id}`);
                                                    }}
                                                />
                                            </div>
                                        ))
                                    ) : null
                                ) : null
                            ) : (
                                    <Skeleton key="card" height="300px" width={"260px"} />
                                )}
                        </div>
                    </div>
                </ContentWrapper>
            </WrapperHome>
        </div>
    );
};

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

export default Home;
