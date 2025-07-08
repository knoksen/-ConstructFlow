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
## Loading IFC/BIM files

The application now uses the [xeokit](https://xeokit.io) viewer. Convert your IFC file to `.xkt` format with the `xeokit-convert` tool and place the result in the `models/` folder. Update the `src` path in `index.html` to load your model.
