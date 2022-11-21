const { withImageLoader } = require('next-image-loader')

module.exports = withImageLoader({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_IMAGE_DOMAIN: 'https://res.cloudinary.com'
  }
})
