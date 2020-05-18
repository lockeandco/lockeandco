import React from 'react'
import PropTypes from 'prop-types'

import {arePathsEqual} from '../lib/arePathsEqual'
import {camelize} from '../lib/String'
const evtNames = ['click', 'mouseout', 'mouseover']

const wrappedPromise = function() {
	const wrappedPromise = {}
	const promise = new Promise(function(resolve, reject) {
		wrappedPromise.resolve = resolve
		wrappedPromise.reject = reject
	})
	wrappedPromise.then = promise.then.bind(promise)
	wrappedPromise.catch = promise.catch.bind(promise)
	wrappedPromise.promise = promise

	return wrappedPromise
}

export class Polyline extends React.Component {
	componentDidMount() {
		this.polylinePromise = wrappedPromise()
		this.renderPolyline()
	}

	componentDidUpdate(previousProps) {
		if (
			this.props.map !== previousProps.map ||
			!arePathsEqual(this.props.path, previousProps.path)
		) {
			if (this.polyline) {
				this.polyline.setMap(null)
			}

			this.renderPolyline()
		}
	}

	componentWillUnmount() {
		if (this.polyline) {
			this.polyline.setMap(null)
		}
	}

	renderPolyline() {
		const {
			map,
			google,
			path,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			...props
		} = this.props

		if (!google) {
			return null
		}

		const parameters = {
			map,
			path,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			...props,
		}

		this.polyline = new google.maps.Polyline(parameters)

		evtNames.forEach(e => {
			this.polyline.addListener(e, this.handleEvent(e))
		})

		this.polylinePromise.resolve(this.polyline)
	}

	getPolyline() {
		return this.polylinePromise
	}

	handleEvent(evt) {
		return e => {
			const evtName = `on${camelize(evt)}`
			if (this.props[evtName]) {
				this.props[evtName](this.props, this.polyline, e)
			}
		}
	}

	render() {
		return null
	}
}

Polyline.propTypes = {
	path: PropTypes.array,
	strokeColor: PropTypes.string,
	strokeOpacity: PropTypes.number,
	strokeWeight: PropTypes.number,
}

evtNames.forEach(e => (Polyline.propTypes[e] = PropTypes.func))

Polyline.defaultProps = {
	name: 'Polyline',
}

export default Polyline
