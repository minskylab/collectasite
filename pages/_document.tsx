import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&family=Rubik:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Montserrat:wght@400;600&display=swap"
                        rel="stylesheet"
                    />
                    <meta name="theme-color" content="#4a4a4a" />
                    <style jsx global>{`
                        body {
                            margin: 0;
                            padding: 0;
                        }
                    `}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
