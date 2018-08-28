import React, { Fragment } from 'react'
import Page from '../components/Page1x100'
import checkCookie from '../components/NoCookie'
import cookie from 'cookie'
import Check from '../components/NoCookie'
import Router from 'next/router'
import Headers from '../components/ScrollingHeaders'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
  },
  typoHeader: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: '.8rem',
      marginBottom: 5,
    },
  },
  typoH3Header: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    margin: 50,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      marginTop: '5%',
      marginBottom: '5%',
    },
  },
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
    //textOverflow: 'ellipsis',
  },
})

const Homepage = props => {
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
          backgroundImage: `url(/static/Seal_Blue.png)`,
          backgroundRepeat: 'no-repeat',
          zIndex: -1000,
        }}
      />
      <Page
        {...other}
        pictures={{
          left: `/static/Snow_Hikers.jpg`,
        }}
      >
        <div style={{ textAlign: 'center', paddingTop: '15%' }}>
          <Typography variant="title" className={classes.typoHeader}>
            we believe great spirits bring people together to share
          </Typography>
          <Typography variant="title" className={classes.typoHeader}>
            the moments and stories that make life rich.
          </Typography>

          <Typography className={classes.typoH3Header} variant="title">
            you're welcome here.
          </Typography>

          <Headers text='welcome everyone everyone welcome' />
        </div>
      </Page>
    </Fragment>
  )
}

export default checkCookie(withStyles(styles)(Homepage))
