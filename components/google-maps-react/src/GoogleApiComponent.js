import React from 'react'
import ReactDOM from 'react-dom'

import {ScriptCache} from './lib/ScriptCache'
import GoogleApi from './lib/GoogleApi'

const defaultMapConfig = {}

const serialize = object => JSON.stringify(object)
const isSame = (object1, object2) =>
	object1 === object2 || serialize(object1) === serialize(object2)

const defaultCreateCache = options => {
	options = options || {}
	const apiKey = options.apiKey
	const libraries = options.libraries || ['places']
	const version = options.version || '3'
	const language = options.language || 'en'
	const url = options.url
	const client = options.client
	const region = options.region

	return ScriptCache({
		google: GoogleApi({
			apiKey,
			language,
			libraries,
			version,
			url,
			client,
			region,
		}),
	})
}

const DefaultLoadingContainer = props => <div>Loading...</div>

export const wrapper = input => WrappedComponent => {
	class Wrapper extends React.Component {
		constructor(props, context) {
			super(props, context)

			// Build options from input
			const options = typeof input === 'function' ? input(props) : input

			// Initialize required Google scripts and other configured options
			this.initialize(options)

			this.state = {
				loaded: false,
				map: null,
				google: null,
				options,
			}
		}

		componentWillReceiveProps(props) {
			// Do not update input if it's not dynamic
			if (typeof input !== 'function') {
				return
			}

			// Get options to compare
			const previousOptions = this.state.options
			const options = typeof input === 'function' ? input(props) : input

			// Ignore when options are not changed
			if (isSame(options, previousOptions)) {
				return
			}

			// Initialize with new options
			this.initialize(options)

			// Save new options in component state,
			// and remove information about previous API handlers
			this.setState({
				options,
				loaded: false,
				google: null,
			})
		}

		initialize(options) {
			// Avoid race condition: remove previous 'load' listener
			if (this.unregisterLoadHandler) {
				this.unregisterLoadHandler()
				this.unregisterLoadHandler = null
			}

			// Load cache factory
			const createCache = options.createCache || defaultCreateCache

			// Build script
			this.scriptCache = createCache(options)
			this.unregisterLoadHandler = this.scriptCache.google.onLoad(
				this.onLoad.bind(this)
			)

			// Store information about loading container
			this.LoadingContainer =
				options.LoadingContainer || DefaultLoadingContainer
		}

		onLoad(err, tag) {
			this._gapi = window.google

			this.setState({loaded: true, google: this._gapi})
		}

		render() {
			const {LoadingContainer} = this
			if (!this.state.loaded) {
				return <LoadingContainer />
			}

			const props = Object.assign({}, this.props, {
				loaded: this.state.loaded,
				google: window.google,
			})

			return (
				<>
					<WrappedComponent {...props} />
					<div ref="map" />
				</>
			)
		}
	}

	return Wrapper
}

export default wrapper
