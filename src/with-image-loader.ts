import { NextConfig } from 'next/dist/next-server/server/config-shared'
import { resolve } from 'path'
import { existsSync } from 'fs'

export type WebpackConfig = {
  resolve: {
    alias: Record<string, string | string[]>
  }
  entry: () => Promise<Record<string, unknown[]>>
  plugins: unknown[]
  [x: string]: unknown
}

export type WebpackOption = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: any
  [x: string]: unknown
}

const imageLoaderFileName = 'image-loader.config.js'

export const withImageLoader = (
  nextConfig: Partial<NextConfig>
): Partial<NextConfig> => {
  const loaderPath = resolve(imageLoaderFileName)
  if (!existsSync(loaderPath)) {
    console.error(
      `Error: Not existing \`${imageLoaderFileName}\`. Please read https://github.com/aiji42/next-image-loader#usage`
    )
    process.exit(1)
  }

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
        if (entries['main.js']) {
          entries['main.js'].push(loaderPath)
        }
        return entries
      }

      return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    }
  }
}
