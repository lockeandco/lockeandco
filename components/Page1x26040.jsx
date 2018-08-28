import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Content from './ContentCard'
import compose from 'ramda/src/compose'
import { withWindowSize } from 'react-fns'
import withTransition from './withTransition'

const styles = theme => ({
  root: {},
  demo: {
    height: '100vh',
    flexGrow: 1,
    //  overflow: 'hidden',
  },
  paper: {
    //padding: theme.spacing.unit * 2,
    height: '100%',
    //color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    paddingBottom: `calc(10% + 90px)`,
    paddingTop: `calc(15% + 90px)`,
    paddingRight: `calc((100% - 300px)/2)`,
    paddingLeft: `calc((100% - 300px)/2)`,
  },
  card: {
    // marginTop: `calc(15% + 90px)`,
    // marginRight: `calc(25%)`,
    // marginLeft: `calc(25%)`,
    minWidth: 200,
    //display: 'flex',
    backgroundColor: 'rgba(0,0,0,.9)',
    borderRadius: 0,
    opacity: 0.7,
    padding: '1em',
    //flexGrow: 1,
    //flexDirection: 'column',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    //margin: theme.spacing.unit,
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
  },
})

const PageLayout1x26040 = props => {
  const { classes, pictures } = props
  return (
    <Grid
      container
      spacing={16}
      className={classes.demo}
      alignItems={'stretch'}
      direction={'row'}
      justify={'center'}
      wrap="nowrap"
    >
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          padding: 'unset',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${pictures.left.url})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        {props.children}
      </Grid>
      <Hidden xsDown>
        <Grid item xs={12} sm={6} style={{ padding: 'unset' }}>
          <Paper
            className={classes.paper}
            style={{
              height: `${pictures.rightTop.size}`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${pictures.rightTop.url})`,
              backgroundRepeat: 'no-repeat',
            }}
          />
          <Paper
            className={classes.paper}
            style={{
              height: `${pictures.rightBottom.size}`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${pictures.rightBottom.url})`,
              backgroundRepeat: 'no-repeat',
            }}
          />
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
