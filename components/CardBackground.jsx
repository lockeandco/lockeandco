import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Router from 'next/router'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Link from 'next/link'
const styles = theme => ({
	media: {
		objectFit: 'cover',
	},
	paper: {
		flexGrow: 1,
		borderRadius: 'unset',
		backgroundColor: 'transparent',
		overflow: 'auto',
		// TextOverflow: 'ellipsis',
		margin: 20,
		boxShadow: 'unset',
		borderRadius: 0,
		paddingBottom: 200,
		color: '#E2DED5',
		fontFamily: 'Flama',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			// MaxHeight: 'calc(.6 * 100vh)',
			// overflow: 'scroll',
		},
		[theme.breakpoints.up('md')]: {
			flexGrow: 1,
			borderRadius: 'unset',
			backgroundColor: 'transparent',
			overflow: 'auto',
			paddingRight: `5%`,
			paddingLeft: `5%`,
			paddingTop: 150,
			marginTop: 10,
			marginBottom: 10,
		},
	},
	card: {
		minWidth: 200,
		maxWidth: 450,
		backgroundColor: 'rgba(0,0,0,.5)',
		// BorderRadius: 0,
		// padding: '1em',
		boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
		// [theme.breakpoints.down('sm')]: {
		//   maxHeight: 'calc(.6 * 100vh)',
		// //  overflow: 'scroll',
		// },
		margin: 10,
	},
	typo: {
		color: '#E2DED5',
		fontFamily: 'Flama',
		fontWeight: 'bold',
		textShadow: '1px 1px rgb(36, 55, 70)',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.1rem',
		},
	},
	typoCaption: {
		color: '#E2DED5',
		fontFamily: 'Flama',
		fontWeight: 'bold',
		textShadow: '1px 1px rgb(36, 55, 70)',
		fontSize: '0.825rem',
		// FontStyle: 'oblique',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.1rem',
		},
	},
	typoHeader: {
		color: '#E2DED5',
		fontFamily: 'Flama',
		fontWeight: 'bold',
		textShadow: '1px 1px rgb(36, 55, 70)',
		[theme.breakpoints.up('sm')]: {
			// FontSize: '1.1rem',
		},
	},
	grow: {
		flex: '1 1 auto',
	},
	button: {
		margin: theme.spacing(1),
		color: '#E2DED5',
		textShadow: '1px 1px rgb(36, 55, 70)',
	},
	leftIcon: {
		marginRight: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	iconSmall: {
		fontSize: 20,
	},
})

const MediaCard = props => {
	const {
		classes,
		title,
		content,
		links,
		media,
		mediaPosition = 'top',
		mediaComponent = 'img',
		mediaTitle = 'Owen Locke',
		poster = '/poster.png',
	} = props
	return (
		<Paper className={classes.paper}>
			<Card className={classes.card}>
				{media && mediaPosition === 'top' && (
					<CardMedia
						{...(mediaComponent === 'video' ? {controls: true, poster} : {})}
						component={mediaComponent}
						className={classes.media}
						src={media}
						title={mediaTitle}
					/>
				)}

				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="h2"
						className={classes.typoHeader}
					>
						{title}
					</Typography>

					{typeof content === 'string' ? (
						<Typography paragraph variant="body1" className={classes.typo}>
							{content}
						</Typography>
					) : (
						content(classes)
					)}
				</CardContent>
				<CardActions>
					<Link href={links.left.link}>
						<Button className={classes.button} size="small" color="inherit">
							<ChevronLeft className={classes.leftIcon} />
							{links.left.title}
						</Button>
					</Link>
					<div className={classes.grow} />
					<Link href={links.right.link}>
						<Button className={classes.button} size="small" color="secondary">
							{links.right.title}
							<ChevronRight className={classes.rightIcon} />
						</Button>
					</Link>
				</CardActions>
				{media && mediaPosition === 'bottom' && (
					<CardMedia
						component="img"
						className={classes.media}
						image={media}
						title="Owen Locke"
					/>
				)}
			</Card>
		</Paper>
	)
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
	links: PropTypes.object.isRequired,
	media: PropTypes.any,
	mediaPosition: PropTypes.oneOf(['top', 'bottom']),
	mediaComponent: PropTypes.oneOf([
		'video',
		'audio',
		'picture',
		'iframe',
		'img',
	]),
	mediaTitle: PropTypes.string,
	poster: PropTypes.string,
}

export default withStyles(styles)(MediaCard)
