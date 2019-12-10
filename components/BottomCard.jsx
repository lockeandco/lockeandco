import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { compose } from 'ramda'

const styles = theme => ({
  card: {
    maxWidth: 275,
    maxHeight: 90,
    minHeight: 90,
    bottom: 0,
    right: 0,
    left: 'auto',
    width: '100%',
    display: 'flex',
    zIndex: 1100,
    borderRadius: 'unset',
    boxSizing: 'border-box',
    boxShadow: 'unset',
    flexShrink: 0,
    flexDirection: 'column',
    position: 'fixed',
    backgroundPosition: 'center center',
    backgroundSize: 'contain, cover',
    //backgroundImage: `url(/hearFromYou.png)`,
    background: `rgb(226, 222, 213)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    direction: 'row',
    '&:lastChild': {
      padding: 'unset',
    },
  },
  button: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
    padding: 'unset',
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
  content: {
    padding: 'unset',
    '&:last-child': {
      padding: 'unset',
    },
  },
  itemText: {
    padding: 'unset',
    marginRight: 2,
    marginLeft: 2,
  },
})
function SimpleCard(props) {
  const { classes, Router, route } = props

  return (
    <Card
      className={classes.card}
      style={{ backgroundColor: route === '/contact-us' && '#C36D15' }}
    >
      <CardContent className={classes.content}>
        <ListItem
          button
          onClick={() => Router.push('/contact-us')}
          className={classes.button}
        >
          <Avatar src="/leaf.png" />
          <ListItemText
            disableTypography
            primary="we'd love to hear from you"
            className={classes.itemText}
          />
        </ListItem>
      </CardContent>
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)
