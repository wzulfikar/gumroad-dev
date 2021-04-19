import parseProductData from '@src/lib/gumroad/parseProductData';

export default async function handler(req, res) {
  const permalink = req.query.permalink;
  const gumroadUrl = `https://gumroad.com/products/${permalink}/display?permalink=${permalink}`;
  const html = await fetch(gumroadUrl).then((res) => res.text());

  const productPageUrl = `https://gumroad.com/l/${permalink}`;

  const data = parseProductData(html);

  res.send({ permalink, productPageUrl, ...data });
}
