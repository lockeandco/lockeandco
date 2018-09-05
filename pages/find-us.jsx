import React, { Fragment } from 'react'
import Page from '../components/PageLayoutWithMaps'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import Headers from '../components/ScrollingHeaders'
import FindUsMap from '../components/FindUs'
import Typography from '@material-ui/core/Typography'
import CityList from '../components/CityList'
import CommonHeader from '../components/MobileScrollingHeader'
import { config } from 'react-spring'

const styles = theme => ({
  container: {
    margin: '95px 10px 95px 10px ',
    padding: 15,
    paddingTop: '1px',
    textAlign: 'center',
    backgroundColor: `rgba(226, 222, 213, 0.5)`,
    [theme.breakpoints.up('md')]: {
      marginTop: 95,
      textAlign: 'center',
      backgroundColor: 'unset',
    },
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
  },
})

const StayConnected = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: `/static/Ski_Boots1.jpg`,
          size: `100%`,
        },
        rightTop: {
          url: ``,
          size: `100%`,
        },
      }}
      leftSize={9}
      rightSize={3}
      backgroundColorRight={`#243746`}
      gMap={
        <div
          style={{ textAlign: 'center', paddingTop: '3vh', overflow: 'hidden' }}
        >
          <FindUsMap {...other}/>
        </div>
      }
      text={{
        position: `rightTop`,
        component: (
          <React.Fragment>
            <div className={classes.container}>
              <div style={{ position: 'relative', marginBottom: 10 }}>
                <img
                  src="/static/Bottle.png"
                  className={classes.bottle}
                  style={{
                    height: 250,

                    width: 'auto',
                    // padding: 1,
                    // border: '1px,solid, #C36D15',
                    // backgroundColor: '#C36D15',
                  }}
                />
              </div>
              <Typography variant="headline" className={classes.typo}>
                you can find locke + co. spirits at the following retailers and
                establishments:
              </Typography>
              <CityList {...other}/>
            </div>
            <CommonHeader
              springConfig={{
                peek: [
                  {
                    delay: 2000,
                    from: { x: 0, opacity: 1 },
                    to: { x: -800, opacity: 1 },
                    config: { ...config.molasses, duration: 10000 },
                  },
                  {
                    from: { x: 100, opacity: 1 },
                    to: { x: -800, opacity: 1 },
                    config: { ...config.molasses, duration: 10000 },
                  },
                  {
                    from: { x: 100, opacity: 0 },
                    to: { x: 0, opacity: 1 },
                    config: { ...config.molasses, duration: 5000 },
                  },
                ],
              }}
              alignItems="flex-end"
              headerText={`a taste like no other - 100% colorado`}
              // style={{
              //   margin: '10px -10px 10px -10px',
              //   paddingRight: -15,
              //   paddingLeft: -15
              // }}
            />
          </React.Fragment>
        ),
      }}
    />
  )
}

export default compose(
  checkCookie,
  withStyles(styles)
)(StayConnected)
