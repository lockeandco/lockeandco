import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import CustomCard from './BottomCard'
import MenuButtons from './BottomTextButtons'
import SocialButtons from './SocialButtons'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'

const styles = {
	root: {
		flexGrow: 1,
		bottom: 0,
		position: 'absolute',
	},
	flex: {
		flex: 1,
	},
	appBar: {
		top: 'unset',
		width: `calc(100% - 275px)`,
		marginRight: '275px',
		backgroundColor: 'rgb(36, 55, 70)',
		maxHeight: 45,
		minHeight: 45,
		bottom: 0,
		right: 0,
		left: 'auto',
		display: 'flex',
		zIndex: 1100,
		borderRadius: 'unset',
		boxSizing: 'border-box',
		boxShadow: 'unset',
		flexShrink: 0,
		flexDirection: 'column',
		position: 'fixed',
	},

	toolBar: {
		bottom: 0,
		minHeight: 45,
		justifyContent: 'flex-end',
	},
}

const ButtonAppBar = props => {
	const {classes, route, ...other} = props

	return (
		<>
			<Hidden smDown>
				<footer className={classes.root}>
					<CustomCard Router={Router} route={route} />
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar disableGutters className={classes.toolBar}>
							<MenuButtons route={route} />
						</Toolbar>
					</AppBar>
				</footer>
			</Hidden>
			<Hidden mdUp>
				<footer className={classes.root}>
					<AppBar
						position="fixed"
						className={classes.appBar}
						style={{width: '100%', marginRight: 'unset'}}
					>
						<Toolbar disableGutters className={classes.toolBar}>
							<Grid
								container
								spacing={0}
								alignItems="center"
								direction="row"
								justify="space-around"
							>
								<Grid item xs>
									<SocialButtons route={route} {...other} />
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				</footer>
			</Hidden>
		</>
	)
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
