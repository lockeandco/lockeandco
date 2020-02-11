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
import {
  FacebookBox as Facebook,
  Twitter,
  Instagram,
  MapSearch,
} from 'mdi-material-ui'
import Router from 'next/router'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  button: {
    margin: theme.spacing(4),
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(2),
  },
  iconButton: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  paper: {
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: 'transparent',
    textAlign: 'center',
    minWidth: 200,
  },
  //   paperActive: {
  //     borderRadius: 'unset',
  //     boxShadow: 'unset',
  //     backgroundColor: '#C36D15',
  //     textAlign: 'center',
  //   },
  //   buttonActive: {
  //     margin: theme.spacing(1),
  //     color: '#E2DED5',
  //     fontFamily: 'Flama',
  //   },
  socialIcons: {
    float: 'left',
    margin: theme.spacing(1),
    color: 'rgb(36, 55, 70)',
    fontWeight: 'bold',
    position: 'relative',
    fontSize: '50px !important',
    //paddingLeft: 75,
    //marginRight: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '45px !important',
    },
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
  typo: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'Flama',
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
  typoBody: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'Flama',
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      marginBottom: 10,
    },
  },
  typoTitle: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'Flama',
    marginBottom: 30,
    marginTop: 100,
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
      marginTop: 50,
    },
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
  const { classes } = props
  console.log(props)
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.typo}>
        Follow Us!
      </Typography>
      {socialIcons.map(ico => (
        <Tooltip
          key={ico.href}
          id={`tooltip-${ico.name}`}
          title={`Follow us on ${ico.name}`}
          placement={'bottom'}
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            className={classes.iconButton}
            href={ico.href}
            target="_blank"
          >
            {ico.icon(classes.socialIcons)}
          </IconButton>
        </Tooltip>
      ))}
      <Typography variant="h6" className={classes.typoTitle}>
        Sign up for our Newsletter
      </Typography>
      <Typography variant="body1" className={classes.typoBody}>
        (We promise not to send too many cat videos . . . probably)
      </Typography>
    </Paper>
  )
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextButtons)
