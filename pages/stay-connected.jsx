import React, { Fragment } from 'react'
import Page from '../components/Page1x16040'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'

const styles = theme => ({})

const StayConnected = props => (
  <Fragment>
    <Background />
    <Page
      {...props}
      pictures={{
        left: `/static/Truck.jpg`,
      }}
    />
  </Fragment>
)

export default compose(
  checkCookie,
  withStyles(styles)
)(StayConnected)
