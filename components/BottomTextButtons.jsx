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
  const { classes } = props;
  return (
<React.Fragment>
<Grid container spacing={0} alignItems='center' direction='row' justify='space-around' >


<Grid item xs>
<Paper className={classes.paper}>
<Button className={classes.button} >
Our Story
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={classes.paper}>
<Button className={classes.button} >
Spirits
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={classes.paper}>
<Button className={classes.button} >
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