import {Card} from './Card'
import makeStyles from '@material-ui/styles/makeStyles'
import {useRouter} from 'next/router'

const useStyles = makeStyles(theme => ({
	cardList: {
		display: 'flex',
		flexWrap: 'wrap',
		alignContent: 'flex-start',
		listStyle: 'none',
		margin: 0,
		padding: 0,
	},
}))
const List = ({cardData, query, ...rest}) => {
	const classes = useStyles()
	const {recipe} = query

	const ORANGE = '#C36D15'
	const BLUE = '#243746'
	const BIEGE = '#E2DED5'

	return (
		<ul className={classes.cardList}>
			{cardData.map((card, i) => (
				<Card
					key={card?.attributes?.title || Math.random() * 10090284276}
					isSelected={recipe === card.slug}
					{...card}
					backgroundColor={i % 2 === 1 ? BLUE : BIEGE}
				/>
			))}
		</ul>
	)
}

export const CardList = props => {
	const {cardData = [], ...rest} = props

	return <List cardData={cardData} {...rest} />
}
