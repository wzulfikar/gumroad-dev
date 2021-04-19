(function (d) {
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none'; // Change to `block` to make the container visible
  iframe.style.border = 'none';
  iframe.style.height = '100%';
  iframe.style.width = '100%';
  iframe.style.maxWidth = '320px';
  iframe.style.padding = '1rem 0.5rem';
  iframe.style.paddingBottom = '2.5rem';

  // Create iframe container
  const container = document.createElement('div');
  container.style.display = 'none'; // Change to `grid` to make the container visible
  container.style.position = 'absolute';
  container.style.top = 0;
  container.style.left = 0;
  container.style.placeItems = 'center';
  container.style.height = '100%';
  container.style.width = '100%';
  container.style.background = 'hsl(0deg 0% 15% / 90%)';

  const loader = document.createElement('div');
  loader.innerHTML = '<span style="color: white;">Loading..</span>';

  const btnClose = document.createElement('button');
  btnClose.innerHTML = 'Close';
  btnClose.style.position = 'fixed';
  btnClose.style.bottom = '0px';
  btnClose.style.left = '50%';
  btnClose.style.right = '50%';
  btnClose.style.transform = 'translate(-50%, -50%)';
  btnClose.style.color = 'white';
  btnClose.style.display = 'none';
  btnClose.onclick = () => {
    iframe.style.display = 'none';
    btnClose.style.display = 'none';
    container.style.display = 'none';
  };

  container.appendChild(loader);
  container.appendChild(iframe);
  container.appendChild(btnClose);
  d.body.appendChild(container);

  // Create button styles
  const buttonClass = 'gumroad-button';
  const styleRaw = `a.${buttonClass} {
    background-color: white !important;
    background-image: url("GUMROAD_ORIGIN/button/button_bar.jpg") !important;
    background-repeat: repeat-x !important;
    border-radius: 4px !important;
    box-shadow: rgba(0, 0, 0, 0.4) 0 0 2px !important;
    color: #999 !important;
    display: inline-block !important;
    font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    font-size: 16px !important;
    font-style: normal !important;
    font-weight: 500 !important;
    line-height: 50px !important;
    padding: 0 15px !important;
    text-shadow: none !important;
    text-decoration: none !important;
  }
  
  .${buttonClass}-logo {
    background-image: url("GUMROAD_ORIGIN/button/button_logo.png") !important;
    background-size: cover !important;
    height: 17px !important;
    width: 16px !important;
    display: inline-block !important;
    margin-bottom: -3px !important;
    margin-right: 15px !important;
  }
  
  .gumroad-loading-indicator {
    background: white;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: none;
    height: 60px;
    left: 50% !important;
    margin-left: -30px !important;
    margin-top: -30px !important;
    padding: 10px;
    position: fixed;
    top: 50% !important;
    width: 60px;
    z-index: 99997;
  }
  
  .gumroad-loading-indicator i {
    background: url("GUMROAD_ORIGIN/js/loading-rainbow.svg");
    height: 40px;
    width: 40px;
    display: inline-block;
    background-size: contain;
    animation: gumroad-spin 1.5s infinite linear;
  }
  
  .gumroad-scroll-container {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    position: fixed !important;
    z-index: 99998 !important;
    top: 0 !important;
    right: 0 !important;
    -ms-overflow-style: none;
    scrollbar-width: none;
    text-align: start;
  }
  
  .gumroad-scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .gumroad-overlay-iframe {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    border: none !important;
  }
  
  @keyframes gumroad-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }`.replace(/GUMROAD_ORIGIN/g, 'https://gumroad.com');
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(styleRaw));
  d.head.append(style);

  // if (MutationObserver) {
  //   const nodeAdditionObserver = new MutationObserver(
  //     function (e) {
  //       for (var t = 0; t < e.length; t++) {
  //         for (var i = 0; i < e[t].addedNodes.length; i++) {
  //           this.nodeAdditionCallback &&
  //             this.nodeAdditionCallback(e[t].addedNodes[i]);
  //         }
  //       }
  //     }.bind(this)
  //   );
  //   nodeAdditionObserver.observe(document.body, { childList: !0, subtree: !0 });
  // }

  const loaded = {};
  function fetchContent(url) {
    if (!loaded[url]) {
      loaded[url] = new Promise(function (resolve, reject) {
        iframe.onload = () => {
          iframe.contentWindow.postMessage('message from parent');
          resolve(true);
        };
      });
    }
    if (iframe.src != url) {
      loaded[iframe.src] = undefined;
      iframe.src = url;
    }
    return loaded[url];
  }

  function getDisplayUrl(url) {
    const { origin, pathname } = new URL(url);
    return `${origin}/l/${pathname.substr(1)}`;
  }

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

  function getDomainSelector() {
    return getDomains()
      .map((domain) => `a[href*="${domain}"]`)
      .join(',');
  }

  const links = d.querySelectorAll(getDomainSelector());
  links.forEach((link) => {
    // Skip non-product links
    if (link.dataset.product === 'false') return;

    const overlayUrl = getDisplayUrl(link.href);

    // Return early to skip overlay logic if data-overlay is false
    if (link.dataset.overlay === 'false') {
      link.onclick = (e) => {
        e.preventDefault();

        // Make sure link redirect is correct.
        // - wrong: gumroad.com/cefip
        // - correct: gumroad.com/l/cefip
        window.location.href = overlayUrl;
      };
      return;
    }

    // Override link events
    link.onclick = (e) => {
      e.preventDefault();
      loader.style.display = 'block';
      container.style.display = 'grid';
      fetchContent(overlayUrl).then(function () {
        iframe.style.display = 'block';
        btnClose.style.display = 'block';
        loader.style.display = 'none';
      });
    };

    // Prefetch content on hover and on focus
    link.onmouseover = (e) => fetchContent(overlayUrl);
    link.onfocus = link.onmouseover;
  });

  window.addEventListener(
    'message',
    (event) => {
      if (
        !getDomains().includes(event.origin.replace(/http:\/\/|https:\/\//, ''))
      )
        return;

      try {
        const { type, payload } = JSON.parse(event.data);
        switch (type) {
          case 'onClickClose':
            iframe.style.display = 'none';
            container.style.display = 'none';
            break;
        }
      } catch (e) {}
    },
    false
  );
})(document);
