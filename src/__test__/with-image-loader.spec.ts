import { WebpackConfig, withImageLoader } from '../with-image-loader'
import { ImageLoaderProps } from 'next/image'

class DefinePlugin {
  arg: unknown
  constructor(arg: unknown) {
    this.arg = arg
  }
}

const loader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

let defaultWebpackArgs: unknown[] = []

describe('withImageLoader', () => {
  beforeEach(() => {
    defaultWebpackArgs = [
      { resolve: { alias: { next: 'default/next/path' } }, plugins: [] },
      { webpack: { DefinePlugin } }
    ]
  })
  test('The custom loader is set in the replacement of DefinePlugin when the loader is given.', () => {
    const config = withImageLoader(loader)({})
    expect(config.webpack(...defaultWebpackArgs).plugins).toEqual([
      { arg: { 'process.env.__CUSTOM_IMAGE_LOADER': loader } }
    ])
  })
  it('`undefined` is set in the replacement of DefinePlugin when the loader is undefined', () => {
    const config = withImageLoader()({})
    expect(config.webpack(...defaultWebpackArgs).plugins).toEqual([
      { arg: { 'process.env.__CUSTOM_IMAGE_LOADER': undefined } }
    ])
  })
  it('The next alias is overwritten with the path of the custom component.', () => {
    const config = withImageLoader()({})
    expect(config.webpack(...defaultWebpackArgs).resolve.alias).toEqual({
      next: ['next-image-loader/build', 'default/next/path']
    })
  })
  it('Inherits the given webpack.', () => {
    defaultWebpackArgs = [
      { resolve: { alias: { next: ['default/next/path'] } }, plugins: [] },
      { webpack: { DefinePlugin } }
    ]
    const config = withImageLoader()({
      webpack: (config: WebpackConfig) => {
        config.resolve.alias['foo'] = 'baa'
        return config
      }
    })
    expect(config.webpack(...defaultWebpackArgs).resolve).toEqual({
      alias: {
        foo: 'baa',
        next: ['next-image-loader/build', 'default/next/path']
      }
    })
  })
})
