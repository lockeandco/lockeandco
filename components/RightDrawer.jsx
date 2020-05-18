import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuList from './RightDrawerList'

const styles = {
	list: {
		width: 300,
	},
}

class RightDrawer extends React.Component {
	state = {
		open: false,
	}

	toggleDrawer = open => () => {
		this.setState({
			open,
		})
	}

	render() {
		const {classes, route, Router} = this.props

		return (
			<>
				<IconButton color="inherit" onClick={this.toggleDrawer(true)}>
					<MenuIcon />
				</IconButton>
				<Drawer
					anchor="right"
					open={this.state.open}
					onClose={this.toggleDrawer(false)}
				>
					<div style={{width: 225}}>
						<MenuList
							route={route}
							toggleDrawer={this.toggleDrawer}
							Router={Router}
						/>
					</div>
				</Drawer>
			</>
		)
	}
}

RightDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RightDrawer)
