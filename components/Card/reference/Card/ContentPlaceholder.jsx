import {memo} from 'react'
import {motion, useInvertedScale} from 'framer-motion'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import {ifElse, split} from 'ramda'
import {isNotNilOrEmpty, stubArray} from 'ramda-adjunct'

const useStyles = makeStyles(theme => ({
	contentHeaderOrange: {
		color: '#C36D15',
		fontFamily: 'OldGrowth',
		fontWeight: '600',
	},
	prepGrid: {
		marginTop: 50,
	},
	bottomMargin: {
		marginBottom: 30,
	},
	typoUpdate: {
		fontFamily: 'Flama',
		fontSize: '0.9125rem',
	},
	contentContainer: {
		backgroundImage: "url('/recipe_seal.png')",
		backgroundRepeat: 'no-repeat',
		backgroundPositionY: '110%',
		backgroundPositionX: '120%',
		backgroundSize: '500px 500px',
		padding: '460px 35px 35px 35px',
		maxWidth: 700,
		width: '90vw',
	},
	removePadding: {
		paddingLeft: 0,
	},
}))

const splitValues = ifElse(isNotNilOrEmpty, split(/\n/), stubArray)

const ContentPlaceholder = memo(props => {
	const inverted = useInvertedScale()
	const classes = useStyles()

	const {
		attributes: {
			ingredients,
			preparation,
			description,
			// Title,
			notes,
			source,
			// Featured,
		},
	} = props

	const ingredientsList = splitValues(ingredients)
	const preparationList = splitValues(preparation)
	const notesList = splitValues(notes)
	const descriptionList = splitValues(description)

	return (
		<motion.div
			className={classes.contentContainer}
			style={{...inverted, originY: 0, originX: 0, color: '#243746'}}
		>
			<Grid container direction="column" className={classes.bottomMargin}>
				{description ? (
					<Grid item>
						<Typography
							gutterBottom
							variant="h6"
							className={classes.contentHeaderOrange}
						>
							description
						</Typography>
						{descriptionList.map(line => (
							<Typography
								key={line}
								paragraph
								variant="subtitle2"
								className={classes.typoUpdate}
							>
								{line}
							</Typography>
						))}
					</Grid>
				) : null}
			</Grid>
			<Grid container direction="column" className={classes.bottomMargin}>
				<Grid item>
					<Typography
						gutterBottom
						variant="h6"
						className={classes.contentHeaderOrange}
					>
						ingredients
					</Typography>
				</Grid>
				<Grid item>
					<ul style={{paddingInlineStart: '20px'}}>
						{ingredientsList.map(ingredient => (
							<li
								style={{
									listStyleType: 'disc',
								}}
							>
								<Typography
									key={ingredient}
									variant="subtitle2"
									className={classes.typoUpdate}
								>
									{ingredient.slice(2, ingredient.length)}
								</Typography>
							</li>
						))}
					</ul>
				</Grid>
			</Grid>
			<Grid container direction="column" className={classes.bottomMargin}>
				<Grid item>
					<Typography
						gutterBottom
						variant="h6"
						className={classes.contentHeaderOrange}
					>
						preparation
					</Typography>
				</Grid>
				<Grid item>
					<ol style={{paddingInlineStart: '20px'}}>
						{preparationList.map(step => (
							<li key={step.concat(String(Math.random()))}>
								<Typography
									paragraph
									variant="subtitle2"
									className={classes.typoUpdate}
								>
									{step.slice(2, step.length)}
								</Typography>
							</li>
						))}
					</ol>
				</Grid>
			</Grid>

			{notes ? (
				<Grid container direction="column" className={classes.bottomMargin}>
					<Grid item>
						<Typography
							gutterBottom
							variant="h6"
							className={classes.contentHeaderOrange}
						>
							notes
						</Typography>
						{notesList.map(note => (
							<Typography
								key={note}
								paragraph
								variant="subtitle2"
								className={classes.typoUpdate}
							>
								{note}
							</Typography>
						))}
					</Grid>
				</Grid>
			) : null}
			<Grid container direction="column" className={classes.prepGrid}>
				<Grid item>
					<Grid item>
						<Typography
							gutterBottom
							variant="h6"
							className={classes.contentHeaderOrange}
						>
							source
						</Typography>
					</Grid>
					{source.name === 'Locke + Co' ? (
						<Typography
							gutterBottom
							variant="body1"
							className={classes.typoUpdate}
						>
							A Locke + Co Original
						</Typography>
					) : (
						<>
							<Typography variant="body1" className={classes.typoUpdate}>
								{source.name}
							</Typography>
							<Typography
								gutterBottom
								variant="caption"
								className={classes.typoUpdate}
							>
								<a href={source.url} rel="nofollow ">
									{source.url}
								</a>
							</Typography>
						</>
					)}
				</Grid>
			</Grid>
		</motion.div>
	)
})

ContentPlaceholder.propTypes = {
	attributes: PropTypes.object.isRequired,
}

export {ContentPlaceholder}
