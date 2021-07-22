/**
 * @jest-environment jsdom
 */
import CustomImage from '../CustomImage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import getConfig from 'next/config'
import { ImageLoaderProps } from 'next/image'

jest.mock('next/config', () => jest.fn())

describe('CustomImage', () => {
  ;(getConfig as jest.Mock).mockReturnValue({
    customImageLoader: ({ src, width, quality }: ImageLoaderProps) =>
      `${src}?w=${width}&q=${quality}`
  })
  it('', () => {
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
})
