import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { compose, head, map, omit } from 'ramda'
import { title } from 'change-case'

// console.log('CITIES', cities)
// const citiesF = cities.map(x => {
//   return Object.assign(
//     {},
//     { city: head(x.formatted_address.split(',')) },
//     { location: x.location }
//   )
// })

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'flama',
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

// const addDash = str =>
//   str.split(' ').length > 1 ? str.split(' ').join('-') : str
function TextButtons(props) {
  const { classes, route, Router, citiesF } = props
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
        {citiesF.map(item => {
          return (
            <Grid key={item.city} item xs>
              <Paper
                className={
                  route === item.city ? classes.paperActive : classes.paper
                }
              >
                <Button
                  className={classes.button}
                  onClick={() => alert(item.city)}
                >
                  {item.city}
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
