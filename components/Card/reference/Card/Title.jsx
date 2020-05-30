import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring, openSpring} from './animations'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
// Import GridListTileBar from '@material-ui/core/GridListTileBar'

const useStyles = makeStyles(() => ({
	title: {
		textTransform: 'lowercase',
		fontFamily: 'OldGrowth',
		color: '#E2DED5',
		fontWeight: 700,
		// TextShadow: `-1px 1px 1px #243746,
		// 		  1px 1px 1px #243746,
		// 		  1px -1px 0 #243746,
		// 		  -1px -1px 0 #243746`,
	},
	titleBar: {
		background: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,.3) 100%)`,
		width: '100%',
		height: '100px',
		position: 'absolute',
	},
	category: {
		fontWeight: 600,
		textTransform: 'uppercase',
		// FontFamily: 'OldGrowth',
		color: '#E2DED5',
		// TextShadow: `-1px 1px 1px #243746,
		// 		  1px 1px 1px #243746,
		// 		  1px -1px 0 #243746,
		// 		  -1px -1px 0 #243746`,
	},
}))

export const Title = ({title, category, isSelected}) => {
	const inverted = useInvertedScale()
	const classes = useStyles()
	const x = isSelected ? 30 : 15
	const y = x

	return (
		<div className={classes.titleBar}>
			<motion.div
				className="title-container"
				initial={false}
				animate={{x, y}}
				transition={isSelected ? openSpring : closeSpring}
				transformTemplate={scaleTranslate}
				style={{...inverted, originX: 0, originY: 0}}
			>
				<span className={classes.category}>{category}</span>
				{/* <GridListTileBar title={title} subtitle={<span> {category}</span>} /> */}
				<Typography variant="h6" className={classes.title}>
					{title}
				</Typography>
			</motion.div>
		</div>
	)
}

/**
 * `transform` is order-dependent, so if you scale(0.5) before translateX(100px),
 * the visual translate will only be 50px.
 *
 * The intuitive pattern is to translate before doing things like scale and
 * rotate that will affect the coordinate space. So Framer Motion takes an
 * opinion on that and allows you to animate them
 * individually without having to write a whole transform string.
 *
 * However in this component we're doing something novel by inverting
 * the scale of the parent component. Because of this we want to translate
 * through scaled coordinate space, and can use the transformTemplate prop to do so.
 */
const scaleTranslate = ({x, y, scaleX, scaleY}) =>
	`scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`
