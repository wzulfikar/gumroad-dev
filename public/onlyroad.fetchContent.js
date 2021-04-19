(function (d) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  d.body.appendChild(iframe);

  const cache = {};
  async function fetchContent(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then((res) => res.text());
    }
    return cache[url];
  }

  function getEmbedUrl(url) {
    const { origin, pathname } = new URL(url);
    return `${origin}/api/embed/${pathname.substr(1)}`;
  }

  function getDomainSelector() {
    let domains = ['gum.co', 'gumroad.com'];

    // Handle custom domains
    const customDomains = d.querySelector('script[data-gumroad-domains]');
    if (customDomains && customDomains.getAttribute('data-gumroad-domains')) {
      domains = domains.concat(
        customDomains.getAttribute('data-gumroad-domains').split(',')
      );
    }

    return domains.map((domain) => `a[href*="${domain}"]`).join(',');
  }

  const links = d.querySelectorAll(getDomainSelector());
  links.forEach((link) => {
    // Don't augment the link if data-overlay is false
    if (link.dataset.embed === 'false') return;

    const embedUrl = getEmbedUrl(link.href);

    // Override link events
    link.onclick = async (e) => {
      e.preventDefault();
      const content = await fetchContent(embedUrl);
      console.log('con:', content);
      d.body.innerHTML = content;
    };

    // Prefetch content on hover and on focus
    link.onmouseover = (e) => fetchContent(embedUrl);
    link.onfocus = link.onmouseover;
  });
})(document);
