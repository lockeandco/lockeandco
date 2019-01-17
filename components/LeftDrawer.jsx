import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuList from './LeftDrawerList'
import { MapSearch } from 'mdi-material-ui'
import { Keyframes, animated, config } from 'react-spring'
import delay from 'delay'
import { equals, compose, tap } from 'ramda'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import MenuBackIcon from 'mdi-material-ui/Backburger'

const styles = {
  list: {
    width: 380,
  },
}
const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01,
}

const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [
    { delay: 500, from: { x: -100 }, to: { x: 0 }, config: config.slow },
    // { delay: 800, to: { x: -100 }, config: config.slow },
  ],
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(400)
    await call({ to: { x: -100 }, config: config.gentle })
  },
})
const Content = Keyframes.Trail({
  peek: [
    { delay: 600, from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } },
    // { to: { x: -100, opacity: 0 } },
  ],
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: -100, opacity: 0 } },
})

class LeftDrawer extends React.Component {
  state = {
    open: undefined,
  }

  componentDidUpdate(p, v, s) {
    this.props.route !== '/find-us' &&
      p.route === '/find-us' &&
      this.setState({
        open: undefined,
      })
  }

  toggleDrawer = () =>
    this.setState(state => ({
      open: state.open === undefined ? false : !state.open,
    }))
  handleClick = location =>
    this.toggleDrawer
      ? compose(
          this.toggleDrawer,
          tap(this.props.handleTest)
        )(location)
      : this.props.handleTest(location)
  render() {
    const { classes, route, Router, ...other } = this.props
    const state =
      this.state.open === undefined &&
      route === '/find-us' &&
      this.props.allCookies.isVerified === 'true'
        ? tap(this.setState({ open: true }), 'peek')
        : this.state.open
          ? 'open'
          : 'close'
    //console.log(this.props.allCookies.isVerified === 'true')

    const items = [
      <IconButton
        color="inherit"
        onClick={() => this.setState({ open: false })}
        style={{ display: 'flex' }}
      >
        <MenuBackIcon />
      </IconButton>,
      <div style={{ position: 'relative', marginBottom: 10, marginTop: 20 }}>
        <Tooltip TransitionComponent={Zoom} title={'Reset Map'}>
          <img
            src="/static/Bottle.png"
            className={classes.bottle}
            onClick={() => {
              this.props.expandList('')
              this.props.setStore({})
              this.props.setPositionAndZoom({
                position: {
                  lat: 39.743642,
                  lng: -104.9854807,
                },
                zoom: 10,
              })
            }}
            style={{
              height: 150,

              width: 'auto',
              // padding: 1,
              // border: '1px,solid, #C36D15',
              // backgroundColor: '#C36D15',
            }}
          />
        </Tooltip>
      </div>,
      <MenuList
        {...other}
        route={route}
        toggleDrawer={this.toggleDrawer}
        Router={Router}
      />,
    ]
    return (
      <Fragment>
        <IconButton
          onClick={
            route !== '/find-us'
              ? () => Router.push('/find-us')
              : this.state.open === undefined
                ? () => this.setState({ open: false })
                : () => this.toggleDrawer()
          }
        >
          <MapSearch
            style={{
              float: 'left',
              color: this.state.open
                ? '#C36D15'
                : this.state.open === undefined && route === '/find-us'
                  ? '#D4C201'
                  : '#E2DED5',
              fontWeight: 'bold',
              position: 'relative',
              fontSize: '20px !important',
              marginRight: '15px',
            }}
          />
        </IconButton>

        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                width: 225,
                textAlign: 'center',
                backgroundColor: 'rgb(36, 55, 70)',
                height: '100%',
                top: 0,
                position: 'fixed',
                overflow: 'scroll',
              }}
            >
              <Content
                native
                keys={items.map((_, i) => i)}
                config={{ tension: 200, friction: 20 }}
                state={state}
              >
                {items.map((item, i) => ({ x, ...props }) => {
                  return (
                    <animated.div
                      style={{
                        transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                        ...props,
                      }}
                    >
                      {item}
                    </animated.div>
                  )
                })}
              </Content>
            </animated.div>
          )}
        </Sidebar>
      </Fragment>
    )
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LeftDrawer)
