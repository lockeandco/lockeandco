import React from 'react'
import Page from '../components/PageLayout'
import Paper from '@material-ui/core/Paper'
import Headers from '../components/MobileScrollingHeader'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import Hidden from '@material-ui/core/Hidden'
import { config } from 'react-spring'
import withPageTransition from '../components/withPageTransition'
const styles = theme => ({})
const Merchandise = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      useTopRight={true}
      pictures={{
        left: {
          url: `/Ski_Goggles_Close_up.jpg`,
          size: '100%',
        },
        rightTop: {
          url: `/Fishing.jpg`,
          size: '65%',
        },
        rightBottom: {
          url: `/Hats.jpg`,
          size: '35%',
        },
      }}
      text={{
        position: 'left',
        component: (
          <div
            style={{
              textAlign: 'center',
              top: '40%',
              position: 'fixed',
            }}
          >
            <Hidden smUp>
              <Headers
                text="new arrivals. coming soon."
                springConfig={{
                  peek: [
                    {
                      delay: 2000,
                      from: { x: 0, opacity: 1 },
                      to: { x: -100, opacity: 1 },
                      config: { ...config.molasses, duration: 12000 },
                    },
                    {
                      from: { x: 100, opacity: 1 },
                      to: { x: -100, opacity: 1 },
                      config: { ...config.molasses, duration: 12000 },
                    },
                    {
                      from: { x: 100, opacity: 0 },
                      to: { x: Math.random() * -50, opacity: 1 },
                      config: { ...config.molasses, duration: 10000 },
                    },
                  ],
                }}
              />
            </Hidden>
            <Hidden xsDown>
              <Headers
                text="new arrivals. coming soon."
                springConfig={{
                  peek: [
                    {
                      delay: 2000,
                      from: { x: 0, opacity: 1 },
                      to: { x: -200, opacity: 1 },
                      config: { ...config.molasses, duration: 14000 },
                    },
                    {
                      from: { x: 100, opacity: 1 },
                      to: { x: -200, opacity: 1 },
                      config: { ...config.molasses, duration: 14000 },
                    },
                    {
                      from: { x: 100, opacity: 0 },
                      to: { x: 0, opacity: 1 },
                      config: { ...config.molasses, duration: 5000 },
                    },
                  ],
                }}
              />
            </Hidden>
          </div>
        ),
      }}
    />
  )
}

export default compose(
  checkCookie,
  withStyles(styles),
  withPageTransition({
    yPosition: { from: 0, to: 0 },
    xPosition: { from: 0, to: 0 },
  })
)(Merchandise)
