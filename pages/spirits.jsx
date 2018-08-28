import React, { Fragment } from 'react'
import Page from '../components/Page1x25050R'

const Spirits = props => (
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
        left: `/static/Bottle_Creek.jpg`,
        rightTop50: `/static/Aspen_Logs.jpg`,
        rightBottom50: `/static/Close_Up_Aspen_Leaves.jpg`,
      }}
    />
  </Fragment>
)

export default Spirits
