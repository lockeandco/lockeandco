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
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '80%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})
class ContactUs extends React.Component {
  state = {
    age: '',
    name: '',
    message: '',
    email: '',
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { classes, ...other } = this.props
    return (
      <div className={classes.root}>
        <TextField
          id="name"
          label="Name"
          name="name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          name="email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
          type="email"
        />
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
        <TextField
          id="message"
          label="Send Us a Message"
          name="message"
          className={classes.textField}
          value={this.state.message}
          onChange={this.handleChange}
          margin="normal"
          multiline
          fullWidth
          rows={10}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ContactUs)
