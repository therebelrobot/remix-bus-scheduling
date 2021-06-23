require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  poweredByHeader: false,
  basePath: process.env.ENVIRONMENT === 'development' ? undefined : '/docs',
  assetPrefix:
    process.env.ENVIRONMENT === 'development'
      ? undefined
      : 'https://cdn.jsdelivr.net/gh/therebelrobot/remix-bus-scheduling/docs/',
  env: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    SSL: process.env.SSL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
}
