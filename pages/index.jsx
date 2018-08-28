import React, { Fragment } from 'react'
import Page from '../components/Page1x100'
import checkCookie from '../components/NoCookie'
import Router from 'next/router'
import Headers from '../components/ScrollingHeaders'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import Hidden from '@material-ui/core/Hidden'
import { config } from 'react-spring'

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
    marginBottom: 5,
    [theme.breakpoints.down('xs')]: {
      fontSize: '.8rem',
      marginTop: 10,
      marginBottom: 5,
    },
  },
  typoH3Header: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    margin: 50,
    marginBottom: 100,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1rem',
      marginTop: 50,
      marginBottom: 0,
    },
  },
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    marginTop: 20,
    [theme.breakpoints.down('xs')]: {
      //marginTop: 'calc(100vh * .10)',
      fontsize: '1.8rem',
    },
    //textOverflow: 'ellipsis',
  },
  container: {
    textAlign: 'center',
    paddingTop: '15%',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 150,
    },
  },
})

const Homepage = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Background />
      <Page
        {...other}
        pictures={{
          left: `/static/Snow_Hikers.jpg`,
        }}
      >
        <div className={classes.container}>
          <Typography variant="title" className={classes.typoHeader}>
            we believe great spirits bring people together to share
          </Typography>
          <Typography variant="title" className={classes.typoHeader}>
            the moments and stories that make life rich.
          </Typography>

          <Typography className={classes.typoH3Header} variant="title">
            you're welcome here.
          </Typography>
          <div style={{ marginTop: '-50px' }}>
            <Hidden mdUp>
              <Headers text="welcome everyone everyone welcome" />
            </Hidden>
            <Hidden smDown>
              <Headers
                text="welcome everyone everyone welcome"
                springConfig={{
                  peek: [
                    {
                      delay: 2000,
                      from: { x: 0, opacity: 1 },
                      to: { x: -150, opacity: 1 },
                      config: { ...config.molasses, duration: 10000 },
                    },
                    {
                      from: { x: 100, opacity: 1 },
                      to: { x: -150, opacity: 1 },
                      config: { ...config.molasses, duration: 10000 },
                    },
                    {
                      from: { x: 100, opacity: 0 },
                      to: { x: 0, opacity: 1 },
                      config: { ...config.molasses, duration: 5000 },
                    },
                  ],
                }}
              />
            </Hidden>
          </div>
        </div>
      </Page>
    </Fragment>
  )
}

export default compose(
  checkCookie,
  withStyles(styles)
)(Homepage)
