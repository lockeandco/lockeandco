import React from 'react'
import Page from '../components/Page1x26040M'
import Paper from '@material-ui/core/Paper'
import Headers from '../components/MobileScrollingHeader'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'

const styles = theme => ({
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    marginTop: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: 'calc(100vh * .10)',
      fontsize: '1.8rem',
    },
  },
})
const Merchandise = props => {
  const { classes, ...other } = props
  return (
    <React.Fragment>
      <Page
        {...other}
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
      <div
        style={{
          textAlign: 'center',
          top: '40%',
          position: 'fixed',
        }}
      >
        <Headers text="new arrivals. coming soon." />
      </div>
    </React.Fragment>
  )
}

export default compose(
  checkCookie,
  withStyles(styles)
)(Merchandise)
