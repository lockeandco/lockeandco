import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring} from './animations'

export const Image = ({
	recipeImage,
	isSelected,
	pointOfInterest = 0,
	backgroundColor,
}) => {
	const inverted = useInvertedScale()

	const imagePath = recipeImage
		? `${process.env.NEXT_PUBLIC_URL}/${recipeImage.concat(
				'?nf_resize=smartcrop&w=800&h=430'
		  )}`
		: `${
				process.env.NEXT_PUBLIC_URL
		  }/Bottle_Cheersing.jpg${'?nf_resize=fit&w=800&h=430'}`

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
