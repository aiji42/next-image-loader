import { ImageLoader } from 'next/dist/client/image'

class CustomImageLoader {
  _loader: undefined | ImageLoader

  set loader(loader: ImageLoader | undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (global) global.__customImageLoader = loader
    this._loader = loader
  }

  get loader() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return global?.__customImageLoader ?? this._loader
  }
}

export const imageLoader = new CustomImageLoader()
