import React from 'react'
import Page from '../components/Page1x26040'
import Paper from '@material-ui/core/Paper'

const OurStory = props => (
  <div
    style={{
      // height: height,
      display: 'flex',
      minWidth: '100vw',
      minHeight: '100vh',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundImage: `url(/static/Seal_Blue.png)`,
      backgroundRepeat: 'no-repeat',
      zIndex: -1000,
    }}
  >
    <Page
      {...props}
      pictures={{
        left: `/static/Ski_Goggles_Close_up.jpg`,
        rightTop60: `/static/Moonshine_Jars.jpg`,
        rightBottom40: `/static/Hats.jpg`,
      }}
    />
  </div>
)

export default OurStory
