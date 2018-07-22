import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 275,
    maxHeight: 90,
    minHeight: 90,
    bottom: 0,
    right: 0,
    left: 'auto',
    width: '100%',
    display: 'flex',
    zIndex: 1100,
    borderRadius: 'unset',
    boxSizing: 'border-box',
    boxShadow: 'unset',
    flexShrink: 0,
    flexDirection: 'column',
    position: 'fixed',
    backgroundPosition: 'center center',
    backgroundSize: 'contain, cover',
    backgroundImage: `url(/static/hearFromYou.png)`,
    background: `rgb(226, 222, 213)`
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
      <Card className={classes.card}>
        <CardContent>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);