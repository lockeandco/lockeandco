//
//
//
//
//
//
// Deprecated
//
//
//
//
//
//
//
//
//
//
//

import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Content from './ContentCard'
import compose from 'ramda/src/compose'
import {withWindowSize} from 'react-fns'
import withTransition from './withTransition'
import Typography from '@material-ui/core/Typography'
import Headers from './ScrollingHeaders'

const styles = theme => ({
	root: {},
	demo: {
		height: `100%`,
		flexGrow: 1,
		// Overflow: 'auto',
		minHeight: '100vh',
	},
	paper: {
		//  Display: 'flex',
		// padding: theme.spacing(2),
		// height: '100%',
		// color: theme.palette.text.secondary,
		flexGrow: 1,
		borderRadius: 'unset',
		backgroundColor: 'transparent',
		overflow: 'auto',
		// MarginBottom: `calc(20% + 90px)`,
		// marginTop: `calc(15% + 90px)`,
		// marginRight: `calc((100% - 300px)/2)`,
		// marginLeft: `calc((100% - 300px)/2)`,
		margin: 10,
		// Overflow: 'auto'
		// minWidth: 300,
		// display: 'flex',
		// backgroundColor: 'rgba(0,0,0,.9)',
		borderRadius: 0,
		// Opacity: 0.7,
		padding: '1em',
		// FlexGrow: 1,
		// flexDirection: 'column',
		// boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
		boxShadow: 'unset',
		// Margin: theme.spacing(1),
		color: '#E2DED5',
		fontFamily: 'Flama',
		overflow: 'auto',
	},
	typo: {
		color: 'rgb(36, 55, 70)',
		fontFamily: 'Flama',
		fontSize: '1.1rem',
		fontWeight: 500,
		overflow: 'auto',
	},
	typoHeader: {
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		fontSize: '6rem',
		overflow: 'hidden',
		margin: 1,
	},
})

const Page = props => {
	const {classes, pictures} = props
	return (
		<Grid
			container
			spacing={0}
			className={classes.demo}
			alignItems="stretch"
			direction="row"
			justify="center"
			wrap="nowrap"
		>
			<Hidden smDown>
				<Grid item xs={12} md={6}>
					<Grid
						container
						spacing={0}
						className={classes.demo}
						// AlignItems={'stretch'}
						// direction={'column'}
						// justify={'center'}
						// wrap="nowrap"
					>
						<Grid
							item
							xs={12}
							md={12}
							style={{
								// Height: height,
								paddingTop: 60,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundImage: `url(${pictures.left})`,
								backgroundRepeat: 'no-repeat',
							}}
						/>
					</Grid>
				</Grid>

				<Grid item xs={12} md={6}>
					<Grid
						container
						spacing={0}
						className={classes.demo}
						alignItems="stretch"
						direction="row"
						// Justify={'center'}
						// wrap="nowrap"
					>
						<Grid
							item
							xs={12}
							sm={12}
							style={{
								// Padding: 'unset',
								height: '40%',
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundImage: `url(${pictures.rightTop50})`,
								backgroundRepeat: 'no-repeat',
							}}
						/>

						<Grid
							item
							xs={12}
							md={12}
							// Style={{ padding: 'unset' }}
							// className={classes.demo}
							style={{
								height: '60%',
								overflow: 'auto',
								padding: 'unset',
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundImage: `url(${pictures.rightBottom50})`,
								backgroundRepeat: 'no-repeat',
							}}
						>
							<Grid container spacing={0}>
								<Grid
									item
									xs
									zeroMinWidth
									style={{marginLeft: 0, overflow: 'hidden'}}
								>
									<Headers text="a taste like none other" />
								</Grid>
							</Grid>

							<Paper className={classes.paper}>
								<Typography paragraph className={classes.typo}>
									Locke + Co. Whiskey welcomes everyone and everyone is welcome,
									whether around a campfire or a fine-dining table. Remarkably
									smooth and flavorful, our small-barrel, Aspen- Aged craft
									spirit helps create the warmth and personal connection of good
									times and great memories. Aged, bottled and blended by
									sixth-generation Coloradans, Locke + Co. Whiskey results from
									the secrets and traditions of moonshiners on a mission: to
									make a whiskey among the best in the West.
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
			<Hidden mdUp>
				<Grid item xs={12}>
					<Grid
						container
						spacing={0}
						className={classes.demo}
						//   AlignItems={'stretch'}
						// direction={'column'}
						//   justify={'center'}
						// wrap="nowrap"
					>
						<Grid
							item
							xs={12}
							md={12}
							style={{
								// Height: height,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundImage: `url(${pictures.left})`,
								backgroundRepeat: 'no-repeat',
							}}
						>
							{props.children}
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
		</Grid>
	)
}

Page.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles), withTransition)(Page)
