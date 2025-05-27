# 🕵️‍♂️ Be Browser 1.0 – Marco Operativo para OSINT y Virtual HUMINT

**Be Browser**  es un marco táctico basado en navegador, diseñado para operadores de ciberinteligencia, analistas OSINT y profesionales de virtual HUMINT. Permite desplegar entornos portables con múltiples perfiles, herramientas de scraping, automatización basada en IA y sin necesidad de máquinas virtuales ni conocimientos de programación.

---

## 📦 ¿Qué incluye este entorno?

✅ **Navegador Opera Portable Modificado**  
✅ **Extensiones preinstaladas** clasificadas como:  
- (P) Pasivas: se ejecutan automáticamente  
- (A) Activas: requieren acción manual  
- (D) Dinámicas: se activan en contextos específicos  

✅ **Extensiones por categoría**:

### 🕸 Web Scraping
- Instant Data Scraper (A)
- FireShot – Captura de pantalla con scroll (A)
- Distill Web Monitor – Monitorización de cambios (A)
- SingleFile y Save as MHTML – Guardado completo de webs (A)

### 🧰 Utilidades
- Scroll To Top Button, Simple Autoscroll, PrintFriendly (A)
- Copyfish (OCR) – Extracción de texto de imágenes (A)
- DeepL Translator (A/D), JSON Formatter (D)
- Custom UserAgent String (A/P) – Simulación de navegadores

### 📘 Facebook Toolkit
- ID Finder FB (P), Video Downloader (D), Social Master (A)
- Post / Comments / Reactions Exporter (D)
- Group Members Extraction (D)

### 📸 Instagram Toolkit
- InsFo, Growman IG Email Extractor (A)
- Comments / Photos Exporter, Turbo Downloader (D)
- Exact Time Viewer (P)

### 🐦 Twitter
- TwScraper (A)

### 💬 WhatsApp
- WA Web Plus, Zapp: Audio Control (A)
- WA Toolkit – Oculta el chat (D)

✅ **Marcadores OSINT organizados por categorías**  
✅ **Scripts Tampermonkey listos para usar**  
✅ **UserAgent preconfigurado** (Instagram App en iOS 10)  
✅ **Configuración endurecida de privacidad**  
✅ **VPN integrada** (desactivable si se usa otro cliente)

---

## 📁 Contenido del paquete

```
📂 BeBrowser/
├── 🗎 Readme (este documento)
├── 🗎 PortableSetup.exe (navegador Opera Portable)
├── 📂 profile/ (configuración personalizada)
├── 📂 extensions/ (extensiones Tampermonkey, se irán añadiendo más periodicamente)
├── 📂 style/ (recursos de personalización)
```

---

## 🛠️ Instalación

1. Ejecuta el instalador `.exe` en la ruta deseada y acepta las opciones por defecto.
2. Sustituye la carpeta `profile` generada por la proporcionada en el paquete.
3. Ejecuta `opera.exe` desde el directorio de instalación.

> ⚠️ No se requieren privilegios de administrador.  
> 📦 Puedes mover la carpeta a cualquier otro disco, USB o ruta (es totalmente **portable**).

---

## ⚙️ Configuración inicial (opcional)

- Añade tus propias cuentas sock puppets o perfiles encubiertos.
- Activa los scripts Tampermonkey al iniciar por primera vez.
- Revisa las extensiones visibles en la barra superior. Las ocultas funcionan de forma pasiva o dinámica.

---

## 🎨 Personalización visual

La carpeta `style/` contiene recursos opcionales para personalizar el aspecto visual del entorno Be Browser:

- ✅ **Resource Hacker Portable** – Herramienta para modificar iconos y recursos de ejecutables Windows.
- ✅ **Fondos de pantalla** con estética táctica y temática OSINT/HUMINT.
- ✅ **Iconos personalizados** para el navegador y los accesos directos.

> Estos elementos permiten adaptar el entorno a tus preferencias o mimetizarlo en entornos específicos.

---

## 🧠 Uso recomendado

- Operaciones OSINT/SOCMINT  
- Seguimiento y monitorización de perfiles o publicaciones  
- Archivo de evidencias digitales  
- Automatización ligera de tareas repetitivas  

---

## 🔐 Nota de seguridad

Be Browser **no garantiza anonimato total**. Para investigaciones sensibles:

- Usa VPN, proxies o redes cifradas.
- Opera en entornos separados del equipo corporativo.
- No combines este entorno con tus perfiles reales o personales.

---

## 📄 Licencia

Este proyecto está licenciado bajo **Creative Commons Reconocimiento-NoComercial 4.0 Internacional (CC BY NC 4.0)**.  
Puedes compartir, adaptar y reutilizar el material, incluso en entornos formativos, **siempre que no sea con fines comerciales y se reconozca la autoría original**.

> Más información: [https://creativecommons.org/licenses/by-nc/4.0/deed.es](https://creativecommons.org/licenses/by-nc/4.0/deed.es)

---

## 🤝 Autoría

Desarrollado como parte del entorno de formación e investigación táctica.  
Autor original: Cypher Intelligence
