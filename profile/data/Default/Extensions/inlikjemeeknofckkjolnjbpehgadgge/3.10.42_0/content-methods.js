const CONTENT_METHODS = {
  callRemove: () => {
    remove();
  },
  callShow: (arg) => {
    show(arg);
  },
  getContentTypes: () =>   {
    const contentType = document.contentType;
    const textContent = document.body.textContent;
    const htmlContent = document.body.innerHTML;
    
    let type = 'html';
    let hasFeed = false;
    
    if (contentType && contentType !== 'text/plain') {
      switch (contentType) {
        case 'application/rss+xml':
        case 'application/atom+xml':
          return { type: 'feed' };
        case 'text/xml':
        case 'application/xml':
          type = parseXml();
          return { type };
        case 'application/json':
          return { type: 'json' };
        case 'application/pdf':
          return { type: 'pdf' };
        case 'text/html':
        case 'application/xhtml+xml':
          hasFeed = document.querySelectorAll('[type="application/rss+xml"],[type="application/atom+xml"]').length > 0;
          return { type: 'html', hasFeed };
        }
    } else {
      if (textContent?.startsWith('{')) {
        try {
          JSON.parse(textContent);
          return { type: 'json' };
        } catch (e) {
        }
      } else if (htmlContent && htmlContent?.includes('type="application/pdf"')) {
        return { type: 'pdf' };
      } else if (textContent && (textContent.startsWith('<?xml') || htmlContent.includes('webkit-xml-viewer-source-xml'))) {
        type = parseXml();
        return { type };
      }
    }
      
    function parseXml() {
      if (textContent) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textContent, "text/xml");
        if (xmlDoc.documentElement) {
          const rootTagName = xmlDoc.documentElement.tagName.toLowerCase();
          const startsWithFeedOrRss = rootTagName.startsWith('feed') || rootTagName.startsWith('rss');
          const xmlViewerElement = document.getElementById("webkit-xml-viewer-source-xml");
          
          if (startsWithFeedOrRss) {
            return 'feed';
          } else if (xmlViewerElement) {
            const firstChild = xmlViewerElement.firstElementChild;
            if (firstChild && (firstChild.tagName.toLowerCase() === "rss" || firstChild.tagName.toLowerCase() === "feed")) {
              return 'feed';
            }
          }
        }
      }
      return 'xml';
    }
    
    return { type };
  },
  // function references for passing func argument in
  // chrome.scripting.executeScript. The calls are made from background
  // to service-worker(here) and func argument nees a reference to the function
  setGlobals: (globalsArray) => {
    Object.entries(globalsArray).forEach(([name, value]) => {
      window[name] = value;
    });
  },
}
export default CONTENT_METHODS;