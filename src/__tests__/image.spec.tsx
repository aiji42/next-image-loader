import { describe, test, expect, beforeEach } from 'vitest'
import CustomImage from '../image'
import { imageLoader } from '../image-loader'
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { ImageLoaderProps } from 'next/image'

const customImageLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?w=${width}&q=${quality || 75}&customImageLoader=true`

describe('CustomImage', () => {
  beforeEach(() => {
    cleanup()
  })

  test('The loader configured in config must be used.', () => {
    imageLoader.loader = customImageLoader
    render(
      <CustomImage
        src="https://example.com/foo.png"
        width={100}
        height={200}
        quality={50}
        priority
      />
    )

    expect(screen.getByRole('img').getAttribute('src')).toMatch(
      /https:\/\/example\.com\/foo\.png\?w=\d+&q=50&customImageLoader=true/
    )
  })

  test('The props loader must be used first.', () => {
    imageLoader.loader = customImageLoader
    render(
      <CustomImage
        src="https://example.com/foo.png"
        width={100}
        height={200}
        quality={50}
        priority
        loader={({ src, width, quality }) =>
          `${src}?width=${width}&quality=${quality || 75}`
        }
      />
    )

    expect(screen.getByRole('img').getAttribute('src')).toMatch(
      /https:\/\/example\.com\/foo\.png\?width=\d+&quality=50/
    )
  })

  test('If no loader is defined, the default loader in next/image must be used.', () => {
    imageLoader.loader = undefined
    render(
      <CustomImage
        src="/foo.png"
        width={100}
        height={200}
        quality={50}
        priority
      />
    )

    expect(screen.getByRole('img').getAttribute('src')).toMatch(
      /\/_next\/image\?url=%2Ffoo.png&w=\d+&q=50/
    )
  })
})
