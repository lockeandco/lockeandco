import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import CityList from './CityList'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
	root: {
		width: '100%',
		minHeight: '100vh',
		maxWidth: 300,
		backgroundColor: 'rgb(36, 55, 70)',
		padding: 10,
	},
})

const LeftDrawerList = props => {
	const {
		classes,
		toggleDrawer,
		route,
		Router,
		lockeColocs = {
			list: [
				{
					formatted_address: '3320 Youngfield St, Wheat Ridge, CO 80033, USA',
					location: {
						lat: 39.7634547,
						lng: -105.1410719,
					},
					city: 'Wheat Ridge',
					place_id: 'ChIJPd14g86Fa4cRtzz3w0mKhN0',
					name: 'Applejack Wine & Spirits',
					site: 'https://applejack.com/',
				},
			],
			total: 1,
			formatted_address: 'Wheat Ridge, CO, USA',
			city: 'wheat ridge',
			location: {
				lat: 39.766098,
				lng: -105.0772063,
			},
		},
		...other
	} = props

	return (
		<div className={classes.root}>
			{Array.isArray(lockeColocs.list) && lockeColocs.list.length < 2 ? (
				<CircularProgress />
			) : (
				<CityList
					{...other}
					toggleDrawer={toggleDrawer}
					lockeColocs={lockeColocs}
				/>
			)}
		</div>
	)
}

LeftDrawerList.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LeftDrawerList)
