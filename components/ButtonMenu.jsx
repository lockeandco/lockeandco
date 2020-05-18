import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
	button: {
		margin: theme.spacing(1),
		color: '#E2DED5',
		fontFamily: 'Flama',
		fontWeight: 'bold',
	},
	paper: {
		borderRadius: 'unset',
		boxShadow: 'unset',
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
	paperActive: {
		borderRadius: 'unset',
		boxShadow: 'unset',
		backgroundColor: '#C36D15',
		textAlign: 'center',
	},
	buttonActive: {
		margin: theme.spacing(1),
		color: '#E2DED5',
		fontFamily: 'Flama',
	},
	socialIcons: {
		float: 'left',
		margin: theme.spacing(1),
		color: '#E2DED5',
		fontWeight: 'bold',
		position: 'relative',
		fontSize: '20px !important',
		paddingLeft: 75,
		marginRight: '15px',
	},
})

const TextButtons = props => {
	const {classes, route} = props
	console.log(props)
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			direction="row"
			justify="space-around"
		>
			<Grid item xs>
				<Paper className={classes.paper}>
					<i className={classes.socialIcons + ' fab fa-facebook'} />
					<i className={classes.socialIcons + ' fab fa-twitter'} />
					<i className={classes.socialIcons + ' fab fa-instagram'} />
				</Paper>
			</Grid>
			<Grid item xs>
				<Paper className={page === 4 ? classes.paperActive : classes.paper}>
					<Button
						className={page === 4 ? classes.buttonActive : classes.button}
						onClick={() => goToSlide(4)}
					>
						Merchandise
					</Button>
				</Paper>
			</Grid>
			<Grid item xs>
				<Paper className={page === 5 ? classes.paperActive : classes.paper}>
					<Button
						className={page === 5 ? classes.buttonActive : classes.button}
						onClick={() => goToSlide(5)}
					>
						Stay Connected
					</Button>
				</Paper>
			</Grid>
		</Grid>
	)
}

TextButtons.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextButtons)
