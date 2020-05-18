// Inspired by
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
export function forcePageReload(registration) {
	// Console.log('already controlled?', Boolean(navigator.serviceWorker.controller));

	if (!navigator.serviceWorker.controller) {
		// The window client isn't currently controlled so it's a new service
		// worker that will activate immediately.
		return
	}

	// Console.log('registration waiting?', Boolean(registration.waiting));
	if (registration.waiting) {
		// SW is waiting to activate. Can occur if multiple clients open and
		// one of the clients is refreshed.
		registration.waiting.postMessage('skipWaiting')
		return
	}

	function listenInstalledStateChange() {
		registration.installing.addEventListener('statechange', event => {
			// Console.log('statechange', event.target.state);
			if (event.target.state === 'installed' && registration.waiting) {
				// A new service worker is available, inform the user
				registration.waiting.postMessage('skipWaiting')
			} else if (event.target.state === 'activated') {
				// Force the control of the page by the activated service worker.
				window.location.reload()
			}
		})
	}

	if (registration.installing) {
		listenInstalledStateChange()
		return
	}

	// We are currently controlled so a new SW may be found...
	// Add a listener in case a new SW is found,
	registration.addEventListener('updatefound', listenInstalledStateChange)
}

export async function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		// Register() automatically attempts to refresh the sw.js.
		const registration = await navigator.serviceWorker.register('/sw.js')
		// Force the page reload for users.
		forcePageReload(registration)
	}
}
