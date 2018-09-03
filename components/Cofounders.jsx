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
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import Router from 'next/router'

const styles = theme => ({
  paper: {
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    // textOverflow: 'ellipsis',
    margin: 10,
    borderRadius: 0,
    paddingBottom: 200,
    boxShadow: 'unset',
    color: '#E2DED5',
    fontFamily: 'Flama',
    [theme.breakpoints.down('sm')]: {
      //maxHeight: 'calc(.6 * 100vh)',
      // overflow: 'scroll',
    },
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      borderRadius: 'unset',
      backgroundColor: 'transparent',
      overflow: 'auto',
      paddingRight: `10%`,
      paddingLeft: `10%`,
      paddingTop: 150,
    },
  },
  card: {
    minWidth: 200,
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: 0,
    padding: '1em',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    // [theme.breakpoints.down('sm')]: {
    //   maxHeight: 'calc(.6 * 100vh)',
    // //  overflow: 'scroll',
    // },
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    textShadow: '1px 1px rgb(36, 55, 70)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
    },
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
            <Paper className={classes.paper}>
              <div className={classes.card}>
                <div
                  style={{
                    top: '50%',
                    float: 'right',
                    position: 'sticky',
                    width: 'auto',
                    opacity: 0.7,

                    marginRight: -40,
                  }}
                >
                  <IconButton
                    style={{ color: 'white' }}
                    onClick={() => Router.push('/co-founders/owen')}
                  >
                    <ChevronRight style={{ fontSize: 60 }} />
                  </IconButton>
                </div>
                <div
                  style={{
                    top: '50%',
                    float: 'left',
                    position: 'sticky',
                    width: 'auto',
                    opacity: 0.7,

                    marginLeft: -40,
                  }}
                >
                  <IconButton
                    style={{ color: 'white' }}
                    onClick={() => Router.push('/co-founders/rick')}
                  >
                    <ChevronLeft style={{ fontSize: 60 }} />
                  </IconButton>
                </div>

                <Typography variant="body1" paragraph className={classes.typo}>
                  The process of distilling has brought with it valuable
                  perspective. After years focused on business development,
                  management and client service, as well as giving back (Rick
                  serves on Denver Museum of Nature & Science’s Giving Club
                  Council; Owen on the board of nonprofit Geneva Glen Camp) both
                  established successful careers.
                </Typography>
                <Typography variant="body1" paragraph className={classes.typo}>
                  However, the alchemy of creating something new through careful
                  selection plus separation helped both distill down their own
                  busy working lives. They extracted out one common element:
                  celebrating the best of what life in Colorado has afforded.
                </Typography>
                <Typography variant="body1" paragraph className={classes.typo}>
                  This guiding principle, of sharing that experience, hit them
                  while hand-cutting the aging discs from mature stands of aspen
                  on family land flanking Central Colorado’s Mosquito Range. All
                  the best days added up. The days spent camping, hiking,
                  biking, fishing, snowboarding and skiing: that sunset toast
                  after an unending day fly-fishing the Yampa, the warm nip from
                  a flask on a cold chairlift, the laughter over a late-summer
                  backyard game of cornhole. The unapologetic last howl at the
                  moon.
                </Typography>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="/static/Owen+Rick.jpg"
                    width="90%"
                    height="auto"
                    style={{
                      padding: 1,
                      border: '1px,solid, #C36D15',
                      backgroundColor: '#C36D15',
                    }}
                  />
                </div>
              </div>
            </Paper>
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
