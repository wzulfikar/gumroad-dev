import './display.module.css';

import { useState, useEffect, useRef } from 'react';

import SEO from '@src/components/SEO';
import formatMoney from '@src/lib/numbers/formatMoney';
import { Product } from '@src/lib/gumroad/types';
import PriceTag from '@src/components/PriceTag';

function HeaderImage({ src, alt, isOverlay = false }) {
  return (
    <img
      className={`${
        isOverlay ? '' : 'rounded-t-md'
      } block p-0 my-0 mx-auto w-full font-normal leading-5 text-gray-600 align-baseline border`}
      src={src}
      alt={alt}
    />
  );
}

function Title({ productName, author }) {
  return (
    <>
      {/* Product name */}
      <div className="p-0 m-0 leading-5 align-baseline border-0">
        <h1 className="block p-0 mx-0 mt-0 mb-4 font-sans text-2xl font-bold text-gray-900 align-baseline border-0">
          <strong className="p-0 m-0 leading-7 align-baseline border-0">
            {productName}
          </strong>
        </h1>
      </div>

      {/* Byline */}
      <h3 className="block relative p-0 mx-0 mt-0 mb-5 text-base leading-5 text-gray-500 align-baseline border-0">
        By
        <div className="inline-block relative mx-1 mb-0 -mt-1 w-8 h-8 text-gray-500 align-middle bg-white border border-gray-400 border-solid box-border shadow-xs rounded-full">
          <img className="w-full h-full rounded-full" src={author.thumbnail} />
        </div>
        <a
          className="p-0 m-0 text-teal-500 underline align-baseline border-0 cursor-pointer hover:underline font-semibold"
          href={author.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {author.name}
        </a>
      </h3>
    </>
  );
}

function Variant({
  name,
  description,
  currency,
  price,
  idx,
  onClick,
  selected,
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        selected
          ? 'border-gumroad-teal bg-white shadow-md'
          : 'bg-gray-100 border-gray-300'
      } group block relative overflow-hidden px-4 pt-4 pb-3 mx-0 mt-2 mb-0 text-base text-gray-900 no-underline align-baseline bg-white rounded border-2 border-solid cursor-pointer box-border shadow-xs hover:bg-white hover:no-underline hover:border-gumroad-teal hover:shadow-md`}
    >
      <div className="flex items-baseline justify-between">
        {/* Price tag */}
        <PriceTag active={selected} currency={currency} price={price} />

        {/* Simulate popular product */}
        {idx === 0 && (
          <span
            className={`${
              selected ? 'text-gumroad-teal font-bold' : ''
            } inline-block text-xs font-bold text-gray-500 group-hover:text-gumroad-teal`}
          >
            Most Popular
          </span>
        )}
      </div>
      <span className="block p-0 m-0 py-3 font-bold align-baseline border-0 pointer-events-none text-md leading-tight">
        {name}
      </span>
      <p className="text-gray-500 font-medium text-sm pb-3">{description}</p>
    </div>
  );
}

function Sidebar({
  variantCategories,
  variantBasePrice,
  currency,
  reviewCount,
}) {
  const [variant, setVariant] = useState(0);

  return (
    <div className="pt-2 m-0 w-full font-normal leading-5 text-gray-600 align-baseline border-0 md:flex-grow-0 md:flex-shrink-0 box-border sticky top-3">
      <div className="p-0 m-0 leading-5 align-baseline border-0">
        <form className="p-0 m-0 text-gray-600 align-baseline border-0">
          <div className="p-0 m-0 align-baseline border-0">
            <div className="relative p-0 m-0 align-baseline border-0">
              {/* Price list */}
              <div className="p-0 mx-0 mt-0 mb-5 align-baseline border-0">
                {variantCategories.map(({ name, options }, i) => (
                  <div key={i}>
                    <label className="block p-0 m-0 text-xs font-bold leading-3 text-gray-500 align-baseline border-0 cursor-default">
                      {name || 'Rate'}:
                    </label>
                    <div className="p-0 m-0 pt-1 align-baseline border-0">
                      {options.map(
                        (
                          { id, name, description, price_difference_cents },
                          i
                        ) => (
                          <Variant
                            key={i}
                            idx={i}
                            name={name}
                            currency={currency}
                            description={description}
                            price={formatMoney(
                              parseFloat(
                                variantBasePrice + price_difference_cents
                              ) / 100
                            )}
                            selected={variant === i}
                            onClick={() => setVariant(i)}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="block py-3 px-4 m-0 w-full font-sans text-base text-center text-white bg-gradient-to-t from-yellow-500 to-yellow-400 rounded border border-orange-700 border-solid cursor-pointer shadow-xs hover:shadow-none hover:no-underline font-bold"
            data-custom-highlight-color=""
          >
            I want this!
          </button>
          <div className="p-0 pt-2 m-0 text-gray-500 border-0 text-center text-xs font-medium opacity-75">
            {reviewCount === 0
              ? 'Checkout now to become the first customer'
              : reviewCount < 10
              ? 'Checkout now to become the first 10 customers'
              : `${reviewCount} sold`}
          </div>
        </form>
      </div>
    </div>
  );
}

type ProductPageProps = {
  product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
  const parentRef = useRef(null);

  const [shouldCollapse, setShouldCollapse] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isOverlay, setIsOverlay] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        parentRef.current = event.source;
        parentRef.current.postMessage({ type: 'frame.mounted' }, event.origin);
        setIsOverlay(true);
      },
      false
    );

    // Collapse content only if it overflows
    if (contentRef.current.clientHeight < contentRef.current.scrollHeight) {
      setShouldCollapse(true);
    }
  }, []);

  function onClickReadMore() {
    setCollapsed(false);
  }

  function onClickCollapse() {
    setCollapsed(true);
  }

  return (
    <div
      className={`${
        isOverlay ? '' : 'bg-gray-100 px-4 py-12'
      } grid place-items-center w-full h-full min-h-screen`}
    >
      <SEO
        title={(appName) => `${product.product_data.name} – ${appName}`}
        path={`/l/${product.permalink}`}
      />

      <img
        className={`${
          isOverlay ? 'sticky' : 'absolute'
        } left-0 top-0 min-w-screen w-full`}
        src="/images/header_bar.png"
      />
      <div className="grid place-items-center max-w-5xl mx-auto shadow-sm rounded-b-md">
        {/* Header image */}
        <HeaderImage
          src={product.image.url}
          alt={product.image.title}
          isOverlay={isOverlay}
        />

        {/* Content */}
        <div className="bg-white grid grid-cols-1 sm:grid-cols-10 border py-6 px-6 gap-2 rounded-b-md">
          {/* Description */}
          <div className="sm:col-span-7 m-0 w-full font-normal leading-5 text-gray-600 align-baseline border-0 box-border md:flex-grow-0 md:flex-shrink-0 md:mb-0 md:pr-16">
            <Title
              productName={product.product_data.name}
              author={product.author}
            />
            <article
              className={`${
                collapsed ? 'max-h-[300vh]' : ''
              } prose lg:prose-lg border-0 overflow-y-hidden`}
              dangerouslySetInnerHTML={{ __html: product.description }}
              ref={contentRef}
            />

            {shouldCollapse &&
              (collapsed ? (
                <button
                  onClick={onClickReadMore}
                  className="text-indigo-600 w-full font-medium py-4 text-center"
                >
                  Read more <span className="text-xs opacity-90">&#9660;</span>
                </button>
              ) : (
                <button
                  onClick={onClickCollapse}
                  className="text-indigo-600 w-full font-medium py-4 text-center"
                >
                  Collapse <span className="text-xs opacity-90">&#9650;</span>
                </button>
              ))}
          </div>

          {/* Sidebar */}
          <div className="mt-3 sm:mt-0 sm:col-span-3 relative">
            <Sidebar
              currency={product.product_data.currency.currency_symbol}
              variantCategories={
                product.product_data.variant_list.variant_categories
              }
              variantBasePrice={product.product_data.base_price_cents}
              reviewCount={product.reviewCount}
            />
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
