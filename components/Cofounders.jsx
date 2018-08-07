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
    backgroundPosition: 'left, right',
    backgroundSize: 'cover, cover',
    backgroundImage: `url(/static/AxeBottle.jpg), url(/static/Bottle_Creek.jpg)`,
    backgroundRepeat: 'no-repeat, no-repeat',
    //background: `rgb(226, 222, 213)`,
    height: '100vh',
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
})

class InteractiveGrid extends React.Component {
  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'stretch',
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    })
  }

  render() {
    const { classes, children } = this.props
    const { alignItems, direction, justify } = this.state
    return (
      <Grid
        container
        className={classes.root}
        style={{ paddingTop: 100 }}
        alignItems="stretch"
      >
      {children}
      </Grid>
    )
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InteractiveGrid)
