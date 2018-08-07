import React, { Fragment } from 'react'
import Page from '../components/Page1x26040'
import Background from '../components/TransitionBackground'
const OurStory = props => (
  <Fragment>
    <Background />
    <Page
      {...props}
      pictures={{
        left: {
          url: `/static/Man_Looking_Over_Cliff.jpg`,
          size: '100%',
        },
        rightTop: {
          url: `/static/Moonshine_Jars.jpg`,
          size: '60%',
        },
        rightBottom: {
          url: `/static/Group_with_Sparklers.jpg`,
          size: '40%',
        },
      }}
    />
  </Fragment>
)

export default OurStory
