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

export class Polygon extends React.Component {
	componentDidMount() {
		this.polygonPromise = wrappedPromise()
		this.renderPolygon()
	}

	componentDidUpdate(previousProps) {
		if (
			this.props.map !== previousProps.map ||
			!arePathsEqual(this.props.paths, previousProps.paths)
		) {
			if (this.polygon) {
				this.polygon.setMap(null)
			}

			this.renderPolygon()
		}
	}

	componentWillUnmount() {
		if (this.polygon) {
			this.polygon.setMap(null)
		}
	}

	renderPolygon() {
		const {
			map,
			google,
			paths,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			fillColor,
			fillOpacity,
			...props
		} = this.props

		if (!google) {
			return null
		}

		const parameters = {
			map,
			paths,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			fillColor,
			fillOpacity,
			...props,
		}

		this.polygon = new google.maps.Polygon(parameters)

		evtNames.forEach(e => {
			this.polygon.addListener(e, this.handleEvent(e))
		})

		this.polygonPromise.resolve(this.polygon)
	}

	getPolygon() {
		return this.polygonPromise
	}

	handleEvent(evt) {
		return e => {
			const evtName = `on${camelize(evt)}`
			if (this.props[evtName]) {
				this.props[evtName](this.props, this.polygon, e)
			}
		}
	}

	render() {
		return null
	}
}

Polygon.propTypes = {
	paths: PropTypes.array,
	strokeColor: PropTypes.string,
	strokeOpacity: PropTypes.number,
	strokeWeight: PropTypes.number,
	fillColor: PropTypes.string,
	fillOpacity: PropTypes.number,
}

evtNames.forEach(e => (Polygon.propTypes[e] = PropTypes.func))

Polygon.defaultProps = {
	name: 'Polygon',
}

export default Polygon
