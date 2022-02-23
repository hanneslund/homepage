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
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="loading bg-neutral-900 text-neutral-400">
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html:
                'if (document.body.classList) document.body.classList.remove("loading");',
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
