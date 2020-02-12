import React, { useEffect } from 'react'
import Page from '../components/PageLayout'
import Paper from '@material-ui/core/Paper'
import Headers from '../components/MobileScrollingHeader'
import Typography from '@material-ui/core/Typography'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import Hidden from '@material-ui/core/Hidden'
import { config } from 'react-spring'
import withPageTransition from '../components/withPageTransition'
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
  friction: 220,
}
const FramerHeader = props => {
  const classes = useStyles()
  const x = useSpring(0, spring)
  const ref = React.useRef(null)
  const size = useComponentSize(ref)
  const { width } = size
  const test = transform(0, [width, -width], [0, 1])
  const [tX, cycleX] = useCycle(width, -width, 0)

  const controls = useAnimation()

  useEffect(() => {
    controls.start(i => ({
      opacity: i < 3 ? [1, 1] : [0, 1, 1, 1],
      translateX: i < 3 ? [width, -width] : [width, -width, width, 0],
      transition: { delay: i < 3 ? i * 4.2 : i * 5.2, duration: i * 4 },
    }))
  }, [width])
  console.log(width)
  return (
    <React.Fragment>
      <motion.div
        ref={ref}
        className={classes.typoBigHeader}
        custom={1}
        initial={{
          opacity: 1,
        }}
        animate={controls}
      >
        so many ways to enjoy locke + co
      </motion.div>
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
      >
        recipes coming soon!
      </motion.div>
    </React.Fragment>
  )

  //   return (
  //     <motion.div
  //       ref={ref}
  //       initial={{
  //         opacity: 1,
  //         translateX: 0,
  //       }}
  //       animate={{
  //         translateX: [width, -width, 0],
  //         opacity: [0, 1],
  //       }}
  //       className={classes.typoBigHeader}
  //       transition={{
  //         duration: 10,
  //         loop: 3,
  //       }}
  //     >
  //       locke+co for all seasons and tastes. recipes coming soon!
  //     </motion.div>
  //   )
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

export default compose(
  checkCookie,
  //   withStyles(styles),
  withPageTransition({
    yPosition: { from: 0, to: 0 },
    xPosition: { from: 0, to: 0 },
  })
)(Recipes)
