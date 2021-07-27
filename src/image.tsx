import React, { FC } from 'react'
import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'

class CustomImageLoader {
  loader: undefined | ImageLoader
  set(loader: ImageLoader | undefined) {
    this.loader = loader
  }
}
export const imageLoader = new CustomImageLoader()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
require(process.env.__CUSTOM_IMAGE_LOADER)

const CustomImage: FC<ImageProps> = (props) => {
  return <Image {...props} loader={props.loader ?? imageLoader.loader} />
}

export * from 'next/dist/client/image'
export default CustomImage
