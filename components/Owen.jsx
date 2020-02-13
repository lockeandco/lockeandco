//TODO Fix Chevrons, Scrolling, Abstract

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

const owenBio = ` For Owen, the independent spirit of the Wild West still
          inspires the sixth-generation Colorado native with a wild
          desire to create, to build, to become—or celebrate—anything.
          At 15, he started sourcing home-brew ingredients, refining his
          fermentation skills ever since. Rye always stood out: the
          complexities and unique flavors it brings to cocktails. It
          just tasted a bit more wild than other whiskey.`

const styles = theme => ({})

const Owen = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Page
        {...other}
        pictures={{
          left: {
            url: `/Bottle_Flyfishing.jpg`,
            size: '100%',
          },
          rightTop: {
            url: `/Woman_with_Camera_in_Woods.jpg`,
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
              media={'/Owen.jpg'}
              content={owenBio}
              title={`Owen Locke`}
              links={{
                left: {
                  title: 'Co-Founders',
                  link: '/co-founders',
                },
                right: {
                  title: 'Rick',
                  link: '/co-founders/rick',
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
export default compose(withStyles(styles))(Owen)
