import React, { Fragment } from 'react'
import Page from '../components/Page1x25050R'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Headers from '../components/ScrollingHeaders'
import Typography from '@material-ui/core/Typography'

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
     // height: '100%',
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

const Spirits = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Background />

      <Page
        {...other}
        pictures={{
          left: `/static/Bottle_Creek.jpg`,
          rightTop50: `/static/Aspen_Logs.jpg`,
          rightBottom50: `/static/Close_Up_Aspen_Leaves.jpg`,
        }}
      >
        <Grid container spacing={16}>
          <Grid item xs zeroMinWidth>
            <Headers text="a taste like none other" />
          </Grid>
        </Grid>

        <Paper className={classes.paper}>
          <div className={classes.card}>
            <Typography className={classes.typo} variant="body1" paragraph>
              Locke + Co. Whiskey welcomes everyone and everyone is welcome,
              whether around a campfire or a fine-dining table. Remarkably
              smooth and flavorful, our small-barrel, Aspen- Aged craft spirit
              helps create the warmth and personal connection of good times and
              great memories. Aged, bottled and blended by sixth-generation
              Coloradans, Locke + Co. Whiskey results from the secrets and
              traditions of moonshiners on a mission: to make a whiskey among
              the best in the West.
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
)(Spirits)
