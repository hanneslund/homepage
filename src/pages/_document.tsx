import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Frontend developer from Sweden. Building stuff for the web."
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="text-gray-50 bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
