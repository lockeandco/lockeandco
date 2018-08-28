import React, { Fragment } from 'react'
import Page from '../components/Page1x100'
import HomeText from '../markdown/homepage.mdx'
import checkCookie from '../components/NoCookie'
import cookie from 'cookie'
import Check from '../components/NoCookie'
import Router from 'next/router'
import Headers from '../components/ScrollingHeaders'

class Homepage extends React.Component {



  render() {

    return (
      <Fragment>
        <div
          style={{
            // height: height,
            display: 'flex',
            minWidth: '100vw',
            minHeight: '100vh',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(/static/Seal_Blue.png)`,
            backgroundRepeat: 'no-repeat',
            zIndex: -1000,
          }}
        />
        <Page
          {...this.props}
          pictures={{
            left: `/static/Snow_Hikers.jpg`,
          }}
        >
          <div style={{ textAlign: 'center', paddingTop: '15%' }}>
            <HomeText />
            <Headers />
          </div>
        </Page>
      </Fragment>
    )
  }
}

export default checkCookie(Homepage)
