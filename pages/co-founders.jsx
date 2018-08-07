import React, { Fragment } from 'react'
import Page from '../components/Page1x25050'
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
        left: `/static/Bonfire_in_the_Woods.jpg`,
        rightTop50: `/static/Group_Dinner_Table.jpg`,
        rightBottom50: `/static/Woman_in_Hammock.jpg`,
      }}
    />
  </Fragment>
)

export default Spirits
