import React, { useEffect, FC, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { styled } from "linaria/react";
import { css } from "linaria";
import { motion } from "framer-motion";
import { Avatar } from "../components/atoms/Avatar";
import { Icon } from "../components/atoms/Icon";
import { useTheme } from "../general/theming";

import { CollectaCard } from "../components/molecules/Cards";
import { setToken } from "../general/auth";
import { useProfileQuery } from "../data/collecta";
import Skeleton from "react-loading-skeleton";
import { Tabs } from "components";
import dayjs from "dayjs";
import Search from "components/molecules/Search";
import LoadingMessage from "components/atoms/Messages/LoadingMessage";
import ErrorMessage from "components/atoms/Messages/ErrorMessage";

// import dynamic from "next/dynamic";
// const Skeleton = dynamic(() => import("react-loading-skeleton"), { ssr: false });

const WrapperHome = styled.div`
    position: relative;
    width: 100vw;
    overflow-x: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const WrapperText = styled.div`
    position: relative;
    @media (min-width: 601px) {
        padding-left: 4rem;
        padding-right: 2.5rem;
    }
    @media (max-width: 600px) {
        padding-left: 2rem;
        padding-right: 2rem;
    }
`;

const WrapperTab = styled.div`
    position: relative;
    @media (min-width: 601px) {
        padding-left: 0;
        padding-right: 0;
    }
    @media (max-width: 600px) {
        padding-left: 2rem;
        padding-right: 2rem;
    }
`;

const AvatarPosition = styled.div`
    position: absolute;
    right: 2em;
    top: 1.5em;
`;

const menuWrapper = css`
    position: relative;
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
    width: 100%;
    @media (min-width: 601px) {
        padding-top: 2.5rem;
        display: flex;
    }
    @media (max-width: 600px) {
        display: block;
        padding-top: 3rem;
        align-items: flex-start;
    }
`;

const textTitle = css`
    font-family: "Lora";
    font-style: normal;
    font-weight: normal;
    font-size: 2.3rem;
    line-height: 3rem;
    color: var(--color-text);
    text-align: left;
    width: 100%;
`;

const text = css`
    font-family: "Montserrat";
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 150%;
    width: 100%;
    color: var(--color-text);
    text-align: left;
    max-width: 20rem;
    padding-bottom: 1.5rem;
    max-width: 18rem;
    @media (max-width: 400px) {
        padding-bottom: 2rem;
        max-width: 300px;
    }
`;

const cardsWrapper = css`
    display: flex;
    width: 100vw;
    overflow-x: scroll;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    ::-webkit-scrollbar {
        height: 0px;
        width: 0px;
    }
    @media (max-width: 600px) {
        display: block;
    }
`;

const cardsContainer = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    padding-top: 1rem;
    padding-bottom: 1rem;
    @media (max-width: 600px) {
        padding-left: 1rem;
        padding-right: 1rem;
        display: block;
    }
`;

const cardItem = css`
    @media (min-width: 601px) {
        width: 220px;
        font-size: 16px;
        margin: 0.3rem;
    }
    @media (max-width: 600px) {
        font-size: 16px;
        margin: 0rem;
        padding-bottom: 0.75rem;
    }
`;

const LeftPart = styled.div`
    @media (min-width: 601px) {
        width: 40%;
    }
`;

const RightPart = styled.div`
    @media (min-width: 601px) {
        width: 60%;
    }
`;

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { token } = router.query;
        if (typeof token === "string") {
            setToken(token);
            console.log("SET TOKEN: ", localStorage.getItem("jwtToken"));
            window.location.replace(window.location.href.split("?")[0]);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Home | Collecta Surveys</title>
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

    // const [{ data, fetching, error }, run] = useProfileQuery({
    //     pause: true,
    // });
    const [{ data, fetching, error }] = useProfileQuery();
    const [tabSelected, setTabSelected] = useState<string>("Nuevos");
    const [searchSelected, setSearchSelected] = useState<string>("CardMode");

    // useEffect(() => {
    //     run();
    // }, []);

    console.log(fetching, error, data);
    // return <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><LoadingMessage text={"CARGANDO..."} /></div>

    if (fetching) {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LoadingMessage text={"CARGANDO..."} />
            </div>
        );
    }

    if (error) {
        console.log(error, "ERROR....");
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ErrorMessage title={"ERROR"} error={error.message} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", overflow: "hidden" }}>
            <Head>
                <title>{data?.profile.name ? `Surveys | ${data?.profile.name}` : "Collecta Surveys"}</title>
            </Head>
            <div>
                <motion.div className={menuWrapper} initial={false}>
                    <div style={{ padding: 30 }}>
                        <Icon name="menu" color="#023146" size={30} />
                    </div>
                </motion.div>
                <AvatarPosition>
                    {data ? (
                        <Avatar size={"2.5rem"} image={data.profile.picture || ""} />
                    ) : (
                        <Skeleton key="avatar" height="42px" width="42px" />
                    )}
                </AvatarPosition>
            </div>
            <WrapperHome>
                <ContentWrapper>
                    <LeftPart>
                        <WrapperText>
                            <div
                                className={textTitle}
                                style={{
                                    "--color-text": "#023146",
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
                                    "--color-text": "#3C5763",
                                }}
                            >
                                {data ? (
                                    <>
                                        Esta es una lista de tus <b>encuestas pendientes</b>, trata de contestarlas
                                        antes de que se acabe el tiempo.
                                    </>
                                ) : (
                                    <Skeleton key="head" height="80px" width="280px"></Skeleton>
                                )}
                            </div>
                        </WrapperText>
                    </LeftPart>
                    <RightPart>
                        <WrapperTab>
                            <Tabs
                                onClick={(s) => {
                                    if (s) {
                                        setTabSelected(s);
                                    }
                                }}
                                selected={tabSelected}
                            />
                        </WrapperTab>
                        <br />
                        <Search
                            onClick={(s) => {
                                if (s) {
                                    setSearchSelected(s);
                                }
                            }}
                            selected={searchSelected}
                        />
                        <div className={cardsWrapper}>
                            <div className={cardsContainer}>
                                {data ? (
                                    data.profile ? (
                                        data.profile.surveys ? (
                                            data.profile.surveys
                                                .filter((survey) => {
                                                    const filteredSurvey = dayjs(survey.dueDate).isAfter(new Date());
                                                    if (tabSelected === "Nuevos") {
                                                        if (survey.flow?.state === survey.flow?.initialState) {
                                                            return filteredSurvey;
                                                        } else {
                                                            return;
                                                        }
                                                    } else if (tabSelected === "En progreso") {
                                                        if (
                                                            survey.flow?.state !== survey.flow?.initialState &&
                                                            survey.flow?.state !== survey.flow?.terminationState
                                                        ) {
                                                            return filteredSurvey;
                                                        } else {
                                                            return;
                                                        }
                                                    } else if (tabSelected === "Completados") {
                                                        if (
                                                            survey.flow?.state === survey.flow?.terminationState ||
                                                            survey.done
                                                        ) {
                                                            return filteredSurvey;
                                                        } else {
                                                            return;
                                                        }
                                                    } else {
                                                        return;
                                                    }
                                                })
                                                .map((survey: any, s: number) => (
                                                    <div key={s} className={cardItem}>
                                                        <CollectaCard
                                                            {...survey}
                                                            isShadow={true}
                                                            onSelected={(id) => {
                                                                router.push(`/s/${id}`);
                                                            }}
                                                            disable={tabSelected === "Completados"}
                                                        />
                                                        {/* <div>{survey.flow.state}, {survey.flow.initialState}, {survey.flow.terminationState}</div> */}
                                                    </div>
                                                ))
                                        ) : null
                                    ) : null
                                ) : (
                                    <Skeleton key="card" height="300px" width={"260px"} />
                                )}
                            </div>
                        </div>
                    </RightPart>
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
