// TODO Fix Chevrons, Scrolling, Abstract

import React, {Fragment} from 'react'
import Page from '../components/PageLayout'
import compose from 'ramda/src/compose'
import {withStyles} from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Headers from '../components/ScrollingHeaders'
import CommonHeader from '../components/MobileScrollingHeader'
import CardBackground from '../components/CardBackground'
import Link from 'next/link'
const ourStoryCopy = classes => (
	<>
		<Typography paragraph variant="body1" className={classes.typo}>
			The Locke’s family roots in Colorado moonshining go back several
			generations.{' '}
			<Link href="/co-founders/owen">
				<a className={classes.typo}>Owen Locke</a>
			</Link>{' '}
			kept the craft tradition alive with an early knack for brewing that
			continued through college to graduate school, where he reconnected with{' '}
			<Link href="/co-founders/rick">
				<a className={classes.typo}>Rick Talley</a>
			</Link>
		</Typography>
		.
		<Typography paragraph variant="body1" className={classes.typo}>
			The high school friends and lacrosse teammates immediately recognized that
			their collaborative styles complimented each other well, working through
			MBA degrees together at the University of Denver’s Daniels College of
			Business as hand sale experts for Beam Suntory. It didn’t take them long
			to realize they could create something bolder and wilder than the premier
			spirits they offered at countless tastings. In 2010, the team bought a
			23-gallon still that turned a garage hobby into a lifestyle with their
			first whiskey batches aged in small barrels.
		</Typography>
	</>
)

const styles = theme => ({})

const OurStory = props => {
	const {classes, ...other} = props

	return (
		<Page
			{...other}
			pictures={{
				left: {
					url: `/Man_Looking_Over_Cliff.jpg`,
					size: '100%',
				},
				rightTop: {
					url: `/Moonshine_Jars.jpg`,
					size: '55%',
				},
				rightBottom: {
					url: `/Group_with_Sparklers.jpg`,
					size: '45%',
				},
			}}
			text={{
				position: 'left',
				component: (
					<CardBackground
						{...other}
						content={ourStoryCopy}
						links={{
							left: {
								title: 'Co-Founders',
								link: '/co-founders',
							},
							right: {
								title: 'Find Us',
								link: '/find-us',
							},
						}}
					/>
				),
			}}
			header={{
				position: 'rightTop',
				component: (
					<CommonHeader
						height="100%"
						alignItems="flex-end"
						headerText={`you're in good company here`}
					/>
				),
			}}
		/>
	)
}

export default compose(withStyles(styles))(OurStory)
