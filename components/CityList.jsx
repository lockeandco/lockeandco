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
import { ChevronDoubleLeft } from 'mdi-material-ui'
import { tap, compose, head, toLower } from 'ramda'
import cities from '../lib/cities.json'

const citiesF = cities.map(x => {
  return Object.assign(
    {},
    { city: toLower(head(x.formatted_address.split(','))) },
    { location: x.location }
  )
})

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    maxWidth: 300,
    backgroundColor: `#D6D1C4`,
  },
  listItemText: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
    //padding: 'unset',
  },
  iconColor: {
    color: '#C36D15',
  },
  button: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
  },
  buttonActive: {
    backgroundColor: '#243746',
    '&:hover': {
      backgroundColor: '#243746',
    },
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.7em',
  },
})
const chevrons = '<<'
function RightDrawerList(props) {
  const { classes, toggleDrawer, route, Router } = props
  console.log(props)
  const handleClick = location =>
    toggleDrawer
      ? compose(
          toggleDrawer,
          tap(props.handleTest)
        )(location)
      : props.handleTest(location)
  return (
    <List>
      {citiesF.map(item => (
        <ListItem
          key={item.city}
          onClick={() => handleClick(item.location)}
          button
          style={{ textAlign: 'center' }}
        >
          <ListItemText
            primaryTypographyProps={{ className: classes.listItemText }}
            primary={item.city}
          />
        </ListItem>
      ))}
    </List>
  )
}

RightDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RightDrawerList)

// <ListItemIcon>
// <span
//   style={{
//     marginRight: 'unset',
//     color: '#E2DED5',
//     fontFamily: 'OldGrowth',
//   }}
// >
//   {chevrons}
// </span>
// </ListItemIcon>
