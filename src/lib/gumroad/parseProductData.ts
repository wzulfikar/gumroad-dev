import cheerio from 'cheerio';

function trim(text: string) {
  return text.replace(/(^\n|\n$)/g, '');
}

function getPrice(text: string) {
  const { groups } = text.match(/(?<currency>.{1,3})(?<price>\d+)/);
  if (!groups) {
    return {};
  }

  let currency = groups.currency;
  switch (currency) {
    case 'US$':
      currency = 'USD';
      break;
  }

  return { price: parseFloat(groups.price), currency };
}

/**
 * @description
 * Parse product data from html string
 *
 * @param html
 * @returns
 */
export default function parseProductData(html: string) {
  const $ = cheerio.load(html);
  const image = (() => {
    const el = $('img[itemprop="image"]');
    return { url: el.attr('src'), title: el.attr('alt') };
  })();

  const description = trim($('[itemprop="description"]').html());
  const receiptCustomText = trim($('.js-receipt-custom-text').html());

  // Use dummy values
  const reviewCount = 231;
  const ratingValue = 4.5;

  const author = (() => {
    const profileLink = $('.js-creator-profile-link');
    const name = trim(profileLink.text());
    const url = profileLink.attr('href');

    const thumbnail = $('.profile-picture')
      .attr('style')
      .replace('background-image: url("', '')
      .replace('");', '');

    return { name, url, thumbnail };
  })();

  const reactProps = JSON.parse(
    $('[data-react-class="ProductCheckoutWant"]').attr('data-react-props')
  );

  return {
    ...reactProps,
    image,
    description,
    receiptCustomText,
    reviewCount,
    ratingValue,
    author,
  };
}
