import {useState, useCallback} from 'react'
import Header from './Header'
import {CardList} from './CardList'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import FramerHeader from '../../FramerHeader'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import {pluck} from 'ramda'

const options = {
	minMatchCharLength: 2,
	shouldSort: true,
	findAllMatches: true,
	keys: [
		{name: 'attributes.tags', weight: 0.8},
		{name: 'attributes.title', weight: 0.9},
		{name: 'attributes.season', weight: 0.9},
		{name: 'attributes.ingredients', weight: 0.7},
		{name: 'attributes.source.name', weight: 0.4},
	],
	threshold: 0.2,
	ignorLocation: true,
}
const RecipeCards = props => {
	const {recipesList, ...rest} = props

	const [recipes, updateList] = useState(recipesList)

	const recipeIndex = Fuse.createIndex(options.keys, recipesList)
	const fuse = new Fuse(recipesList, options, recipeIndex)

	const memCallback = useCallback(
		event => {
			event.persist()
			const value = event.target.value
			if (value.length > 1) {
				updateList(pluck('item', fuse.search(value)))
			} else {
				updateList(recipesList)
			}
		},
		[fuse, recipesList]
	)

	return (
		<Box mt={9} marginX="auto">
			<Container maxWidth="lg">
				<div
					style={{
						position: '-webkit-sticky',
						position: 'sticky',
						top: 45,
					}}
				>
					<Header searchList={memCallback} />
					<FramerHeader />
				</div>
				<div
					style={{
						position: 'relative',
						paddingTop: 15,
					}}
				>
					<CardList cardData={recipes} {...rest} />
				</div>
			</Container>
		</Box>
	)
}

RecipeCards.propTypes = {
	recipesList: PropTypes.arrayOf(PropTypes.object),
}
export default RecipeCards
