import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Keyframes, animated, config, interpolate } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'
import delay from 'delay'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '5rem',
    whiteSpace: 'nowrap',
    textShadow: '1px 1px rgb(36, 55, 70)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem',
    },
  },
})

const withPageTransitions = p => Component => {
  const Animation = props => {
    const { classes } = props
    const { springConfig, yPosition, xPosition } = p
    const Content2 = springConfig
      ? Keyframes.Spring(springConfig)
      : Keyframes.Spring({
          start: [
            {
              delay: 0,
              from: { x: xPosition.from, y: yPosition.from, opacity: 0 },
              to: { x: xPosition.to, y: yPosition.to, opacity: 1 },
              config: { ...config.molasses, duration: 800 },
            },
          ],
        })

    return (
      <Content2 reset native state="start" impl={TimingAnimation}>
        {({ x, y, ...other }) => {
          console.log({ ...other })
          return (
            <animated.div
              style={{
                transform: interpolate(
                  [x, y],
                  (x, y) => `translate3d(${x}%, ${y}%,0)`
                ),
                ...other,
              }}
            >
              <Component {...props} />
            </animated.div>
          )
        }}
      </Content2>
    )
  }
  return Animation
}
export default withPageTransitions
