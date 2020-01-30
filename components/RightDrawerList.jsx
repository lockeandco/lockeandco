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
import {
  MapSearch,
  BookOpenPageVariant,
  AccountMultiple,
  Keg,
  At,
  Cart,
  Email,
} from 'mdi-material-ui'
import { compose } from 'ramda'
import Link from 'next/link'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    maxWidth: 300,
    backgroundColor: `#D6D1C4`,
  },
  listItemText: {
    color: 'rgb(36, 55, 70)',
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

const linkList = [
  {
    name: 'spirits',
    link: '/spirits',
    page: 0,
    icon: <Keg style={{ color: '#C36D15' }} />,
  },
  {
    name: 'co-founders',
    link: '/co-founders',
    page: 1,
    icon: <AccountMultiple style={{ color: '#C36D15' }} />,
  },
  {
    name: 'our story',
    link: '/our-story',
    page: 2,
    icon: <BookOpenPageVariant style={{ color: '#C36D15' }} />,
  },
  {
    name: 'find us',
    link: '/find-us',
    page: 3,
    icon: <MapSearch style={{ color: '#C36D15' }} />,
  },
  {
    name: 'contact us',
    link: '/contact-us',
    page: 4,
    icon: <Email style={{ color: '#C36D15' }} />,
  },
  {
    name: 'stay connected',
    link: '/stay-connected',
    page: 5,
    icon: <At style={{ color: '#C36D15' }} />,
  },
  {
    name: 'merchandise',
    link: '/merchandise',
    page: 6,
    icon: <Cart style={{ color: '#C36D15' }} />,
  },
]

function RightDrawerList(props) {
  const { classes, toggleDrawer, route, Router } = props
  console.log('RDL', props)
  return (
    <div className={classes.root}>
      <List component="nav">
        {linkList.map(item => (
          <Link key={item.name} href={item.link} >
            <ListItem
              button
              onClick={toggleDrawer(false)}
              className={
                route === item.link ? classes.buttonActive : classes.button
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText
                disableTypography
                component
                primary={item.name}
                component="a"
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
}

RightDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RightDrawerList)
