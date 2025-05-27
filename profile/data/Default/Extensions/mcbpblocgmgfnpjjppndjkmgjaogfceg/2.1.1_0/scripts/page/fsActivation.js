/**
* @license FireShot - Webpage Screenshots and Annotations
* Copyright (C) 2007-2024 Evgeny Vokilsus (contacts@getfireshot.com)
*/

!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e3d841e8-e308-5233-b935-ef8c4c133920")}catch(e){}}();
(()=>{setTimeout(()=>{window.fsActivationEvents||(window.fsActivationEvents=!0,chrome.runtime.sendMessage({message:"checkFSAvailabilityEvt"},function(t){console.log(chrome.runtime.lastError),document.addEventListener("checkFSAvailabilityEvt",function(i){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&i.target.setAttribute(e,t[e])},!1)}),document.addEventListener("activateFireShotEvt",function(t){chrome.runtime.sendMessage({message:"activateFireShot",name:t.target.getAttribute("FSName"),key:t.target.getAttribute("FSKey")},function(){})},!1)),document.dispatchEvent(new CustomEvent("helloFromFireShotForChrome"))},100);})();
//# sourceMappingURL=fsActivation.js.map

//# debugId=e3d841e8-e308-5233-b935-ef8c4c133920
