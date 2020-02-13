import React, { useCallback, useReducer, useState, useEffect } from 'react'
import App from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Router from 'next/router'
import { CookiesProvider, useCookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import dynamic from 'next/dynamic'
import { toLower, compose, path, tap, thunkify } from 'ramda'
import { isFalsy, isTruthy } from 'ramda-adjunct'
import Head from 'next/head'
import {
  addDays,
  addHours,
  differenceInDays,
  differenceInHours,
  toDate,
  parseISO,
} from 'date-fns'
import CheckAge from '../components/CheckAge'
import theme from '../src/theme'
import createPersistedState from 'use-persisted-state'
import { AnimatePresence, motion } from 'framer-motion'

const Layout = dynamic(() => import('../components/Layout.jsx'), {
  ssr: false,
})

const EXPANDLIST = `EXPANDLIST`
const SETZOOM = 'SETZOOM'
const SETPOSITION = 'SETPOSITION'
const SETPOSITIONANDZOOM = `SETPOSITIONANDZOOM`
const SETTEST = 'SETTEST'
const SETSELECTEDITEM = 'SETSELECTEDITEM'
const SETSTORE = 'SETSTORE'
const SETVERIFIED = 'SETVERIFIED'
const SETREMEMBERME = 'SETREMEMBERME'
const SETLOCS = 'SETLOCS'
const SETCITY = 'SETCITY'
const SETAMPLIFY = 'SETAMPLIFY'
const SETGETLOCS = 'SETGETLOCS'

const appInitialState = {
  //SETLOCS
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
  //SETTEST
  test: {
    lat: 39.743642,
    lng: -104.9854807,
  },
  //SETCITY
  city: '',
  //SETZOOM
  zoom: 10,
  //POSITIION
  position: {
    lat: 39.743642,
    lng: -104.9854807,
  },
  //SETSELECTEDITEM
  selectedItem: {},
  Amplify: null,
  getLocs: null,
}

const appReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case EXPANDLIST:
      return { ...state, city: action.payload }
    case SETPOSITIONANDZOOM:
      return {
        ...state,
        zoom: action.payload.zoom,
        position: action.payload.position,
      }
    case SETPOSITION:
      return { ...state, position: action.payload }
    case SETZOOM:
      return { ...state, zoom: action.payload }
    case SETCITY:
      return { ...state, city: action.payload }
    case SETSELECTEDITEM:
      return { ...state, selectedItem: action.payload }
    case SETLOCS:
      return { ...state, lockeColocs: action.payload }
    case SETVERIFIED:
      return { ...state, isVerified: action.payload }
    case SETTEST:
      return { ...state, test: action.payload }
    case SETAMPLIFY:
      return { ...state, Amplify: action.payload }
    case SETGETLOCS:
      return { ...state, getLocs: action.payload }
    default:
      //ADD Some sort of error logic as this should never be triggered
      return state
  }
}

const expiration = new Date(Date.now() + 1000 * 60 * 1)
const getItems = path(['data', 'listLocationsByCity'])

const useRemember = createPersistedState('rememberMe')
const useAgeVerification = createPersistedState('isVerified')

const checkVerified = verified => remember =>
  !!remember
    ? differenceInDays(Date.now(), parseISO(verified)) < 30
    : differenceInHours(Date.now(), parseISO(verified)) < 1

const useRememberMe = inititalState => {
  const [rememberMe, setRememberMe] = useRemember(inititalState)

  return {
    rememberMe: Boolean(rememberMe),
    handleRemember: remember => setRememberMe(remember),
  }
}

const useIsVerified = inititalState => {
  const [verified, setVerificationState] = useAgeVerification(inititalState)

  return {
    verified: verified,
    handleVerified: rememberMe => () => {
      const date = !!rememberMe
        ? addDays(Date.now(), 30)
        : addHours(Date.now(), 1)
      setVerificationState(date)
    },
  }
}

function MywApp(props) {
  const { Component, pageProps, router, ...other } = props
  const [appState, setAppState] = useReducer(appReducer, appInitialState)

  const { rememberMe, handleRemember } = useRememberMe(false)
  const { verified, handleVerified } = useIsVerified(0)

  const isVerified = checkVerified(verified)(rememberMe)

  async function getCoLocs() {
    if (typeof window !== undefined && isTruthy(appState.getLocs)) {
      const locs = await appState
        .getLocs()
        // .then(compose(tap(console.log), getItems))
        .then(getItems)
        .catch(tap(console.log))
      const cachedLocs = await appState.Amplify.Cache.getItem('locations', {
        callback: () => locs,
        expires: expiration.getTime(),
      })

      setAppState({
        type: SETLOCS,
        payload: isFalsy(cachedLocs) ? appInitialState.lockeColocs : cachedLocs,
      })
    }
  }
  const [cookies, setCookie, removeCookie] = useCookies([
    'isVerified',
    'rememberMe',
  ])

  useEffect(() => {
    const Amplify = require('aws-amplify').default
    Amplify.configure(JSON.parse(process.env.AWSCONFIG))
    setAppState({
      type: SETAMPLIFY,
      payload: Amplify,
    })
  }, [])
  useEffect(() => {
    if (isFalsy(appState.Amplify)) {
      return
    } else {
      appState.Amplify.Analytics.autoTrack('pageView', {
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
      const { getLocations: getLocs } = require('../lib/api')
      setAppState({ type: SETGETLOCS, payload: getLocs })
    }
  }, [appState.Amplify])

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  // useEffect(() => {
  //   getCoLocs()
  // }, [appState.getLocs])

  const helpers = {
    expandList: o =>
      setAppState({ type: EXPANDLIST, payload: toLower(String(o)) }),
    setZoom: z => setAppState({ type: SETZOOM, payload: z }),
    setPosition: z => setAppState({ type: SETPOSITION, payload: p }),
    setPositionAndZoom: ({ position, zoom }) =>
      setAppState({
        type: SETPOSITIONANDZOOM,
        payload: { position, zoom },
      }),
    handleTest: t => setAppState({ type: SETTEST, payload: t }),
    setStore: s => setAppState({ type: SETSELECTEDITEM, payload: s }),
    ...appState,
    ...other,
    isVerified,
    rememberMe,
    allCookies: { isVerified, rememberMe },
  }

  console.log(appState)

  return (
    <React.Fragment>
      <Head>
        <title>Locke & Co Distillery</title>
      </Head>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {isVerified ? (
            <AnimatePresence exitBeforeEnter>
              <Layout
                {...pageProps}
                {...router}
                {...helpers}
                testP={appState.test}
              >
                <Component
                  {...pageProps}
                  {...router}
                  {...helpers}
                  testP={appState.test}
                  key={router.route}
                />
              </Layout>
            </AnimatePresence>
          ) : (
            <CheckAge
              handleVerified={handleVerified}
              handleRememberMe={handleRemember}
              rememberMe={rememberMe}
            />
          )}
        </ThemeProvider>
      </CookiesProvider>
    </React.Fragment>
  )
}

export default MywApp
