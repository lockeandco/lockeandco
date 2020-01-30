import React, { Fragment } from 'react'
import Page from '../components/PageLayout'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Headers from '../components/ScrollingHeaders'
import Typography from '@material-ui/core/Typography'
import CommonHeader from '../components/MobileScrollingHeader'
import Hidden from '@material-ui/core/Hidden'
import withPageTransition from '../components/withPageTransition'
const styles = theme => ({
  paperMdUp: {
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    margin: 10,
    borderRadius: 0,
    padding: '1em',
    boxShadow: 'unset',
    color: '#E2DED5',
    fontFamily: 'Flama',
    overflow: 'auto',
    //paddingBottom: 30,
  },
  typoMdUp: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'Flama',
    fontSize: '1.1rem',
    fontWeight: 500,
    overflow: 'auto',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.3rem',
    },
  },
  paper: {
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    margin: '1px 10px 10px 10px',
    borderRadius: 0,
    padding: '1em',
    paddingLeft: 2,
    boxShadow: 'unset',
    color: '#E2DED5',
    fontFamily: 'Flama',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      borderRadius: 'unset',
      backgroundColor: 'transparent',
      overflow: 'auto',
      paddingRight: `10%`,
      paddingLeft: `10%`,
      paddingTop: 150,
    },
  },
  card: {
    maxWidth: 190,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 0,
    padding: '10px 10px 10px 10px',
    marginTop: -20,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 350,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 0,
      padding: '10px 10px 10px 15px',
      marginTop: -20,
    },
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    fontWeight: 900,
    textShadow: '1px 1px rgb(36, 55, 70)',
    fontSize: '.8rem',
    [theme.breakpoints.up('sm')]: {
      color: '#E2DED5',
      fontFamily: 'Flama',
      fontWeight: 900,
      textShadow: '1px 1px rgb(36, 55, 70)',
      fontSize: '.9rem',
    },
  },
  wideCard: {
    minWidth: 260,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 0,
    padding: '5px 5px 5px 5px',
    marginTop: -20,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 0,
      padding: '5px 5px 5px 15px',
      marginTop: -20,
      marginBottom: 20,
    },
  },
})

const Spirits = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: `/Bottle_Creek.jpg`,
          size: '100%',
        },
        rightTop: {
          url: `/Aspen_Logs.jpg`,
          size: '50%',
        },
        rightBottom: {
          url: `/Close_Up_Aspen_Leaves.jpg`,
          size: '50%',
        },
      }}
      text={{
        position: 'rightBottom',
        component: (
          <React.Fragment>
            <Hidden mdUp>
              <Paper className={classes.paper}>
                <div className={classes.card}>
                  <Typography
                    className={classes.typo}
                    variant="body1"
                    paragraph
                  >
                    Locke + Co. Whiskey welcomes everyone and everyone is
                    welcome, whether around a campfire or a fine-dining table.
                    Remarkably smooth and flavorful, our small-barrel, Aspen-
                    Aged craft spirit helps create the warmth and personal
                    connection of good times and great memories.
                  </Typography>
                  <Typography className={classes.typo} variant="body1">
                    Aged, bottled and blended by sixth-generation Coloradans,
                    Locke + Co. Whiskey results from the secrets and traditions
                    of moonshiners on a mission: to make a whiskey among the
                    best in the West.
                  </Typography>
                </div>
              </Paper>
            </Hidden>
            <Hidden smDown>
              <Paper className={classes.paperMdUp}>
                <Typography className={classes.typoMdUp} paragraph>
                  Locke + Co. Whiskey welcomes everyone and everyone is welcome,
                  whether around a campfire or a fine-dining table. Remarkably
                  smooth and flavorful, our small-barrel, Aspen- Aged craft
                  spirit helps create the warmth and personal connection of good
                  times and great memories. Aged, bottled and blended by
                  sixth-generation Coloradans, Locke + Co. Whiskey results from
                  the secrets and traditions of moonshiners on a mission: to
                  make a whiskey among the best in the West.
                </Typography>
              </Paper>
            </Hidden>
          </React.Fragment>
        ),
      }}
      header={{
        position: 'rightBottom',
        component: <CommonHeader headerText={`a taste like none other`} />,
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
)(Spirits)
