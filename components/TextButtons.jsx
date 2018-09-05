import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { compose } from 'ramda'
import { title } from 'change-case'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    textTransform: 'unset',
    fontWeight: 'bold',
    fontSize: '0.7em',
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
})

const links = [
  {
    name: 'spirits',
    link: '/spirits',
    order: 0,
  },
  {
    name: 'co-founders',
    link: '/co-founders',
    order: 1,
  },
  {
    name: 'our story',
    link: '/our-story',
    order: 2,
  },

  {
    name: 'find us',
    link: '/find-us',
    order: 3,
  },
]

const addDash = str =>
  str.split(' ').length > 1 ? str.split(' ').join('-') : str
function TextButtons(props) {
  const { classes, route, Router } = props
  console.log('TEXTBUTTON', props)
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        direction="row"
        justify="space-around"
      >
        {links.map(item => {
          return (
            <Grid key={item.name} item xs>
              <Paper
                className={
                  route === item.link ? classes.paperActive : classes.paper
                }
              >
                <Link href={`${item.link}`}>
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
