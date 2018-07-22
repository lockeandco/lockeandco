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

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
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
    fontSize: '0.6em',
  },
})

const linkList = [
  {
    name: 'co-founders',
    page: '1',
  },
  {
    name: 'our story',
    page: '2',
    icon: 'fas fa-book-open',
  },
  {
    name: 'spirits',
    page: '3',
  },
  {
    name: 'find us',
    page: '4',
  },
  {
    name: 'contact us',
    page: '5',
  },
  {
    name: 'stay connected',
    page: '6',
  },
  {
    name: 'merchandise',
    page: '7',
  },
]

function RightDrawerList(props) {
  const { classes, page, goToSlide, toggleDrawer } = props
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          onClick={() =>
            compose(
              toggleDrawer(false),
              goToSlide
            )(1)
          }
          className={page === 1 ? classes.buttonActive : classes.button}
        >
          <ListItemIcon>
            <PeopleIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText disableTypography primary="co-founders" />
        </ListItem>
        <ListItem
          button
          onClick={() =>
            compose(
              toggleDrawer(false),
              goToSlide
            )(2)
          }
          className={page === 2 ? classes.buttonActive : classes.button}
        >
          <ListItemIcon>
            <Icon
              className={classNames(classes.iconColor, 'fas fa-book-open')}
            />
          </ListItemIcon>
          <ListItemText disableTypography primary="our story" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button component="a" href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </div>
  )
}

RightDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RightDrawerList)
