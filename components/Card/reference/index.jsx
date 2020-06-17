import {useState, useCallback} from 'react'
import Header from './Header'
import {CardList} from './CardList'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import FramerHeader from '../../FramerHeader'
import PropTypes from 'prop-types'
const RecipeCards = props => {
	const {recipesList, ...rest} = props

	const [recipes, updateList] = useState(recipesList)

	return (
		<Box mt={9} marginX="auto">
			<Container maxWidth="lg">
				<Header />
				<FramerHeader />
				<CardList cardData={recipesList} {...rest} />
			</Container>
		</Box>
	)
}

RecipeCards.propTypes = {
	recipesList: PropTypes.object,
}
export default RecipeCards
