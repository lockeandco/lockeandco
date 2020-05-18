import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import {virtualize} from 'react-swipeable-views-utils'
import {mod} from 'react-swipeable-views-core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import CoFounders from '../components/Cofounders'
import Rick from '../components/Rick'
import Owen from '../components/Owen'
import Router from 'next/router'

const VirtualizeSwipeableViews = virtualize(SwipeableViews)

const routePath = [
	{
		route: '/co-founders',
		index: 0,
	},
	{
		route: '/co-founders?founder=owen',
		founder: 'owen',
		index: 1,
	},
	{
		route: '/co-founders?founder=rick',
		founder: 'rick',
		index: 2,
	},
]

const slideRenderer = props => parameters => {
	const {index, key} = parameters
	const {
		route,
		query: {founder},
	} = props

	const getPageIndex = routePath.filter(x => x.founder === founder)
	const pageIndex = getPageIndex.length > 0 ? getPageIndex[0].index : 0

	console.log('INDEX', index)
	switch (mod(pageIndex, 3)) {
		case 0:
			return
			;<CoFounders key={key} {...props} />

		case 1:
			return <Owen key={key} {...props} />

		case 2:
			return <Rick key={key} {...props} />

		default:
			return null
	}
}

const CofoundersTabs = props => {
	return <VirtualizeSwipeableViews slideRenderer={slideRenderer(props)} />
}

export default CofoundersTabs
