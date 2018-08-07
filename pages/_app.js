import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../src/getPageContext'
import Layout from '../components/Layout.jsx'
import Router from 'next/router'
class MyApp extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  pageContext = null

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    // Router.beforePopState(({ url, as, options }) => {
    //   // I only want to allow these two routes!
    //   console.log('BPS', url, as, options)
    //   if (as !== '/m' || as !== '/other') {
    //     // Have SSR render bad routes as a 404.
    //     window.location.href = as
    //     return false
    //   }

    //   return true
    // })
  }
  render() {
    const { Component, pageProps, router } = this.props

    // console.log('PCX', this.pageContext)
    // console.log(this)
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Layout pageContext={this.pageContext} {...pageProps} {...router}>
              <Component
                pageContext={this.pageContext}
                {...pageProps}
                {...router}
              />
            </Layout>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default MyApp
