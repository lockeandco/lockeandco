import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: '100vh',
  },
  paper: {
    //padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: 'unset',
  },
})

class InteractiveGrid extends React.Component {
  state = {
    direction: 'column',
    justify: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    })
  }

  render() {
    const { classes } = this.props
    const { alignItems, direction, justify, alignContent } = this.state
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={alignItems}
            direction={'row'}
            justify={justify}
            alignContent={alignContent}
          >
            <Grid item xs={6} style={{ padding: 'unset' }}>
              <Paper
                className={classes.paper}
                style={{
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: `url(/static/Bottle_Flyfishing.jpg)`,
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {`1`}
              </Paper>
            </Grid>
            <Grid item xs={6} style={{ padding: 'unset' }}>
              <Paper
                className={classes.paper}
                style={{
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: `url(/static/Bottle_Cheersing.jpg)`,
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {`2`}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InteractiveGrid)
