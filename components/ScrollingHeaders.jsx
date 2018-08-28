import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Keyframes, animated, config } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'
import delay from 'delay'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '3rem',
    //overflow: 'hidden',
    marginTop: 20,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      marginTop: 'calc(100vh * .10)',
      fontsize: '1.8rem',
    },
    //textOverflow: 'ellipsis',
  },
})

const Content2 = Keyframes.Spring({
  peek: [
    // { delay: 2000, from: { x: 0, opacity: 0 },
    // to: { x: 1, opacity: 1 }, config: config.slow },
    {
      delay: 2000,
      from: { x: 0, opacity: 1 },
      to: { x: -400, opacity: 1 },
      config: { ...config.molasses, duration: 9000 },
    },
    {
      from: { x: 200, opacity: 1 },
      to: { x: -300, opacity: 1 },
      config: { ...config.molasses, duration: 9000 },
    },
    {
      from: { x: 100, opacity: 0 },
      to: { x: 0, opacity: 1 },
      config: { ...config.molasses, duration: 5000 },
    },
  ],
})

const Animation = props => {
  const { classes, text } = props
  return (
    <Content2 reset native state="peek" impl={TimingAnimation}>
      {({ x, ...other }) => {
        return (
          <animated.div
            style={{
              transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              ...other,
            }}
            className={classes.typoBigHeader}
          >
            {text}
          </animated.div>
        )
      }}
    </Content2>
  )
}
export default withStyles(style)(Animation)
