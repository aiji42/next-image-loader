import Image, { ImageProps } from 'next/image'
import React, { FC } from 'react'
import getConfig from 'next/config'

const CustomImage: FC<ImageProps> = (props) => {
  return (
    <Image {...props} loader={props.loader ?? getConfig().customImageLoader} />
  )
}

export * from 'next/image'
export default CustomImage
