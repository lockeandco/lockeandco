import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CustomCard from './Cards'
import MenuButtons from './TextButtons'

const BaseMenu = ({classes, route, children}) => (
	<div className={classes.root}>
		<CustomCard />
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar disableGutters className={classes.toolBar}>
				{children}
			</Toolbar>
		</AppBar>
	</div>
)

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default BaseMenu
