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

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'hidden',
  },
})

const PageLayout1x100 = props => {
  const { classes, pictures, text } = props
  return (
    <Grid
      container
      spacing={0}
      className={classes.root}
      alignItems={'stretch'}
      direction={'row'}
      justify={'center'}
      wrap="nowrap"
    >
      <Grid
        item
        xs={12}
        style={{
          // height: height,
          paddingTop: 60,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${pictures.left})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        {props.children}
        {text}
      </Grid>
    </Grid>
  )
}

PageLayout1x100.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withTransition
)(PageLayout1x100)
