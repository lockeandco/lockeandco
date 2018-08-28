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
    opacity: 'unset'
  },
  input: {
    display: 'none',
    opacity: 'unset'
  },
  yesButton: {
    margin: theme.spacing.unit,
    backgroundColor: 'rgba(195, 109, 21, 1)',
    color: 'rgb(36, 55, 70)',
    fontWeight: 600,
    opacity: 'unset'
  },
  noButton: {
    margin: theme.spacing.unit,
    backgroundColor: 'rgba(36, 55, 70, 1)',
    color: 'rgb(195, 109, 21)',
    fontWeight: 600,
    opacity: 'unset'
  },

  label: { color: '#E2DED5', fontWeight: 700 },
})

function ContainedButtons(props) {
  const { classes, rememberMe, handleRememberMe, handleVerified } = props

  return (
    <React.Fragment>
      <div>
        <Button
          variant="contained"
          className={classes.yesButton}
          onClick={handleVerified}
        >
          Heck Yes!
        </Button>
        <Button
          variant="contained"
          className={classes.noButton}
          onClick={() =>
            window
              ? window.location.assign('https://www.responsibility.org/')
              : null
          }
        >
          Not Yet
        </Button>
      </div>
      <FormGroup row style={{ justifyContent: 'center', marginTop: 10 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              value="rememberMe"
              onChange={() => handleRememberMe(rememberMe)}
            />
          }
          classes={{
            label: classes.label,
          }}
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
