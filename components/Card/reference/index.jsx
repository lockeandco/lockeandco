import Header from './Header'
import {CardList} from './CardList'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
const App = props => {
	const {recipesList: cardData, ...rest} = props
	return (
		<Box mt={9}>
			<Container maxWidth="lg">
				<Header />
				<CardList cardData={cardData} {...rest} />
			</Container>
		</Box>
	)
}

export default App
