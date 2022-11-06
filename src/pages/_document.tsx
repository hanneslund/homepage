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
            content="Software engineer from Sweden. Building stuff for the web."
          />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <body className="bg-[#111] text-neutral-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
