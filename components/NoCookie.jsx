import React, { Fragment } from 'react'
import Page from '../components/Page1x15050'
import { Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography'
import AgeVerification from './AgeVerification'
import { withStyles } from '@material-ui/core/styles'
import { addDays, addHours } from 'date-fns'

const styles = theme => ({
  typoHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '3rem',
    overflow: 'hidden',
    textShadow: '2px 2px black',
    margin: '10% 5px 25px 5px',
  },
  typosubHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '1.1rem',
    overflow: 'hidden',
    textShadow: '1px 1px black',
    margin: '10px 5px 25px 5px',
  },
  typoTitle: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    fontSize: '1.0rem',
    overflow: 'hidden',
    textShadow: '1px 1px black',
    margin: '25px 5px 25px 5px',
  },
})

const CheckAge = withStyles(styles)(props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <div
        style={{
          // height: height,
          display: 'flex',
          minWidth: '100vw',
          minHeight: '100vh',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(/static/Seal_Blue.png)`,
          backgroundRepeat: 'no-repeat',
          zIndex: -1000,
        }}
      />
      <Page
        {...other}
        pictures={{
          left: `/static/Golden_Aspen_Tree_Grove.jpg`,
          right: `/static/tools.jpg`,
        }}
      >
        <Typography variant="display3" className={classes.typoHeader}>
          locke + cO
        </Typography>
        <Typography variant="h6" className={classes.typosubHeader}>
          welcome.
        </Typography>
        <Typography variant="h6" className={classes.typosubHeader}>
          you are in good company here
        </Typography>
        <Typography variant="h6" className={classes.typoTitle}>
          Are you 21 years of age?
        </Typography>
        <AgeVerification {...other} />
      </Page>
    </Fragment>
  )
})

function withCookie(Component) {
  return class CookieChecker extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired,
    }

    constructor(props) {
      super(props)
      const { cookies } = props

      this.state = {
        isVerified: false,
        remember: false,
      }
    }
    async check() {
      const { cookies } = this.props
      await this.setState({
        isVerified: cookies.get('isVerified') === 'true' ? true : false,
        remember: cookies.get('rememberme') === 'true' ? true : false,
      })
    }
    componentDidMount() {
      this.check()
    }

    handleVerified(verified) {
      const { cookies } = this.props

      cookies.set('isVerified', true, {
        path: '/',
        expires: this.state.remember
          ? addDays(Date.now(), 30)
          : addHours(Date.now(), 1),
      })
      this.setState({ isVerified: true })
    }

    handleRemember(remember) {
      const { cookies } = this.props

      cookies.set('rememberme', !remember, { path: '/' })
      this.setState({ remember: !remember })
    }
    render() {
      return this.state.isVerified ? (
        <Component
          {...this.props}
          style={{
            visibility: this.state.isVerifed ? 'visibile' : 'hidden',
          }}
        />
      ) : (
        <CheckAge
          {...this.props}
          handleVerified={this.handleVerified.bind(this)}
          handleRememberMe={this.handleRemember.bind(this)}
          rememberMe={this.state.remember}
          style={{
            visibility: !this.state.isVerified ? 'visibile' : 'collapse',
          }}
        />
      )
    }
  }
}

export default withCookie
