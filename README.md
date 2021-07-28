[![codecov](https://codecov.io/gh/aiji42/next-image-loader/branch/main/graph/badge.svg?token=Y1M1LMIR7E)](https://codecov.io/gh/aiji42/next-image-loader)
[![npm version](https://badge.fury.io/js/next-image-loader.svg)](https://badge.fury.io/js/next-image-loader)

# :city_sunrise: next-image-loader

This plugin enables you to transparently replace the loader of `next/image` with a self-defined custom loader.

For Next.js image optimization, you can choose Vercel (default), Imgix, Cloudinary, or Akamai, but if you want to use other providers (including self-hosting), you need to define the loader in the `next/image` props. This makes it very annoying to have to add a props every time you use `next/image`.

This plugin will relieve you of that stress by enabling you to self-define a custom loader in `next.config.js` and transparently reflect that loader throughout your project.

## Installation

```
npm install --save next-image-loader
```

## Usage
1. Write `withImageLoader` in `next.config.js`.
```js
// next.config.js
const withImageLoader = require('next-image-loader')

module.export = withImageLoader({
  // write your next.js configuration values.
})
```

If you are using next-compose-plugins
```js
// next.config.js
const withPlugins = require('next-compose-plugins')
const withImageLoader = require('next-image-loader')

module.exports = withPlugins([
  withImageLoader
  // your other plugins here
], {
  // write your next.js configuration values.  
})
```

2\. Put `image-loader.config.js` in the project root (in the same directory as next.config.js).
```js
// image-loader.config.js
import { imageLoader } from 'next-image-loader/build/image-loader'

// write self-define a custom loader
// (resolverProps: { src: string; width: number; quality?: number }) => string
imageLoader.loader = ({ src, width, quality }) => 
  `${process.env.NEXT_PUBLIC_OPTIMIZE_DOMAIN}?url=${encodeURIComponent(src)}&w=${Math.min(width, 1080)}&q=${quality || 75}`
```

## Contributing
Please read [CONTRIBUTING.md](https://github.com/aiji42/next-image-loader/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/aiji42/next-image-loader/blob/main/LICENSE) file for details
