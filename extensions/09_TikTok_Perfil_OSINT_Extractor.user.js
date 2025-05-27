// ==UserScript==
// @name         TikTok Perfil OSINT Extractor (versión limpia)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Extrae indicadores OSINT de un perfil público de TikTok, omitiendo teléfonos y URLs. Guarda los datos en un archivo de texto con el nombre del usuario. BE BROWSER style 😎
// @author       BE BROWSER
// @match        https://www.tiktok.com/@*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', () => {
        setTimeout(() => {
            try {
                const data = [];

                // 1. Obtener nombre de usuario desde la URL
                const username = window.location.pathname.split('/')[1].replace('@', '').split('?')[0];
                data.push("👤 Nombre de usuario: @" + username);

                // 2. Extraer nombre visible
                const nameElement = document.querySelector('[data-e2e="user-title"]');
                if (nameElement) {
                    data.push("📛 Nombre real: " + nameElement.innerText.trim());
                }

                // 3. Extraer bio
                const bioElement = document.querySelector('[data-e2e="user-bio"]');
                if (bioElement) {
                    data.push("📝 Bio: " + bioElement.innerText.trim());
                }

                // 4. Enlace externo
                const linkElement = document.querySelector('a[data-e2e="user-link"]');
                if (linkElement) {
                    data.push("🔗 Enlace externo: " + linkElement.href);
                }

                // 5. Imagen de perfil
                const avatarElement = document.querySelector('[data-e2e="user-avatar"]');
                if (avatarElement) {
                    data.push("🖼️ Imagen de perfil: " + avatarElement.src);
                }

                // 6. Seguidores, siguiendo, likes
                const stats = document.querySelectorAll('[data-e2e^="followers-count"], [data-e2e^="following-count"], [data-e2e^="likes-count"]');
                stats.forEach(stat => {
                    const label = stat.getAttribute('data-e2e');
                    const value = stat.innerText.trim();
                    if (label.includes("followers")) data.push("👥 Seguidores: " + value);
                    if (label.includes("following")) data.push("➡️ Siguiendo: " + value);
                    if (label.includes("likes")) data.push("❤️ Me gusta: " + value);
                });

                // 7. Regex desde HTML para indicadores adicionales (solo correo, región, idioma, verificado, UID)
                const html = document.documentElement.innerHTML;
                const extras = [];

                const emailMatches = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
                if (emailMatches) extras.push("📧 Correos: " + [...new Set(emailMatches)].join(', '));

                const regionMatch = html.match(/"region":"(.*?)"/);
                if (regionMatch) extras.push("📍 Región: " + regionMatch[1]);

                const languageMatch = html.match(/"language":"(.*?)"/);
                if (languageMatch) extras.push("🗣️ Idioma: " + languageMatch[1]);

                const verifiedMatch = html.match(/"verified":(true|false)/);
                if (verifiedMatch) extras.push("✔️ Verificado: " + verifiedMatch[1]);

                const uidMatch = html.match(/"id":"(\d{6,})"/);
                if (uidMatch) extras.push("🆔 ID interno TikTok: " + uidMatch[1]);

                data.push(...extras);

                // 8. Crear archivo y descargar
                const blob = new Blob([data.join('\n')], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${username}_tiktok_profile.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                console.log("✅ Archivo descargado con éxito.");
            } catch (error) {
                console.error("❌ Error al extraer el perfil:", error);
            }
        }, 3000);
    });
})();
