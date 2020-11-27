import {memo} from 'react'
import {motion, useInvertedScale} from 'framer-motion'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import {ifElse, split} from 'ramda'
import {isNotNilOrEmpty} from 'ramda-adjunct'

const useStyles = makeStyles(theme => ({
	contentHeaderOrange: {
		color: '#C36D15',
		fontWeight: '600',
	},
	prepGrid: {
		marginTop: 50,
	},
	bottomMargin: {
		maringBottom: 30,
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
}))

const splitValues = ifElse(isNotNilOrEmpty, split(/\n/), [])

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
							variant="h5"
							className={classes.contentHeaderOrange}
						>
							Description
						</Typography>
						{descriptionList.map(line => (
							<Typography key={line} paragraph variant="body1">
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
						variant="h5"
						className={classes.contentHeaderOrange}
					>
						Ingredients
					</Typography>
				</Grid>
				<Grid item>
					{ingredientsList.map(ingredient => (
						<Typography key={ingredient} variant="h6">
							{ingredient.slice(2, ingredient.length)}
						</Typography>
					))}
				</Grid>
			</Grid>
			<Grid container direction="column" className={classes.bottomMargin}>
				<Grid item>
					<Typography
						gutterBottom
						variant="h5"
						className={classes.contentHeaderOrange}
					>
						Preparation
					</Typography>
				</Grid>
				<Grid item>
					{preparationList.map(step => (
						<Typography
							key={step.concat(String(Math.random()))}
							paragraph
							variant="h6"
						>
							{step.slice(2, step.length)}
						</Typography>
					))}
				</Grid>
			</Grid>

			{notes ? (
				<Grid container direction="column" className={classes.bottomMargin}>
					<Grid item>
						<Typography
							gutterBottom
							variant="h5"
							className={classes.contentHeaderOrange}
						>
							Notes
						</Typography>
						{notesList.map(note => (
							<Typography key={note} paragraph variant="body1">
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
							Source
						</Typography>
					</Grid>
					{source.name === 'Locke + Co' ? (
						<Typography gutterBottom variant="body1">
							A Locke + Co Original
						</Typography>
					) : (
						<>
							<Typography variant="body1">{source.name}</Typography>
							<Typography gutterBottom variant="caption">
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
