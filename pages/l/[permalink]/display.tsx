import './display.module.css';

import { useEffect, useRef } from 'react';

export default function ProductPage({ product }) {
  const parentRef = useRef(null);

  console.log("p:", product)

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        parentRef.current = event.source;
        parentRef.current.postMessage({ type: 'frame.mounted' }, event.origin);
      },
      false
    );
  }, []);

  function onClickClose() {
    parentRef.current.postMessage(JSON.stringify({ type: 'onClickClose' }));
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">sdf</div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Go back to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps(ctx) {
  const permalink = ctx.params.permalink;
  const product = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${permalink}`
  ).then((res) => res.json());

  return {
    props: { product },
  };
}
