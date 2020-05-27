import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring, openSpring} from './animations'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(() => ({
	title: {
		textTransform: 'lowercase',
		fontFamily: 'OldGrowth',
		fontSize: `.8rem`,
		fontStyle: 'italic',
		color: '#E2DED5',
	},
}))

export const Tags = ({title, category, isSelected}) => {
	const inverted = useInvertedScale()
	const classes = useStyles()
	const x = isSelected ? 30 : 15
	const y = 330

	return (
		<motion.div
			className="title-container"
			initial={false}
			animate={{x, y}}
			transition={isSelected ? openSpring : closeSpring}
			transformTemplate={scaleTranslate}
			style={{...inverted, originX: 0, originY: 0}}
		>
			<span className="category">{category}</span>
			<Typography variant="h6" className={classes.title}>
				Some Tags
			</Typography>
		</motion.div>
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
