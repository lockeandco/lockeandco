import {memo, useRef} from 'react'
import {motion, useMotionValue} from 'framer-motion'
import {useInvertedBorderRadius} from '../utils/use-inverted-border-radius'
import {ContentPlaceholder} from './ContentPlaceholder'
import {Title} from './Title'
import {Tags} from './Tags'
import {Image} from './Image'
import {openSpring, closeSpring} from './animations'
import {useScrollConstraints} from '../utils/use-scroll-constraints'
import {useWheelScroll} from '../utils/use-wheel-scroll'
import NextLink from 'next/link'
import {useRouter} from 'next/router'

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150

export const Card = memo(
	props => {
		const {
			isSelected,
			slug,
			id,
			// Title,
			category,
			pointOfInterest,
			backgroundColor = '#fff',
		} = props
		console.log('CARDa PROPS', props)
		const router = useRouter()
		const title = props.attributes?.title

		const y = useMotionValue(0)
		const zIndex = useMotionValue(isSelected ? 2 : 0)

		// Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
		const inverted = useInvertedBorderRadius(20)

		// We'll use the opened card element to calculate the scroll constraints
		const cardRef = useRef(null)
		const constraints = useScrollConstraints(cardRef, isSelected)

		function checkSwipeToDismiss() {
			y.get() > dismissDistance && router.push('/recipes')
		}

		function checkZIndex(latest) {
			if (isSelected) {
				zIndex.set(2)
			} else if (!isSelected && latest.scaleX < 1.01) {
				zIndex.set(0)
			}
		}

		// When this card is selected, attach a wheel event listener
		const containerRef = useRef(null)
		useWheelScroll(
			containerRef,
			y,
			constraints,
			checkSwipeToDismiss,
			isSelected
		)

		return (
			<li ref={containerRef} className="card">
				<Overlay isSelected={isSelected} />
				<div className={`card-content-container ${isSelected && 'open'}`}>
					<NextLink href={`/recipes?recipe=${slug}`} className="card-open-link">
						<motion.div
							ref={cardRef}
							className="card-content"
							style={{...inverted, zIndex, y}}
							layoutTransition={isSelected ? openSpring : closeSpring}
							drag={isSelected ? 'y' : false}
							dragConstraints={constraints}
							onDrag={checkSwipeToDismiss}
							onUpdate={checkZIndex}
						>
							<Image
								id={id}
								isSelected={isSelected}
								pointOfInterest={pointOfInterest}
								backgroundColor={backgroundColor}
							/>

							<Title
								title={title}
								category={category}
								isSelected={isSelected}
							/>
							<ContentPlaceholder {...props} />

							<Tags
								title={title}
								category={category}
								isSelected={isSelected}
							/>
						</motion.div>
					</NextLink>
				</div>
			</li>
		)
	},
	(previous, next) => previous.isSelected === next.isSelected
)

const Overlay = ({isSelected}) => (
	<motion.div
		initial={false}
		animate={{opacity: isSelected ? 1 : 0}}
		transition={{duration: 0.2}}
		style={{pointerEvents: isSelected ? 'auto' : 'none'}}
		className="overlay"
	/>
)
