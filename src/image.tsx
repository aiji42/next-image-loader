import React, { FC } from 'react'
import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'

const CustomImage: FC<ImageProps> = (props) => {
  return (
    <Image
      {...props}
      loader={
        props.loader ??
        (process.env.__CUSTOM_IMAGE_LOADER as undefined | ImageLoader)
      }
    />
  )
}

export * from 'next/dist/client/image'
export default CustomImage
