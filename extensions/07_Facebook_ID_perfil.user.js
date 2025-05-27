// ==UserScript==
// @name         Mostrar Facebook ID bajo nombre de perfil
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Extrae y muestra el ID del usuario bajo su nombre en el perfil, excepto en tu propio perfil. También copia el ID al portapapeles automáticamente.
// @author       BE BROWSER
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', () => {
        setTimeout(() => {
            const editButton = document.querySelector('div[role="button"][tabindex="0"] span')?.innerText;
            if (editButton && editButton.toLowerCase().includes("editar perfil")) {
                console.log("🛑 Este es tu propio perfil. El script no se ejecuta.");
                return;
            }

            const params = new URLSearchParams(window.location.search);
            let userId = params.get("id");

            if (!userId) {
                const html = document.documentElement.innerHTML;
                const idMatch = html.match(/"userID":"(\d+)"/);
                if (idMatch && idMatch[1]) {
                    userId = idMatch[1];
                }
            }

            if (userId) {
                navigator.clipboard.writeText(userId).then(() => {
                    console.log("✅ ID copiado al portapapeles");
                });

                const nameElement = document.querySelector('h1 span');
                if (nameElement) {
                    const idLabel = document.createElement('div');
                    idLabel.textContent = `🆔 ID de usuario: ${userId}`;
                    idLabel.style.fontSize = '15px';
                    idLabel.style.fontWeight = 'normal';
                    idLabel.style.color = '#65676b';
                    idLabel.style.marginTop = '6px';
                    idLabel.style.userSelect = 'text';

                    nameElement.parentElement.appendChild(idLabel);
                    console.log("🆔 Facebook ID insertado debajo del nombre:", userId);
                }

            } else {
                console.log("❌ No se encontró el ID del usuario en esta página.");
            }

        }, 3000);
    });
})();
