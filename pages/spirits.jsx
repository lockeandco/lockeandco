import React, { Fragment } from 'react'
import Page from '../components/Page1x25050R'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'

const styles = theme => ({})
const Spirits = props => (
  <Fragment>
    <Background />

    <Page
      {...props}
      pictures={{
        left: `/static/Bottle_Creek.jpg`,
        rightTop50: `/static/Aspen_Logs.jpg`,
        rightBottom50: `/static/Close_Up_Aspen_Leaves.jpg`,
      }}
    />
  </Fragment>
)

export default compose(
  checkCookie,
  withStyles(styles)
)(Spirits)
