import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import enumerations from '../lib/form_enumerations'
import TextField from '@material-ui/core/TextField'
import {sendMessage} from '../lib/api'
import {withFormik, Form} from 'formik'
import {titleCase} from 'change-case'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'
import Container from '@material-ui/core/Container'
import classNames from 'classnames'
import {is, compose} from 'ramda'
import FormSubmissionDialog from './FormSubmissionDialog'
import * as yup from 'yup'
// Import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
			width: '100%',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
			background: 'rgba(226, 222, 213, 0.95)',
		},
		textField: {
			// MarginLeft: theme.spacing(1),
			// marginRight: theme.spacing(1),
		},
		textFieldNoFw: {
			minWidth: 300,
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},

		buttonProgress: {
			color: '#243746',
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: -12,
			marginLeft: -12,
		},
		wrapper: {
			margin: theme.spacing(1),
			position: 'relative',
		},
	})
)

const useButtonStyles = makeStyles({
	root: {
		background: '#C36D15',
		color: '#243746',
		'&$disabled': {
			backgroundColor: 'red',
		},
	},
	disabled: {},
})
const ContactUs = props => {
	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		isValid,
		isValidating,
		submitCount,
		handleReset,
		...other
	} = props

	const classes = useStyles()
	const buttonClasses = useButtonStyles()
	const hasSubmit = submitCount > 0

	const [notVerified, greCaptchaChange] = useState(true)

	const captchaVerified = v => {
		v ? greCaptchaChange(false) : greCaptchaChange(true)
		console.log(v, notVerified)
	}

	const isDisabled = notVerified || !isValid || isSubmitting

	const setFieldError = n => is(String, errors[n]) && touched[n]

	return (
		<Container maxWidth="md">
			<div className={classes.root}>
				<Form>
					<Grid item xs={12}>
						<TextField
							required
							error={setFieldError('Name')}
							label={setFieldError('Name') ? 'Name is required' : 'Name'}
							id="Name"
							name="Name"
							className={classNames(classes.textField, classes.textFieldNoFw)}
							margin="normal"
							variant="filled"
							inputProps={{
								style: {background: 'rgba(226, 222, 213, 0.95)'},
							}}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							id="Email"
							error={setFieldError('Email')}
							label={setFieldError('Email') ? 'Email is required' : 'Email'}
							name="Email"
							className={classNames(classes.textField, classes.textFieldNoFw)}
							value={values.email}
							margin="normal"
							type="email"
							variant="filled"
							inputProps={{
								style: {background: 'rgba(226, 222, 213, 0.95)'},
							}}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							required
							fullWidth
							select
							value={values.Type}
							className={classes.textField}
							error={setFieldError('Type')}
							label={
								setFieldError('Type')
									? 'Please tell us more about you'
									: 'About You'
							}
							variant="filled"
							name="Type"
							id="Type"
							margin="normal"
							InputProps={{
								style: {background: 'rgba(226, 222, 213, 0.95)'},
							}}
							InputLabelProps={{
								shrink: true,
								// Color: '#243746',
							}}
							onChange={handleChange}
							onBlur={handleBlur}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{enumerations.map(x => (
								<MenuItem key={x} value={x}>
									{x}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item>
						<TextField
							required
							multiline
							fullWidth
							id="Body"
							error={setFieldError('Body')}
							label={setFieldError('Body') ? errors.Body : 'Send Us a Message'}
							name="Body"
							className={classes.textField}
							value={values.message}
							margin="normal"
							rows={10}
							helperText={`${values.Body.length} / 2500`}
							variant="filled"
							InputProps={{
								style: {background: 'rgba(226, 222, 213, 0.95)'},
							}}
							FormHelperTextProps={{
								style: {
									color:
										setFieldError('Body') || values.Body.length > 2500
											? 'red'
											: 'white',
								},
							}}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Grid>

					<Grid
						item
						container
						justify="center"
						direction="column"
						alignItems="flex-end"
					>
						<Grid item>
							<ReCAPTCHA
								sitekey="6Lczo6wUAAAAAD3Na0C344PlQmB-V7L1FL9QaPHP"
								theme="dark"
								onChange={captchaVerified}
							/>
						</Grid>
						<Grid item>
							<div className={classes.wrapper}>
								<Button
									type="submit"
									variant="contained"
									className={classNames(
										buttonClasses.root,
										buttonClasses.contained
									)}
									style={
										isDisabled
											? {
													backgroundColor: 'rgb(195,109,21, .6)',
													color: 'grey',
											  }
											: {}
									}
									disabled={isDisabled}
								>
									Submit
								</Button>
								{isSubmitting && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
							</div>
						</Grid>
					</Grid>
				</Form>
			</div>
			<FormSubmissionDialog
				Name={values.Name}
				open={hasSubmit}
				handleReset={handleReset}
			/>
		</Container>
	)
}

const ContactUsSchema = yup.object().shape({
	Name: yup
		.string()
		.min(2, 'One letter name?')
		.max(50, 'Just use a nickname please')
		.required('Name is required'),
	Email: yup
		.string()
		.email('Please provide a valid email')
		.required('Email is Required'),
	Type: yup
		.mixed()
		.oneOf(enumerations, 'Tell us more about you')
		.required('Required'),
	Body: yup
		.string()
		.min(4, 'At least a four letter word')
		.max(2500, 'Too long, try: info@locke-co.com')
		.required('A message is required'),
})

const ContactUsEnhanced = withFormik({
	mapPropsToValues: () => ({
		Name: '',
		Type: '',
		Body: '',
		Email: '',
		itemId: '1',
		itemTypeTarget: 'Message',
	}),

	validationSchema: ContactUsSchema,

	handleSubmit: (values, {setSubmitting}) => {
		sendMessage({input: values})
			.then(x => {
				console.log(x)
				setSubmitting(false)
			})
			.catch(error => {
				console.log(error)
				// HandleError
				setSubmitting(false)
			})
	},
	displayName: 'LockeAndCoContactUs',
})(ContactUs)

export default ContactUsEnhanced
