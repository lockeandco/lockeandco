import React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Router from 'next/router'
import { CookiesProvider } from 'react-cookie'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import dynamic from 'next/dynamic'
import { toLower, compose } from 'ramda'
import Head from 'next/head'
const Layout = dynamic(() => import('../components/Layout.jsx'), {
  ssr: false,
})
import theme from '../src/theme'


let Amplify

if (typeof window !== 'undefined') {
  Amplify = require('aws-amplify').default
  console.log(Amplify)
  Amplify.configure(JSON.parse(process.env.AWSCONFIG))

  Amplify.Analytics.autoTrack('pageView', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    // OPTIONAL, the event name, by default is 'pageView'
    eventName: 'pageView',
    // OPTIONAL, the attributes of the event, you can either pass an object or a function
    // which allows you to define dynamic attributes
    attributes: {
      attr: 'attr',
    },
    // when using function
    // attributes: () => {
    //    const attr = somewhere();
    //    return {
    //        myAttr: attr
    //    }
    // },
    // OPTIONAL, by default is 'multiPageApp'
    // you need to change it to 'SPA' if your app is a single-page app like React
    type: 'multiPageApp',
    // OPTIONAL, the service provider, by default is the AWS Pinpoint
    provider: 'AWSPinpoint',
    // OPTIONAL, to get the current page url
    getUrl: () => {
      // the default function
      return window.location.origin + window.location.pathname
    },
  })
}
// import Layout from '../components/Layout.jsx'

const handleRouteChange = url => {
  console.log('App is changing to: ', url)
}
const handleHistoryChange = url => {
  console.log('App is changing to: ', url)
}
class MyApp extends App {
  constructor(props) {
    super(props)

    const { cookies } = props
    this.state = {
      isVerified: cookies.get('isVerified') || false,
      rememberme: cookies.get('rememberme') || false,
      test: {
        lat: 39.743642,
        lng: -104.9854807,
      },
      city: '',
      zoom: 10,
      position: {
        lat: 39.743642,
        lng: -104.9854807,
      },
      selectedItem: {},
    }
    this.expandList = this.expandList.bind(this)
    this.setZoom = this.setZoom.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.setPositionAndZoom = this.setPositionAndZoom.bind(this)
    this.setStore = this.setStore.bind(this)
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

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

  handleTest(p) {
    this.setState({
      test: p,
    })
  }
  expandList(o) {
    this.setState({
      city: toLower(String(o)),
    })
  }
  setZoom(z) {
    this.setState({
      zoom: z,
    })
  }
  setPosition(p) {
    this.setState({
      position: p,
    })
  }
  setPositionAndZoom({ position, zoom }) {
    this.setState({
      position: position || this.state.position,
      zoom: zoom || this.state.zoom,
    })
  }
  setStore(s) {
    // console.log('SSSSSSS', s)
    this.setState({
      selectedItem: s,
    })
  }

  getStateAndHelpers() {
    const { state, props } = this

    return {
      ...state,
      ...props,
      expandList: this.expandList,
      setZoom: this.setZoom,
      setPosition: this.setPosition,
      setPositionAndZoom: this.setPositionAndZoom,
      handleTest: this.handleTest,
      setStore: this.setStore,
    }
  }

  handleTest = this.handleTest.bind(this)
  render() {
    const { Component, pageProps, router, cookies } = this.props

    return (
      <Container>
        <Head>
          <title>Locke & Co Distillery</title>
        </Head>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout
              {...pageProps}
              {...router}
              {...this.getStateAndHelpers()}
              testP={this.state.test}
            >
              <Component
                {...pageProps}
                {...router}
                {...this.getStateAndHelpers()}
                testP={this.state.test}
              />
            </Layout>
          </ThemeProvider>
        </CookiesProvider>
      </Container>
    )
  }
}

export default compose(withCookies)(MyApp)
