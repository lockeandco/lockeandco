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

const styles = {
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
    background: `#D6D1C4`,
  },
}

function SimpleCard(props) {
  const { classes, route, Router } = props

  return (
    <Card className={classes.card}>
      <CardContent>
        <ListItem
          button
          onClick={() =>
            compose(
              toggleDrawer(false),
              Router.push('/contact-us')
            )(page)
          }
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText disableTypography primary={item.name} />
        </ListItem>
      </CardContent>
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)
