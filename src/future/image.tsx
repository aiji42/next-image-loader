import React, { FC } from 'react'
import Image, { ImageProps } from 'next/dist/client/future/image'
import { imageLoader } from '../image-loader'

const CustomImage: FC<ImageProps> = (props) => {
  return <Image {...props} loader={props.loader ?? imageLoader.loader} />
}

export * from 'next/dist/client/future/image'
export default CustomImage
