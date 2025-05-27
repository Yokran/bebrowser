// websql origin trial till may 2024
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = CFG.ORIGIN_TRIAL_TOKEN;
document.head.append(otMeta);

window.store = {
  SimpleStore,
  Prefs,
  ActionStore,
  AttrStore,
  ClientStore,
  ErrorStore,
  KVStore,
  PopupMessageStore,
  RuleStore,
  SieveStore,
  SieveDataStore,
  SieveSnapshotStore,
  SieveDataProxy,
  TagStore,
  UserStore,
  WorkStore,
  ClientGroupStore,
  MacroStore,
};
import { matchRule } from './ui/lib/rules.js';
window.matchRule = matchRule;

import { findNetAdditionsAndDeletions } from './ui/lib/diff-utils.js';
window.findNetAdditionsAndDeletions = findNetAdditionsAndDeletions;

window.initLocale = async function initLocale() {
  if (Prefs.get('locale')) {
    return;
  }
  const osLocale = await chrome.i18n.getUILanguage();
  const lang = osLocale.split(/[-_]/)[0];

  if (['de', 'fr', 'ja', 'ru', 'zh', 'es', 'it', 'pl', 'pt', 'sr'].indexOf(lang) >= 0) {
    Prefs.set('locale', lang);
  }
};

window.fetchLocalFileText = async function fetchLocalFileText(url) {
  let res = await fetch(url);
  let text = await res.text();
  return text;
}

window.service = new Service();

service.on('init', async () => {
  try {
    await chrome.runtime.sendMessage({type: 'offscreen_document:ready'});
  } catch (err) {
    // If no Distill pages are open which uses platform/ext/service.js
    // then there are no onMessage listeners, in which case thrown
    // error is logged and ignored
    if (!err.message.startsWith('Could not establish connection')) {
      console.error("Could not send offscreen_document:ready event: ", err);
    }
  }
})
service.on('init:data', async () => {
  service.setActive(Prefs.get('active'));
  try {
    let clientId = Prefs.get('client.id');
    Sentry.setExtra('clientID', clientId);
    await api('/public/clients', 'POST', await ClientStore.findOne(clientId));
  } catch(e) {
    console.error("Could not fetch clients", e);
  }
});

Prefs.on('change:active', (active, name) => {
  service.setActive(active);
  setActionIcon(active);
});

