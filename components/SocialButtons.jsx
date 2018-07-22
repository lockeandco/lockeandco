import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
  },
  paper: {
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: 'transparent',
    textAlign: 'center',
    minWidth: 200,
  },
  paperActive: {
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: '#C36D15',
    textAlign: 'center',
  },
  buttonActive: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'Flama',
  },
  socialIcons: {
    float: 'left',
    margin: theme.spacing.unit * 2,
    color: '#E2DED5',
    fontWeight: 'bold',
    position: 'relative',
    fontSize: '20px !important',
    //paddingLeft: 75,
    marginRight: '15px',
  },
})

const socialIcons = ['fab fa-facebook', 'fab fa-twitter', 'fab fa-instagram']

function TextButtons(props) {
  const { classes, goToSlide, page } = props
  console.log(props)
  return (
    <Paper className={classes.paper}>
      {socialIcons.map(ico => (
        <IconButton key={ico}>
          <Icon className={classNames(classes.socialIcons, ico)} />
        </IconButton>
      ))}
    </Paper>
  )
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextButtons)
