import Link from 'next/link';

import styles from '@src/styles/Home.module.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  return (
    <div
      className={`${styles.container} dark:bg-[#111] vercel bg-gray-200 px-4 sm:px-0 py-10`}
    >
      <h1 className="sm:mt-0">Hello Gumroad! Check this out:</h1>

      <div className="mt-10 max-w-sm w-full mx-auto">
        <h1>Gumroad Button Widget</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 text-center">
          <a
            className="gumroad-button"
            href="https://gumroad.com/l/bite-size-linux"
          >
            Buy my product (gumroad.com)
          </a>
          <a className="gumroad-button" href={`${baseUrl}/bite-size-linux`}>
            Buy my product (gumroad.dev)
          </a>
          <a
            className="gumroad-button"
            href={`${baseUrl}/bite-size-linux`}
            data-overlay="false"
          >
            Buy my product (no-overlay)
          </a>
        </div>
      </div>

      <div className="max-w-sm w-full mx-auto mt-10">
        <h1>Product Page</h1>
        <p>
          You can play around with other products too (no overlay). Find any
          gumroad product page and replace the domain from{' '}
          <code>gumroad.com</code> to <code>gumroad.dev</code>.
        </p>

        <p>Example: </p>
        <ul>
          <li>
            - From{' '}
            <a
              data-product="false"
              className="text-blue-800 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://gumroad.com/l/bite-size-linux"
            >
              gumroad.com/l/bite-size-linux
            </a>{' '}
            to{' '}
            <Link href="/l/bite-size-linux">
              <a
                data-product="false"
                className="text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                gumroad.dev/l/bite-size-linux
              </a>
            </Link>
          </li>
          <li>
            - From{' '}
            <a
              data-product="false"
              className="text-blue-800 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://gumroad.com/l/cefip"
            >
              gumroad.com/l/cefip
            </a>{' '}
            to{' '}
            <Link href="/l/cefip">
              <a
                data-product="false"
                className="text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                gumroad.dev/l/cefip
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="max-w-sm w-full mx-auto mt-10">
        <h1>How it works</h1>
        <p>
          Behind the scene, the product page uses Next.js ISR to generate the
          static html on demand (
          <a
            className="text-blue-900 hover:underline"
            href="https://github.com/wzulfikar/gumroad-dev/blob/main/pages/l/[permalink]/index.tsx"
          >
            see code in github
          </a>
          ). This makes the product pages fast, scalable, and cacheable at edge.
        </p>
      </div>

      <div className="max-w-sm w-full mx-auto mt-10">
        <h1>API Endpoint</h1>
        <p>
          You can access product data from API endpoint (
          <code>/api/products/[permalink]</code>). Example:
        </p>
        -{' '}
        <a
          data-overlay="false"
          data-product="false"
          className="text-blue-900 hover:underline"
          href="https://gumroad.dev/api/products/bite-size-linux"
        >
          https://gumroad.dev/api/products/bite-size-linux
        </a>
      </div>
      <div className="max-w-sm w-full mx-auto mt-10">
        <h1>Github Repo</h1>
        <p>You can check the code in Github:</p>-{' '}
        <a
          className="text-blue-900 hover:underline"
          href="https://github.com/wzulfikar/gumroad-dev"
        >
          https://github.com/wzulfikar/gumroad-dev
        </a>
      </div>
    </div>
  );
}
