/**
* @license FireShot - Webpage Screenshots and Annotations
* Copyright (C) 2007-2024 Evgeny Vokilsus (contacts@getfireshot.com)
*/

!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e5cbf7eb-9524-5c5e-86d7-0addf84186f2")}catch(e){}}();
(()=>{window.fsAPIEvents||(window.fsAPIEvents=!0,chrome.runtime.sendMessage({message:"checkFSAvailabilityEvt"},e=>{document.addEventListener("checkFSAvailabilityEvt",a=>{for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.target.setAttribute(t,e[t])},!1)}),document.addEventListener("capturePageEvt",e=>{window.fsPendingCB=e.target.getAttribute("CBID"),chrome.runtime.sendMessage({message:"capturePageEvt",Entire:e.target.getAttribute("Entire"),Action:e.target.getAttribute("Action"),Data:e.target.getAttribute("Data"),CapturedElement:e.target.getAttribute("capturedFrameId")||void 0})},!1),document.addEventListener("switchToNativeEvt",()=>{chrome.runtime.sendMessage({message:"switchToNativeEvt"}).catch(()=>{})},!1));})();
//# sourceMappingURL=fsAPIEvents.js.map

//# debugId=e5cbf7eb-9524-5c5e-86d7-0addf84186f2
