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

const errorLog = jest
  .spyOn(console, 'error')
  .mockImplementation((mes) => console.log(mes))

const mockExit = jest
  .spyOn(process, 'exit')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .mockImplementation((code) => console.log('exit: ', code))

let defaultWebpackArgs: unknown[] = []

describe('withImageLoader', () => {
  beforeEach(() => {
    jest.resetModules()
    defaultWebpackArgs = [
      { resolve: { alias: { next: 'default/next/path' } }, plugins: [] },
      { webpack: { DefinePlugin, version: '5.0.0' } }
    ]
    ;(existsSync as jest.Mock).mockReturnValue(true)
  })
  test('Exit unexpectedly when The custom loader file is missing.', () => {
    ;(existsSync as jest.Mock).mockReturnValue(false)
    withImageLoader({})
    expect(mockExit).toBeCalledWith(1)
    expect(errorLog).toBeCalledWith(
      'Error: Not existing `image-loader.config.js`. Please read https://github.com/aiji42/next-image-loader#usage'
    )
  })
  it('The next alias is overwritten with the path of the custom component when webpack5.', () => {
    const config = withImageLoader({})
    expect(config.webpack(...defaultWebpackArgs).resolve.alias).toEqual({
      next: ['next-image-loader/build', 'default/next/path'],
      'custom-image-loader': expect.stringMatching(
        /.*\/image-loader\.config\.js$/
      )
    })
  })
  it('The next alias is deleted and add the path of the custom component when webpack4.', () => {
    defaultWebpackArgs = [
      { resolve: { alias: { next: 'default/next/path' } }, plugins: [] },
      { webpack: { DefinePlugin, version: '4.0.0' } }
    ]
    const config = withImageLoader({})
    expect(config.webpack(...defaultWebpackArgs).resolve.alias).toEqual({
      'next/image': 'next-image-loader/build/image',
      'custom-image-loader': expect.stringMatching(
        /.*\/image-loader\.config\.js$/
      )
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
        next: ['next-image-loader/build', 'default/next/path'],
        'custom-image-loader': expect.stringMatching(
          /.*\/image-loader\.config\.js$/
        )
      }
    })
  })
})