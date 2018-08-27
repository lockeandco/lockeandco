import React, { Fragment } from 'react'
import Page from '../components/Page1x15050'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
const CheckAge = props => (
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
      {...props}
      pictures={{
        left: `/static/Golden_Aspen_Tree_Grove.jpg`,
        right: `/static/tools.jpg`,
      }}
    />
  </Fragment>
)
class CookieChecker extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
      isVerified: cookies.get('isVerified') || false,
      remember: cookies.get('remember') || false,
    }
  }
  async check() {
    await this.setState({
      isVerified: cookies.get('isVerified') || false,
    })
  }
  componentDidMount() {
    this.check()
  }

  handleVerified(verified) {
    const { cookies } = this.props

    cookies.set('isVerified', verified, { path: '/' })
    this.setState({ isVerified })
  }

  handleRemember(remember) {
    const { cookies } = this.props

    cookies.set('remember', remember, { path: '/' })
    this.setState({ remember })
  }
  render() {
    return this.props.render(this.state)
  }
}
const CookieCheckerWithCookies = withCookies(CookieChecker)
function withCookie(Component) {
  return class extends React.Component {
    render() {
      return (
        <CookieCheckerWithCookies
          render={mouse => {
            console.log('PROPSSSS', this.props)
            return mouse.isVerified ? (
              <CheckAge {...this.props} mouse={mouse} />
            ) : (
              <Component {...this.props} mouse={mouse} />
            )
          }}
        />
      )
    }
  }
}

export default CheckAge