service.state.on('change:unread', (_, count) => {
  chrome.action.setBadgeText({
    text: count == 0 ? '' : count+'',
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  if(port.name.startsWith('offscreen') || port.name.startsWith('frontend_service')) {
    return;
  }
  if (port.sender.tab) {
    handlePort(port);
  } else {
    console.error('Unhandled background port', port);
    port.disconnect();
  }
});

async function handlePort(port) {
  const name = port.name;
  const type = name.substring(0, name.indexOf(':'));

  switch (type) {
    case 'loader':
      if (!port.attrs) {
        port.attrs = JSON.parse(name.substring('loader:'.length));
      }

      if (!(await loaderAttachPort(port))) {
        port.disconnect();
      }
      break;

    case 'selector':
      if (!selectorAttachPort(port)) {
        port.disconnect();
      }
      break;

    default:
      port.disconnect();
  }
};

// Handles messages sent by child frames created by loaders.
addEventListener('message', function(event) {
  // console.log('EXTN:message:', event);
  const
    source = event.source;


  const child = (event.data || {}).distillchildport;

  if (child) {
    // console.log('EXTN:message:send message to child:', child);
    source.postMessage({
      distillparentport: {id: 'BG'},
      forChild: child,
    }, '*');
  }
}, false);

window.addSieveForTab = async function addSieveForTab(identityId, monitorType) {
  const [tab] = await chrome.tabs.query({
    currentWindow: true,
    active: true
  });
  const { id, url } = tab;
  if (!testURL(url)) {
    throw new Error('Page with unsupported URL: ' + url);
  }
  const constructedUrl = `${service.appUrl}#/w/${identityId || 0}/sieve/add/${monitorType}.d?url=${url}`

  await chrome.tabs.create({
    active: true,
    openerTabId: id,
    url: constructedUrl,
  });
};

window.addSieveForTemplate = async function addSieveForTemplate(tab, tplId) {
  await chrome.tabs.create({
    active: true,
    url: `${service.appUrl}#/w/0/sieve/from-tpl/${tplId}.id?url=${encodeURIComponent(tab.url)}`,
  });
};

async function saveSieve(identityId, sieve) {
  let doc;
  if(identityId) {
    doc = await _api({
      url: CFG.URL.API + SieveStore.urls.root,
      method: 'POST',
      json: sieve,
      headers: { 'x-identity': identityId, }
    });
  } else {
    doc = await SieveStore.create(sieve);
  }
  await chrome.tabs.create({
    active: true,
    url: `${service.appUrl}#/w/${identityId||0}/sieve/edit/${doc.id}.id`,
  });
}

/**
 * Miscellaneous APIs
 *
 * Pop up calls this method to open the selector
 *
 * if datasourceId is present Scraper Selector is rendered otherwise
 * HTML Selector is rendered
 *
 * @param {{ identityId: string, datasourceId?: string }}
 */
window.openSelector = async function openSelector({ identityId, datasourceId } = {}) {
  try {
    let [tab] = await chrome.tabs.query({
      currentWindow: true,
      active: true
    });

    let {id, url} = tab;
    // if there exists a VisualSelector for the current tab, destroy it before creating a new one
    // SHAUN_TODO: Make this lean
    const existingSelectorForTab = VisualSelector.ALL.find((vs) => vs.loader.tabId === id);
    if (existingSelectorForTab) {
      // console.log("Close existing visual selector for tab");
      await existingSelectorForTab.onClose();
      existingSelectorForTab.destroy();
      existingSelectorForTab.loader.destroy();
    }

    if (!testURL(url)) {
      alert('Page with unsupported url: ' + url);
      return;
    }

    // Create loader for the tab
    const loader = await createLoader({
      type: 'tab',
      info: {
        tabId: id,
      },
    });
  
    addBreadcrumb({
      message: 'openSelector: ' + url,
    });  // some wait for 'reset' timeout
    await loader.waitForEvent('reset', 5000);

    let model;
    if (datasourceId) {
      model = { datasource_id: datasourceId };
    }
    const selector = new VisualSelector(
      {
        loader,
        identityId,
        model,
        state: {
          selectorOn: true,
        }
      },
      async function(err, sieve) {
        if (err) {
          console.error('Visual Selector error:', err);
          // TODO Log error for user to see?
        } else if (sieve) {
          _.defaults(sieve, {
            schedule: JSON.stringify({
              type: 'INTERVAL',
              params: {interval: 1800},
            }),
            state: 20, // STATE_INIT, used by ui to set default options
          });

          await loader.request(0, {
            path: 'showMsg',
            data: { msg: 'Saving...', hideAfter: 6000 }
          });

          await saveSieve(identityId, sieve);
        }
        selector.destroy();
        loader.destroy();
      });
  } catch (err) {
    console.error('Error in openSelector:', err);
    Sentry.captureException(err);
  }
};

window.isActive = function isActive() {
  return Prefs.get('active');
};

window.toggleService = function toggleService() {
  Prefs.set('active', !Prefs.get('active'));
};

window.watchTab = async function watchTab({identityId} = {}) {
  let [tab] = await chrome.tabs.query({currentWindow: true, active: true});

  let {url} = tab;

  if (!testURL(url)) {
    return alert('Page with unsupported url:' + url);
  }

  const sieve = {
    content_type: 2, // C.TYPE_HTML
    config: JSON.stringify({
      includeStyle: true,
      selections: [{
        frames: [{
          index: 0,
          excludes: [],
          includes: [{
            expr: '/html',
            type: 'xpath',
          }],
        }],
      }],
    }),
    schedule: JSON.stringify({
      type: 'INTERVAL',
      params: {interval: 1800},
    }),
    name: tab.title || 'Untitled',
    uri: url,
    state: 20, // STATE_INIT
  };
  await saveSieve(identityId, sieve);
};

window.setActionIcon = (active) => {
  chrome.action.setIcon({
    path: active ? {
      19: '/ui/img/distill_19.png',
      38: '/ui/img/distill_38.png',
    }: {
      19: '/ui/img/distill_disabled_19.png',
      38: '/ui/img/distill_disabled_38.png',
    },
  });
};

// setActionIcon(Prefs.get('active'));
// Set bg color for other chromium based browsers
chrome.action.setBadgeBackgroundColor({
  color: '#c00',
});

const contextMenuClickHandler = function ({info, tab}) {
  switch (info.menuItemId) {
    case 'monitorFullPage':
      watchTab();
      break;
    case 'monitorPartsOfPage':
      openSelector();
      break;
  }
}

// chrome APIs are proxied to the background service worker
// in Manifest V3. When creating context menus from the service worker,
// a unique ID is mandatory, hence we remove all before creating context menu.
// Recreation is needed in case we make any changes to the menu details
// https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-CreateProperties
chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.onClicked.clearListeners();
  chrome.contextMenus.create({
    id: 'monitorFullPage',
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
    title: 'Monitor Full Page'
  });
  
  chrome.contextMenus.create({
    id: 'monitorPartsOfPage',
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
    title: 'Monitor Parts of Page'
  });
  // When service-worker becomes inactive, only listners added in the
  // top level are triggered on an event. So we add a listener for
  // chrome.contextMenus.onClicked in the top level in distill-service-worker.js
  // and send a message using runtime API, which is received here

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "contextMenus.onClicked") {
      contextMenuClickHandler(msg);
    }
  })
});

