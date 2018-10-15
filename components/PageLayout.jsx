import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Content from './ContentCard'
import compose from 'ramda/src/compose'
import { withWindowSize } from 'react-fns'
import withTransition from './withTransition'
import Typography from '@material-ui/core/Typography'
import Header100 from '../components/MobileScrollingHeader'

const styles = theme => ({
  demo: {
    height: `100%`,
    flexGrow: 1,
    minHeight: '100vh',
  },
})

const Page = props => {
  const {
    classes,
    pictures,
    text,
    header,
    leftSize,
    rightSize,
    backgroundColorRight,
  } = props
  return (
    <Grid
      container
      spacing={0}
      className={classes.demo}
      alignItems={'stretch'}
      direction={'row'}
      justify={'center'}
      wrap="nowrap"
    >
      <Grid
        item
        xs={12}
        md={leftSize || 6}
        style={{
          minHeight: '100vh',
          //paddingTop: 60,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${pictures.left ? pictures.left.url : ``})`,
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <Hidden mdUp>
          {header &&
            header.component && (
              <Header100 headerText={header.component.props.headerText} />
            )}
          {text && text.component}
        </Hidden>
        <Hidden smDown>
          {text && text.position === 'left' && text.component}
          {text &&
            text.position !== 'left' && <div style={{ overflow: 'auto' }} />}
        </Hidden>
      </Grid>
      <Hidden smDown>
        {rightSize < 1 || rightSize > 12 ? null : (
          <Grid item sm={rightSize || 6}>
            <div
              style={{
                width: '100%',
                padding: 'unset',
                height: `${pictures.rightTop ? pictures.rightTop.size : 0}`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${
                  pictures.rightTop ? pictures.rightTop.url : ``
                })`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: `${backgroundColorRight}`,
              }}
            >
              {header && header.position === 'rightTop' && header.component}
              {text && text.position === 'rightTop' && text.component}
            </div>

            <div
              style={{
                width: '100%',
                height: `${
                  pictures.rightBottom ? pictures.rightBottom.size : 0
                }`,
                paddingBottom: '30px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${
                  pictures.rightBottom ? pictures.rightBottom.url : ``
                })`,
                backgroundRepeat: 'no-repeat',
                overflow: 'auto',
              }}
            >
              {header && header.position === 'rightBottom' && header.component}
              {text && text.position === 'rightBottom' && text.component}
            </div>
          </Grid>
        )}
      </Hidden>
    </Grid>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(Page)
