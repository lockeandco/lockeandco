import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'

const styles = {
  card: {
    maxWidth: 275,
    maxHeight: 90,
    minHeight: 90,
    top: 0,
    left: 0,
    right: 'auto',
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
    backgroundSize: 'cover',
    backgroundImage: `url(/static/leftCorner.png)`,
    background: `#D6D1C4`,
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
  },
}

function SimpleCard(props) {
  const { classes, goToSlide, route } = props

  return (
    <div>
      <Card className={classes.card} onClick={() => Router.push('/')} >
        <CardContent />
        <CardActions />
      </Card>
    </div>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)
