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
import makeStyles from '@material-ui/styles/makeStyles'
import clsx from 'clsx'

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150
const useStyles = makeStyles(theme => ({
	card: {
		position: 'relative',
		padding: 25,
		height: 460,
		flex: '0 0 40%',
		maxWidth: '40%',
		'&:nth-child(4n +1)': {
			flex: '0 0 60%',
			maxWidth: '60%',
		},
		'&:nth-child(4n +4)': {
			flex: '0 0 60%',
			maxWidth: '60%',
		},
		'&:nth-child(odd)': {
			paddingLeft: 0,
		},
		'&:nth-child(even)': {
			paddingRight: 0,
		},
		[theme.breakpoints.only('sm')]: {
			flex: '0 0 50%',
			maxWidth: '50%',
			'&:nth-child(4n +1)': {
				flex: '0 0 50%',
				maxWidth: '50%',
			},
			'&:nth-child(4n +4)': {
				flex: '0 0 50%',
				maxWidth: '50%',
			},
		},
		[theme.breakpoints.only('xs')]: {
			flex: '1 0 100%',
			maxWidth: '100%',
			paddingLeft: 0,
			paddingRight: 0,
			'&:nth-child(4n +1)': {
				flex: '1 0 100%',
				maxWidth: '100%',
			},
			'&:nth-child(4n +4)': {
				flex: '1 0 100%',
				maxWidth: '100%',
			},
		},
	},
	cardContentContainer: {
		width: '100%',
		height: '100%',
		position: 'relative',
		display: 'block',
		pointerEvents: 'none',
	},
	cardContentContainerOpen: {
		top: 0,
		left: 0,
		right: 0,
		position: 'fixed',
		zIndex: 1,
		overflow: 'hidden',
		padding: '120px 0px',
	},
	cardContent: {
		pointerEvents: 'auto',
		position: 'relative',
		borderRadius: 20,
		background: '#E2DED5',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
		margin: '0 auto',
	},
	cardContentOpen: {
		height: 'auto',
		maxWidth: 700,
		overflow: 'hidden',
	},
}))

export const Card = memo(
	props => {
		const {isSelected, slug, id, pointOfInterest, backgroundColor} = props
		const classes = useStyles()
		const router = useRouter()
		const title = props.attributes?.title
		const category = props.attributes?.season
		const tags = props.attributes?.tags
		const recipeImage = props.attributes?.image?.slice(7)

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
		const cardContentContainerStyle = clsx(classes.cardContentContainer, {
			[classes.cardContentContainerOpen]: isSelected,
		})
		const cardContentStyle = clsx(classes.cardContent, {
			[classes.cardContentOpen]: isSelected,
		})
		return (
			<li ref={containerRef} className={classes.card}>
				<Overlay isSelected={isSelected} />
				<div className={cardContentContainerStyle}>
					<NextLink href={isSelected ? `/recipes` : `/recipes?recipe=${slug}`}>
						<motion.div
							ref={cardRef}
							className={cardContentStyle}
							style={{...inverted, zIndex, y}}
							layoutTransition={isSelected ? openSpring : closeSpring}
							drag={isSelected ? 'y' : false}
							dragConstraints={constraints}
							onDrag={checkSwipeToDismiss}
							onUpdate={checkZIndex}
						>
							<Image
								recipeImage={recipeImage}
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

							<Tags tags={tags} isSelected={isSelected} />
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
