import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import enumerations from '../lib/form_enumerations'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})
class ContactUs extends React.Component {
  state = {
    age: '',
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { classes, ...other } = this.props
    return (
      <div>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="age-required">About You</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            name="age"
            inputProps={{
              id: 'age-required',
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {enumerations.map(x => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles)(ContactUs)
