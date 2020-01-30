import React, { useCallback, useReducer, useState } from 'react'
import App from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Router from 'next/router'
import { withCookies, Cookies, CookiesProvider, useCookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import dynamic from 'next/dynamic'
import { toLower, compose, path, tap } from 'ramda'
import Head from 'next/head'
// import config from '../src/aws-exports'
import theme from '../src/theme'

const EXANDLIST = `EXPANDLIST`
const SETPOSITIONANDZOOM = `SETPOSITIONANDZOOM`
const SETPOSITION = `SETPOSITION`

const Layout = dynamic(() => import('../components/Layout.jsx'), {
  ssr: false,
})

const stateUpdater = f => p => f(p)

const getItems = path(['data', 'listLocationsByCity'])
let Amplify
let getLocs
const expiration = new Date(Date.now() + 1000 * 60 * 1)

if (typeof window !== 'undefined') {
  Amplify = require('aws-amplify').default

  const { getLocations } = require('../lib/api')
  getLocs = getLocations
  //console.log(Amplify)

  Amplify.configure(JSON.parse(process.env.AWSCONFIG))
  console.log('CONFIG', JSON.parse(process.env.AWSCONFIG))
  // Amplify.configure(config)

  const expiration = new Date(Date.now() + 1000 * 60 * 1)

  // Set item with priority. Priority should be between 1 and 5.

  // Set item with an expiration time

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

function MywApp(props) {
  const { Component, pageProps, router } = props

  const [isVerified, setVerified] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies([
    'isVerified',
    'rememberMe',
  ])

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const ageVerification = cookies.get('isVerified')
    const rememberStatus = cookies.get('rememberme')
    setVerified(ageVerification)
    setRememberMe(rememberStatus)
  }, [])

  const [lockeColocs, setLockeColocs] = useState({
    lockeColocs: {
      list: [
        {
          formatted_address: '3320 Youngfield St, Wheat Ridge, CO 80033, USA',
          location: {
            lat: 39.7634547,
            lng: -105.1410719,
          },
          city: 'Wheat Ridge',
          place_id: 'ChIJPd14g86Fa4cRtzz3w0mKhN0',
          name: 'Applejack Wine & Spirits',
          site: 'https://applejack.com/',
        },
      ],
      total: 1,
      formatted_address: 'Wheat Ridge, CO, USA',
      city: 'wheat ridge',
      location: {
        lat: 39.766098,
        lng: -105.0772063,
      },
    },
  })

  async function handleVerified(verified) {
    await cookies.set('isVerified', verified, { path: '/' })
    setVerified(verified)
  }

  const [city, cityList] = useState({})

  const [test, updateTest] = useState({
    lat: 39.743642,
    lng: -104.9854807,
  })

  const [selectedItem, setSelectedItem] = useState({})

  const [{ position, zoom }, setPandZ] = useState({
    zoom: 10,
    position: {
      lat: 39.743642,
      lng: -104.9854807,
    },
  })

  const expandList = stateUpdater(cityList)
  const handleTest = stateUpdater(updateTest)
  const setPositionAndZoom = stateUpdater(setPandZ)
  const setZoom = z => setPositionAndZoom({ position: position, zoom: z })
  const setPosition = p => setPositionAndZoom({ position: p, zoom: zoom })

  return (
    <React.Fragment>
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
            {...getStateAndHelpers()}
            testP={test}
          >
            <Component
              {...pageProps}
              {...router}
              {...getStateAndHelpers()}
              testP={test}
            />
          </Layout>
        </ThemeProvider>
      </CookiesProvider>
    </React.Fragment>
  )
}
class MyApp extends App {
  constructor(props) {
    super(props)

    const { cookies } = props
    this.state = {
      lockeColocs: {
        list: [
          {
            formatted_address: '3320 Youngfield St, Wheat Ridge, CO 80033, USA',
            location: {
              lat: 39.7634547,
              lng: -105.1410719,
            },
            city: 'Wheat Ridge',
            place_id: 'ChIJPd14g86Fa4cRtzz3w0mKhN0',
            name: 'Applejack Wine & Spirits',
            site: 'https://applejack.com/',
          },
        ],
        total: 1,
        formatted_address: 'Wheat Ridge, CO, USA',
        city: 'wheat ridge',
        location: {
          lat: 39.766098,
          lng: -105.0772063,
        },
      },
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
    this.getCoLocs = this.getCoLocs.bind(this)
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    this.getCoLocs()
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

  async getCoLocs() {
    if (typeof window !== undefined) {
      console.log('geting locs')
      const locs = await getLocs()
        .then(compose(tap(console.log), getItems))
        .catch(tap(console.log))

      this.setState({
        lockeColocs: await Amplify.Cache.getItem('locations', {
          callback: () => locs,
          expires: expiration.getTime(),
        }),
      })
    }
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
    console.log('LCS', this.state.lockeColocs)
    return (
      <>
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
      </>
    )
  }
}

export default compose(withCookies)(MyApp)
