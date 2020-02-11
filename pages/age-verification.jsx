import React, { Fragment } from 'react'
import Page from '../components/Page1x15050'
import { Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography'
import AgeVerification from '../components/AgeVerification'
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
    margin: '10px 5px 25px 5px',
    textShadow: '1px 1px black',
  },
  card: {
    // marginTop: `calc(15% + 90px)`,
    // marginRight: `calc(25%)`,
    // marginLeft: `calc(25%)`,
    //display: 'flex',
    backgroundColor: 'rgba(0,0,0,.9)',
    borderRadius: 0,
    opacity: 0.7,
    padding: '1.5em',
    //flexGrow: 1,
    //flexDirection: 'column',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    //margin: theme.spacing(1),
  },
})

const CheckAge = withStyles(styles)(props => {
  console.log('PROPS', props)
  const { classes, ...other } = props
  return (
    <Fragment>
      <Page
        {...other}
        pictures={{
          left: `Golden_Aspen_Tree_Grove.jpg`,
          right: `tools.jpg`,
        }}
      >
        <Typography variant="body1" className={classes.typoHeader}>
          locke + cO
        </Typography>
        <Typography variant="h6" className={classes.typosubHeader}>
          welcome.
        </Typography>
        <Typography variant="h6" className={classes.typosubHeader}>
          you are in good company here
        </Typography>
        <div className={classes.card}>
          <AgeVerification {...other} />
        </div>
      </Page>
    </Fragment>
  )
})

class CookieChecker extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }
  async getCookies() {
    const isVerified = await this.props.cookies.get('isVerified')
    console.log(isVerified)
    if (isVerified === 'false') {
      console.log('isVerified', isVerified)
      Router.replace('/spirits')
    }
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
    return (
      <CheckAge
        {...this.props}
        handleVerified={this.handleVerified.bind(this)}
        handleRememberMe={this.handleRemember.bind(this)}
        rememberMe={this.state.remember}
      />
    )
  }
}

export default CookieChecker
