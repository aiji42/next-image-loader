import { imageLoader } from 'next-image-loader/build/image'

imageLoader.set(({ src, width, quality }) =>
  `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/demo/image/upload/w_${width}/q_${
    quality || 75
  }/${src.replace(/^\//, '')}`)
