import App from "next/app";
import React from "react";
import { createClient, Provider, Exchange, dedupExchange, cacheExchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";

import { getToken, deleteToken } from "../general/auth";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error) {
                // console.log("Exhange error: ", error, error.networkError, typeof (error.networkError))
                if (error.message.includes("unauthorized")) {
                    window.location.replace(window.location.href.split("?")[0] + "login");
                    console.log("STATUS ", error.response.status, "LOGOUT");
                    deleteToken();
                }
                if (typeof error.networkError !== "undefined") {
                    if (error.response?.status === 403) {
                        window.location.replace(window.location.href.split("?")[0] + "login");
                        console.log("STATUS ", error.response.status, "LOGOUT");
                        deleteToken();
                    } else {
                        console.log("ERROR: ", "No hay internet");
                    }
                } else {
                    console.log("ERROR: ", "Respuesta de servidor", " o ", "Query mal hecho");
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
