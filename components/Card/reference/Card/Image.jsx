import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring} from './animations'

export const Image = ({
	recipeImage,
	isSelected,
	pointOfInterest = 0,
	backgroundColor,
}) => {
	const inverted = useInvertedScale()
	console.log(recipeImage)
	const imagePath = recipeImage
		? `https://staging.lockeandcodistilling.com/${recipeImage.concat(
				'?nf_resize=smartcrop&w=800&h=430'
		  )}`
		: `https://staging.lockeandcodistilling.com/Bottle_Cheersing.jpg${'?nf_resize=fit&w=800&h=430'}`
	console.log(inverted)
	return (
		<motion.div
			className="card-image-container"
			style={{
				...inverted,
				backgroundColor: 'transparent',
				originX: 0,
				originY: 0,
			}}
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
