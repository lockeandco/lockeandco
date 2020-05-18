import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

export class InfoWindow extends React.Component {
	componentDidMount() {
		this.renderInfoWindow()
	}

	componentDidUpdate(previousProps) {
		const {google, map} = this.props

		if (!google || !map) {
			return
		}

		if (map !== previousProps.map) {
			this.renderInfoWindow()
		}

		if (this.props.position !== previousProps.position) {
			this.updatePosition()
		}

		if (this.props.children !== previousProps.children) {
			this.updateContent()
		}

		if (
			this.props.visible !== previousProps.visible ||
			this.props.marker !== previousProps.marker ||
			this.props.position !== previousProps.position
		) {
			this.props.visible ? this.openWindow() : this.closeWindow()
		}
	}

	renderInfoWindow() {
		const {map, google, mapCenter, ...props} = this.props

		if (!google || !google.maps) {
			return
		}

		const iw = (this.infowindow = new google.maps.InfoWindow({
			content: '',
			...props,
		}))

		google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this))
		google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this))
	}

	onOpen() {
		if (this.props.onOpen) {
			this.props.onOpen()
		}
	}

	onClose() {
		if (this.props.onClose) {
			this.props.onClose()
		}
	}

	openWindow() {
		this.infowindow.open(this.props.map, this.props.marker)
	}

	updatePosition() {
		let pos = this.props.position
		if (!(pos instanceof google.maps.LatLng)) {
			pos = pos && new google.maps.LatLng(pos.lat, pos.lng)
		}

		this.infowindow.setPosition(pos)
	}

	updateContent() {
		const content = this.renderChildren()
		this.infowindow.setContent(content)
	}

	closeWindow() {
		this.infowindow.close()
	}

	renderChildren() {
		const {children} = this.props
		return ReactDOMServer.renderToString(children)
	}

	render() {
		return null
	}
}

InfoWindow.propTypes = {
	children: PropTypes.element.isRequired,
	map: PropTypes.object,
	marker: PropTypes.object,
	position: PropTypes.object,
	visible: PropTypes.bool,

	// Callbacks
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
}

InfoWindow.defaultProps = {
	visible: false,
}

export default InfoWindow
