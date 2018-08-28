import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Content from './ContentCard'
import compose from 'ramda/src/compose'
import { withWindowSize } from 'react-fns'
import withTransition from './withTransition'
import Typography from '@material-ui/core/Typography'
import AgeVerification from './AgeVerification'
import Test from '../markdown/about-us.mdx'

const styles = theme => ({
  root: {},
  demo: {
    height: `100%`,
    flexGrow: 1,
 //   overflow: 'auto',
    minHeight: '100vh',
  },
  paper: {
    //  display: 'flex',
    //padding: theme.spacing.unit * 2,
    //height: '100%',
    //color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    // overflow: 'auto',
    // marginBottom: `calc(20% + 90px)`,
    // marginTop: `calc(15% + 90px)`,
    // marginRight: `calc((100% - 300px)/2)`,
    // marginLeft: `calc((100% - 300px)/2)`,
    //overflow: 'auto'
    // minWidth: 300,
    //display: 'flex',
    backgroundColor: 'transparent',
    borderRadius: 0,
    //opacity: 0.7,
    paddingTop: '40%',
    //flexGrow: 1,
    //flexDirection: 'column',
    //boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    //margin: theme.spacing.unit,
    //color: '#E2DED5',
    //fontFamily: 'Flama',
    overflow: 'auto',
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
  },
  typoHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '3rem',
    overflow: 'hidden',
    textShadow: '2px 2px #ff0000',
    margin: 5,
  },
  typosubHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '1.1rem',
    overflow: 'hidden',
    // margin: 5,
  },
})

const PageLayout1x26040 = props => {
  const { classes, pictures } = props
  return (
    <Grid
      container
      spacing={0}
      className={classes.demo}
      alignItems={'stretch'}
      direction={'row'}
      justify={'center'}
      wrap="nowrap"
    >
      <Grid item xs={12} sm={6}>
        <Grid
          container
          spacing={0}
          className={classes.demo}
          direction="column"
          alignItems={'stretch'}
          // direction={'column'}
          //wrap="nowrap"
        >
          <Grid
            item
            xs={12}
            sm={12}
            style={{
              // height: height,
              paddingTop: 60,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${pictures.left})`,
              backgroundRepeat: 'no-repeat',
              textAlign: 'center',
            }}
          >
{props.children}
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid item xs={12} xs={6}>
          <Grid
            container
            spacing={0}
            className={classes.demo}
            alignItems={'stretch'}
            direction={'row'}
            // justify={'center'}
            //wrap="nowrap"
          >
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                padding: 'unset',
                //height: '100%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${pictures.right})`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

PageLayout1x26040.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withTransition
)(PageLayout1x26040)
