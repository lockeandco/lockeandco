import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomCard from './BottomCard'
import MenuButtons from './BottomTextButtons'
import BottomNavigation from './BottomNavigation'
const styles = {
  root: {
    flexGrow: 1,
    bottom: 0,
    position: 'absolute'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    top: 'unset',
    width: `calc(100% - 275px)`,
    marginRight: '275px',
    backgroundColor: 'rgb(36, 55, 70)',
    maxHeight: 45,
    minHeight: 45,
    bottom: 0,
    right: 0,
    left: 'auto',
    display: 'flex',
    zIndex: 1100,
    borderRadius: 'unset',
    boxSizing: 'border-box',
    boxShadow: 'unset',
    flexShrink: 0,
    flexDirection: 'column',
    position: 'fixed',

  },

  toolBar: {
    bottom: 0,
      minHeight: 45,
      justifyContent: 'flex-end'

  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
    <CustomCard />
      <AppBar className={classes.appBar}>

        <Toolbar className={classes.toolBar} disableGutters={true}>
            <MenuButtons />
        </Toolbar>
      </AppBar>

    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
