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
                const msg = error.message;
                const networkError = "Failed to fetch";
                const unauthorizedError = "unauthorized";
                if (msg.includes(networkError)) {
                    console.log("networkError: " + error);
                } else if (msg.includes(unauthorizedError) || error.response?.status === 403) {
                    console.log("unauthorizedError: " + error);
                    console.log(window.location);
                    window.location.assign("/login");
                    console.log("STATUS ", error.response.status, "LOGOUT");
                    console.log("deleteToken()");
                    // deleteToken();
                } else {
                    console.log("Otro tipo de error: " + error);
                }
            }
        }),
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
