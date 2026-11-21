# Mark Luis O. Fulinara — Aspiring Full-Stack Developer Portfolio

A modern, responsive, single-page software engineering portfolio website designed with a terminal / code-editor aesthetic, clean modern UI, and a high-performance **interactive canvas binary/code rain background**.

Built for **Mark Luis O. Fulinara**, an **Aspiring Full-Stack Developer** and BS Information Technology student from Tanauan, Batangas, Philippines, specializing in Full-Stack Development and Software Engineering.

---

## ⚡ Live Features

- **Binary / Code Rain Background**: Fullscreen fixed `<canvas>` animating falling columns of binary digits (`0`, `1`) and real programming tokens (`const`, `=>`, `{ }`, `</>`, `async`, `SELECT`, `npm run dev`, `git push`). Features mouse glow repulsion on desktop, variable column speeds, and reduced density on mobile.
- **Dark & Light Mode**: Seamless theme switching with persistent `localStorage` and automatic fallback to OS color scheme (`prefers-color-scheme`). Redraws the canvas dynamically with matching color palettes (Neon Cyan/Green on Dark Navy `#050B14`, Slate Gray/Deep Blue `#2563EB` on Light `#F7F8FA`).
- **Code Window Cards**: Styled like VS Code / code editor windows complete with macOS window controls (red, yellow, green dots), tab filenames (`about.json`, `skills.ts`, `projects.js`, `education.log`, `contact.sh`), and frosted glass backdrop blur (`backdrop-filter`).
- **Motion & Micro-interactions**:
  - Booting terminal intro sequence (`> BIOS kernel ... [OK]`) with ESC skip.
  - Interactive typewriter role rotation in Hero.
  - GSAP & ScrollTrigger scroll reveals with automatic IntersectionObserver fallback.
  - 3D perspective mouse tilt on project cards and magnetic button snap.
  - Desktop custom cursor with trailing ring.
  - Animated numeric statistics counter.
  - Infinite sliding tech stack marquee ticker.
- **Interactive Hero Portrait Brush Trail & 3-Second Fading Marks**:
  - **Brush Trail (3-Second Fade)**: Moving your cursor or dragging a finger paints a focused pixel trail (compact 42px radius) that reveals `images/w.jpg`. Each mark smoothly fades out and dissolves after exactly **3 seconds**.
  - **Neon Guide Ring**: A glowing neon green ring smoothly follows the pointer with lerp physics.
  - **Click (Full 5s Pixel Reveal)**: Clicking or tapping expands outward from the click point to cover the entire frame over 500ms, with a quick 150ms pixelation impact flash, a 5-second countdown bar, and a live second ticker (`// pixel mode, reverting in 5s`).
  - **Re-click Restart**: Clicking again during the 5s resets the countdown timer back to 5.0s without stacking.
  - **Accessible & Touch Friendly**: Touch dragging paints the 3-second pixel trail, tapping triggers full pixel mode, and keyboard users can activate it via `Enter` or `Space` (`tabindex="0"`). Respects `prefers-reduced-motion` with clean fades.
- **Accessible & Responsive**: Semantic HTML5, WCAG AA contrast, keyboard focus indicators, `skip-link`, and full respect for `prefers-reduced-motion: reduce`.
- **Image Placeholder System**: Dashed-border containers with centered filename and dimensions. Real `<img>` tags load seamlessly when present, while missing images remain cleanly labeled with no broken UI.

---

## 📁 File Structure

