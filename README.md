---
title: constructflow
emoji: 🐳
colorFrom: purple
colorTo: purple
sdk: static
pinned: false
tags:
  - deepsite
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# ConstructFlow

ConstructFlow is a demo project showcasing a construction project management dashboard. The interface is built using **static** HTML with TailwindCSS and FontAwesome icons. A Jupyter notebook is included for experimenting with the [ERNIE-4.5-21B model](https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT) through the Hugging Face ecosystem.

## Project Structure

- `index.html` – main dashboard page rendered purely as static HTML.
- `style.css` – minimal style overrides for the interface.
- `Kopi_av_ERNIE_4_5_21B_A3B_PT.ipynb` – notebook with examples of local and remote inference using Transformers and `huggingface_hub`.

## Prerequisites

- A modern web browser to open the static dashboard.
- [Python 3](https://www.python.org/) with `pip` for running the notebook.
- Recommended Python packages:
  ```bash
  pip install transformers huggingface_hub
  ```

## Setup

1. Clone this repository.
2. (Optional) Create a Python virtual environment and install the dependencies above if you want to run the notebook.
3. Open `index.html` directly in your browser or serve the repository with a simple HTTP server:
   ```bash
   python -m http.server
   ```
   Then navigate to `http://localhost:8000/`.

## Deployment

Because the project consists of static files, it can be deployed on any static hosting platform such as GitHub Pages or Hugging Face Spaces. Copy the repository contents to your host of choice and configure it to serve `index.html` as the entry point.

## Loading IFC/BIM files

The application now uses the [xeokit](https://xeokit.io) viewer. Convert your IFC file to `.xkt` format with the `xeokit-convert` tool and place the result in the `models/` folder. Update the `src` path in `index.html` to load your model.

## Desktop Application for Windows 10

ConstructFlow is now available as a **native desktop application for Windows 10**! 

### Features:
- **Native Windows Integration** - Proper window controls, menus, and keyboard shortcuts
- **Offline Capability** - Works without internet connection
- **Desktop Notifications** - Real-time project updates
- **File System Integration** - Native file dialogs for importing/exporting
- **Performance Optimized** - Better performance than web version

### Running the Desktop App:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the desktop application:**
   ```bash
   npm start
   ```

3. **Build Windows installer:**
   ```bash
   npm run build-win
   ```

### Desktop-Specific Features:
- `Ctrl+N` - New Task
- `Ctrl+O` - Open Project  
- `Ctrl+S` - Save Project
- `F5` - Refresh Data
- Native menu bar with File, Edit, View, Tools, and Help menus
- Status bar with sync status and current time
- Desktop notifications for real-time collaboration

### Technical Details:
Built with **Electron** framework, providing:
- Cross-platform compatibility
- Native OS integration
- Modern web technologies (HTML5, CSS3, JavaScript)
- Secure sandboxed environment

See [DESKTOP.md](DESKTOP.md) for complete desktop application documentation.
