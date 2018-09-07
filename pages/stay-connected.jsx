import React, { Fragment } from 'react'
import Page from '../components/PageLayout'
import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Subscribe from '../components/MailChimpsubscribe'
import SocialButtons from '../components/SocialButtons2'
import withPageTransition from '../components/withPageTransition'
const styles = theme => ({
  container: {
    margin: '115px 10px 95px 10px ',
    padding: 15,
    textAlign: 'center',
    backgroundColor: `rgba(226, 222, 213, 0.9)`,
    [theme.breakpoints.up('md')]: {
      marginTop: 130,
      textAlign: 'center',
      backgroundColor: 'unset',
    },
  },
})

const StayConnected = props => {
  const { classes, ...other } = props
  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: `/static/Truck.jpg`,
          size: `100%`,
        },
        rightTop: {
          url: ``,
          size: `100%`,
        },
      }}
      leftSize={8}
      rightSize={4}
      backgroundColorRight={`#E2DED5`}
      text={{
        position: `rightTop`,
        component: (
          <div className={classes.container}>
            <SocialButtons />
            <Subscribe />
          </div>
        ),
      }}
    />
  )
}

export default compose(
  checkCookie,
  withStyles(styles),  withPageTransition({
    yPosition: { from: 0, to: 0 },
    xPosition: { from: 0, to: 0 },
  })
)(StayConnected)