```text
PORTFOLIO/
├── index.html                    # Main HTML markup, SEO tags, structured 7 sections
├── style.css                     # Full styling, CSS variables, glassmorphism, responsive breakpoints
├── script.js                     # Canvas code rain, theme toggle, project pagination, animations
├── api/
│   ├── chat.js                   # Chatbot proxy (holds the Groq key server-side)
│   └── _answers.js               # Every chatbot answer (text + voice script)
├── README.md                     # Project documentation & deployment guide
└── images/
    ├── logo.svg                  # Brand monogram (<ML />)
    ├── fulinara.png              # Default hero portrait (800 × 1000 px)
    ├── w.jpg                     # Black & white hero portrait (1024 × 1024 px)
    ├── about.jpg                 # Workspace / about photo (1000 × 800 px)
    ├── project-onebatangas.jpg   # One Batangas cover (1280 × 720 px)
    ├── project-fedelicious.jpg   # Fedelicious Wings cover (1280 × 720 px)
    ├── project-rfid.jpg          # Smart RFID project cover (1280 × 720 px)
    ├── project-mcbank.jpg        # MC Bank UI cover (1280 × 720 px)
    ├── project-regression.jpg    # Regression tool cover (1280 × 720 px)
    └── og-cover.jpg              # Social share banner (1200 × 630 px)
```

---

## 🛠️ How to Customize

### 1. Adding Your Photos & Screenshots
Drop your image files directly into the `images/` directory with the matching filenames:
- `images/fulinara.png` — 800 × 1000 px (Default Hero Portrait photo)
- `images/w.jpg` — 1024 × 1024 px (black & white version revealed by the brush and click effect)
- `images/about.jpg` — 1000 × 800 px (About section)
- `images/project-onebatangas.jpg` — 1280 × 720 px (One Batangas capstone)
- `images/project-fedelicious.jpg` — 1280 × 720 px (Fedelicious Wings)
- `images/project-rfid.jpg` — 1280 × 720 px (ESP32 RFID project)
- `images/project-mcbank.jpg` — 1280 × 720 px (MC Bank Mobile UI)
- `images/project-regression.jpg` — 1280 × 720 px (Linear Regression Tool)
- `images/og-cover.jpg` — 1200 × 630 px (Link preview for Facebook, LinkedIn, Twitter)

> **Note:** The site's placeholder system is built so that if any image is missing, a clean dashed placeholder box displays the exact file name and size required. Once you copy the image into the folder, it will instantly display with smooth fade-in and cover styling.

### 2. Résumé requests
The résumé is not downloadable from the site. The "Request résumé" buttons open an email to fulinaramarkluis@gmail.com with the subject "Résumé request"; reply with the PDF.

### 3. Editing Links & Information
- Open `index.html` and search for:
  - `fulinaramarkluis@gmail.com` to change your email address.
  - `https://github.com/markluis27` to update GitHub project repositories.
  - `https://onebatangas.online` to update live project URLs.

---

## 💻 Running Locally

No npm or build tools required! You can run this portfolio locally in any of the following ways:

### Method 1: VS Code Live Server (Recommended)
1. Open the `PORTFOLIO` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/`.

### Method 2: Node.js `npx serve`
In PowerShell or terminal from the `PORTFOLIO` folder:
```powershell
npx serve .
```

### Method 3: Direct File Open
Double click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

---

## 🚀 Free Deployment Guide

### Option A: GitHub Pages (Free, Fast, Built-in)

1. **Initialize Git** in the `PORTFOLIO` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Mark Luis Fulinara Portfolio"
   ```
2. **Create a new repository** on GitHub named `markluis27.github.io` (or `portfolio`).
3. **Push your code**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/markluis27/markluis27.github.io.git
   git push -u origin main
   ```
4. **Enable GitHub Pages**:
   - Go to your repo on GitHub: **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://markluis27.github.io/` within 1–2 minutes!

---

### Option B: Netlify (Drag & Drop or Git Integration)

1. Go to [netlify.com](https://www.netlify.com/) and log in (or sign up with GitHub).
2. Go to **Sites** &rarr; **"Add new site"** &rarr; **"Deploy manually"**.
3. Drag and drop the whole `PORTFOLIO` folder directly into the browser.
4. Your site will instantly go live with a custom `.netlify.app` URL and free SSL!
5. (Optional) Under **Domain management**, you can connect your own custom domain (e.g. `fulinara.dev` or `markluis.online`).

---

## 📜 License & Credits

- Designed & Developed by **Mark Luis O. Fulinara** &copy; 2026.
- Fonts: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) & [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts.
- Animations powered by [GSAP & ScrollTrigger](https://greensock.com/gsap/).
