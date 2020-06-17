import React, {useEffect, useCallback} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import {
	motion,
	useAnimation,
	useSpring,
	transform,
	useCycle,
} from 'framer-motion'
import useWindowSize from '@rehooks/window-size'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
	typoBigHeader: {
		position: 'fixed',
		display: 'flex',
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		fontSize: '4rem',
		whiteSpace: 'nowrap',
		textShadow: '3px 3px rgb(36, 55, 70)',
		// [theme.breakpoints.down('sm')]: {
		// 	fontSize: '3rem',
		// },
		// [theme.breakpoints.down('md')]: {
		// 	fontSize: '4rem',
		// },
	},
}))

const spring = {
	type: 'spring',
	mass: 25,
	// Tension: 3800,
	// friction: 460,
	damping: 15,
	stiffness: 10,
	restDelta: 1.75,
	restSpeed: 1.75,
}
const FramerHeader = props => {
	const classes = useStyles()

	const windowSize = useWindowSize()
	const controls = useAnimation()
	const {outerWidth, innerWidth} = windowSize
	const translateX = useSpring(0, spring)

	// Enhancement: pass in as props

	const sequence = useCallback(async () => {
		await controls.start({
			x: Number(innerWidth),
			opacity: 1,
			transition: {
				x: {duration: 7, yoyo: 3},
			},
		})
		return controls.start({
			x: '-5%',
			opacity: 1,
			transition: {
				x: {...spring},
			},
		})
	}, [controls, innerWidth])

	useEffect(() => {
		sequence()
	}, [sequence])

	console.log(outerWidth, innerWidth)
	return (
		<Box display="flex" width="100%" height={70}>
			<motion.div
				initial={{
					opacity: 0,
					x: -outerWidth,
				}}
				className={classes.typoBigHeader}
				animate={controls}
			>
				a taste for all seasons
			</motion.div>
		</Box>
		// 	<motion.div
		// 		initial={{
		// 			opacity: 0,
		// 		}}
		// 		className={classes.typoBigHeader}
		// 		custom={3}
		// 		animate={controls}
		// 		positionTransition={spring}
		// 		style={{translateX}}
		// 	>
		// 		recipes coming soon!
		// 	</motion.div>
		// </>
	)
}

export default FramerHeader
