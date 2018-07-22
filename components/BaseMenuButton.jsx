import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const BaseMenuButton = ({ page, classes, pageNum, title, goToSlide }) => (
  <Paper className={page === pageNum ? classes.paperActive : classes.paper}>
    <Button
      className={page === pageNum ? classes.buttonActive : classes.button}
      onClick={() => goToSlide(pageNum)}
    >
      {title}
    </Button>
  </Paper>
)

export default BaseMenuButton
