/*! InstantDataScraperNext - 2025-01-29 */

chrome.action.onClicked.addListener(function(e){chrome.windows.getCurrent(function(e){parentWindowId=e.id}),chrome.windows.create({url:chrome.runtime.getURL("popup.html?tabid="+encodeURIComponent(e.id)+"&url="+encodeURIComponent(e.url)),type:"popup",width:720,height:650})});