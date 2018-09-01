//
//
//
//
//
//
//Deprecated
//
//
//
//
//
//
//
//
//
//
//

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
  demo: {
    height: `100%`,
    flexGrow: 1,
    //  overflow: 'auto',
    minHeight: '100vh',
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

        <Grid item xs={6} >
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
              style={{
                height: '60%',
                padding: 'unset',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${pictures.rightBottom50})`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs zeroMinWidth style={{ overflow: 'hidden' }}>
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
              <Grid container spacing={0}>
                <Grid
                  item
                  xs
                  zeroMinWidth
                  style={{ overflow: 'hidden', marginTop: 90 }}
                >
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
