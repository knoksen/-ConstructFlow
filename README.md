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
