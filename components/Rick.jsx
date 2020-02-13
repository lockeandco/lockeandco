import React, { Fragment } from 'react'
import Page from '../components/PageLayout'
import compose from 'ramda/src/compose'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Headers from '../components/ScrollingHeaders'
import CommonHeader from '../components/MobileScrollingHeader'
import CardBackground from '../components/CardBackground'

const rickBio = ` Rick shares the same Colorado-bred love of the outdoors—eager
to answer the pull toward the peaks with friends and family,
and to explore deeper. Drawn from an early age to the high
country’s historic forts, mines, and ranches of past lives
forged and fueled by whiskey, he shares the same appreciation
of the broad base that rye provides other cocktails, as well
as its simple balance to act on its own.`

const styles = theme => ({})

const Rick = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Page
        {...other}
        pictures={{
          left: {
            url: `/Axebottle.jpg`,
            size: '100%',
          },
          rightTop: {
            url: `/Two_Men_Cheersing.jpg`,
            size: `60%`,
          },
          rightBottom: {
            url: `/Weathered_CO_Flag.jpg`,
            size: `40%`,
          },
        }}
        text={{
          position: 'left',
          component: (
            <CardBackground
              {...other}
              media={'/Rick.jpg'}
              content={rickBio}
              title={`Rick Talley`}
              links={{
                left: {
                  title: 'Owen',
                  link: '/co-founders/owen',
                },
                right: {
                  title: 'Co-Founders',
                  link: '/co-founders',
                },
              }}
            />
          ),
        }}
        header={{
          position: 'rightTop',
          component: (
            <CommonHeader
              height="100%"
              alignItems="flex-end"
              headerText={`official sponsors of a good time`}
            />
          ),
        }}
      />
    </Fragment>
  )
}
export default compose(withStyles(styles))(Rick)
