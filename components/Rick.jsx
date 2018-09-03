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
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
    },
  },
})

const CoFoundersRick = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <Page
        {...other}
        pictures={{
          left: {
            url: `/static/Axebottle.jpg`,
            size: '100%',
          },
          rightTop: {
            url: `/static/Two_Men_Cheersing.jpg`,
            size: `60%`,
          },
          rightBottom: {
            url: `/static/Weathered_CO_Flag.jpg`,
            size: `40%`,
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
                    onClick={() => Router.push('/co-founders')}
                  >
                    <ChevronRight style={{ fontSize: 40 }} />
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
                    onClick={() => Router.push('/co-founders/owen')}
                  >
                    <ChevronLeft style={{ fontSize: 40 }} />
                  </IconButton>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="/static/Rick.jpg"
                    width="90%"
                    height="auto"
                    style={{
                      padding: 1,
                      border: '1px,solid, #C36D15',
                      backgroundColor: '#C36D15',
                      marginBottom: 20,
                    }}
                  />
                </div>
                <Typography variant="body1" paragraph className={classes.typo}>
                  Rick shares the same Colorado-bred love of the outdoors—eager
                  to answer the pull toward the peaks with friends and family,
                  and to explore deeper. Drawn from an early age to the high
                  country’s historic forts, mines and ranches, of past lives
                  forged and fueled by whiskey, he shares the same appreciation
                  of the broad base that rye provides other cocktails, as well
                  as its simple balance to act on its own.
                </Typography>
              </div>
            </Paper>
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
export default compose(
  checkCookie,
  withStyles(styles)
)(CoFoundersRick)
