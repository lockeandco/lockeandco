import React from 'react'
import PropTypes from 'prop-types'
import {ServerStyleSheets} from '@material-ui/styles'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import flush from 'styled-jsx/server'
import {createMuiTheme} from '@material-ui/core/styles'
import theme from '../src/theme'
import {GTM_ID} from '../utils/analytics'


const structuredData = {
"@context": "https://schema.org",
"@type": "Organization",
"name": "Locke + Co Distilling",
"url": "https://lockeandcodistilling.com/",
"logo": "https://lockeandcodistilling.com/",
"alternateName": "Locke + Co",
"sameAs": [
"https://www.facebook.com/LockeCoDistilling/",

"https://twitter.com/LockeCoDistill",

"https://www.instagram.com/lockecodistilling/"

]

}
class MyDocument extends Document {
	render() {
		const {pageContext} = this.props
		return (
			<Html lang="en" dir="ltr">
				<Head>
					{/* Google Tag Manager */}
					<script
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{
							__html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
										new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
										j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
										'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
										})(window,document,'script','dataLayer','${GTM_ID}');`,
						}}
					/>
					<meta charSet="utf-8" />
					{/* Use minimum-scale=1 to enable GPU rasterization */}
					<link rel="manifest" href="/manifest.json" />
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
					<link rel="stylesheet" href="/app.css" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.1.1/css/all.css"
						integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ"
						crossOrigin="anonymous"
					/>
					<script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js" />
			 <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
				</Head>
				<body>
					{/* Google Tag Manager (noscript) */}
					<noscript
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
						}}
					/>
					{/* End Google Tag Manager (noscript) */}
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

MyDocument.getInitialProps = async ctx => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: App => props => sheets.collect(<App {...props} />),
		})

	const initialProps = await Document.getInitialProps(ctx)

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: (
			<>
				{sheets.getStyleElement()}
				{flush() || null}
			</>
		),
	}
}

export default MyDocument
