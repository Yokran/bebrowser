/** @license ESUIT
     * COPYRIGHT (C) 2023 ESUIT. ALL RIGHTS RESERVED.
     *
     * This code is the intellectual property of ESUIT and is protected by
     * copyright law. Any unauthorized use, copying or reproduction of this
     * code without the expressed written permission of ESUIT is strictly
     * prohibited.
     *
     * For more information, please visit https://esuit.dev/.
     */(function(){"use strict";(function(){function u(n){return n.split("").reverse().map(r=>String.fromCharCode(r.charCodeAt(0)-1)).join("")}function E(n){const[r,s="default"]=u(n).split("|");return[r,s]}function k(n){const r=function(g){return g.slice(g.indexOf("{")+1,g.lastIndexOf("}"))||""}(n),s=function(g){let o=g.replace(F,""),v=o.slice(o.indexOf("(")+1,o.indexOf(")")).match($);return v===null&&(v=[]),v}(n),p="id_"+function(){let g=new Date().getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(o){var v=(g+16*Math.random())%16|0;return g=Math.floor(g/16),(o=="x"?v:3&v|8).toString(16)})}();let S=`window['__fnCache']["${p}"]= function(${s}){${r}}`,i=document.createElement("script");try{i.appendChild(document.createTextNode(S))}catch{i.text=S}let x=document.getElementsByTagName("head")[0]||document.documentElement;return x.appendChild(i),x.removeChild(i),window.__fnCache[`${p}`]}window.__fnCache=window.__fnCache||{};let F=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,$=/([^\s,]+)/g;function z(n,r,s=!1){const p=r.split(/\.|\[(\d+)\]/).filter(Boolean);let S,i=n;for(let x=0;x<p.length;x++)if(S=i,i=i[p[x]],i===void 0)return s?S:void 0;return s?S:i}(n=>{if(window.GZUAwCFuFf)return;window.GZUAwCFuFf=!0;const r={},s={},p={},S={},i={};let x=window.__d;window.__d&&(~x.toString().indexOf("__d_stub")?delete window.__d:x=new Proxy(window.__d,{apply:(e,t,c)=>(c=o(c),e.apply(t,c))})),Object.defineProperty(window,"__d",{get:function(){return x},set:function(e){x=new Proxy(e,{apply:(t,c,a)=>(a=o(a),t.apply(c,a))})}});const g=[];function o(e){let[t,c,a]=e;return typeof t!="string"||g.includes(t)||(g.push(t),e[2]=function(m,w){if(!p[w])return m;const _=p[w];_.sort((d,A)=>d.options.order-A.options.order);const y=_.find(d=>d.options.skipOthers);return k(y?y.replacement(m.toString()):_.reduce((d,A)=>d=A.replacement(d),m.toString()))}(e[2],t),e[2]=function(m,w){return s[w]?new Proxy(m,{apply(_,y,d){if(d[5]&&d[5].dependencies)for(let l=0;l<d[5].dependencies.length;l++)d.push(d[5].dependencies[l].exports);const A=_.apply(y,d);return s[w].map(l=>{l(d)}),A}}):m}(e[2],t),e[2]=function(m,w){if(!r[w]||r[w].length===0)return m;const _=r[w];_.sort((d,A)=>d.options.order-A.options.order);const y=_.reduce((d,A)=>{const l=A.options.definerPath;return d[l]=d[l]||[],d[l].push(A),d},{});return new Proxy(m,{apply(d,A,l){const H=d.apply(A,l);if(l[5]&&l[5].dependencies)for(let h=0;h<l[5].dependencies.length;h++)l.push(l[5].dependencies[h].exports);const q=l[3],Y=(0,l[2])("CometErrorBoundary.react"),J=h=>(console.error(h),"Error");for(let h in y){const V=z(l,h,!0),W=h.split(".").pop(),G=z(l,h);V[W]=function(...P){const O=G.apply(G,P),B=P[0],{useState:X,useEffect:Z,jsx:N,Fragment:Q}=q("react"),[oe,ee]=X(0),te=()=>{if(!y[h])return K(O);const b=y[h].find(I=>I.options.skipOthers);if(b&&b.component)return N(b.fallback?Y:Q,{fallback:b.fallback,children:N(b.component,{payload:B,SourceCmp:O,lastCmp:K(O),definedArgs:l,callingArgs:P,extraPayloadFromDefiner:b.options.extraPayload,proxyCount:0,removeThisModuleProxy(){const I=y[h].indexOf(b);~I&&y[h].splice(I,1)}})});let D=0;return y[h].reduce((I,T)=>(T.component&&(I=N(T.fallback?Y:Q,{fallback:T.fallback,children:N(T.component,{payload:B,SourceCmp:O,lastCmp:I,extraPayloadFromDefiner:T.options.extraPayload,proxyCount:D,definedArgs:l,callingArgs:P,removeThisModuleProxy(){const L=y[h].indexOf(T);if(~L){const ne=_.indexOf(T);y[h].splice(L,1),_.splice(ne,1),R(w)}}})}),D++),I),K(O))};function K(b){return b&&b.$1&&typeof b.$1=="function"?N(b,b.props):b}return Z(()=>{const b=v(w,()=>{ee(Math.random())});return()=>b()},[]),N(Y,{fallback:J,children:te()})}}return H}})}(e[2],t),S[t]&&console.log(t,e)),e}function v(e,t){return i[e]=i[e]||[],i[e].push(t),()=>{const c=i[e].findIndex(t);i[e].splice(c,1)}}function R(e){if(i[e])for(let t of i[e])t()}n.zKjQYvgSmF=function(e){return window.require(u(e))},n.zKjQYvcSmF=(e,t,c)=>{const[a,m]=E(e);r[a]||console.error(`Undefined module ${a} from ${m} #1`);const w=r[a].find(y=>y.extensionId===m);if(!w)return console.error(`Undefined module ${a} from ${m} #2`);const{fallback:_}=c||{};w.component=t,w.fallback=_,R(a)},n.zKjQYVcSmF=(e,t)=>{const c=Object.assign({order:10,skipOthers:!1,beforeInject:()=>!0,afterInject:()=>{},extraPayload:void 0,definerPath:"[6].default"},t),[a,m]=E(e);r[a]=r[a]||[],r[a].push({extensionId:m,moduleName:a,options:c,component:void 0,fallback:void 0})},n.zKjQYwcSmF=e=>{S[u(e)]=!0},n.zKjQYvcSfF=(e,t,c)=>{const a=Object.assign({order:10,skipOthers:!1},c),[m,w]=E(e);p[m]=p[m]||[],p[m].push({moduleName:m,options:a,replacement:t})},n.zKGQYvcSmF=(e,t)=>{e=u(e),s[e]=s[e]||[],s[e].push(t)},n.zKjQYvcSfF("umvbgfe}spssf.cg",e=>e.replace('debugjs.")','debugjs.");console.error(b.stackFrames.slice(0,10).map(e=>e.text).join("\\n"))')),n.zKjQYvcSfF("umvbgfe}djttbmd/epsq.NPEudbfS",e=>e.replace(/Error\(\w\(418\)\)/g,"void 0")),n.zKjQYvcSfF("umvbgfe}fvfvRitjmcvQzbmfS0fsput0fnjuovs.zbmfs",e=>e.replace(/,(\w)=new\(b\("relay-runtime\/mutations\/RelayRecordSourceProxy"/,',$1=window["RlbiULLGWt"]=new(b("relay-runtime/mutations/RelayRecordSourceProxy"')),n.zKjQYvcSfF("umvbgfe}fvfvRitjmcvQzbmfS0fsput0fnjuovs.zbmfs",e=>e=e.replace(/;(\w)\.commitPayload=function\(([\w,]+)\){/,";$1.commitPayload=function($2){try{if(arguments[0]){if(arguments[0]?.request?.variables?.__relay_internal__pv__CometUFIReactionEnableShortNamerelayprovider === true) return;};}catch(e){console.log('relayStoreCommitPayload',e)};"))})(window),(n=>{n.vTUNhjwVvX||(n.vTUNhjwVvX=!0,n.zKjqYvcSmF=(r,s,p)=>{const S=n.RlbiULLGWt,i=typeof r=="string"?S.get(r):r;if(i===void 0)return i;let x=(g=s.replace(/\[(\d+)\]/g,".$1"),g.replace(/\((.*?)\.(.*?)\)/g,"($1_*_*_*_*_$2)")).split(".");var g;x=x.map(e=>function(t){return t.replaceAll("_*_*_*_*_",".")}(e));let o=i;for(let e=0;e<x.length;e++){const t=x[e];if(t==="*")return o;if(t.indexOf("^^")===0){const[c,a]=v(t.substring(2));if(o=o.getLinkedRecords(c,a),o===void 0)return R(t),o}else if(t.indexOf("^")===0){const[c,a]=v(t.substring(1));if(o=o.getLinkedRecord(c,a),o==null)return R(t),o}else if(t.match(/^\d+$/)){if(o=o[parseInt(t)],o==null)return R(t),o}else{const[c,a]=v(t);if(o=o.getValue(c,a),o==null)return R(t),o}}return o;function v(e){const[t,c]=e.split("{");if(!c)return[t,{}];if(!p)throw new Error("args undefined");return[t,p[c.substring(0,c.length-1)]||{}]}function R(e){~n.location.search.indexOf("debug")&&console.warn("undefined value",{id:r,path:s,args:p,currentPath:e})}})})(window),(n=>{if(window.xmxlgxMDjA)return;window.xmxlgxMDjA=!0;let r={};n.zKGQYvcSmF("sf{jmbjsfTbubEfmqnjTsiy",s=>{const p=s[4].exports.default;s[4].exports.default=function(...S){const i=S[0].fb_api_req_friendly_name;return i&&r[i]&&(S[0]=r[i].reduce((x,g)=>x=g(x),S[0])),p.apply(p,S)}}),n.zkjQYvcSmF=(s,p)=>{s=u(s),r[s]=r[s]||[],r[s].push(p)}})(window)})();var j=(u=>(u.INJECT_PAGE_QUERY_KEY="social-helper",u.DASHBOARD_URL="https://social-master.esuit.dev",u))(j||{}),f=(u=>(u.FACEBOOK="FACEBOOK",u.INSTAGRAM="INSTAGRAM",u.MESSENGER="MESSENGER",u.BUSINESS_SUIT="BUSINESS_SUIT",u.THREADS="THREADS",u))(f||{});const C={[f.FACEBOOK]:["https://www.facebook.com","https://web.facebook.com"],[f.INSTAGRAM]:["https://www.instagram.com"],[f.MESSENGER]:["https://www.messenger.com"],[f.BUSINESS_SUIT]:["https://business.facebook.com"],[f.THREADS]:["https://www.threads.net"]};f.FACEBOOK+"",`${C[f.FACEBOOK][0]}${j.INJECT_PAGE_QUERY_KEY}`,f.INSTAGRAM+"",`${C[f.INSTAGRAM][0]}${j.INJECT_PAGE_QUERY_KEY}`,f.MESSENGER+"",`${C[f.MESSENGER][0]}${j.INJECT_PAGE_QUERY_KEY}`,f.BUSINESS_SUIT+"",`${C[f.BUSINESS_SUIT][0]}${j.INJECT_PAGE_QUERY_KEY}`,f.THREADS+"",`${C[f.THREADS][0]}${j.INJECT_PAGE_QUERY_KEY}`,[...U(C[f.FACEBOOK])],[...U(C[f.INSTAGRAM]),...U(C[f.MESSENGER]),...U(C[f.BUSINESS_SUIT]),...U(C[f.THREADS])];const M="ESUIT | Social Master for Facebook™";function U(u){return u.map(E=>`${E}/*`)}~window.location.hash.indexOf(`${j.INJECT_PAGE_QUERY_KEY}`)&&(()=>{Promise.race([new Promise(E=>{window.addEventListener("DOMContentLoaded",E)}),new Promise(E=>setTimeout(E,1e3))]).then(u);function u(){if(window.ISjaSAUEnCSsLD)return;const E=document.createElement("div");E.innerHTML=`
        <div id="loadingBox" style="
          position: fixed;
          z-index: 9999;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <div style="
            padding: 24px 32px;
            border-radius: 12px;
            background-color: #ffffff;
            color: #1c1c1c;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            display: flex;
            align-items: center;
            gap: 12px;
          ">
            <div style="
              width: 24px;
              height: 24px;
              border: 3px solid #f3f3f3;
              border-top: 3px solid #1877f2;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            "></div>
            <div style="font-size: 15px; font-weight: 500;">
              ${M} is loading...
            </div>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;try{document.body.appendChild(E),window.ISjaSAUEnCSsLD=!0}catch{window.ISjaSAUEnCSsLD=!1}}setTimeout(()=>{var E,k;try{if(window.zKjQYvgSmF("sftVuofssvD").getID()==="0"){const F=document.createElement("div");F.innerHTML=`
                <div style="
                  position: fixed;
                  z-index: 10000;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  font-family: system-ui;
                  background-color: rgba(0, 0, 0, 0.5);
                  backdrop-filter: blur(4px); 
                ">
                  <div style="
                    padding: 40px;
                    border-radius: 8px;
                    background-color: #fff;
                    color: #000;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
                    text-align: center;
                  ">
                    <div style="font-size: 22px; margin-bottom: 20px;">
                      ${M}
                    </div>
                    <div style="font-size: 18px; margin-bottom: 20px;">
                      ⚠️ Facebook Login Required
                    </div>
                    <div style="margin-bottom: 20px;">
                      Please log in to Facebook first to use this extension.
                    </div>
                    <button id="closePageBtn" style="
                      padding: 8px 16px;
                      background: #1877f2;
                      color: white;
                      border: none;
                      border-radius: 6px;
                      cursor: pointer;
                    ">
                      Close Page
                    </button>
                  </div>
                </div>
              `,document.body.appendChild(F),(E=document.getElementById("closePageBtn"))==null||E.addEventListener("click",()=>{window.close()});const $=document.getElementById("loadingBox");(k=$==null?void 0:$.parentElement)==null||k.remove()}}catch(F){console.error("Failed to check login status:",F)}},2e3)})()})();
