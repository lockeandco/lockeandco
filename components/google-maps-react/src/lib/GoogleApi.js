export const GoogleApi = function(options) {
	options = options || {}

	if (!options.hasOwnProperty('apiKey')) {
		throw new Error('You must pass an apiKey to use GoogleApi')
	}

	const apiKey = options.apiKey
	const libraries = options.libraries || ['places']
	const client = options.client
	const URL = options.url || 'https://maps.googleapis.com/maps/api/js'

	const googleVersion = options.version || '3.31'

	const script = null
	const google = (typeof window !== 'undefined' && window.google) || null
	const loading = false
	const channel = null
	const language = options.language
	const region = options.region || null

	const onLoadEvents = []

	const url = () => {
		const url = URL
		const parameters = {
			key: apiKey,
			callback: 'CALLBACK_NAME',
			libraries: libraries.join(','),
			client,
			v: googleVersion,
			channel,
			language,
			region,
		}

		const parameterString = Object.keys(parameters)
			.filter(k => Boolean(parameters[k]))
			.map(k => `${k}=${parameters[k]}`)
			.join('&')

		return `${url}?${parameterString}`
	}

	return url()
}

export default GoogleApi
