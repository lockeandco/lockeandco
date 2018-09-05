import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import PeopleIcon from '@material-ui/icons/People'
import DraftsIcon from '@material-ui/icons/Drafts'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'
import { compose } from 'ramda'
import CityList from './CityList'

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    maxWidth: 300,
    backgroundColor: 'rgb(36, 55, 70)',
  },
})

function LeftDrawerList(props) {
  const { classes, toggleDrawer, route, Router, ...other} = props
  return (
    <div className={classes.root}>
      <CityList {...other} toggleDrawer={toggleDrawer} />
    </div>
  )
}

LeftDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LeftDrawerList)
