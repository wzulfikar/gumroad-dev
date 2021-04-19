import Head from 'next/head';
import Link from 'next/link';

import styles from '@src/styles/Home.module.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  return (
    <div className={`${styles.container} dark:bg-[#111] vercel`}>
      <h1>Hello Gumroad! Check this out:</h1>

      <div className="mt-4 max-w-md mx-auto">
        <h1>Gumroad Button Widget</h1>
        <div className="mt-4 grid grid-cols-1 gap-2">
          <a className="gumroad-button" href="https://gumroad.com/cefip">
            Buy my product (gumroad.com)
          </a>
          <a className="gumroad-button" href={`${baseUrl}/cefip`}>
            Buy my product (gumroad.dev)
          </a>
          <a
            className="gumroad-button"
            href={`${baseUrl}/cefip`}
            data-overlay="false"
          >
            Buy my product (no-overlay)
          </a>
        </div>
      </div>

      <div className="pt-5">
        <ul>
          <li>
            <Link href={'/l/bite-size-linux'}>
              <a data-overlay="false" className="text-blue-800 hover:underline">
                - {baseUrl}/l/bite-size-linux
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/l/hypercropteam'}>
              <a data-overlay="false" className="text-blue-800 hover:underline">
                - {baseUrl}/l/hypercropteam
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="max-w-sm mx-auto mt-10">
        <h1>Product Page</h1>
        <p>
          You can play around with other products too (no overlay)! Find any
          gumroad product page and replace the domain from{' '}
          <code>gumroad.com</code> to <code>gumroad.dev</code>.
        </p>
        <p>Example: </p>
        <ul>
          <li>
            - From{' '}
            <a
              data-overlay="false"
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
                data-overlay="false"
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
    </div>
  );
}
