let counter = 0
const scriptMap =
	(typeof window !== 'undefined' && window._scriptMap) || new Map()
const window = require('./windowOrGlobal')

export const ScriptCache = (function(global) {
	global._scriptMap = global._scriptMap || scriptMap
	return function ScriptCache(scripts) {
		const Cache = {}

		Cache._onLoad = function(key) {
			return cb => {
				let registered = true

				function unregister() {
					registered = false
				}

				const stored = scriptMap.get(key)

				if (stored) {
					stored.promise.then(() => {
						if (registered) {
							stored.error ? cb(stored.error) : cb(null, stored)
						}

						return stored
					})
				} else {
					// TODO:
				}

				return unregister
			}
		}

		Cache._scriptTag = (key, src) => {
			if (!scriptMap.has(key)) {
				// Server side rendering environments don't always have access to the `document` global.
				// In these cases, we're not going to be able to return a script tag, so just return null.
				if (typeof document === 'undefined') return null

				const tag = document.createElement('script')
				const promise = new Promise((resolve, reject) => {
					const resolved = false
					const errored = false
					const body = document.querySelectorAll('body')[0]

					tag.type = 'text/javascript'
					tag.async = false // Load in order

					const cbName = `loaderCB${counter++}${Date.now()}`
					let cb

					const handleResult = state => {
						return evt => {
							const stored = scriptMap.get(key)
							if (state === 'loaded') {
								stored.resolved = true
								resolve(src)
								// Stored.handlers.forEach(h => h.call(null, stored))
								// stored.handlers = []
							} else if (state === 'error') {
								stored.errored = true
								// Stored.handlers.forEach(h => h.call(null, stored))
								// stored.handlers = [];
								reject(evt)
							}

							stored.loaded = true

							cleanup()
						}
					}

					const cleanup = () => {
						if (global[cbName] && typeof global[cbName] === 'function') {
							global[cbName] = null
							delete global[cbName]
						}
					}

					tag.addEventListener('load', handleResult('loaded'))
					tag.addEventListener('error', handleResult('error'))
					tag.onreadystatechange = () => {
						handleResult(tag.readyState)
					}

					// Pick off callback, if there is one
					if (src.match(/callback=CALLBACK_NAME/)) {
						src = src.replace(/(callback=)[^&]+/, `$1${cbName}`)
						cb = window[cbName] = tag.onload
					} else {
						tag.addEventListener('load', tag.onload)
					}

					tag.addEventListener('error', tag.onerror)

					tag.src = src
					body.append(tag)

					return tag
				})
				const initialState = {
					loaded: false,
					error: false,
					promise,
					tag,
				}
				scriptMap.set(key, initialState)
			}

			return scriptMap.get(key)
		}

		// Let scriptTags = document.querySelectorAll('script')
		//
		// NodeList.prototype.filter = Array.prototype.filter;
		// NodeList.prototype.map = Array.prototype.map;
		// const initialScripts = scriptTags
		//   .filter(s => !!s.src)
		//   .map(s => s.src.split('?')[0])
		//   .reduce((memo, script) => {
		//     memo[script] = script;
		//     return memo;
		//   }, {});

		Object.keys(scripts).forEach(function(key) {
			const script = scripts[key]

			const tag = window._scriptMap.has(key)
				? window._scriptMap.get(key).tag
				: Cache._scriptTag(key, script)

			Cache[key] = {
				tag,
				onLoad: Cache._onLoad(key),
			}
		})

		return Cache
	}
})(window)

export default ScriptCache
