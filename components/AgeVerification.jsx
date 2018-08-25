import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  yesButton: {
    margin: theme.spacing.unit,
    backgroundColor: 'rgb(195, 109, 21)',
    color: 'rgb(36, 55, 70)',
    fontWeight: 600,
  },
  noButton: {
    margin: theme.spacing.unit,
    backgroundColor: 'rgb(36, 55, 70)',
    color: 'rgb(195, 109, 21)',
    fontWeight: 600,
  },
})

function ContainedButtons(props) {
  const { classes } = props
  return (
    <React.Fragment>
      <div>
        <Button variant="contained" className={classes.yesButton}>
          Heck Yes!
        </Button>
        <Button variant="contained" className={classes.noButton}>
          Not Yet
        </Button>
      </div>
      <FormGroup row style={{ alignContent: 'center' }}>
        <FormControlLabel
          control={<Checkbox checked={true} value="checkedA" />}
          label="Remember Me"
        />
      </FormGroup>
    </React.Fragment>
  )
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ContainedButtons)
