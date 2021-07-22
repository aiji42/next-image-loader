import { WebpackConfig, withImageLoader } from '../with-image-loader'
import { ImageLoaderProps } from 'next/image'

describe('withImageLoader', () => {
  it('must return the value that is set `serverRuntimeConfig` when the loader is given', () => {
    const loader = ({ src, width, quality }: ImageLoaderProps) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
    const config = withImageLoader(loader)({})
    expect(config.serverRuntimeConfig.customImageLoader).toEqual(loader)
  })
  it('`serverRuntimeConfig` is undefined when the loader is undefined', () => {
    const config = withImageLoader()({})
    expect(config.serverRuntimeConfig.customImageLoader).toBeUndefined()
    expect(config.webpack({ resolve: { alias: {} } })).toEqual({
      resolve: {
        alias: { 'next/image': 'next-image-loader/build/CustomImage' }
      }
    })
  })
  it('The webpack alias is overwritten with the path of the custom component.', () => {
    const config = withImageLoader()({})
    expect(config.webpack({ resolve: { alias: {} } })).toEqual({
      resolve: {
        alias: { 'next/image': 'next-image-loader/build/CustomImage' }
      }
    })
  })
  it('Inherits the given webpack.', () => {
    const config = withImageLoader()({
      webpack: (config: WebpackConfig) => {
        config.resolve.alias['foo'] = 'baa'
        return config
      }
    })
    expect(config.webpack({ resolve: { alias: {} } })).toEqual({
      resolve: {
        alias: {
          foo: 'baa',
          'next/image': 'next-image-loader/build/CustomImage'
        }
      }
    })
  })
})
