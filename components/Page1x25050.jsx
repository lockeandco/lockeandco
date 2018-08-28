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
import Headers from '../components/ScrollingHeaders'

const styles = theme => ({
  root: {},
  // demo: {
  //   height: '100vh',
  //   flexGrow: 1,
  //   //  overflow: 'hidden',
  // },
  demo: {
    height: `100%`,
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100vh',
  },
  // demo: {
  //   height: `100%`,
  //   flexGrow: 1,
  //   overflow: 'auto',
  //   minHeight: '100vh',
  // },
  paper: {
    //  display: 'flex',
    //padding: theme.spacing.unit * 2,
    //height: '100%',
    //color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    marginBottom: `calc(20% + 90px)`,
    marginTop: `calc(15% + 90px)`,
    marginRight: `calc((100% - 300px)/2)`,
    marginLeft: `calc((100% - 300px)/2)`,
    //overflow: 'auto'
    minWidth: 300,
    //display: 'flex',
    backgroundColor: 'rgba(0,0,0,.9)',
    borderRadius: 0,
    opacity: 0.7,
    padding: '1em',
    //flexGrow: 1,
    //flexDirection: 'column',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    //margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'Flama',
    overflow: 'auto',
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
  },
})

const Page = props => {
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
      <Hidden xsDown>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            spacing={0}
            className={classes.demo}
            //   alignItems={'stretch'}
            // direction={'column'}
            //   justify={'center'}
            //wrap="nowrap"
          >
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                // height: height,
                //paddingTop: 60,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${pictures.left})`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              {props.children}
            </Grid>
          </Grid>
        </Grid>

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
                height: '40%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${pictures.rightTop50})`,
                backgroundRepeat: 'no-repeat',
              }}
            />

            <Grid
              item
              xs={12}
              sm={12}
              //style={{ padding: 'unset' }}
              className={classes.bottomdemo}
              style={{
                height: '60%',
                padding: 'unset',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${pictures.rightBottom50})`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Grid container spacing={16}>
                <Grid item xs zeroMinWidth>
                  <Headers text="offical sponsors of a good time" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <Grid
            container
            spacing={0}
            className={classes.demo}
            //   alignItems={'stretch'}
            // direction={'column'}
            //   justify={'center'}
            //wrap="nowrap"
          >
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                // height: height,
                //paddingTop: 60,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${pictures.left})`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Grid container spacing={16}>
                <Grid item xs zeroMinWidth>
                  <Headers text="offical sponsors of a good time" />
                </Grid>
              </Grid>
              {props.children}
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withTransition
)(Page)
