import React, { Fragment } from 'react'
import Page from '../components/Page1x25050'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'

const styles = theme => ({})
const CoFounders = props => (
  <Fragment>
    <Background />

    <Page
      {...props}
      pictures={{
        left: `/static/Bonfire_in_the_Woods.jpg`,
        rightTop50: `/static/Group_Dinner_Table.jpg`,
        rightBottom50: `/static/Woman_in_Hammock.jpg`,
      }}
    />
  </Fragment>
)

export default compose(
  checkCookie,
  withStyles(styles)
)(CoFounders)
