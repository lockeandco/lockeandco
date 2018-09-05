import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Router from 'next/router'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

const styles = theme => ({
  media: {
    objectFit: 'cover',
  },
  paper: {
    flexGrow: 1,
    borderRadius: 'unset',
    backgroundColor: 'transparent',
    overflow: 'auto',
    // textOverflow: 'ellipsis',
    margin: 20,
    boxShadow: 'unset',
    borderRadius: 0,
    paddingBottom: 200,
    color: '#E2DED5',
    fontFamily: 'Flama',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      //maxHeight: 'calc(.6 * 100vh)',
      // overflow: 'scroll',
    },
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      borderRadius: 'unset',
      backgroundColor: 'transparent',
      overflow: 'auto',
      paddingRight: `10%`,
      paddingLeft: `10%`,
      paddingTop: 150,
      margin: 10,
    },
  },
  card: {
    minWidth: 200,
    maxWidth: 450,
    backgroundColor: 'rgba(0,0,0,.5)',
    // borderRadius: 0,
    // padding: '1em',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    // [theme.breakpoints.down('sm')]: {
    //   maxHeight: 'calc(.6 * 100vh)',
    // //  overflow: 'scroll',
    // },
    margin: 10,
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    fontWeight: 'bold',
    textShadow: '1px 1px rgb(36, 55, 70)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
    },
  },
  typoHeader: {
    color: '#E2DED5',
    fontFamily: 'Flama',
    fontWeight: 'bold',
    textShadow: '1px 1px rgb(36, 55, 70)',
    [theme.breakpoints.up('sm')]: {
      // fontSize: '1.1rem',
    },
  },
  grow: {
    flex: '1 1 auto',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#E2DED5',
    textShadow: '1px 1px rgb(36, 55, 70)',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
})

function MediaCard(props) {
  const { classes, title, content, links, media, mediaPosition = 'top' } = props
  return (
    <Paper className={classes.paper}>
      <Card className={classes.card}>
        {media &&
          mediaPosition === 'top' && (
            <CardMedia
              component="img"
              className={classes.media}
              image={media}
              title="Owen Locke"
            />
          )}

        <CardContent>
          <Typography
            gutterBottom
            variant="headline"
            component="h2"
            className={classes.typoHeader}
          >
            {title}
          </Typography>

          {typeof content === 'string' ? (
            <Typography variant="body1" paragraph className={classes.typo}>
              {content}
            </Typography>
          ) : (
            content(classes)
          )}
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            size="small"
            color="inherit"
            onClick={() => Router.push(links.left.link)}
          >
            <ChevronLeft className={classes.leftIcon} />
            {links.left.title}
          </Button>
          <div className={classes.grow} />
          <Button
            className={classes.button}
            size="small"
            color="secondary"
            onClick={() => Router.push(links.right.link)}
          >
            {links.right.title}
            <ChevronRight className={classes.rightIcon} />
          </Button>
        </CardActions>
        {media &&
          mediaPosition === 'bottom' && (
            <CardMedia
              component="img"
              className={classes.media}
              image={media}
              title="Owen Locke"
            />
          )}
      </Card>
    </Paper>
  )
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  links: PropTypes.object.isRequired,
  media: PropTypes.any,
  mediaPosition: PropTypes.oneOf(['top', 'bottom']),
}

export default withStyles(styles)(MediaCard)
