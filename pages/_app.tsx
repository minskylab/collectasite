import App from "next/app";
import React from "react";
import { createClient, Provider, Exchange, dedupExchange, cacheExchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import relativeTime from "dayjs/plugin/relativeTime";
import { getToken, deleteToken } from "../general/auth";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.extend(relativeTime);
dayjs.locale("es");

const errorExchange: Exchange = ({ forward }) => (ops$) => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error) {
                // console.log("Exhange error: ", error, error.networkError, typeof (error.networkError))
                console.log(error.message);
                console.log(error.networkError?.message);
                if (
                    error.message.includes("Network") ||
                    error.message.includes("unauthorized") ||
                    error.response?.statusCode === 403
                ) {
                    window.location.replace(window.location.host + "/login");
                    console.log("STATUS ", error.response.status, "LOGOUT");
                    deleteToken();
                } else {
                    console.log(
                        "ERROR: ",
                        "Respuesta de servidor",
                        " o ",
                        "Query mal hecho",
                        " | network: ",
                        error.networkError,
                        " | message: ",
                        error.message
                    );
                }
            }
        })
    );
};

const client = createClient({
    url: "https://core.collecta.site/graphql",
    fetchOptions: () => {
        if (typeof localStorage !== "undefined") {
            const token = getToken();
            // console.log(token);
            return {
                headers: { Authorization: token ? `Bearer ${token}` : "" },
            };
        }
        return {
            headers: { Authorization: "" },
        };
    },
    exchanges: [dedupExchange, cacheExchange, errorExchange, fetchExchange],
});

class MyApp extends App<any> {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider value={client}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default MyApp;
