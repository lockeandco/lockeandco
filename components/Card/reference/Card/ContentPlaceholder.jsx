import {LoremIpsum} from 'react-lorem-ipsum'
import {motion, useInvertedScale} from 'framer-motion'

export const ContentPlaceholder = React.memo(props => {
	const inverted = useInvertedScale()

	console.log('PROPSS JAOSJADSMMMASLd', props)
	return (
		<motion.div
			className="content-container"
			style={{...inverted, originY: 0, originX: 0, color: '#E2DED5'}}
		>
			<LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} />
		</motion.div>
	)
})
