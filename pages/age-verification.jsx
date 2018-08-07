import React, { Fragment } from 'react'
import Page from '../components/Page1x15050'
const AgeVerification = props => (
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
        left:0,
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
        left: `/static/Golden_Aspen_Tree_Grove.jpg`,
        right: `/static/tools.jpg`,
      }}
    />
  </Fragment>
)

export default AgeVerification
