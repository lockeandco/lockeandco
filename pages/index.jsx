import React, { Fragment } from 'react'
import Page from '../components/PageLayout'
import checkCookie from '../components/NoCookie'
import Router from 'next/router'
import Headers from '../components/ScrollingHeaders'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import Hidden from '@material-ui/core/Hidden'
import { config } from 'react-spring'
import CommonHeader from '../components/MobileScrollingHeader'

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
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
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
    marginTop: 50,
    marginBottom: 100,
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
      marginTop: 30,
      marginBottom: 30,
    },
  },
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      //marginTop: 'calc(100vh * .10)',
      fontsize: '1.8rem',
    },
    //textOverflow: 'ellipsis',
  },
  container: {
    textAlign: 'center',
    paddingTop: '100px',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      paddingTop: 120,
    },
  },
  // scroll: {
  //   [theme.breakpoints.up('md')]: {
  //     marginTop: 0,
  //   },
  //   marginTop: '50px',
  // },
})

const Homepage = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: `/static/Snow_Hikers.jpg`,
          size: `100%`,
        },
        right: {
          url: ``,
          size: 0,
        },
      }}
      leftSize={12}
      rightSize={0}
      text={{
        position: 'left',
        component: (
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
            <Hidden smUp>
              <Headers text="welcome everyone everyone welcome" />
            </Hidden>
            <Hidden xsDown>
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
        ),
      }}
      header={{
        position: ``,
        comoponent: null,
      }}
    />
  )
}

export default compose(
  checkCookie,
  withStyles(styles)
)(Homepage)
