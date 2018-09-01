import React, { Component } from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/SnackbarContent'
import CustomSnackbar from './Snackbars'
import Router from 'next/router'
const url =
  'https://locke-co.us18.list-manage.com/subscribe/post?u=8aeed6c1985a567aeb3b561e3&amp;id=8c8ccc3829'

// simplest form (only email)
//export const SimpleForm = () => <MailchimpSubscribe url={url} />

// use the render prop and your custom form

class StyleForm extends Component {
  state = {}

  handleChange = name => event => {
    //console.log(event)
    this.setState({ email: event.target.value })
  }

  handleSubmit = () => {
    console.log(this.state)
    this.props.onSubmitted({ EMAIL: this.state.email })
    this.setState({ email: '' })
  }
  handleChange = this.handleChange.bind(this)
  handleSubmit = this.handleSubmit.bind(this)
  render() {
    return (
      this.props.show || (
        <React.Fragment>
          <TextField
            key={'input'}
            id="email"
            label="Newsletter"
            name="email"
            value={this.state.email || ''}
            onChange={this.handleChange('email')}
            placeholder="Enter Your Email"
            fullWidth
            style={{
              maxWidth: '85%',
            }}
          />
          <Button
            style={{
              marginTop: 20,
              fontFamily: 'Flama',
              fontWeight: 'bold',
              color: 'rgb(36, 55, 70)',
            }}
            key={'button'}
            onClick={this.handleSubmit}
            type="submit"
          >
            Sign Me Up!
          </Button>
        </React.Fragment>
      )
    )
  }
}
const CustomForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => {
      console.log(message)
      const close = () => Router.push('/')
      return (
        <div>
          <StyleForm
            show={status}
            onSubmitted={formData => {
              subscribe(formData)
            }}
          />
          {status === 'sending' && (
            <CustomSnackbar
              variant="info"
              message={'Sending ...'}
              onClose={close}
            />
          )}
          {status === 'error' && (
            <CustomSnackbar
              variant="error"
              onClose={close}
              message={<div dangerouslySetInnerHTML={{ __html: message }} />}
            />
          )}
          {status === 'success' && (
            <CustomSnackbar
              variant="success"
              message={"You're all signed up for the newsletter!"}
              onClose={close}
            />
          )}
        </div>
      )
    }}
  />
)

export default CustomForm
