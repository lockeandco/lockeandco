import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Downshift from 'downshift'
import IconButton from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Fuse from 'fuse.js'
import {find, propEq, path} from 'ramda'
import {ChevronDown, ChevronUp, Close} from 'mdi-material-ui'

// TODO:  Provide mechanism for overriding options, styles, props

const options = {
	shouldSort: true,
	threshold: 0.8,
	location: 0,
	distance: 300,
	// Tokenize: true,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: ['label'],
}

const renderInput = inputProps => {
	const {InputProps, fieldProps, classes, ref, ...other} = inputProps
	return (
		<TextField
			{...fieldProps}
			// InputProps={{
			// 	style: {
			// 		background: 'rgba(226, 222, 213, 0.95)',
			// 		textTransform: 'uppercase',
			// 	},
			// }}
			InputProps={{
				inputRef: ref,
				inputProps: {
					style: {
						background: 'rgba(226, 222, 213, 0.95)',
						textTransform: 'uppercase',
					},
				},
				classes: {
					root: classes.inputRoot,
					input: classes.inputInput,
				},
				...InputProps,
			}}
			{...other}
		/>
	)
}

const renderSuggestion = (
	{suggestion, index, itemProps, menuClasses, highlightedIndex, selectedItem},
	query
) => {
	const isHighlighted = highlightedIndex === index
	const isSelected = (selectedItem || '').includes(suggestion?.label)
	const matches = match(suggestion?.label, query)
	const parts = parse(suggestion?.label, matches)

	return (
		<MenuItem
			{...itemProps}
			key={suggestion?.label?.concat(String(index)) || Math.random()}
			className={menuClasses}
			selected={isHighlighted}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400,
			}}
		>
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span key={String(index)} style={{fontWeight: 500}}>
							{part.text}
						</span>
					) : (
						<strong key={String(index)} style={{fontWeight: 300}}>
							{part.text}
						</strong>
					)
				})}
			</div>
		</MenuItem>
	)
}

renderSuggestion.propTypes = {
	highlightedIndex: PropTypes.number,
	index: PropTypes.number,
	itemProps: PropTypes.object,
	selectedItem: PropTypes.string,
	suggestion: PropTypes.shape({label: PropTypes.string}).isRequired,
}

const styles = theme => ({
	container: {
		flexGrow: 1,
		position: 'relative',
	},
	paper: {
		position: 'absolute',
		zIndex: 100,
		marginTop: 0,
		marginLeft: 5,
		left: 0,
		right: 0,
		maxHeight: '50vh',
		overflow: 'scroll',
		background: 'rgba(226, 222, 213, 0.95)',
	},
	inputRoot: {
		margin: 5,
		// FlexWrap: 'wrap',
	},
	inputInput: {
		width: 'auto',
		flexGrow: 1,
		padding: 10,
	},
	iconButton: {
		backgroundColor: 'rgba(226, 222, 213, 0.95)',
		'&:hover': {
			backgroundColor: 'rgba(226, 222, 213, 0.95)',
		},
	},
})

const IntegrationDownshift = props => {
	const {
		classes,
		items,
		handleChange,
		fieldProps,
		initialSelectedItem,
		inputId,
		disableUnderline,
		menuClasses,
	} = props
	function getSuggestions(value) {
		const inputValue = value.trim().toLowerCase()
		const inputLength = inputValue.length
		const fuse = new Fuse(items, options)
		// Const itemSorted = items.sort((x, y) => (x > y ? 1 : -1))
		const fuseItems = fuse.search(inputValue)
		return inputLength === 0 ? items : fuseItems
	}

	return (
		<Downshift
			// SelectedItem={initialSelectedItem || ''}
			inputId={inputId}
			onChange={handleChange}
		>
			{({
				getInputProps,
				getItemProps,
				getMenuProps,
				getToggleButtonProps,
				highlightedIndex,
				inputValue,
				isOpen,
				selectedItem,
				clearSelection,
			}) => {
				return (
					<div className={classes.container}>
						{renderInput({
							fullWidth: true,
							classes,
							fieldProps,
							InputProps: getInputProps({
								disableUnderline: true,
								endAdornment: (
									<InputAdornment position="end">
										{selectedItem ? (
											<IconButton
												aria-label="Clear Client List"
												className={classes.iconButton}
												onClick={clearSelection}
											>
												<Close />
											</IconButton>
										) : (
											<IconButton
												className={classes.iconButton}
												aria-label="Toggle Client List"
												{...getToggleButtonProps()}
											>
												{isOpen ? <ChevronUp /> : <ChevronDown />}
											</IconButton>
										)}
									</InputAdornment>
								),
							}),
						})}
						<div {...getMenuProps()}>
							{isOpen ? (
								<Paper square className={classes.paper}>
									{getSuggestions(inputValue).map(({item}, index) =>
										renderSuggestion(
											{
												suggestion: item,
												index,
												itemProps: getItemProps({
													item: item?.label || 'no',
												}),
												menuClasses,
												highlightedIndex,
												selectedItem,
											},
											inputValue
										)
									)}
								</Paper>
							) : null}
						</div>
					</div>
				)
			}}
		</Downshift>
	)
}

IntegrationDownshift.propTypes = {
	classes: PropTypes.object.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({label: PropTypes.string}))
		.isRequired,
	handleChange: PropTypes.func.isRequired,
	fieldProps: PropTypes.object,
}

export default withStyles(styles)(IntegrationDownshift)
