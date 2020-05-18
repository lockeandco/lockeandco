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

const styles = theme => ({
	root: {},
	demo: {
		height: `100%`,
		flexGrow: 1,
		//  Overflow: 'auto',
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
		marginBottom: `calc(20% + 90px)`,
		marginTop: `calc(15% + 90px)`,
		marginRight: `calc((100% - 300px)/2)`,
		marginLeft: `calc((100% - 300px)/2)`,
		// Overflow: 'auto'
		minWidth: 300,
		// Display: 'flex',
		backgroundColor: 'rgba(0,0,0,.9)',
		borderRadius: 0,
		opacity: 0.7,
		padding: '1em',
		// FlexGrow: 1,
		// flexDirection: 'column',
		boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
		// Margin: theme.spacing(1),
		color: '#E2DED5',
		fontFamily: 'Flama',
		overflow: 'auto',
	},
	typo: {
		color: '#E2DED5',
		fontFamily: 'Flama',
	},
})

const PageLayout1x26040 = props => {
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
			<Grid item xs={12} sm={8}>
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
						sm={12}
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
			<Hidden xsDown>
				<Grid item xs={12} xs={4}>
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
								padding: 'unset',
								height: '100%',
								minHeight: '100vh',
								backgroundColor: '#E2DED5',
							}}
						/>
					</Grid>
				</Grid>
			</Hidden>
		</Grid>
	)
}

PageLayout1x26040.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles), withTransition)(PageLayout1x26040)
