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
                    <link
                        href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&family=Rubik:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Montserrat:wght@400;600&display=swap"
                        rel="stylesheet"
                    />

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
