import React, { Fragment } from 'react'
import Menu from './Menu'
import Bottom from '../components/BottomMenu'

const Layout = props => {
  console.log('LAYOUT', props)
  return (
    <Fragment>
      <Menu {...props} />
      {props.children}
      <Bottom {...props} />
    </Fragment>
  )
}
export default Layout
