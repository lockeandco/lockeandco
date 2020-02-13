import React, { Fragment } from 'react'
import Page from '../components/Page1x15050'
import Typography from '@material-ui/core/Typography'
import AgeVerification from './AgeVerification'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  typoHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '3rem',
    overflow: 'hidden',
    textShadow: '2px 2px black',
    margin: '10% 5px 25px 5px',
  },
  typosubHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '1.1rem',
    overflow: 'hidden',
    textShadow: '1px 1px black',
    margin: '10px 5px 25px 5px',
  },
  typoTitle: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    fontSize: '1.0rem',
    overflow: 'hidden',
    textShadow: '1px 1px black',
    margin: '25px 5px 25px 5px',
  },
})

const CheckAge = withStyles(styles)(props => {
  const { classes, ...other } = props
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
          backgroundImage: `url(/Seal_Blue.png)`,
          backgroundRepeat: 'no-repeat',
          zIndex: -1000,
        }}
      />
      <Page
        {...other}
        pictures={{
          left: `/Golden_Aspen_Tree_Grove.jpg`,
          right: `/tools.jpg`,
        }}
      >
        <Typography variant="body1" className={classes.typoHeader}>
          locke + cO
        </Typography>
        <Typography variant="h6" className={classes.typosubHeader}>
          welcome.
        </Typography>
        <Typography variant="h6" className={classes.typosubHeader}>
          you are in good company here
        </Typography>
        <Typography variant="h6" className={classes.typoTitle}>
          Are you 21 years of age?
        </Typography>
        <AgeVerification {...other} />
      </Page>
    </Fragment>
  )
})

export default CheckAge
