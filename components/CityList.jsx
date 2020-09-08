import {useMemo} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import {
	tap,
	compose,
	head,
	toLower,
	pluck,
	flatten,
	reject,
	isNil,
	isEmpty,
	map,
	sort,
	sortBy,
	prop,
	ascend,
	omit,
	over,
	lensProp,
	test as rtest,
	replace,
	ifElse,
	slice,
	identity,
	when,
	tryCatch,
} from 'ramda'
import {isNotNilOrEmpty} from 'ramda-adjunct'
import PlacesSearch from './MaterialFormiklDownshift'

const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		minHeight: '100vh',
		maxWidth: 300,
		backgroundColor: `#D6D1C4`,
	},
	listItemText: {
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		fontWeight: 'bold',
		textTransform: 'unset',
		fontSize: '0.6em',
		// Padding: 'unset',
	},
	listItemTextActive: {
		color: 'rgb(212, 194, 1)',
		fontFamily: 'OldGrowth',
		fontWeight: 'bold',
		textTransform: 'unset',
		fontSize: '0.6em',
		// Padding: 'unset',
	},
	insetItemText: {
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		fontWeight: 'bold',
		textTransform: 'unset',
		fontSize: '0.5em',
		// Padding: 'unset',
	},
	iconColor: {
		color: '#C36D15',
	},
	button: {
		color: 'rgb(36, 55, 70)',
		fontFamily: 'OldGrowth',
		fontWeight: 'bold',
		textTransform: 'unset',
		fontSize: '0.6em',
	},
	inset: {
		'&:first-child': {
			paddingLeft: 15,
		},
	},
	buttonActive: {
		backgroundColor: '#243746',
		'&:hover': {
			backgroundColor: '#243746',
		},
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		fontWeight: 'bold',
		textTransform: 'unset',
		fontSize: '0.7em',
	},
	downshiftMargin: {
		marginTop: 10,
		marginBottom: 10,
	},
	menuItem: {
		fontFamily: 'OldGrowth',
		fontWeight: 'bold',
		textTransform: 'unset',
		fontSize: '0.6em',
		color: '#243746',
	},
})
const chevrons = '<<'
const CityList = props => {
	const {
		classes,
		lockeColocs,
		expandList,
		open,
		toggleDrawer = () => null,
		handleClick,
		route,
		Router,
		city,
		setZoom,
		setPosition,
		setPositionAndZoom,
		setStore,
		selectedItem,
	} = props

	const locs = isNotNilOrEmpty(lockeColocs)
		? lockeColocs?.filter(c => isNotNilOrEmpty(c.city))
		: []

	const citiesD = useMemo(
		() =>
			compose(
				map(l => Object.assign({}, {label: toLower(l.name)}, {id: l.place_id})),
				reject(isEmpty),
				reject(isNil),
				// Sort(ascend(prop('name'))),
				sortBy(
					compose(
						when(rtest(/^(the )/g), replace(/^(the )/g, '')),
						toLower,
						prop('name')
					)
				),
				flatten,
				pluck('list')
			)(locs),
		[locs]
	)

	const getCity = loc =>
		locs?.reduce((x, y) => {
			return Array.isArray(y.list) &&
				y.list.reduce(
					(w, z) => (toLower(loc) === toLower(z.name) ? z.name : w),
					''
				)
				? y.city
				: x
		}, city)
	const getPosition = loc =>
		locs?.reduce((x, y) => {
			return Array.isArray(y.list) &&
				y.list.reduce((w, z) => (toLower(loc) === toLower(z.name) ? z : w), '')
				? y.list.reduce(
						(w, z) => (toLower(loc) === toLower(z.name) ? z : w),
						{}
				  )
				: x
		}, selectedItem)

	const sortedLocs = useMemo(
		() =>
			compose(
				map(over(lensProp('city'), compose(tryCatch(toLower, identity)))),

				sort(ascend(prop('city')))
			)(locs),
		[locs]
	)
	const showCity = city
		? sortedLocs?.filter(l =>
				l.city ? toLower(l.city) === toLower(city) : true
		  )
		: sortedLocs

	return (
		<>
			<div className={classes.downshiftMargin}>
				<PlacesSearch
					menuClasses={classes.menuItem}
					handleChange={item => {
						// Console.log('ITEM', item)
						if (item) {
							const newSelectedItem = Object.assign({}, getPosition(item))
							const posLoc = newSelectedItem?.location

							// Console.log(posLoc)
							expandList(getCity(item))
							setPositionAndZoom({
								position: posLoc || {
									lat: 39.743642,
									lng: -104.9854807,
								},
								zoom: 14,
							})
							setStore(newSelectedItem)
							toggleDrawer()
						} else {
							expandList('')
							setPositionAndZoom({
								position: {
									lat: 39.743642,
									lng: -104.9854807,
								},
								zoom: 10,
							})
							setStore({})
						}
					}}
					items={citiesD}
				/>
			</div>
			<List>
				{showCity.map(item => (
					<React.Fragment key={item.city || Math.random() * 32}>
						<ListItem
							key={item.city || Math.random() * 32}
							button
							// OnClick={() => {
							//   console.log('ITMs', item)
							//   console.log('Loc', item.location)
							//   handleClick
							//     ? handleClick(item.location)
							//     : props.handleTest(item.location)
							// }}
							style={{textAlign: 'left'}}
							onClick={() => {
								// Console.log(item)

								if (item.city && toLower(item.city) !== toLower(city)) {
									expandList(item.city)
									setPositionAndZoom({position: item.location, zoom: 12})
								} else {
									expandList('')
									setPositionAndZoom({
										position: {
											lat: 39.743642,
											lng: -104.9854807,
										},
										zoom: 10,
									})
								}
							}}
						>
							<ListItemText
								primaryTypographyProps={{
									className:
										item.city && toLower(item.city) !== toLower(city)
											? classes.listItemText
											: classes.listItemTextActive,
								}}
								primary={`${item.city || 'no city'} (${item.total})`}
							/>
						</ListItem>
						<Collapse in={city === item.city} timeout="auto">
							{Array.isArray(item.list) &&
								sortBy(
									compose(
										when(rtest(/^(the )/g), replace(/^(the )/g, '')),
										toLower,
										prop('name')
									),
									item.list
								).map(store => {
									return (
										<List
											key={store.itemId || Math.random() * 64}
											disablePadding
											component="div"
										>
											<ListItem
												button
												onClick={() => {
													// Console.log(store)
													// expandList(item.city)

													setPositionAndZoom({
														position: store.location,
														zoom: 14,
													})
													setStore(store || {})
													toggleDrawer()
												}}
											>
												<ListItemText
													inset
													classes={{
														inset: classes.inset,
													}}
													primaryTypographyProps={{
														className:
															store.name &&
															selectedItem?.name &&
															toLower(store.name) ===
																toLower(selectedItem?.name)
																? classes.listItemTextActive
																: classes.listItemText,
													}}
													primary={toLower(store.name)}
												/>
											</ListItem>
										</List>
									)
								})}
						</Collapse>
					</React.Fragment>
				))}
			</List>
		</>
	)
}

CityList.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CityList)
