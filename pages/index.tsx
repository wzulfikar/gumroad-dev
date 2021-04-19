import Head from 'next/head';
import Link from 'next/link';

import styles from '@src/styles/Home.module.css';
import trackGoal from '@src/utils/trackGoal';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  return (
    <div className={`${styles.container} dark:bg-[#111] vercel`}>
      <h1>Hello Gumroad! Check this out:</h1>
      <div className="pt-5">
        <ul>
          <li>
            <Link href={'/l/bite-size-linux'}>
              <a className="text-blue-800 hover:underline">
                - {baseUrl}/l/bite-size-linux
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/l/hypercropteam'}>
              <a className="text-blue-800 hover:underline">
                - {baseUrl}/l/hypercropteam
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="max-w-md mx-auto">
        <p>
          You can play around with other products too! Find any gumroad product
          page and replace the domain to <code>.dev</code>.
        </p>
        <p>Example: </p>
        <ul>
          <li>
            - From{' '}
            <a
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
