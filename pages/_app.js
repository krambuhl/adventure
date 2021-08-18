import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { PageLayout } from 'components'
import 'styles/styles.css'

export default function CustomApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>kram.codes</title>
      </Head>

      <PageLayout
        pageProps={pageProps}
        Component={Component}
      />
    </React.Fragment>
  )
}
