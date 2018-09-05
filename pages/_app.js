import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
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

// Blue
// (36, 55, 70) - #243746
// Orange
// (195, 109, 21) - #C36D15
// 70% Tan
// (226, 222, 213) - #E2DED5
// Tan
// (214, 209, 196) - #D6D1C4
// Gold
// (212, 194, 1) - #D4C201

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#58687c',
      main: '#C36D15',
      dark: '#041828',
    },
    secondary: {
      light: '#c3452e',
      main: '#C36D15',
      dark: '#590000',
    },
  },
  nprogress: {
    color: '#8C0C04',
  },
})
class MyApp extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
    this.pageContext.theme = theme
    const { cookies } = props
    this.state = {
      isVerified: cookies.get('isVerified') || false,
      rememberme: cookies.get('rememberme') || false,
    }
  }
  // static async getInitialProps(x, y, z) {
  //   console.log(Object.keys(x))
  //   console.log(x.ctx)
  //   // const { isVerified, rememberme } = await cookie.parse(req.headers.cookie)
  //   // if (!rememberme) redirect({ res, req }, '/spirits')
  //   return { isVerified: false, rememberme: true }
  // }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }
  pageContext = null

  async handleVerified(verified) {
    const { cookies } = this.props

    await cookies.set('isVerified', verified, { path: '/' })
    this.setState({ isVerified })
  }

  async handleRemember(remember) {
    const { cookies } = this.props

    await cookies.set('rememberme', remember, { path: '/' })
    this.setState({ remember })
  }
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
    const { Component, pageProps, router, cookies } = this.props

    // console.log('PCX', this.pageContext)

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
                    cookies={cookies}
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
