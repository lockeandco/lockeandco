import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring, openSpring} from './animations'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(() => ({
	tags: {
		textTransform: 'lowercase',
		// FontFamily: 'OldGrowth',
		// fontSize: `.8rem`,
		fontStyle: 'italic',
		color: '#E2DED5',
		textShadow: `-1px 1px 1px #243746,
				  1px 1px 1px #243746,
				  1px -1px 0 #243746,
				  -1px -1px 0 #243746`,
	},
	// TagB: {
	// 	background:
	// 		'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	// 	bottom: 0,
	// 	height: 48,
	// 	position: 'absolute',
	// 	alignItems: 'center',
	// 	display: 'flex',
	// 	width: '100%',
	// },
}))

export const Tags = ({tags, isSelected}) => {
	const inverted = useInvertedScale()
	const classes = useStyles()
	const x = isSelected ? 30 : 15
	const y = isSelected ? 350 : 350

	return (
		<motion.div
			className="title-container"
			initial={false}
			animate={{x, y}}
			transition={isSelected ? openSpring : closeSpring}
			transformTemplate={scaleTranslate}
			style={{
				...inverted,
				originX: 0,
				originY: 0,
				// Background:
				// 	'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
				// width: '100%',
			}}
		>
			<Typography variant="body1" className={classes.tags}>
				{tags.join(', ')}
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
