// ==UserScript==
// @name         Extraer bio útil en perfiles de Instagram (OSINT version)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Extrae y analiza la bio en perfiles de Instagram. Muestra y copia solo si detecta números, correos, menciones o enlaces. Ideal para operaciones OSINT/SOCMINT en BE BROWSER.
// @author       BE BROWSER
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const regexes = [
        /\+?\d[\d\s\-().]{5,}/g,
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        /(^|\s)@\w{2,}/g,
        /https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+/g
    ];

    const observer = new MutationObserver(() => {
        const spans = Array.from(document.querySelectorAll('header section span'));
        const bioSpan = spans.find(span =>
            span.innerText &&
            span.innerText.length > 0 &&
            span.offsetHeight > 0 &&
            span.offsetParent !== null
        );

        if (bioSpan) {
            const bioText = bioSpan.innerText.trim();
            const matches = regexes.flatMap(rgx => [...bioText.matchAll(rgx)]);

            if (matches.length > 0) {
                const datos = matches.map(m => m[0].trim()).join('\n');
                alert("📡 Indicadores OSINT detectados en la bio:\n\n" + datos);
                console.log("📡 Indicadores encontrados:", datos);

                navigator.clipboard.writeText(datos).then(() => {
                    console.log("✅ Datos copiados al portapapeles.");
                }).catch(err => {
                    console.error("❌ Error al copiar:", err);
                });

                observer.disconnect();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
