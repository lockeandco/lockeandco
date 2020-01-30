import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import CustomCard from './Cards'
import MenuButtons from './FindUsTextButtons'
import RightDrawer from './RightDrawer'
import Router from 'next/router'

const lockeCoCities = compose(flatten, map(omit(['list'])))

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  toolBar: {
    backgroundColor: 'rgb(36, 55, 70)',
    minHeight: 45,
    justifyContent: 'center',
  },
}

function TopMenu(props) {
  const { classes, route, lockeColocs, ...other } = props
  console.log(lockeColocs)
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolBar} disableGutters={true}>
        <Hidden smDown>
          <MenuButtons
            route={route}
            Router={Router}
            citiesF={lockeCoCities(lockeColocs)}
          />
        </Hidden>
      </Toolbar>
    </div>
  )
}

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopMenu)
