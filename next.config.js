const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const frontmatter = require('remark-frontmatter')
const withMDX = require('@next/mdx')({
	extension: /\.mdx$/,
	options: {
		remarkPlugins: [frontmatter],
	},
})
require('dotenv').config()

module.exports = phase => {
	// When started in development mode `next dev` or `npm run dev` regardless of
	// the value of STAGING environmental variable

	const isDev = phase === PHASE_DEVELOPMENT_SERVER
	// When `next build` or `npm run build` is used
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
	// When `next build` or `npm run build` is used
	const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

	console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

	const env = {
		AWSCONFIG: `${process.env.AWSCONFIG}`,
	}

	// Next.config.js object
	return {
		env,
		...withMDX({
			pageExtensions: ['js', 'jsx', 'mdx'],
			experimental: {
				modern: true,
				// Rewrites() {
				// 	return [{}]
				// },
			},
			webpack(config, {isServer}) {
				if (!isServer) {
					config.plugins.push(
						new CopyWebpackPlugin(['./public/favicon.ico'], {debug: 'debug'})
					)
				}

				config.module.rules.push({
					test: /\.md$/,
					loader: 'frontmatter-markdown-loader',
					options: {mode: ['react-component']},
				})
				return config
			},
		}),
	}
}
