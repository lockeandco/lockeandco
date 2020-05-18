import React from 'react'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import MediaQuery from 'react-responsive'

const style = theme => ({
	typo: {
		color: '#E2DED5',
		fontFamily: 'Flama',
	},
	typoHeader: {
		color: 'rgb(36, 55, 70)',
		fontFamily: 'OldGrowth',
		// FontSize: '6rem',
		// overflow: 'hidden',
		marginBottom: 20,
		[theme.breakpoints.down('xs')]: {
			fontSize: '.8rem',
			marginBottom: 5,
		},
	},
	typoH3Header: {
		color: 'rgb(36, 55, 70)',
		fontFamily: 'OldGrowth',
		// FontSize: '6rem',
		// overflow: 'hidden',
		margin: 50,
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
			marginTop: '5%',
			marginBottom: '5%',
		},
	},
	typoBigHeader: {
		color: '#E2DED5',
		fontFamily: 'OldGrowth',
		// FontSize: '6rem',
		// overflow: 'hidden',
		marginTop: 20,
		[theme.breakpoints.down('xs')]: {
			marginTop: 'calc(100vh * .10)',
			fontsize: '1.8rem',
		},
		// TextOverflow: 'ellipsis',
	},
})

const H1 = withStyles(style)(props => {
	const {classes, ...other} = props
	console.log('h1')
	return (
		<Typography
			noWrap
			variant="h4"
			className={classes.typoBigHeader}
			{...other}
		/>
	)
})
const H2 = withStyles(style)(props => {
	const {classes, ...other} = props
	console.log('h2')
	return <Typography variant="h6" className={classes.typoHeader} {...other} />
})
const H3 = withStyles(style)(props => {
	const {classes, ...other} = props
	console.log('h3')
	return <Typography className={classes.typoH3Header} variant="h6" {...other} />
})
const Paragraph = withStyles(style)(props => {
	const {classes, ...other} = props
	return (
		<Typography paragraph variant="body1" className={classes.typo} {...other} />
	)
})

const components = {
	h1: H1,
	h2: H2,
	p: Paragraph,
	h3: H3,
}

export default components
