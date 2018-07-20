import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5'
  },
  input: {
    display: 'none',
  },
  paper: {
      borderRadius: 'unset',
      boxShadow: 'unset',
      backgroundColor: 'transparent',
      textAlign: 'center'
      
  }
});

function TextButtons(props) {
  const { classes, goToSlide } = props;
  return (
<React.Fragment>
<Grid container spacing={0} alignItems='center' direction='row' justify='space-around' >

<Grid item xs>
<Paper className={classes.paper} style={{

   backgroundColor: '#E2DED5',
  }
}>
<Button className={classes.button} style={{    color: '#243746'}} onClick={() => goToSlide(0)} >
Co-Founders
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={classes.paper}>
<Button className={classes.button} onClick={() => goToSlide(1)} >
Our Story
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={classes.paper}>
<Button className={classes.button} onClick={() => goToSlide(2)}>
Spirits
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={classes.paper}>
<Button className={classes.button} onClick={() => goToSlide(3)}>
Find Us
</Button>
</Paper>
</Grid>

</Grid>

</React.Fragment>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);