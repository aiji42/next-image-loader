/**
 * @jest-environment jsdom
 */
import CustomImage from '../CustomImage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import getConfig from 'next/config'
import { ImageLoaderProps } from 'next/image'

jest.mock('next/config', () => jest.fn())

const customImageLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?w=${width}&q=${quality || 75}`

describe('CustomImage', () => {
  ;(getConfig as jest.Mock).mockReturnValue({
    customImageLoader
  })
  test('The loader configured in config must be used.', () => {
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
    ;(getConfig as jest.Mock).mockReturnValue({
      customImageLoader
    })
    render(
      <CustomImage
        src="https://example.com/foo.png"
        width={100}
        height={200}
        quality={50}
        priority
        loader={({ src, width, quality }) => `${src}?width=${width}&quality=${quality || 75}`}
      />
    )

    expect(screen.getByRole('img').getAttribute('src')).toMatch(
      /https:\/\/example\.com\/foo\.png\?width=\d+&quality=50/
    )
  })

  test('If no loader is defined, the default loader in next/image must be used.', () => {
    ;(getConfig as jest.Mock).mockReturnValue({})
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
