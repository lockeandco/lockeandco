import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    marginTop: `calc(12.5% + 90)`,
    marginRight: `calc(10%)`,
    marginLeft: `calc(10%)`,
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,.9)',
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
    flexGrow: 1,
    flexDirection: 'column',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'Flama',
    overflow: 'hidden',
  },
})

function SimpleCard(props) {
  const { classes, children } = props

  return (
    <Paper className={classes.card}>
      <div className={classes.content}>

      
        </div>
    </Paper>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)
