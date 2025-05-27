document.addEventListener('webapp', function(data) {
  chrome.runtime.sendMessage({...data.detail}, (resp) => {
    if (resp) {
      const detail = JSON.stringify({response: resp, id: data.detail.id});
      document.dispatchEvent(new CustomEvent('webapp_response', {detail}));
    }
  });
});

document.addEventListener('DOMContentLoaded', (e) => {
  document.head.setAttribute('distill-ext', 1);
});
