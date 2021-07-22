/**
 * @jest-environment jsdom
 */
import CustomImage from '../image'
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { ImageLoaderProps } from 'next/image'

const customImageLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?w=${width}&q=${quality || 75}`

const OLD_ENV = { ...process.env }

describe('CustomImage', () => {
  beforeEach(() => {
    cleanup()
    process.env = { ...OLD_ENV }
  })

  test('The loader configured in config must be used.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.env = { ...process.env, __CUSTOM_IMAGE_LOADER: customImageLoader }
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
      /https:\/\/example\.com\/foo\.png\?w=\d+&q=50/
    )
  })

  test('The props loader must be used first.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.env = { ...process.env, __CUSTOM_IMAGE_LOADER: customImageLoader }
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
