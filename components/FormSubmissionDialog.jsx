import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {useRouter} from 'next/router'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide ref={ref} direction="down" {...props} />
})

export default function AlertDialogSlide(props) {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()

	function handleClose() {
		setOpen(false)
		props.handleReset()
		router.push('/stay-connected')
	}

	return (
		<div>
			<Dialog
				keepMounted
				open={open || props.open}
				TransitionComponent={Transition}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				onClose={handleClose}
			>
				<DialogTitle id="alert-dialog-slide-title">
					{`Thank you for contacting us, ${props.Name}`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{`Your message has been received and we will respond within 24 hours.
            Thank you for contacting us!`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleClose}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
