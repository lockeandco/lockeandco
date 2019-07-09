require('dotenv').config()
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/,
})

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  // next.config.js object
  return {
    ...withMDX({
      pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      webpack: function(config, { isServer }) {
        if (!isServer) {
          config.plugins.push(
            new CopyWebpackPlugin(['./static/favicon.ico'], {
              debug: 'debug',
            }),
            new Dotenv({
              path: path.join(__dirname, '.env'),
              systemvars: true,
            })
          )
        }
        return config
      },
    }),
  }
}