window.removeBlanks = async function removeBlanks() {
  let tabs = await chrome.tabs.query({
    pinned: true,
    url: CFG.URL.BLANK,
  });
  await chrome.tabs.remove(_.pluck(tabs, 'id'));
};

// initLocale();
// removePinnedTabs();
try {
  await removeBlanks();
} catch (err) {
  console.error('Error removing blanks:', err);
}

// Manifest V3 change: Sets the initial config of Service in platforms. 
// We used to access it directly from the background page (extension.getBackgroundPage().CFG),
// which is not available in V3. So we get it from offscreen in Service.init()
window.getConfigValues = function () {
  return window.CFG;
}

window.attachAndOpenSelector = async function attachAndOpenSelector(options) {
  let {url, model, tabId} = options;

  if (!testURL(url)) {
    console.error('Page with unsupported url: ' + url);
    return;
  }

  // Create loader for the tab and call openSelectorForTabLoader
  const loader = await createLoader({
    type: 'tab',
    info: {
      tabId,
      pinned: false,
    },
    closeTabOnDestroy : true,
  });
  await loader.waitForEvent('reset', 5000);
  loader.load(url);
  setTimeout(() => {
    chrome.tabs.update(loader.tabId, {active: true})
  }, 500)

  addBreadcrumb({
    message: 'openSelector: ' + url,
  });
  let resultSieve = await new Promise((resolve, reject) => {
    const selector = new VisualSelector({
      loader,
      model,
    }, async function (err, sieve) {
      if (err) {
        console.error('Visual Selector error:', err);
        reject(err);
        // TODO Log error for user to see?
      } else if (sieve) {
        _.defaults(sieve, {
          schedule: JSON.stringify({
            type: 'INTERVAL',
            params: {interval: 1800},
          }),
          state: 20, // STATE_INIT, used by ui to set default options
        });

        await loader.request(0, {
          path: 'showMsg',
          data: {msg: 'Saving...', hideAfter: 6000},
        });
        resolve(sieve);
      } else {
        resolve();
      }
      selector.destroy();
      loader.destroy();
    });
  });
  return resultSieve;
};

window.closeSelector = async function closeSelector(tabId){
  const loader = WebpageLoader.INSTANCES.find((loader) => loader.tabId === tabId );
  loader && await loader.destroy();
}