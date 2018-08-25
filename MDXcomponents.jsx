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
  return (
    <React.Fragment>
      <MediaQuery maxDeviceWidth={400}>
        <Typography
          variant="display1"
          className={classes.typoBigHeader}
          paragraph
          noWrap
          component="h1"
          {...other}
        />
      </MediaQuery>
      <MediaQuery minDeviceWidth={400}>
        <Typography
          variant="display3"
          className={classes.typoBigHeader}
          paragraph
          noWrap
          component="h1"
          {...other}
        />
      </MediaQuery>
    </React.Fragment>
  )
})
const H2 = withStyles(style)(props => {
  const { classes, ...other } = props
  return (
    <React.Fragment>
      <MediaQuery maxDeviceWidth={400}>
        <Typography
          variant="title"
          className={classes.typoHeaderSmallDevice}
          paragraph
          component="h3"
          {...other}
        />
      </MediaQuery>
      <MediaQuery minDeviceWidth={400}>
        <Typography
          variant="title"
          className={classes.typoHeader}
          paragraph
          component="h3"
          {...other}
        />
      </MediaQuery>
    </React.Fragment>
  )
})
const H3 = withStyles(style)(props => {
  const { classes, ...other } = props
  return (
    <Typography
      variant="title"
      className={classes.typoH3Header}
      paragraph
      component="h3"
      {...other}
    />
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
