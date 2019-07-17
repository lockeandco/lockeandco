import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import { Facebook, Twitter, Instagram, MapSearch } from 'mdi-material-ui'
import Router from 'next/router'
import Hidden from '@material-ui/core/Hidden'
import LeftDrawer from './LeftDrawer'

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

  tooltip: {
    padding: '10px 15px',
    minWidth: '130px',
    color: '#555555',
    lineHeight: '1.7em',
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '3px',
    boxShadow:
      '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    maxWidth: '200px',
    textAlign: 'center',
    fontFamily: '"Flama","Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '0.875em',
    fontStyle: 'normal',
    fontWeight: '400',
    textShadow: 'none',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'normal',
    lineBreak: 'auto',
  },
})

const socialIcons = [
  {
    icon: c => <Facebook className={c} />,
    href: 'https://www.facebook.com/LockeandCoDistilling/',
    name: 'Facebook',
  },
  {
    icon: c => <Instagram className={c} />,
    href: 'https://www.instagram.com/lockecodistilling/',
    name: 'Instagram',
  },
  {
    icon: c => <Twitter className={c} />,
    href: 'https://twitter.com/LockeDistilling',
    name: 'Twitter',
  },
  // {
  //   icon: c => <MapMarker className={c} />,
  //   href: '/find-us',
  //   name: 'Find Us',
  // },
]

function TextButtons(props) {
  const { classes, ...other } = props
  return (
    <Paper className={classes.paper}>
      {socialIcons.map(ico => (
        <Tooltip
          key={ico.href}
          id={`tooltip-${ico.name}`}
          title={`Follow us on ${ico.name}`}
          placement={'bottom'}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton href={ico.href} target="_blank">
            {ico.icon(classes.socialIcons)}
          </IconButton>
        </Tooltip>
      ))}
      <Hidden mdUp>
        <Tooltip
          id={`tooltip-find-us`}
          title={`Find Places Carrying our Aspen Aged Whiskey!`}
          placement={'bottom'}
          classes={{ tooltip: classes.tooltip }}
        >
          <LeftDrawer Router={Router} {...other} />
        </Tooltip>
      </Hidden>
    </Paper>
  )
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextButtons)
