import React, { Fragment } from 'react'
import CU from '../components/Contact-Us'
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
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import withPageTransition from '../components/withPageTransition'

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
      fontSize: '.7rem',
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
  bottle: {
    height: 'calc(.35 * 100vh)',
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      height: 'calc(.45 * 100vh)',
      width: 'auto',
    },
  },
  paper: {
    marginTop: 30,
    marginBottom: 40,
    width: '70%',
    padding: '30px 30px 30px 30px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: `rgba(226, 222, 213, 0.95)`,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      padding: '15px 15px 15px 15px',
    },
  },
})

const Homepage = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: `/static/Ski_Boots1.jpg`,
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
          <React.Fragment>
            <div className={classes.container}>
              <Hidden smUp>
                <Headers
                  text="welcome everyone everyone welcome"
                  springConfig={{
                    peek: [
                      {
                        delay: 2000,
                        from: { x: 0, opacity: 1 },
                        to: { x: -600, opacity: 1 },
                        config: { ...config.molasses, duration: 13000 },
                      },
                      {
                        from: { x: 100, opacity: 1 },
                        to: { x: -600, opacity: 1 },
                        config: { ...config.molasses, duration: 13000 },
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
              <Hidden xsDown>
                <Headers
                  text="welcome everyone everyone welcome"
                  springConfig={{
                    peek: [
                      {
                        delay: 2000,
                        from: { x: 0, opacity: 1 },
                        to: { x: -200, opacity: 1 },
                        config: { ...config.molasses, duration: 10000 },
                      },
                      {
                        from: { x: 100, opacity: 1 },
                        to: { x: -200, opacity: 1 },
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
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                height: 'auto',
                paddingBottom: 40,
              }}
            >
              <Paper className={classes.paper}>
                <CU {...other} />
              </Paper>
            </div>
            <div
              style={{
                bottom: 40,
                position: 'relative',
                marginTop: 10,
                marginLeft: 50,
              }}
            >
              <img
                src="/static/Bottle.png"
                className={classes.bottle}
                style={{
                  height: 400,
                  width: 'auto',
                  // padding: 1,
                  // border: '1px,solid, #C36D15',
                  // backgroundColor: '#C36D15',
                }}
              />
            </div>
          </React.Fragment>
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
  withStyles(styles),
  withPageTransition({
    yPosition: { from: 0, to: 0 },
    xPosition: { from: 0, to: 0 },
  })
)(Homepage)
