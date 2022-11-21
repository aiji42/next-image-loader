import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import Prism from 'prismjs'

export default function Page() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>next/image - next-image-loader</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://github.com/aiji42/next-image-loader">
            next-image-loader
          </a>
        </h1>

        <p className={styles.description}>
          1. Write <code className={styles.code}>withImageLoader</code> in{' '}
          <code className={styles.code}>next.config.js</code>.
        </p>

        <pre>
          <code className="language-javascript">{`const { withImageLoader } = require('next-image-loader')

module.exports = withImageLoader({
  // write your next.js configuration values.
})`}</code>
        </pre>

        <p className={styles.description}>
          2. Create <code className={styles.code}>image-loader.config.js</code>{' '}
          in your project root.
        </p>

        <pre>
          <code className="language-javascript">{`import { imageLoader } from 'next-image-loader/image-loader'

imageLoader.loader = ({ src, width, quality }) => {
  return 'https://res.cloudinary.com/demo/image/upload' +
         \`/w_\${width}/q_\${quality || 75}/\${src.replace(/^\\//, '')}\`
}`}</code>
        </pre>

        <div style={{ marginTop: 48 }} />

        <code
          className={styles.code}
        >{`<Image src="/beach_huts.jpg" priority width={712} height={457} />`}</code>
        <Image alt="beach_huts" src="/beach_huts.jpg" priority width={712} height={457} />

        <div style={{ marginTop: 32 }} />

        <code
          className={styles.code}
        >{`<Image src="/beach_huts.jpg" width={712} height={457} quality={5} />`}</code>
        <Image alt="beach_huts" src="/beach_huts.jpg" width={712} height={457} quality={5} />
      </main>

      <footer className={styles.footer} />
    </div>
  )
}
