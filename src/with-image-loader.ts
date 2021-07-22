import { ImageLoader } from 'next/image'
import { NextConfig } from 'next/dist/next-server/server/config-shared'

export type WebpackConfig = {
  resolve: {
    alias: Record<string, string>
  }
}

export const withImageLoader =
  (cb?: ImageLoader) =>
  (nextConfig: Partial<NextConfig>): Partial<NextConfig> => {
    return {
      ...nextConfig,
      webpack: (config: WebpackConfig, option: unknown) => {
        config.resolve.alias['next/image'] = 'next-image-loader/build/CustomImage'

        return nextConfig.webpack ? nextConfig.webpack(config, option) : config
      },
      serverRuntimeConfig: {
        ...nextConfig.serverRuntimeConfig,
        customImageLoader: cb
      }
    }
  }
