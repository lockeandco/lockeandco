import React, { Fragment } from 'react'
import Page from '../components/Page1x100'
import HomeText from '../markdown/homepage.mdx'
const Homepage = props => (
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
      {...props}
      pictures={{
        left: `/static/Ski_Boots1.jpg`,
      }}
    />
  </Fragment>
)

export default Homepage
