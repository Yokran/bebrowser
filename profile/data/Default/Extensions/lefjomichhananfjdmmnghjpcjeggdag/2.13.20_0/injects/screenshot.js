/** @license ESUIT
 * COPYRIGHT (C) 2023 ESUIT. ALL RIGHTS RESERVED.
 *
 * This code is the intellectual property of ESUIT and is protected by
 * copyright law. Any unauthorized use, copying or reproduction of this
 * code without the expressed written permission of ESUIT is strictly
 * prohibited.
 *
 * For more information, please visit https://esuit.dev/.
 */(function(){function E(m,h){function S(){m()?h():requestAnimationFrame(S)}S()}E(()=>!!window.requireLazy,()=>{E(()=>!!window.export_posts_for_facebook_vendors&&!!window["export-posts-for-facebook"]&&!!window.export_posts_for_facebook,()=>{window.requireLazy(["react","__debug"],J)})});function J(){const m=Q();if(m){const h=window.require("react"),S=window.require(m),B=Y();(function(he,P){"use strict";var K=Object.defineProperty,Z=(t,e,o)=>e in t?K(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,x=(t,e,o)=>(Z(t,typeof e!="symbol"?e+"":e,o),o);class A{constructor(e,o){const i=function(c,f,d){return c(f,d)},a=function(c,f,d,b){return c(f,d,b)},s="listeners",r="slug",l=function(c,f,d){return c(f,d)};i(x,this,"id"),a(x,this,s,{}),i(x,this,r),l(x,this,"isDebugger"),this.slug=e,this.isDebugger=!!o,this.id=window[e].id,this.bindEvent()}on(e,o){return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(o),()=>{if(this.listeners[e].includes(o)){const i=this.listeners[e].indexOf(o);this.listeners[e].splice(i,1)}}}send(e,...o){const i={pZJJk:"received message from page send callback",NiSCc:function(a,s){return a(s)},zimkG:"send message from page"};return new Promise(async a=>{const s={sTjLi:i.pZJJk,PRISZ:function(l,p){return i.NiSCc(l,p)}};let r={action:e,payload:o};this.isDebugger&&console.log(i.zimkG,r),chrome.runtime.sendMessage(this.id,r,{},l=>{this.isDebugger&&console.log(s.sTjLi,l),s.PRISZ(a,l)})})}connect(){chrome.runtime.sendMessage(this.id,{action:"__connect"})}disconnect(){chrome.runtime.sendMessage(this.id,{action:"__disconnect"})}bindEvent(){window.addEventListener("message",this._handleReceivingMessage.bind(this))}destroy(){this.disconnect(),this.listeners={},window.removeEventListener("message",this._handleReceivingMessage.bind(this))}_handleReceivingMessage(e){const o=function(s,r){return s===r},i="received message from background",a=function(s,...r){return s(...r)};if(e.data&&o(e.data.from,this.slug)&&e.data.payload){const{action:s,payload:r}=e.data.payload;if(this.isDebugger&&console.log(i,e.data),this.listeners[s])for(let l of this.listeners[s])a(l,...r)}}}const k="export-posts-for-facebook";function H(){return!!~window.location.search.indexOf("debug")||!window[k]||!window[k].isProdMode}let D=null;const y=700;async function L(t,e){const o=function(n,u,w){return n(u,w)},i=".single-post-container",a=".single-post-content",s=function(n,u){return n||u},r="screenshotTaskFailed",l="Post not found this might be your Facebook is not latest version, please contact us",p="closeTab",c=function(n){return n()},f=function(n){return n()},d=function(n,u){return n(u)},b=function(n){return n()},M=function(n,u){return n-u},oe=function(n,u){return n>u},ie="takeScreenshot",I="canvas",N=function(n,u){return n*u},se=function(n,u){return n(u)},re="image/jpeg",ae="downloadPostScreenshot",ce="screenshotTaskDone",de="getLeftScreenshotTasks",ue=function(n,u){return n>u},g=document.querySelector(i),T=g.querySelector(a);if(g.scrollTop=0,s(!g,!T))return e.send(r,t,l),void e.send(p);await c(z),await new Promise(n=>setTimeout(n,2e3));let F=!1;f(U),await f(V),await new Promise(n=>setTimeout(n,1e3)),d(te,g),b(ee);const v=window.innerHeight,le=M(g.scrollHeight,v);let q=0,_=[],O=!1;for(;!O;){oe(q,le)&&(O=!0),g.scrollTop=0,T.style.transform="translateY(-"+q+"px)",await new Promise(n=>setTimeout(n,100));try{const n=await e.send(ie);_.push(n),q+=v,await new Promise(u=>setTimeout(u,500))}catch(n){e.send(r,t,n.toString()),F=!0}}if(T.style.transform="",c(ne),!F){let n=document.createElement(I),u=n.getContext("2d");n.width=Math.ceil(window.innerWidth),n.height=Math.ceil(N(_.length,v));for(let W of _){const me=await se($,W),pe=_.indexOf(W);u.drawImage(me,0,N(pe,v),window.innerWidth,v)}let w=document.createElement(I),fe=w.getContext("2d");w.width=y,w.height=n.height,fe.drawImage(n,0,0,y,n.height,0,0,y,n.height);let R=w.toDataURL(re,.98);await e.send(ae,R,t),await e.send(ce,t),n.remove(),w.remove(),R=null}const C=await e.send(de);if(C&&ue(C.length,0)){const n=C[0];D.go(n.link+"#export-this-post-task-id-"+n.postId,{onNavigate:async()=>{await o(L,n.postId,e)}})}else e.send(p)}function G(){const t="div",e=`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
  `,o=document.createElement(t);o.style.cssText=e,document.body.append(o)}function U(){[...document.querySelectorAll('div[dir="auto"] > div[role="button"]')].map(t=>{t&&t.click()})}async function V(){const t="div",e=`
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 30px;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      border-radius: 12px;
      font-size: 18px;
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `,o=`
      <div style="width: 30px; height: 30px; border: 3px solid #fff; border-radius: 50%; border-top-color: transparent; animation: loadingSpin 1s linear infinite;"></div>
      <span>Loading more comments...</span>
    `,i=function(c,f,d){return c(f,d)},a="loading-animation",s=`
      @keyframes loadingSpin {
        to { transform: rotate(360deg); }
      }
    `,r=function(c,f){return c>f};let l=0,p=!0;for(;p&&window.__loadMoreComments;){const c=document.createElement(t);if(c.style.cssText=e,c.innerHTML=o,i(j,a,s),document.body.appendChild(c),p=await window.__loadMoreComments(),await new Promise(f=>setTimeout(f,1e3)),c.remove(),l++,r(l,10))break}}async function z(){await Promise.race([new Promise(t=>window.zKjQYvgSmF("ufnpDovS").onAfterLoad(t)),new Promise(t=>setTimeout(t,5e3))])}async function $(t){const e=function(o,i){return o(i)};return new Promise(function(o,i){const a=function(r,l){return e(r,l)},s=new Image;s.onload=function(){a(o,s)},s.onerror=function(r){e(i,r)},s.src=t})}function j(t,e){const o="head",i="style",a="text/css";if(!document.getElementById(t)){const s=document.head||document.getElementsByTagName(o)[0],r=document.createElement(i);r.type=a,r.id=t,s.appendChild(r),r.appendChild(document.createTextNode(e))}}function X(t){let e=document.getElementById(t);e&&e.parentNode.removeChild(e)}function ee(){(function(t,e,o){t(e,o)})(j,"screenshot-cover",`
    .single-post-container {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 999999;
      background-color: var(--web-wash);
      overflow: auto;
    }

    .single-post-content {
      width: `+y+`px;
    }

    .single-post-parent{
      transform: none !important;
      perspective-origin: unset !important;
      perspective: unset !important;
      transform-style: unset !important;
      transition: unset !important;
      z-index: 99999999 !important;
    }
  `)}function ne(){(function(t,e){t(e)})(X,"screenshot-cover")}function te(t){const e=function(a,s){return a!==s},o="single-post-parent";let i=t.parentElement;for(;i&&e(i,document.body)&&e(i,document.documentElement);)i.classList.add(o),i=i.parentElement}(async()=>{const t="#export-this-post-task-id",e="lppcfdbg.spg.tutpq.uspqyf}udbfs/uofuopDhpmbjEutpQfmhojTufnpD",o="lppcfdbg.spg.tutpq.uspqyf}udbfs/opjubhjwbOqqBftbCufnpD",i=function(d){return d()},a="task-id-",s=function(d,b,M){return d(b,M)},r="disable-scroll",l=":root{scrollbar-width: none !important} html::-webkit-scrollbar,body::-webkit-scrollbar{width: 0 !important; height: 0 !important}}",p=function(d){return d()};if(!window.location.hash.startsWith(t))return;window.zKjQYvcSmF(e,d=>P.jsx("div",{className:"single-post-container",children:P.jsx("div",{className:"single-post-content",children:d.lastCmp})})),window.zKjQYvcSmF(o,d=>(D=window.zKjQYvgSmF("sfidubqtjEsfuvpSufnpDftv")(),d.lastCmp));const c=new A(k,i(H)),f=window.location.hash.split(a)[1];i(G),s(j,r,l),await p(z),s(L,f,c)})()})(window.export_posts_for_facebook_vendors._["lodash-es"],B)}else console.error(`${m} Not Found`)}function Q(){return Object.keys(window.require("__debug").modulesMap).filter(m=>m.indexOf("ReactDOM")===0).find(m=>{const h=window.require("__debug").modulesMap[m];return!!(h.exports&&h.exports.version&&h.depPosition>3&&m.includes("classic"))})}function Y(){function m(...h){return window.require("react").jsx(...h)}return{Fragment:Symbol.for("react.fragment"),jsx:m,jsxs:m,jsxDEV:m}}})();
