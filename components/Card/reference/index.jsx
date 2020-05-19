import {Header} from './Header'
import {CardList} from './CardList'



const App = (props) => {

	console.log('PROPS', props)
	return (
		<div className="container">
			<CardList cardData={props.recipesList}/>
		</div>
	)
}

export default App
