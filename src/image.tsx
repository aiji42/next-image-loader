import React, { FC } from 'react'
import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'

class CustomImageLoader {
  loader: undefined | ImageLoader
  set(loader: ImageLoader | undefined) {
    this.loader = loader
  }
}
export const imageLoader = new CustomImageLoader()
require('custom-image-loader')

const CustomImage: FC<ImageProps> = (props) => {
  return <Image {...props} loader={props.loader ?? imageLoader.loader} />
}

export * from 'next/dist/client/image'
export default CustomImage
