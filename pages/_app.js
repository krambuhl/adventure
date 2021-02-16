import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import withGA from 'next-ga'
import { PageLayout } from 'components'
import 'styles/styles.css'

function CustomApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>kram.codes</title>

        <meta name="description" content="" />
        <meta name="author" content="Evan Krambuhl" />
        <meta name="apple-mobile-web-app-title" content="Stumpy" />

        { /* Fonts */ }
        <link href="https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <PageLayout
        pageProps={pageProps}
        Component={Component}
      />
    </React.Fragment>
  )
}

export default withGA('beta', Router)(CustomApp)
