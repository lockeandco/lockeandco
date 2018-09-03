import React, { Fragment } from 'react'
import Page from '../components/Page1x100'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import Headers from '../components/ScrollingHeaders'
import FindUsMap from '../components/FindUs'

const styles = theme => ({})
const FindUs = props => (
  <Fragment>

    <Page
      {...props}
      pictures={{
        left: `/static/Ski_Boots1.jpg`,
      }}
    >
      <div
        style={{ textAlign: 'center', paddingTop: '75px', overflow: 'hidden' }}
      >
        <Headers text="a taste like none other" />
        <FindUsMap />
      </div>
    </Page>
  </Fragment>
)

export default compose(
  checkCookie,
  withStyles(styles)
)(FindUs)
