import React, { useEffect } from 'react'
import Page from '../components/PageLayout'
import Paper from '@material-ui/core/Paper'
import Headers from '../components/MobileScrollingHeader'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import compose from 'ramda/src/compose'
import Hidden from '@material-ui/core/Hidden'
import { config } from 'react-spring'
import {
  motion,
  useAnimation,
  useSpring,
  transform,
  useCycle,
} from 'framer-motion'
import useComponentSize from '@rehooks/component-size'

const useStyles = makeStyles(theme => ({
  typoBigHeader: {
    position: `fixed`,
    display: 'flex',
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

const spring = {
  type: 'spring',
  tension: 380,
  friction: 460,
  damping: 200,
  stiffness: 10,
}
const FramerHeader = props => {
  const classes = useStyles()

  const ref = React.useRef(null)
  const size = useComponentSize(ref)
  const { width } = size
  const test = transform(0, [width, -width], [0, 1])
  const [tX, cycleX] = useCycle(width, -width, 0)
  const translateX = useSpring(0, spring)
  const controls = useAnimation()
  const firstLine = useAnimation()

  useEffect(() => {
    firstLine.start(i => ({
      translateX: -width,
      transition: { delay: 3.2, duration: 10 },
    }))
  }, [width])

  useEffect(() => {
    controls.start(i => ({
      opacity: i < 3 ? [1, 1] : [0, 1],
      translateX: i < 3 ? [width, -width] : [width, 0],
      transition: { delay: i < 3 ? i * 4.2 : i * 3.2, duration: i * 6 },
    }))
  }, [width])

  return (
    <React.Fragment>
      <motion.span
        positionTransition={spring}
        ref={ref}
        className={classes.typoBigHeader}
        custom={1}
        initial={{
          translateX: 0,
        }}
        animate={firstLine}
      >
        so many ways to enjoy locke + co
      </motion.span>
      <motion.div
        initial={{
          opacity: 0,
        }}
        className={classes.typoBigHeader}
        custom={2}
        animate={controls}
      >
        a taste for all seasons
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        className={classes.typoBigHeader}
        custom={3}
        animate={controls}
        positionTransition={spring}
        style={{ translateX }}
      >
        recipes coming soon!
      </motion.div>
    </React.Fragment>
  )
}
const Recipes = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: `/Group_Dinner_Table.jpg`,
          size: `100%`,
        },
        right: {
          url: ``,
          size: 0,
        },
      }}
      leftSize={12}
      rightSize={0}
      text={{
        position: 'left',
        component: (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              top: '40%',
              position: 'fixed',
            }}
          >
            <Hidden smUp>
              <FramerHeader />
            </Hidden>
            <Hidden xsDown>
              <FramerHeader />
            </Hidden>
          </div>
        ),
      }}
    />
  )
}

export default Recipes
