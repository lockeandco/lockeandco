import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomCard from './Cards'
import MenuButtons from './TextButtons'
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    width: `calc(100% - 275px)`,
    marginLeft: '275px',
    maxHeight: 45,
    backgroundColor: 'rgb(36, 55, 70)'

  },
  toolBar: {
      minHeight: 45,
      justifyContent: 'space-around'

  }
};

function ButtonAppBar(props) {
  const { classes, goToSlide } = props;
  return (
    <div className={classes.root}>
    <CustomCard />
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar className={classes.toolBar} disableGutters={true} >
            <MenuButtons goToSlide={goToSlide} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
