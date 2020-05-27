import {Header} from './Header'
import {CardList} from './CardList'

const App = props => {
	const {recipesList: cardData, ...rest} = props
	return (
		<div className="container">
			<CardList cardData={cardData} {...rest} />
		</div>
	)
}

export default App
