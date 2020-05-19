import React, {useEffect} from 'react'
import Page from '../../components/PageLayout'
import Paper from '@material-ui/core/Paper'
import Headers from '../../components/MobileScrollingHeader'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import compose from 'ramda/src/compose'
import Hidden from '@material-ui/core/Hidden'
import {config} from 'react-spring'
import {
	motion,
	useAnimation,
	useSpring,
	transform,
	useCycle,
} from 'framer-motion'
import useComponentSize from '@rehooks/component-size'
import RecipesCardList from '../../components/Card/reference/'


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

const spring = {
	type: 'spring',
	tension: 380,
	friction: 460,
	damping: 200,
	stiffness: 10,
}

const importRecipes = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/recipes', false, /\.md$/)
    .keys()
	.map(relativePath => relativePath.substring(2))
	
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/recipes/${path}`)
      return { ...markdown, slug: path.substring(0, path.length - 3) }
    })
  )
}

const FramerHeader = props => {
	const classes = useStyles()

	const ref = React.useRef(null)
	const size = useComponentSize(ref)
	const {width} = size
	const test = transform(0, [width, -width], [0, 1])
	const [tX, cycleX] = useCycle(width, -width, 0)
	const translateX = useSpring(0, spring)
	const controls = useAnimation()
	const firstLine = useAnimation()

	useEffect(() => {
		firstLine.start(i => ({
			translateX: -width,
			transition: {delay: 3.2, duration: 10},
		}))
	}, [width])

	useEffect(() => {
		controls.start(i => ({
			opacity: i < 3 ? [1, 1] : [0, 1],
			translateX: i < 3 ? [width, -width] : [width, 0],
			transition: {delay: i < 3 ? i * 4.2 : i * 3.2, duration: i * 6},
		}))
	}, [width])

	return (

			<RecipesCardList { ...props} />

	)
}

const RecipesPage = props => {
	const {classes, recipesList, ...other} = props

	console.log('RECIPES', recipesList)
	return (
		<Page
			{...other}
			pictures={{
				left: {
					url: ``,
					size: 0,
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
							top: '20%',
						}}
					>
						<Hidden smUp>
							<FramerHeader />
						</Hidden>
						<Hidden xsDown>
							<FramerHeader {...props} />
						</Hidden>
					</div>
				),
			}}
		/>
	)
}

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
