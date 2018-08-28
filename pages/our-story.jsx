import React, { Fragment } from 'react'
import Page from '../components/Page1x26040'
import Background from '../components/TransitionBackground'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'

const styles = theme => ({
  root: {},
  demo: {
    height: '100vh',
    flexGrow: 1,
    minWidth: '100vw',
    minHeight: '100vh',
    width: '100%',
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
    paddingBottom: 200, 
    //opacity: 0.7,
    padding: '1em',
    //flexGrow: 1,
    //flexDirection: 'column',
    //boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    boxShadow: 'unset',
    //margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'Flama',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      height: '100%',
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

const OurStory = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Background />
      <Page
        {...other}
        pictures={{
          left: {
            url: `/static/Man_Looking_Over_Cliff.jpg`,
            size: '100%',
          },
          rightTop: {
            url: `/static/Moonshine_Jars.jpg`,
            size: '60%',
          },
          rightBottom: {
            url: `/static/Group_with_Sparklers.jpg`,
            size: '40%',
          },
        }}
      >
        <Paper className={classes.paper}>
          <div className={classes.card}>
            <Typography variant="body1" paragraph className={classes.typo}>
              The Locke’s family roots in Colorado moonshining go back several
              generations. Owen Locke kept the craft tradition alive with an
              early knack for brewing that continued through college to graduate
              school, where he reconnected with Rick Talley.
            </Typography>
            <Typography variant="body1" paragraph className={classes.typo}>
              The high school friends and lacrosse teammates immediately
              recognized that their collaborative styles complimented each other
              well, working through MBA degrees together at the University of
              Denver’s Daniels College of Business as hand sale experts for Beam
              Suntory. It didn’t take them long to realize they could create
              something bolder and wilder than the premier spirits they offered
              at countless tastings. In 2010, the team bought a 23-gallon still
              that turned a garage hobby into a lifestyle with their first
              whiskey batches aged in small barrels.
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
)(OurStory)
