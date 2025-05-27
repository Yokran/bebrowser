// console.log('PORT:SELECTOR: new', location.href);
var
src = chrome.runtime.getURL('ui/htmlselector.html'),
html = document.documentElement,
elLoading = document.createElement('div'),
iframe = document.createElement('iframe'),
xframe = document.createElement('x-frame-d'),
xShadow = xframe.attachShadow({ mode: "closed" });

iframe.src = src + '?locale='+DISTILL_LOCALE;
iframe.className = 'xbrwsr_ui';
xframe.setAttribute('style', 'display: block !important; visibility: visible !important;');
xShadow.appendChild(iframe);

var origin = chrome.runtime.getURL('');
origin = origin.slice(0, origin.length - 1);

html.style['overflow-x'] = 'scroll';

addEventListener('message', onMessage, false);


function render() {
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('style', `
    visibility: visible !important;
    display: block !important;
    position:fixed !important;
    bottom:0 !important;
    right:0 !important;
    top: initial !important;
    left: initial !important;
    height:0 !important;
    border:solid 1px #aaa;
    box-shadow: -4px -4px 16px 0 rgba(0 67 233 / 20%);
    z-index:100000000000000 !important;
  `);
  html.appendChild(xframe);

  if(elLoading) {
    // Show loading message before we show a prepared frame
    elLoading.textContent = 'Loading Visual Selector...'; // TODO i18n
    elLoading.setAttribute('style', 'font-size:18px;background-color:#ffd;padding:4px;text-align:center;position:fixed;bottom:0;width:100% !important;z-index:100000000000000;');
    html.appendChild(elLoading);
  }
}

function remove() {
  xframe.remove();
  html.style.marginBottom = '0';
  html.style.paddingBottom = '0';
  html.style.overflowX = 'auto';
  removeEventListener('message', onMessage, false);
}

function show(state) {
  const heightCss = (state.expanded ?  300 : 34)+ 'px';
  iframe.style.setProperty('height', heightCss, 'important');
  html.style['margin-bottom'] = heightCss;
  html.style['padding-bottom'] = heightCss;

  if (state.expanded) {
    iframe.style.setProperty('width', '100%', 'important');
  } else {
    iframe.style.setProperty('width', '400px', 'important');
  }
  if (elLoading) {
    elLoading.parentNode.removeChild(elLoading);
    elLoading = null;
  }
  // TODO Test visibility of the selector panel. If we are not visible, set
  // higher z-index?
}

window.show = show;
window.remove = remove;

function onMessage(event) {
  if (event.origin != origin) {
    return;
  }

  const {data, type} = event.data;

  // console.log('PORT:SELECTOR:onMessage:', type, data);

  switch (type) {
    case 'show':
      show(data);
      break;
  }
}

render();
