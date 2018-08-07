import React from 'react'
import Page from '../components/Page1x26040'
import Paper from '@material-ui/core/Paper'

const Merchandise = props => (
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
        left: {
          url: `/static/Ski_Goggles_Close_up.jpg`,
          size: '100%',
        },
        rightTop: {
          url: `/static/Moonshine_Jars.jpg`,
          size: '60%',
        },
        rightBottom: {
          url: `/static/Hats.jpg`,
          size: '40%',
        },
      }}
    />
  </div>
)

export default Merchandise
