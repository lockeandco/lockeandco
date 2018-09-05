import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuList from './LeftDrawerList'
import { MapSearch } from 'mdi-material-ui'

const styles = {
  list: {
    width: 300,
  },
}

class LeftDrawer extends React.Component {
  state = {
    open: false,
  }

  toggleDrawer = open => () => {
    this.setState({
      open: open,
    })
  }

  render() {
    const { classes, route, Router, ...other } = this.props
console.log(this.props)
    return (
      <Fragment>
        <IconButton
          color="inherit"
          onClick={
            route === '/find-us'
              ? this.toggleDrawer(true)
              : () => Router.push('/find-us')
          }
        >
          <MapSearch
            style={{
              float: 'left',
              //margin: theme.spacing.unit * 2,
              color: '#E2DED5',
              fontWeight: 'bold',
              position: 'relative',
              fontSize: '20px !important',
              //paddingLeft: 75,
              marginRight: '15px',
            }}
          />
        </IconButton>
        <Drawer
          anchor="left"
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
        >
          <div
            style={{
              width: 225,
              textAlign: 'center',
              backgroundColor: 'rgb(36, 55, 70)',
            }}
          >
            <div
              style={{ position: 'relative', marginBottom: 10, marginTop: 20 }}
            >
              <img
                src="/static/Bottle.png"
                className={classes.bottle}
                style={{
                  height: 150,

                  width: 'auto',
                  // padding: 1,
                  // border: '1px,solid, #C36D15',
                  // backgroundColor: '#C36D15',
                }}
              />
            </div>
            <MenuList
            {...other}
              route={route}
              toggleDrawer={this.toggleDrawer}
              Router={Router}
            />
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LeftDrawer)
