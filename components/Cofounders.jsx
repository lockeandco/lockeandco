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
import CardBackground from '../components/CardBackground'
import Link from 'next/link'

const coFounderCopy = classes => (
  <React.Fragment>
    <Typography variant="body1" paragraph className={classes.typoCaption}>
      What is Locke &amp; Co. about? Good company. The same as those aspens
      quaking together in the wind: Connection through deep Colorado roots.
    </Typography>
    <Typography variant="body1" paragraph className={classes.typo}>
      The process of distilling has brought with it valuable perspective. After
      years focused on business development, management and client service, as
      well as giving back (
      <Link href={'/co-founders/rick'} prefetch>
        <a className={classes.typo}>Rick</a>
      </Link>{' '}
      serves on Denver Museum of Nature & Science’s Giving Club Council;{' '}
      <Link href={'/co-founders/owen'} prefetch>
        <a className={classes.typo}>Owen </a>
      </Link>{' '}
      on the board of nonprofit Geneva Glen Camp) both established successful
      careers.
    </Typography>
    <Typography variant="body1" paragraph className={classes.typo}>
      However, the alchemy of creating something new through careful selection
      plus separation helped both distill down their own busy working lives.
      They extracted out one common element: celebrating the best of what life
      in Colorado has afforded.
    </Typography>
    <Typography variant="body1" paragraph className={classes.typo}>
      This guiding principle, of sharing that experience, hit them while
      hand-cutting the aging discs from mature stands of aspen on family land
      flanking Central Colorado’s Mosquito Range. All the best days added up.
      The days spent camping, hiking, biking, fishing, snowboarding and skiing:
      that sunset toast after an unending day fly-fishing the Yampa, the warm
      nip from a flask on a cold chairlift, the laughter over a late-summer
      backyard game of cornhole. The unapologetic last howl at the moon.
    </Typography>
  </React.Fragment>
)

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

const CoFounders = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Page
        {...other}
        pictures={{
          left: {
            url: `/static/Bonfire_in_the_Woods.jpg`,
            size: '100%',
          },
          rightTop: {
            url: `/static/Group_Dinner_Table.jpg`,
            size: `50%`,
          },
          rightBottom: {
            url: `/static/Woman_in_Hammock.jpg`,
            size: `50%`,
          },
        }}
        text={{
          position: 'left',
          component: (
            <CardBackground
              {...other}
              media={'/static/Owen+Rick.jpg'}
              content={coFounderCopy}
              links={{
                left: {
                  title: 'Rick',
                  link: '/co-founders/rick',
                },
                right: {
                  title: 'Owen',
                  link: '/co-founders/owen',
                },
              }}
            />
          ),
        }}
        header={{
          position: 'rightBottom',
          component: (
            <CommonHeader headerText={`official sponsors of a good time`} />
          ),
        }}
      />
    </Fragment>
  )
}
export default compose(
  checkCookie,
  withStyles(styles)
)(CoFounders)
