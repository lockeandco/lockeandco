import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CommonHeader from '../components/MobileScrollingHeader'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import Router from 'next/router'

const styles = theme => ({
  chevronIcon: {
    top: '50%',
    position: 'sticky',
    width: 'auto',
    opacity: 0.7,
    [theme.breakpoints.up('sm')]: {},
  },
  chevronIconSize: {
    fontSize: 40,
    [theme.breakpoints.up('sm')]: {
      fontSize: 60,
    },
  },
  grow: {
    flex: '1 1 auto',
  },
})
const ChevronsRL = props => {
  const { links, classes } = props
  return (
    <React.Fragment>

      <div className={classes.grow} >
      <div className={classes.chevronIcon}>
      <IconButton
        style={{ color: 'white', float: 'left' }}
        onClick={() => Router.push(links.left)}
      >
        <ChevronLeft className={classes.chevronIconSize} />
      </IconButton>
    </div>
    <div className={classes.chevronIcon}>
      <IconButton
        style={{ color: 'white', float: 'right' }}
        onClick={() => Router.push(links.right)}
      >
        <ChevronRight className={classes.chevronIconSize} />
      </IconButton>
    </div>
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles)(ChevronsRL)
