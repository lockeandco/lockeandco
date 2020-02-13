import React, { Fragment, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Keyframes, animated, config } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'
import delay from 'delay'
import Typography from '@material-ui/core/Typography'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  motion,
  useAnimation,
  useSpring,
  transform,
  useCycle,
} from 'framer-motion'
import useComponentSize from '@rehooks/component-size'

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

const useStyles = makeStyles(theme => ({
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontSize: '5rem',
    whiteSpace: 'nowrap',
    textShadow: '3px 3px rgb(36, 55, 70)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem',
    },
  },
}))
const Animation = props => {
  const { classes, text, springConfig } = props

  const Content2 = springConfig
    ? Keyframes.Spring(springConfig)
    : Keyframes.Spring({
        peek: [
          {
            delay: 2000,
            from: { x: 0, opacity: 1 },
            to: { x: -350, opacity: 1 },
            config: { ...config.molasses, duration: 9000 },
          },
          {
            from: { x: 100, opacity: 1 },
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

// const spring = {
//   type: 'spring',
//   tension: 380,
//   friction: 220,
// }
// const FramerHeader = props => {
//   const classes = useStyles()
//   const x = useSpring(0, spring)
//   const ref = React.useRef(null)
//   const size = useComponentSize(ref)
//   const { width } = size
//   const test = transform(0, [width, -width], [0, 1])
//   const [tX, cycleX] = useCycle(width, -width, 0)

//   const controls = useAnimation()
//   const firstLine = useAnimation()

//   const { text, springConfig, ...other } = props

//   useEffect(() => {
//     firstLine.start(i => ({
//       translateX: [6 * width, 6 * -width - width * 0.1],
//       transition: { delay: 2.2, duration: 15, loop: 3 },
//     }))
//   }, [width])

//   console.log('width', width)

//   return (
//     <React.Fragment>
//       <motion.div
//         className={classes.typoBigHeader}
//         ref={ref}
//         animate={firstLine}
//         initial={{ translateX: 0 }}
//         style={{ ...other, overflow: 'visible' }}
//       >
//         {props.text}
//       </motion.div>
//     </React.Fragment>
//   )
// }

// export default FramerHeader
