import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/gumroad-dev.js`}
            data-gumroad-domains="localhost:3000,gumroad.com,gumroad.dev"
            defer
          ></script>
        </Head>
        <body className="antialiased sm:subpixel-antialiased md:antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
