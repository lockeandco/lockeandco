import ReactGA from 'react-ga'

export const initGA = () => {
	console.log('GA init')
	ReactGA.initialize('UA-162745129-1')
}

export const logPageView = () => {
	console.log(`Logging pageview for ${window.location.pathname}`)
	ReactGA.set({page: window.location.pathname})
	ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({category, action})
	}
}

export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({description, fatal})
	}
}

export const GA_TRACKING_ID = 'G-185YV16D96'
export const GTM_ID = 'GTM-5N87C2B'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	})
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value,
	})
}
