import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Headers from '../components/ScrollingHeaders'

const styles = theme => ({
  root: {
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      marginTop: 90,
    },
  },
})

const MobileScrollingHeader = props => {
  const {
    classes,
    headerText,
    height,
    direction,
    alignItems,
    override,
    ...other
  } = props
  const styleOverride = Object.assign({}, { height: height }, override || {})
  return (
    <Grid
      container
      className={classes.root}
      alignItems={alignItems || 'flex-start'}
      direction={direction || 'row'}
      style={styleOverride}
      spacing={0}
    >
      <Grid item xs zeroMinWidth>
        <Headers text={headerText} {...other} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(MobileScrollingHeader)
