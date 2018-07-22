import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
    
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class InteractiveGrid extends React.Component {
  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'stretch',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;
    return (
      <Grid container className={classes.root} style={{paddingTop: 100}}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
<Grid item xs={6} >
            
                <Paper
                  className={classes.paper}
                  style={{ paddingTop: ( 1) * 10, paddingBottom: (1) * 10 }}
                >
                  1
                </Paper>
             
 
         </Grid>
         <Grid item xs={6} >
         <Grid
         container
         spacing={16}
         className={classes.demo}
         alignItems="stretch"
         direction="column"
         justify="center"
       >
     <Grid item >

              <Paper
                className={classes.paper}
                style={{ paddingTop: ( 1) * 10, paddingBottom: ( 1) * 10 }}
              >
            2
              </Paper>
</Grid>
<Grid item>
            <Paper
              className={classes.paper}
              style={{ paddingTop: ( 1) * 10, paddingBottom: ( 1) * 10 }}
            >
    3
            </Paper>
</Grid>
</Grid></Grid>
       

          </Grid>

        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item xs={6} sm={4}>
                <FormControl component="fieldset">
                  <FormLabel>direction</FormLabel>
                  <RadioGroup
                    name="direction"
                    aria-label="Direction"
                    value={direction}
                    onChange={this.handleChange('direction')}
                  >
                    <FormControlLabel value="row" control={<Radio />} label="row" />
                    <FormControlLabel value="row-reverse" control={<Radio />} label="row-reverse" />
                    <FormControlLabel value="column" control={<Radio />} label="column" />
                    <FormControlLabel
                      value="column-reverse"
                      control={<Radio />}
                      label="column-reverse"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl component="fieldset">
                  <FormLabel>justify</FormLabel>
                  <RadioGroup
                    name="justify"
                    aria-label="Justify"
                    value={justify}
                    onChange={this.handleChange('justify')}
                  >
                    <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                    <FormControlLabel value="center" control={<Radio />} label="center" />
                    <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                    <FormControlLabel
                      value="space-between"
                      control={<Radio />}
                      label="space-between"
                    />
                    <FormControlLabel
                      value="space-around"
                      control={<Radio />}
                      label="space-around"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl component="fieldset">
                  <FormLabel>alignItems</FormLabel>
                  <RadioGroup
                    name="alignItems"
                    aria-label="Align items"
                    value={alignItems}
                    onChange={this.handleChange('alignItems')}
                  >
                    <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                    <FormControlLabel value="center" control={<Radio />} label="center" />
                    <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                    <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                    <FormControlLabel value="baseline" control={<Radio />} label="baseline" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);
