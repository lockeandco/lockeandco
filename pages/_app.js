import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../src/getPageContext'
import Layout from '../components/Layout.jsx'
import Router from 'next/router'
import { CookiesProvider } from 'react-cookie'
import { MDXProvider } from '@mdx-js/tag'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import components from '../MDXcomponents'
//use react-responsive!

class MyApp extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }
  pageContext = null

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    this.props.cookies.set('rememberme', true, { path: '/' })
    this.props.cookies.set('isVerified', false, { path: '/' })
    localStorage.setItem('isVerified', 'true')
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
        <CookiesProvider>
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
              <MDXProvider components={components}>
                <Layout
                  pageContext={this.pageContext}
                  {...pageProps}
                  {...router}
                >
                  <Component
                    pageContext={this.pageContext}
                    {...pageProps}
                    {...router}
                  />
                </Layout>
              </MDXProvider>
            </MuiThemeProvider>
          </JssProvider>
        </CookiesProvider>
      </Container>
    )
  }
}

export default withCookies(MyApp)
