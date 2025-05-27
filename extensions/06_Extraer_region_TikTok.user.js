// ==UserScript==
// @name         Mostrar ubicación de perfiles TikTok
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Extrae valores de región (locationCreated/region) desde el HTML embebido en TikTok
// @author       BE BROWSER
// @match        https://www.tiktok.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const locationCreatedRegex = /ttSeller":false,"region":"([^"]*)"/g;
    const source = document.documentElement.innerHTML;
    let matches;
    const values = [];

    while ((matches = locationCreatedRegex.exec(source)) !== null) {
        if (!values.includes(matches[1])) {
            values.push(matches[1]);
        }
    }

    if (values.length > 0) {
        console.log("📍 Regiones encontradas:", values);
        alert("📍 Región detectada(s): " + values.join(', '));
    } else {
        console.log("❌ No se detectó ninguna región en el HTML.");
    }
})();
