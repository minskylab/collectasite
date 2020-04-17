import App, { Container } from "next/app";
import React from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://core.collecta.site/graphql",
});

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </Container>

    );
  }
}

export default (MyApp);