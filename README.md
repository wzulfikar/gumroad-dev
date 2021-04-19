<p align="center">
<img width="400" src="https://og-image.wzulfikar.com/i/**gumroad.dev**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FDyWXd86UwAAsLM-%3Fformat%3Dpng%26name%3Dlarge&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg">
</p>

The site is available here: https://gumroad.dev

### Some notes:

- Custom subdomains are handled via `data-gumroad-subdomains`. HTML example:
  https://github.com/wzulfikar/gumroad-dev/blob/c29643f610bc4d5676293ca75d26189650429463/pages/_document.tsx#L9-L13

  ```html
  <script
    src="https://gumroad.dev/gumroad-dev.js"
    data-gumroad-domains="localhost:3000,gumroad.com,gumroad.dev"
    defer
  ></script>
  ```

  JS Code:

  https://github.com/wzulfikar/gumroad-dev/blob/c29643f610bc4d5676293ca75d26189650429463/public/gumroad-dev.js#L155-L167

  ```javascript
  function getDomains() {
    let domains = ['gum.co', 'gumroad.com', 'gumroad.dev'];

    // Handle custom domains
    const customDomains = d.querySelector('script[data-gumroad-domains]');
    if (customDomains && customDomains.getAttribute('data-gumroad-domains')) {
      domains = domains.concat(
        customDomains.getAttribute('data-gumroad-domains').split(',')
      );
    }

    return domains;
  }
  ```

- Early load page is handled here:

  https://github.com/wzulfikar/gumroad-dev/blob/fd8a8e6590efb828f2ffb95237118ee2bacedf77/public/gumroad-dev.js#L199-L201

  ```javascript
  // Prefetch content on hover and on focus
  link.onmouseover = (e) => fetchContent(overlayUrl);
  link.onfocus = link.onmouseover;
  ```

- Read data-attrs to determine whether to use overlay or normal redirect (eg. `data-overlay=false`). HTML example:

  https://github.com/wzulfikar/gumroad-dev/blob/fd8a8e6590efb828f2ffb95237118ee2bacedf77/pages/index.tsx#L70-L76

  ```html
  <a
    className="gumroad-button"
    href="https://gumroad.dev/cefip"
    data-overlay="false"
  >
    Buy my product (no-overlay)
  </a>
  ```

  JS code:

  https://github.com/wzulfikar/gumroad-dev/blob/fd8a8e6590efb828f2ffb95237118ee2bacedf77/public/gumroad-dev.js#L179-L186

  ```javascript
  // Return early to skip overlay logic if data-overlay is false
  if (link.dataset.overlay === 'false') {
    link.onclick = (e) => {
      e.preventDefault();
      window.location.href = overlayUrl;
    };
    return;
  }
  ```
