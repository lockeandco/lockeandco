const CopyWebpackPlugin = require('copy-webpack-plugin')
const frontmatter = require('remark-frontmatter')
const withMDX = require('@next/mdx')({
	extension: /\.mdx$/,
	options: {
		remarkPlugins: [frontmatter],
	},
})

module.exports = {
	// Next.config.js object
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
