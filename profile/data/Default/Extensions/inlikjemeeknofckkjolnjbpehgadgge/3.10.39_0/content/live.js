// include locator so that they are loaded for dom ops
window.Live = (function() {
  let lastResult;

  const observer = new MutationObserver(function(mutations) {
    check();
  });

  const observerConfig = {
    attributes: true,
    attributeFilter: ['class', 'id', 'name', 'value', 'src', 'href'],
    childList: true,
    characterData: true,
    subtree: true,
  };

  let options = {};

  async function check() {
    // console.log('LIVE: check');
    // Remove all mutation observers before starting a check
    observer.disconnect();

    try {
      const {html, text} = await Api.callAsync({ path: 'filterHTMLAndGetData', data: options, });

      if (text.length > 0) {
        if (!lastResult || lastResult.text != text) {
          // console.log('LIVE: send result', {text, data});
          Api.trigger({
            type: 'live:result',
            event: {
              result: {text, html}
            }
          });
          lastResult = {text, html};
        }
      }
    } catch(err) {
      console.error('LIVE: error checking:', err);
      Api.trigger({
        type: 'live:err',
        event: {
          message: err.message || err.msg,
        }
      });
    }

    // console.log('LIVE: done');
    observer.observe(document.body||document.documentElement, observerConfig);
  }

  Api.extend({
    live_init: Api.syncToAsync(function(_options) {
      options = {...options, ..._options};
      check();
    }),
  });
})();
