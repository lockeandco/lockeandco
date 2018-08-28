import React, { Fragment } from 'react'
import Page from '../components/Page1x100'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'

const styles = theme => ({})
const FindUs = props => (
  <Fragment>
    <Background />
    <Page
      {...props}
      pictures={{
        left: `/static/Ski_Boots1.jpg`,
      }}
    />
  </Fragment>
)

export default compose(
  checkCookie,
  withStyles(styles)
)(FindUs)
