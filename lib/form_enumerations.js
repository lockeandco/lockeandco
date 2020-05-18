import {
	MapSearch,
	BookOpenPageVariant,
	AccountMultiple,
	Keg,
	At,
	Cart,
	Email,
} from 'mdi-material-ui'

const contactEnumerations = [
	'New Whiskey Drinker',
	'Casual Whiskey Drinker',
	'Whiskey Aficionado',
	'Liquor Store Employee',
	'Liquor Store Owner',
	'Restaurant Employee',
	'Restaurant Owner',
	'Bartender / Mixologist',
	'Distiller',
	'Brewer',
]

export const linkList = [
	{
		name: 'spirits',
		link: '/spirits',
		page: 0,
		icon: <Keg style={{color: '#C36D15'}} />,
	},
	{
		name: 'co-founders',
		link: '/co-founders',
		page: 1,
		icon: <AccountMultiple style={{color: '#C36D15'}} />,
	},
	{
		name: 'our story',
		link: '/our-story',
		page: 2,
		icon: <BookOpenPageVariant style={{color: '#C36D15'}} />,
	},
	{
		name: 'find us',
		link: '/find-us',
		page: 3,
		icon: <MapSearch style={{color: '#C36D15'}} />,
	},
	{
		name: 'contact us',
		link: '/contact-us',
		page: 4,
		icon: <Email style={{color: '#C36D15'}} />,
	},
	{
		name: 'stay connected',
		link: '/stay-connected',
		page: 5,
		icon: <At style={{color: '#C36D15'}} />,
	},
	{
		name: 'merchandise',
		link: '/merchandise',
		page: 6,
		icon: <Cart style={{color: '#C36D15'}} />,
	},
]

export const links = [
	{
		name: 'spirits',
		link: '/spirits',
		order: 0,
	},
	{
		name: 'recipes',
		link: '/recipes',
		order: 1,
	},
	{
		name: 'co-founders',
		link: '/co-founders',
		order: 2,
	},
	{
		name: 'our story',
		link: '/our-story',
		order: 3,
	},

	{
		name: 'find us',
		link: '/find-us',
		order: 4,
	},
]
export default contactEnumerations
