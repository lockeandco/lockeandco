import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu from './Menu'
import Bottom from '../components/BottomMenu'


const styles = theme => ({
  background: {
    // height: height,
    display: 'flex',
    minWidth: '100vw',
    minHeight: '100vh',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(/static/Seal_Blue.jpg)`,
    backgroundRepeat: 'no-repeat',
    zIndex: -1000,
  },
})

const Layout = props => {
  const { classes, ...other } = props
  return (
    <Fragment>
      <div className={classes.background} />
      <Menu {...other} />
      {props.children}
      <Bottom {...other} />
    </Fragment>
  )
}

export default withStyles(styles)(Layout)
