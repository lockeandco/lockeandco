import React, {Fragment} from 'react'
import Page from './PageLayout'
import compose from 'ramda/src/compose'
import {withStyles} from '@material-ui/core/styles'
import Background from './TransitionBackground'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Headers from './ScrollingHeaders'
import CommonHeader from './MobileScrollingHeader'
import CardBackground from './CardBackground'
import Link from 'next/link'
import Divider from '@material-ui/core/Divider'

const coFounderCopy = classes => (
	<>
		<Typography paragraph variant="body1" className={classes.typoCaption}>
			What is Locke + Co. about? Good company. The same as those aspens quaking
			together in the wind: Connection through deep Colorado roots.
		</Typography>
		<Typography paragraph variant="body1" className={classes.typo}>
			The process of distilling has brought with it valuable perspective. After
			years focused on business development, management and client service, as
			well as giving back (
			<Link href="/co-founders/rick">
				<a className={classes.typo}>Rick</a>
			</Link>{' '}
			serves on Denver Museum of Nature & Science’s Giving Club Council;{' '}
			<Link href="/co-founders/owen">
				<a className={classes.typo}>Owen </a>
			</Link>{' '}
			on the board of nonprofit Geneva Glen Camp) both established successful
			careers.
		</Typography>
		<Typography paragraph variant="body1" className={classes.typo}>
			However, the alchemy of creating something new through careful selection
			plus separation helped both distill down their own busy working lives.
			They extracted out one common element: celebrating the best of what life
			in Colorado has afforded.
		</Typography>
		<Typography paragraph variant="body1" className={classes.typo}>
			This guiding principle, of sharing that experience, hit them while
			hand-cutting the aging discs from mature stands of aspen on family land
			flanking Central Colorado’s Mosquito Range. All the best days added up.
			The days spent camping, hiking, biking, fishing, snowboarding and skiing:
			that sunset toast after an unending day fly-fishing the Yampa, the warm
			nip from a flask on a cold chairlift, the laughter over a late-summer
			backyard game of cornhole. The unapologetic last howl at the moon.
		</Typography>
	</>
)

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
})

const CoFounders = props => {
	const {classes, ...other} = props
	return (
		<Page
			{...other}
			pictures={{
				left: {
					url: `/Bonfire_in_the_Woods.jpg`,
					size: '100%',
				},
				rightTop: {
					url: `/Group_Dinner_Table.jpg`,
					size: `50%`,
				},
				rightBottom: {
					url: `/Woman_in_Hammock.jpg`,
					size: `50%`,
				},
			}}
			text={{
				position: 'left',
				component: (
					<CardBackground
						{...other}
						media="/Owen+Rick.jpg"
						content={coFounderCopy}
						links={{
							left: {
								title: 'Rick',
								link: '/co-founders/rick',
							},
							right: {
								title: 'Owen',
								link: '/co-founders/owen',
							},
						}}
					/>
				),
			}}
			header={{
				position: 'rightBottom',
				component: (
					<CommonHeader headerText="official sponsors of a good time" />
				),
			}}
		/>
	)
}

export default compose(withStyles(styles))(CoFounders)
