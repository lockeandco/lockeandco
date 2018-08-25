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
    name: 'co-founders',
    order: 0,
  },
  {
    name: 'our story',
    order: 1,
  },
  {
    name: 'spirits',
    order: 2,
  },
  {
    name: 'find us',
    order: 3,
  },
]

const addDash = str =>
  str.split(' ').length > 1 ? str.split(' ').join('-') : str
function TextButtons(props) {
  const { classes, goToSlide, page } = props
  console.log(props)
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
          console.log(item, page, page === item.order)
          return (
            <Grid key={item.name} item xs>
              <Paper
                className={
                  page === item.order ? classes.paperActive : classes.paper
                }
              >
                <Button
                  className={classes.button}
                  onClick={() => Router.push(`/`.concat(addDash(item.name)))}
                >
                  {item.name}
                </Button>
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
