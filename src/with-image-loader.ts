import { NextConfig } from 'next/dist/server/config'

export type Webpack = Exclude<NextConfig['webpack'], null | undefined>
export type WebpackConfig = Parameters<Webpack>[0]
export type WebpackOption = Parameters<Webpack>[1]

const imageLoaderFileName = './image-loader.config.js'

export const withImageLoader = (
  nextConfig: NextConfig
): NextConfig & { webpack: Webpack } => {
  return {
    ...nextConfig,
    webpack: (config: WebpackConfig, option: WebpackOption) => {
      if (option.webpack.version[0] === '5') {
        const nextAlias = config.resolve.alias['next']
        config.resolve.alias['next'] = [
          'next-image-loader/build',
          ...(Array.isArray(nextAlias) ? nextAlias : [nextAlias])
        ]
      } else {
        config.resolve.alias['next/image'] = 'next-image-loader/build/image'
        delete config.resolve.alias['next']
      }

      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        if (
          entries['main.js'] &&
          !entries['main.js'].includes(imageLoaderFileName)
        ) {
          entries['main.js'].unshift(imageLoaderFileName)
        }
        if (
          entries['pages/_document'] &&
          !entries['pages/_document'].includes(imageLoaderFileName)
        ) {
          entries['pages/_document'].unshift(imageLoaderFileName)
        }
        return entries
      }

      return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    }
  }
}
