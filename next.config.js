const CopyWebpackPlugin = require('copy-webpack-plugin')

const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: function(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin(['./static/favicon.ico'], {
          debug: 'debug',
        })
      )
    }
    return config
  },
})
