# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Windows XP-themed portfolio website** built with Vue 3, Vite, and Tailwind CSS. The portfolio mimics a Windows XP desktop environment with draggable windows, a start menu, taskbar, and various "apps" (My Projects, Contact, CV, Minesweeper, Doom, Terminal, Music Player, Calendar, Notepad, Pictures, Documents, Services).

**Key Technologies:**
- **Vue 3** with Composition API (`<script setup>`)
- **Vite** for build tooling
- **Pinia** for state management (stores for windows, locale, volume, connection)
- **Vue Router** for routing (2 routes: `/` loader and `/office` desktop)
- **Vue I18n** for i18n (English/French)
- **Tailwind CSS** with extensive custom theme (Windows XP colors, fonts, gradients, shadows)
- **Sass** for additional styling
- **js-dos** for running DOOM in browser
- **EmailJS** for contact form
- **Matomo** for analytics (production only)

## Commands

### Development
```bash
# Start dev server (Vite) + Sass watcher in parallel
npm run dev:all

# Start just Vite dev server
npm run dev

# Start just Sass watcher
npm run sass

# Preview production build
npm run preview
```

### Build & Lint
```bash
# Production build (outputs to dist/)
npm run build

# Lint with ESLint (Vue, JS, JSX) + auto-fix
npm run lint

# Format with Prettier
npm run format
```

### Docker
```bash
# Build Docker image (multi-stage: node builder -> nginx)
docker build -t portfolio-xp .

# Run container (exposes port 35000)
docker run -p 35000:35000 portfolio-xp
```

### CI/CD (Jenkins)
- **Jenkinsfile** defines the pipeline: SonarQube analysis → Quality Gate → Docker build → Push to Docker Hub → SSH deploy to Infomaniak
- **SonarQube** configured in `sonar-project.properties` (excludes router and data files)
- Deploys to `~/websites/portfolioXP` via `docker compose`

## Architecture

### Entry Points
- **`index.html`** - Loads js-dos CDN for DOOM, mounts `#app`
- **`src/main.js`** - Vue app setup: Pinia, Vue Router, VueUse Head, Vue I18n, Vue Matomo (prod only)

### Routing (`src/router/index.js`)
- `/` → `Loader.vue` (loading screen with Windows XP boot animation)
- `/office` → `Office.vue` (main desktop environment)

### State Management (Pinia Stores)
| Store | Purpose |
|-------|---------|
| `windowsStore.js` | Persists open window IDs to localStorage |
| `localeStore.js` | Current locale (en/fr) - currently hardcoded to English |
| `volumeStore.js` | Audio management (sound effects, music, mute) |
| `connectionStore.js` | Network connection state |
| `goBackStore.js` | Navigation history |

### Core Layout Components
| Component | Purpose |
|-----------|---------|
| `src/layouts/Window.vue` | Reusable window frame (title bar, minimize/maximize/close, drag, resize, z-index management) |
| `src/layouts/DesktopAppsLayout.vue` | Desktop icons grid (from `windows-data.json`) |
| `src/layouts/ContentCenter.vue` | Centering wrapper |
| `src/components/Header/Header.vue` | Start menu (left/right panels with app shortcuts) |
| `src/components/Footer/Footer.vue` | Taskbar (start button, open windows, clock, volume) |

### Window System Architecture
**`Office.vue`** is the central orchestrator:
- Loads window definitions from `src/data/windows-data.json`
- Maps JSON `component` strings to actual Vue components via `components` object
- Manages open windows array with reactive state (visibility, z-index, position, size)
- Uses `provide/inject` to share `highestZIndex`, `activeWindow`, `openWindow`, `minimizeWindow` with children
- Persists open window IDs to localStorage via `windowsStore`
- Restores windows on mount from localStorage

**Window definitions** (`windows-data.json`) contain:
- `id`, `title` (i18n), `subtitle` (i18n), icons, position/size constraints
- `component` string key mapping to imported Vue component
- `headerToolsId`, `menuHeaderItemsId` for window header toolbar/menu config
- `leftMenuType` for left sidebar variants
- `onDesktop` flag for desktop shortcut visibility

### Key Window Components
| Component | Description |
|-----------|-------------|
| `MyProjects.vue` | Project showcase with search/filter |
| `ContactMe.vue` | Contact form via EmailJS |
| `MyCV/MyCV.vue` | CV viewer (PDF + work experience) |
| `Music/Music.vue` | Music player with playlist |
| `Minesweeper.vue` | Classic Minesweeper game |
| `Doom.vue` | DOOM via js-dos DOSBox |
| `Terminal.vue` | Simulated terminal |
| `Calendar/Calendar.vue` | Calendar with ICS parsing (ical.js) |
| `Notepad.vue` | Notepad app |
| `Pictures.vue` | Image gallery |
| `Documents/Documents.vue` | File explorer |
| `Services.vue` | Services/pricing showcase |

### Styling System
- **Tailwind config** (`tailwind.config.js`) defines extensive Windows XP theme:
  - Custom colors (`window-blue-active`, `solitude-blue`, `pellet-blue-*`, etc.)
  - Custom fonts (Helvetica, Franklin Gothic, Tahoma, Verdana, Trebuchet MS)
  - Custom gradients for window headers/buttons/player)
  - Custom shadows for 3D Windows XP button effects
  - Custom cursors (`.cur` files in `public/img/cursors/`)
  - Custom z-index scale (`max`, `fmax`)
  - Safelist for dynamic classes from JSON
- **Sass** (`sass/main.scss` → `css/main.css`) for global styles
- **PostCSS** with Autoprefixer

### Internationalization
- **`src/locales/en.json`**, `fr.json` - translation files
- Configured via `@intlify/unplugin-vue-i18n` in Vite
- Currently hardcoded to English in `Office.vue:99` (`localeStore.setLocale('en')`)

### Assets
- **`public/img/`** - Icons, cursors, backgrounds, profile pictures
- **`public/sounds/`** - Windows XP sound effects (startup, shutdown, clicks, etc.)
- **`CV_paul_jaguin_en.pdf`** - CV download in root

## Development Notes

### Adding a New Window/App
1. Create component in `src/components/Windows/`
2. Add entry to `src/data/windows-data.json` with all required properties
3. Import and register in `Office.vue` components map
4. Add desktop icon if needed (`onDesktop: true`)

### Window Header Tools & Menus
- `headerToolsId` and `menuHeaderItemsId` in window data map to configs in `WindowHeaderTools.vue` and `WindowHeaderDropdown.vue`
- Add new tool/menu configs there as needed

### Audio
- Managed by `volumeStore.js`
- Sounds in `public/sounds/`
- Play via `volumeStore.playAudio(['/sounds/file.mp3'])`

### Deployment
- Docker multi-stage build: `node:24-alpine` builder → `nginx:alpine` runtime
- Nginx config in `nginx.conf` (serves on port 35000, SPA fallback to index.html)
- Environment variables passed at build time for EmailJS, domain, etc.
- Jenkins deploys via SSH to Infomaniak using docker compose