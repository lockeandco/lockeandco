import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring} from './animations'

export const Image = ({
	id,
	isSelected,
	pointOfInterest = 0,
	backgroundColor,
}) => {
	const inverted = useInvertedScale()
	const imagePath = id ? `images/uploads/${id}.jpg` : '/Bonfire_in_the_Woods2.jpg'
	console.log(inverted)
	return (
		<motion.div
			className="card-image-container"
			style={{...inverted, backgroundColor: 'transparent', originX: 0, originY: 0}}
		>
			<motion.img
				className="card-image"
				src={imagePath}
				alt=""
				initial={false}
				animate={isSelected ? {x: -20, y: -20} : {x: -pointOfInterest, y: 0}}
				transition={closeSpring}
			/>
		</motion.div>
	)
}
