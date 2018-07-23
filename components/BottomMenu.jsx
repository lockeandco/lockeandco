import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden'
import CustomCard from './BottomCard'
import MenuButtons from './BottomTextButtons'
import SocialButtons from './SocialButtons'
import Grid from '@material-ui/core/Grid'

const styles = {
  root: {
    flexGrow: 1,
    bottom: 0,
    position: 'absolute',
    
  },
  flex: {
    flex: 1,
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

  },
};



function ButtonAppBar(props) {
  const { classes, goToSlide, page } = props;

  return (
    <Fragment>
    <Hidden smDown>
    <div className={classes.root}>
    <CustomCard  goToSlide={goToSlide} page={page}/>
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar className={classes.toolBar} disableGutters={true} >
            <MenuButtons goToSlide={goToSlide} page={page}/>
        </Toolbar>
      </AppBar>
    </div>
</Hidden>
<Hidden mdUp>
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} style={{width: '100%', marginRight: 'unset'}}>

        <Toolbar className={classes.toolBar} disableGutters={true} >
        <Grid
        container
        spacing={0}
        alignItems="center"
        direction="row"
        justify="space-around"
      >
        <Grid item xs>
        <SocialButtons />
        </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </div>
</Hidden>
    </Fragment>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
