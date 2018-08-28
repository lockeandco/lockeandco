import React, { Fragment } from 'react'
import Page from '../components/Page1x25050'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Headers from '../components/ScrollingHeaders'

const styles = theme => ({
  root: {},
  demo: {
    height: '100vh',
    flexGrow: 1,
    //  overflow: 'hidden',
  },
  paper1: {
    //padding: theme.spacing.unit * 2,
    height: '100%',
    //color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    paddingBottom: ``,
    paddingTop: `calc(15% + 90px)`,
    paddingRight: `calc((100% - 300px)/2)`,
    paddingLeft: `calc((100% - 300px)/2)`,
  },
  paper: {
    //  display: 'flex',
    //padding: theme.spacing.unit * 2,
    //height: '100%',
    //color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    // marginBottom: `calc(20% + 90px)`,
    // marginTop: `calc(15% + 90px)`,
    // marginRight: `calc((100% - 300px)/2)`,
    // marginLeft: `calc((100% - 300px)/2)`,
    margin: 10,
    //overflow: 'auto'
    // minWidth: 300,
    //display: 'flex',
    //backgroundColor: 'rgba(0,0,0,.9)',
    borderRadius: 0,
    //opacity: 0.7,
    padding: '1em',
    paddingBottom: 200, 
    //flexGrow: 1,
    //flexDirection: 'column',
    //boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    boxShadow: 'unset',
    //margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'Flama',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      //height: '100%',
      //color: theme.palette.text.secondary,
      flexGrow: 1,
      borderRadius: 'unset',
      backgroundColor: 'transparent',
      overflow: 'auto',
      //   top: '50%',
      // //  transform: 'translateY(-50%)',
      // paddingBottom: `calc(15% + 90px)`,
      // paddingTop: `calc(15% + 90px)`,

      paddingRight: `10%`,
      paddingLeft: `10%`,
      paddingTop: 150,
    },
  },
  card: {
    // marginTop: `calc(15% + 90px)`,
    // marginRight: `calc(25%)`,
    // marginLeft: `calc(25%)`,
    minWidth: 200,
    //display: 'flex',
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: 0,
    // opacity: 0.7,
    padding: '1em',
    //flexGrow: 1,
    //flexDirection: 'column',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    //margin: theme.spacing.unit,
    // [theme.breakpoints.up('sm')]: {
    //   transform: 'translateY(50%)',
    // },
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
    },
  },
})

const CoFounders = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Background />

      <Page
        {...other}
        pictures={{
          left: `/static/Bonfire_in_the_Woods.jpg`,
          rightTop50: `/static/Group_Dinner_Table.jpg`,
          rightBottom50: `/static/Woman_in_Hammock.jpg`,
        }}
      >
        <Paper className={classes.paper}>
          <div className={classes.card}>
            <Typography variant="body1" paragraph className={classes.typo}>
              The process of distilling has brought with it valuable
              perspective. After years focused on business development,
              management and client service, as well as giving back (Rick serves
              on Denver Museum of Nature & Science’s Giving Club Council; Owen
              on the board of nonprofit Geneva Glen Camp) both established
              successful careers.
            </Typography>
            <Typography variant="body1" paragraph className={classes.typo}>
              However, the alchemy of creating something new through careful
              selection plus separation helped both distill down their own busy
              working lives. They extracted out one common element: celebrating
              the best of what life in Colorado has afforded.
            </Typography>
            <Typography variant="body1" paragraph className={classes.typo}>
              This guiding principle, of sharing that experience, hit them while
              hand-cutting the aging discs from mature stands of aspen on family
              land flanking Central Colorado’s Mosquito Range. All the best days
              added up. The days spent camping, hiking, biking, fishing,
              snowboarding and skiing: that sunset toast after an unending day
              fly-fishing the Yampa, the warm nip from a flask on a cold
              chairlift, the laughter over a late-summer backyard game of
              cornhole. The unapologetic last howl at the moon.
            </Typography>
          </div>
        </Paper>
      </Page>
    </Fragment>
  )
}
export default compose(
  checkCookie,
  withStyles(styles)
)(CoFounders)
