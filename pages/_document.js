import Document, { Html, Head, Main, NextScript } from 'next/document'

const title = 'kram.codes'
const author = 'Evan Krambuhl'
const description = 'Evan Krambuhl is making things on the internet and on the walls'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          { /* Description */ }
          <meta name="author" content={author} />
          <meta name="description" content={description} />
          <meta name="apple-mobile-web-app-title" content={title} />

          { /* Fonts */ }
          <link href="https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;700&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}