import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import MediaQuery from 'react-responsive'

const style = theme => ({
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
  },
  typoHeader: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    margin: 10,
  },
  typoHeaderSmallDevice: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    fontSize: '1rem',
    //overflow: 'hidden',
    margin: 10,
  },
  typoH3Header: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    margin: 50,
  },
  typoH3HeaderSmallDevice: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    fontSize: '1.5rem',
    //overflow: 'hidden',
    margin: 50,
  },
  typoBigHeader: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    margin: 20,
    //textOverflow: 'ellipsis',
  },
  typoBigHeaderSmallDevice: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    //fontSize: '6rem',
    //overflow: 'hidden',
    margin: 20,
    //textOverflow: 'ellipsis',
  },
})

const H1 = withStyles(style)(props => {
  const { classes, ...other } = props
  console.log('h1')
  return (
    <React.Fragment>
      <br style={{ display: 'none' }} />
      <MediaQuery maxDeviceWidth={400}>
        <Typography
          variant="display1"
          className={classes.typoBigHeaderSmallDevice}
          noWrap
          {...other}
        />
      </MediaQuery>
      <br style={{ display: 'none' }} />
      <MediaQuery minDeviceWidth={401}>
        <Typography
          variant="display3"
          className={classes.typoBigHeader}
          noWrap
          {...other}
        />
      </MediaQuery>
      <br style={{ display: 'none' }} />
    </React.Fragment>
  )
})
const H2 = withStyles(style)(props => {
  const { classes, ...other } = props
  console.log('h2')
  return (
    <React.Fragment>
      <br style={{ display: 'none' }} />
      <MediaQuery maxDeviceWidth={400}>
        <Typography
          variant="title"
          className={classes.typoHeaderSmallDevice}
          // component="h3"
          {...other}
        />
      </MediaQuery>
      <br style={{ display: 'none' }} />
      <MediaQuery minDeviceWidth={401}>
        <Typography
          variant="subheading"
          className={classes.typoHeader}
          // component="h3"
          {...other}
        />
      </MediaQuery>
      <br style={{ display: 'none' }} />
    </React.Fragment>
  )
})
const H3 = withStyles(style)(props => {
  const { classes, ...other } = props
  console.log('h3')
  return (
    <React.Fragment>
      <br style={{ display: 'none' }} />
      <MediaQuery maxDeviceWidth={400}>
        <Typography
          className={classes.typoH3HeaderSmallDevice}
          //variant="title"
          {...other}
        />
      </MediaQuery>
      <br style={{ display: 'none' }} />
      <MediaQuery minDeviceWidth={401}>
        <Typography
          className={classes.typoH3Header}
          variant="subheading"
          {...other}
        />
      </MediaQuery>
      <br style={{ display: 'none' }} />
    </React.Fragment>
  )
})
const Paragraph = withStyles(style)(props => {
  const { classes, ...other } = props
  return (
    <Typography variant="body2" className={classes.typo} paragraph {...other} />
  )
})

const components = {
  h1: H1,
  h2: H2,
  p: Paragraph,
  h3: H3,
}

export default components
