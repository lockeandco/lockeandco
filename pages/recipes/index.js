import Page from '../../components/PageLayout'
import {makeStyles} from '@material-ui/core/styles'
import RecipesCardList from '../../components/Card/reference'
// Import fs from 'fs'
// import path from 'path'

const useStyles = makeStyles(theme => ({
	typoBigHeader: {
		position: `fixed`,
		display: 'flex',
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		fontSize: '5rem',
		whiteSpace: 'nowrap',
		textShadow: '3px 3px rgb(36, 55, 70)',
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '4rem',
		},
	},
}))

const importRecipes = async () => {
	// https://webpack.js.org/guides/dependency-management/#requirecontext
	const markdownFiles = require
		.context('../../content/recipes', false, /\.md$/)
		.keys()
		.map(relativePath => relativePath.slice(2))

	return Promise.all(
		markdownFiles.map(async path => {
			const markdown = await import(`../../content/recipes/${path}`)
			return {...markdown, slug: path.slice(0, -3)}
		})
	)
}

const RecipesPage = props => {
	const {recipesList, ...other} = props

	return (
		<Page
			{...other}
			pictures={{
				left: {
					url: `/test4.jpeg`,
					size: `100%`,
				},
				right: {
					url: ``,
					size: 0,
				},
			}}
			leftSize={12}
			rightSize={0}
			text={{
				position: 'left',
				component: (
					<div
						style={{
							display: 'flex',
							padding: `45px 0px`,
						}}
					>
						<RecipesCardList {...props} />
					</div>
				),
			}}
		/>
	)
}

// Export async function getStaticPaths() {
// 	const paths = fs
// 		.readdirSync(path.join(process.cwd(), 'content/recipes'))
// 		.map(blogName => {
// 			const trimmedName = blogName.slice(0, Math.max(0, blogName.length - 3))
// 			return {
// 				params: {slug: ['recipe', trimmedName]},
// 			}
// 		})
// 		.concat({params: {slug: ['']}})
// 	console.log('PATHS', JSON.stringify(paths))

// 	return {
// 		paths,
// 		fallback: false, // Constrols wheter not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
// 	}
// }

export async function getStaticProps() {
	const rawList = await importRecipes()
	const recipesList = await JSON.parse(JSON.stringify(rawList))

	return {
		props: {
			recipesList,
		},
	}
}

export default RecipesPage
