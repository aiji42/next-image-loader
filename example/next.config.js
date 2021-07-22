const withImageLoader = require('next-image-loader')(
  ({ src, width, quality }) =>
    `https://res.cloudinary.com/demo/image/upload/w_${width}/q_${
      quality || 75
    }/${src.replace(/^\//, '')}`
)

module.exports = withImageLoader({
  reactStrictMode: true
})