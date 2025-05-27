# 🕵️‍♂️ Be Browser 1.0 – Operational Framework for OSINT & Virtual HUMINT

**Be Browser** is a tactical browser-based framework designed for cyber intelligence operators, OSINT analysts, and virtual HUMINT professionals. It enables the deployment of portable environments with multiple profiles, scraping tools, AI-powered automation, and no need for virtual machines or programming knowledge.

---

## 📦 What's included in this environment?

✅ **Modified Opera Portable Browser**  
✅ **Pre-installed extensions**, categorized as:  
- (P) Passive: execute automatically  
- (A) Active: require manual action  
- (D) Dynamic: activate in specific contexts  

✅ **Extensions by category**:

### 🕸 Web Scraping
- Instant Data Scraper (A)
- FireShot – Full-page screenshot with scroll (A)
- Distill Web Monitor – Change monitoring (A)
- SingleFile and Save as MHTML – Full-page saving (A)

### 🧰 Utilities
- Scroll To Top Button, Simple Autoscroll, PrintFriendly (A)
- Copyfish (OCR) – Text extraction from images (A)
- DeepL Translator (A/D), JSON Formatter (D)
- Custom UserAgent String (A/P) – Browser simulation

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
- WA Toolkit – Chat blurring and concealment (D)

✅ **OSINT bookmarks organized by category**  
✅ **Tampermonkey scripts ready to use**  
✅ **Preconfigured UserAgent** (Instagram App on iOS 10)  
✅ **Hardened privacy settings**  
✅ **Integrated VPN** (can be disabled if using another client)

---

## 📁 Package contents

```
📂 BeBrowser/
├── 🗎 Readme (this document)
├── 🗎 PortableSetup.exe (Opera Portable browser)
├── 📂 profile/ (custom configuration)
├── 📂 extensions/ (Tampermonkey extensions, periodically updated)
├── 📂 style/ (customization resources)
```

---

## 🛠️ Installation

1. Run the `.exe` installer in your desired path and accept the default options.
2. Replace the generated `profile` folder with the one provided in the package.
3. Launch `opera.exe` from the installation directory.

> ⚠️ No administrator privileges are required.  
> 📦 You can move the folder to any disk, USB, or path (fully **portable**).

---

## ⚙️ Initial configuration (optional)

- Add your own sock puppet or covert profiles.
- Enable Tampermonkey scripts on first launch.
- Review the visible extensions in the top bar. Hidden ones operate passively or dynamically.

---

## 🎨 Visual customization

The `style/` folder contains optional resources to customize the visual appearance of the Be Browser environment:

- ✅ **Resource Hacker Portable** – Tool to edit icons and resources in Windows executables.
- ✅ **Themed wallpapers** with a tactical and OSINT/HUMINT style.
- ✅ **Custom icons** for the browser and desktop shortcuts.

> These assets allow you to adapt the environment to your preferences or blend into specific operational contexts.

---

## 🧠 Recommended use

- OSINT/SOCMINT operations  
- Monitoring profiles and posts  
- Archiving digital evidence  
- Light automation of repetitive tasks  

---

## 🔐 Security note

Be Browser **does not guarantee full anonymity**. For sensitive investigations:

- Use VPNs, proxies, or encrypted networks.
- Operate from systems isolated from corporate environments.
- Do not combine this environment with your personal or real profiles.

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.  
You may share, adapt, and reuse the material, including for educational purposes, **as long as it is non-commercial and proper credit is given to the original author**.

> More info: [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

---

## 🤝 Author

Developed as part of the tactical training and research environment.  
Original author: Cypher Intelligence by Yokran
