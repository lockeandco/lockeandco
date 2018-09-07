import React, { Fragment } from 'react'
import Page from '../components/PageLayout'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Headers from '../components/ScrollingHeaders'
import CommonHeader from '../components/MobileScrollingHeader'
import Cofounders from '../components/Cofounders'
import Swipeable from 'react-swipeable'
import Router from 'next/router'
import withPageTransition from '../components/withPageTransition'

class SwipeComponent extends React.Component {
  onSwipedLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
    Router.push('/co-founders/owen')
  }

  onSwipedUp(e, deltaY, isFlick) {
    console.log('You Swiped...', e, deltaY, isFlick)
    isFlick &&
      Router.push({ pathname: '/our-story', query: { prev: 'co-founders' } })
  }

  onSwipedRight(e, deltaX, deltaY, isFlick, velocity) {
    console.log('You Swiped Right...', e, deltaX, deltaY, isFlick, velocity)
    Router.push('/co-founders/rick')
  }

  onSwiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log('Swiped...', e, deltaX, deltaY, isFlick, velocity)
  }

  render() {
    const { classes, ...other } = this.props
    return (
      <Swipeable
        flickThreshold={2.5}
        onSwipedLeft={this.onSwipedLeft}
        onSwipedRight={this.onSwipedRight}
        onSwiped={this.onSwiped}
        onSwipedUp={this.onSwipedUp}
      >
        <Cofounders {...this.props} />
      </Swipeable>
    )
  }
}

export default compose(
  checkCookie,
  withPageTransition({
    yPosition: { from: 0, to: 0 },
    xPosition: { from: 0, to: 0 },
  })
)(SwipeComponent)
