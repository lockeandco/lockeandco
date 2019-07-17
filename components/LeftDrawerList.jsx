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
    padding: 10,
  },
})

function LeftDrawerList(props) {
  const {
    classes,
    toggleDrawer,
    route,
    Router,
    lockeColocs = {
      list: [
        {
          formatted_address: '3320 Youngfield St, Wheat Ridge, CO 80033, USA',
          location: {
            lat: 39.7634547,
            lng: -105.1410719,
          },
          city: 'Wheat Ridge',
          place_id: 'ChIJPd14g86Fa4cRtzz3w0mKhN0',
          name: 'Applejack Wine & Spirits',
          site: 'https://applejack.com/',
        },
      ],
      total: 1,
      formatted_address: 'Wheat Ridge, CO, USA',
      city: 'wheat ridge',
      location: {
        lat: 39.766098,
        lng: -105.0772063,
      },
    },
    ...other
  } = props
  console.log('LC', lockeColocs)
  return (
    <div className={classes.root}>
      <CityList
        {...other}
        toggleDrawer={toggleDrawer}
        lockeColocs={lockeColocs}
      />
    </div>
  )
}

LeftDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LeftDrawerList)
