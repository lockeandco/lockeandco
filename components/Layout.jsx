import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Menu from './Menu'
import Bottom from '../components/BottomMenu'

import {useTheme} from '@material-ui/styles'

const styles = theme => ({
	background: {
		// Height: height,
		display: 'flex',
		minWidth: '100vw',
		minHeight: '100vh',
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
		position: 'fixed',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundImage: `url(/Seal_Blue.jpg)`,
		backgroundRepeat: 'no-repeat',
		zIndex: -1000,
	},
})

const Layout = props => {
	const theme = useTheme()
	const {classes, children, ...other} = props

	return (
		<>
			<div className={classes.background} />
			<Menu {...other} />
			{children}
			<Bottom {...other} />
		</>
	)
}

export default withStyles(styles)(Layout)
