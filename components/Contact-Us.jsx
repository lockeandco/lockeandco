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
    background: 'rgba(226, 222, 213, 0.95)',
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
          variant={'filled'}
          inputProps={{
            style: { background: 'rgba(226, 222, 213, 0.95)' },
          }}
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
          variant={'filled'}
          inputProps={{
            style: { background: 'rgba(226, 222, 213, 0.95)' },
          }}
        />

        <TextField
          value={this.state.aboutyou}
          onChange={this.handleChange}
          variant={'filled'}
          name="aboutyou"
          id="aboutyou"
          label="About You"
          required
          fullWidth
          select
          inputProps={{
            style: { background: 'rgba(226, 222, 213, 0.95)' },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {enumerations.map(x => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="message"
          label="Send Us a Message"
          name="message"
          // className={classes.textField}
          value={this.state.message}
          onChange={this.handleChange}
          margin="none"
          multiline
          fullWidth
          // rows={10}
          variant={'filled'}
          inputProps={{
            style: { background: 'rgba(226, 222, 213, 0.95)' },
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ContactUs)
