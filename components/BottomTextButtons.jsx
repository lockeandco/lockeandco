import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'
import SocialButtons from './SocialButtons'
import Link from 'next/link'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.65em',
  },
  paper: {
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  paperActive: {
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: '#C36D15',
    textAlign: 'center',
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

const links = [
  {
    name: 'merchandise',
    link: '/merchandise',
    order: 0,
  },
  {
    name: 'stay connected',
    link: '/stay-connected',
    order: 1,
  },
]

function TextButtons(props) {
  const { classes, route } = props
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        direction="row"
        justify="space-around"
      >
        <Grid item xs>
          <SocialButtons />
        </Grid>
        {links.map(item => {
          return (
            <Grid key={item.name} item xs>
              <Paper
                className={
                  route === item.link ? classes.paperActive : classes.paper
                }
              >
                <Link href={`${item.link}`} >
                  <Button className={classes.button}>{item.name}</Button>
                </Link>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  )
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextButtons)
