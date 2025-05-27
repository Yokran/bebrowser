/**
* @license FireShot - Webpage Screenshots and Annotations
* Copyright (C) 2007-2024 Evgeny Vokilsus (contacts@getfireshot.com)
*/

!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0e73c8e6-8f9b-56a2-be8d-78c9de2db8b4")}catch(e){}}();
(()=>{(function(){var n;let o="__FireShotAutomationBanner",s="__FireShotAutomation_DivProgress",r="__FireShotAutomation_DivDelay",d="__FireShotAutomation_SecondsLeft",l="__FireShotAutomation_Progress",c="__FireShotAutomation_Total",u="__FireShotAutomation_AbortBtn",m="__FireShotAutomation_NextBtn";function _(){let e;for(;e=document.getElementById(o);)document.body.removeChild(e);let t=`<div id='${o}'>
        <div id='${s}'><b><span rel='automation_banner_locale_string_1'>FireShot batch mode</span>:</b> <span rel='automation_banner_locale_string_2'>capturing Page</span> <span id='${l}'></span> <span rel='automation_banner_locale_string_6'>of</span> <span id='${c}'></span>...</div>
        <div id='${r}'><b><span rel='automation_banner_locale_string_1'>FireShot batch mode</span>:</b> <span rel='automation_banner_locale_string_3'>waiting the page to get rendered...</span> [<span id='${d}'></span>]</div>
        
        <div id="buttons">
            <button id='${m}' role='button'><span rel='automation_banner_locale_string_4'>Next page</span></button>
            <button id='${u}' role='button'><span rel='automation_banner_locale_string_5'>Abort task</span></button>
        </div>
        </div>`;document.body.insertAdjacentHTML("afterbegin",t);let i=document.getElementById(o);i.__fireshotIgnoredElement=1}function g(){let e=i=>{let a;return(...I)=>{a&&cancelAnimationFrame(a),a=requestAnimationFrame(()=>{i(...I)})}};var t=document.getElementById(o);document.addEventListener("scroll",e(()=>{window.scrollY>0?t.style.display="flex":t.style.display="none"}),{passive:!0}),document.getElementById(u).addEventListener("click",()=>{n&&n.postMessage({topic:"abort"})}),document.getElementById(m).addEventListener("click",()=>{n&&n.postMessage({topic:"next"})})}function p(e,t){document.getElementById(l).textContent=e,document.getElementById(c).textContent=t,document.getElementById(r).style.display="none",document.getElementById(s).style.display="initial"}function b(e){document.getElementById(s).style.display="none",document.getElementById(r).style.display="initial",document.getElementById(d).textContent=e}function y(e){document.getElementById(o).style.display=e?"flex":"none"}function f(e){for(let t in e){let i=`span[rel='${t}']`;document.querySelectorAll(i).forEach(a=>{a.textContent=e[t]})}}function v(){console.log(chrome.runtime),chrome.runtime.onConnect.addListener(e=>{e.name==="fsAutomationPort"&&(n=e,e.onMessage.addListener(t=>{switch(t.topic){case"set-progress":p(t.progress,t.total);break;case"delay-info":b(t.secsLeft);break;case"set-visible":y(t.visible);break;case"set-locale-strings":f(t.localeStrings);break}}))})}document.body&&(_(),g(),v())})();})();
//# sourceMappingURL=fsAutomationBanner.js.map

//# debugId=0e73c8e6-8f9b-56a2-be8d-78c9de2db8b4
