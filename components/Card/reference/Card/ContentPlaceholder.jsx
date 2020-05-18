import {motion, useInvertedScale} from 'framer-motion'

export const ContentPlaceholder = React.memo(() => {
	const inverted = useInvertedScale()
	return (
		<motion.div
			className="content-container"
			style={{...inverted, originY: 0, originX: 0}}
		>
		</motion.div>
	)
})
