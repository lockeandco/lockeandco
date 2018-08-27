import React, { Fragment } from 'react'
import Menu from './Menu'
import Bottom from '../components/BottomMenu'

const Layout = props => {
  //console.log(props)
  return (
    <Fragment>
      <Menu />
      {props.children}
      <Bottom />
    </Fragment>
  )
}
export default Layout
