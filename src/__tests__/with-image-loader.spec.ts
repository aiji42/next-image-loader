import { WebpackConfig, withImageLoader } from '../with-image-loader'
import { existsSync } from 'fs'

jest.mock('fs', () => ({
  existsSync: jest.fn()
}))

class DefinePlugin {
  arg: unknown
  constructor(arg: unknown) {
    this.arg = arg
  }
}

let defaultWebpackArgs: unknown[] = []

describe('withImageLoader', () => {
  beforeEach(() => {
    jest.resetModules()
    defaultWebpackArgs = [
      {
        resolve: { alias: { next: 'default/next/path' } },
        plugins: [],
        entry: async () => ({})
      },
      { webpack: { DefinePlugin, version: '5.0.0' } }
    ]
    ;(existsSync as jest.Mock).mockReturnValue(true)
  })
  test('The loader file is added to main.js and pages/_document of entry.', () => {
    defaultWebpackArgs = [
      {
        resolve: { alias: { next: 'default/next/path' } },
        plugins: [],
        entry: async () => ({
          'main.js': [],
          'pages/_document': []
        })
      },
      { webpack: { DefinePlugin, version: '5.0.0' } }
    ]
    const config = withImageLoader({})
    return config
      .webpack(...defaultWebpackArgs)
      .entry()
      .then((entries: { [x: string]: unknown[] }) => {
        expect(entries['main.js'][0]).toEqual('./image-loader.config.js')
        expect(entries['pages/_document'][0]).toEqual(
          './image-loader.config.js'
        )
      })
  })
  test('If main.js is not in entry, the loader file is not added.', () => {
    defaultWebpackArgs = [
      {
        resolve: { alias: { next: 'default/next/path' } },
        plugins: [],
        entry: async () => ({
          'sub.js': []
        })
      },
      { webpack: { DefinePlugin, version: '5.0.0' } }
    ]
    const config = withImageLoader({})
    return config
      .webpack(...defaultWebpackArgs)
      .entry()
      .then((entries: { [x: string]: unknown[] }) => {
        expect(entries['sub.js']).toEqual([])
      })
  })
  it('The next alias is overwritten with the path of the custom component when webpack5.', () => {
    const config = withImageLoader({})
    expect(config.webpack(...defaultWebpackArgs).resolve.alias).toEqual({
      next: ['next-image-loader/build', 'default/next/path']
    })
  })
  it('The next alias is deleted and add the path of the custom component when webpack4.', () => {
    defaultWebpackArgs = [
      { resolve: { alias: { next: 'default/next/path' } }, plugins: [] },
      { webpack: { DefinePlugin, version: '4.0.0' } }
    ]
    const config = withImageLoader({})
    expect(config.webpack(...defaultWebpackArgs).resolve.alias).toEqual({
      'next/image': 'next-image-loader/build/image'
    })
  })
  it('Inherits the given webpack.', () => {
    defaultWebpackArgs = [
      { resolve: { alias: { next: ['default/next/path'] } }, plugins: [] },
      { webpack: { DefinePlugin, version: '5.0.0' } }
    ]
    const config = withImageLoader({
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
