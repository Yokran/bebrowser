import{p as r}from"./const-DewCs8rR.js";function s(a,e){chrome.runtime.onMessage.addListener((o,m)=>{o.from===a&&window.postMessage({from:o.from,payload:o.payload})})}s(r);
