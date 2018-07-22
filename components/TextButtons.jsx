import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    textTransform: 'unset',
    fontWeight: 'bold',
    fontSize: '0.7em'
  },
  paper: {
      borderRadius: 'unset',
      boxShadow: 'unset',
      backgroundColor: 'transparent',
      textAlign: 'center'
      
  },
  paperActive: {
    borderRadius: 'unset',
   boxShadow: 'unset',
    backgroundColor: '#C36D15',
    textAlign: 'center'
  },
})

const TopMenu = [
{
    name: 'co-founders',
    order: '1',
},
{
  name: 'our story',
  order: '2',
},
{
  name: 'spirits',
  order: '3',
},{
  name: 'find us',
  order: '4',
}
]

function TextButtons(props) {
  const { classes, goToSlide, page } = props;
  console.log(props)
  return (
<React.Fragment>
<Grid container spacing={0} alignItems='center' direction='row' justify='space-around' >

<Grid item xs>
<Paper className={page === 0 ? classes.paperActive : classes.paper}>
<Button className={page === 0 ? classes.button : classes.button} onClick={() => goToSlide(0)} >
co-founders
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={page === 1 ? classes.paperActive : classes.paper}>
<Button className={page === 1 ? classes.button : classes.button} onClick={() => goToSlide(1)} >
our story
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={page === 2 ? classes.paperActive : classes.paper}>
<Button className={page === 2 ? classes.button : classes.button} onClick={() => goToSlide(2)}>
spirits
</Button>
</Paper>
</Grid>
<Grid item xs>
<Paper className={page === 3 ? classes.paperActive : classes.paper}>
<Button className={page === 3 ? classes.button : classes.button} onClick={() => goToSlide(3)}>
find us
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