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
import Header100 from './MobileScrollingHeader'
import {motion} from 'framer-motion'

const styles = theme => ({
	demo: {
		// Height: `100%`,
		flexGrow: 1,
		maxHeight: '100vh',
	},
})

const Page = props => {
	const {
		classes,
		pictures,
		text,
		header,
		leftSize,
		rightSize,
		backgroundColorRight,
		gMap,
	} = props
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 2}}
		>
			<Grid
				container
				spacing={0}
				className={classes.demo}
				alignItems="stretch"
				direction="row"
				justify="center"
			>
				<Grid item xs={12} md={leftSize || 6}>
					{gMap}
				</Grid>
				<Hidden smDown>
					<Grid
						item
						sm={rightSize || 6}
						xs={12}
						style={{
							paddingBottom: '300px',
							height: `98vh`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundImage: `url(${
								pictures.rightTop ? pictures.rightTop.url : ``
							})`,
							backgroundRepeat: 'no-repeat',
							backgroundColor: `${backgroundColorRight}`,
							overflow: 'scroll',
						}}
					>
						{header && header.position === 'rightTop' && header.component}{' '}
						{text && text.position === 'rightTop' && text.component}{' '}
					</Grid>
				</Hidden>
			</Grid>
		</motion.div>
	)
}

Page.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(Page)
