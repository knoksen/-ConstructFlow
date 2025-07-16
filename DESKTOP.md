# ConstructFlow Desktop

A desktop application for Windows 10 construction project management.

## Features

- **3D BIM/IFC Model Viewer** - Interactive 3D building information modeling
- **Task Management** - Comprehensive task tracking and assignment
- **CO₂ Emissions Tracking** - Environmental impact monitoring
- **Repair Management** - Equipment maintenance and repair workflows
- **File Management** - Document and drawing management
- **Project Timeline** - Visual project phase tracking
- **Desktop Integration** - Native Windows menus and keyboard shortcuts

## Desktop-Specific Features

- Native Windows application with proper window controls
- Keyboard shortcuts (Ctrl+N for new task, F5 for refresh, etc.)
- Desktop notifications for real-time updates
- Status bar with sync status and current time
- Native file dialogs for importing/exporting
- Offline capability with local data storage

## Installation

### Prerequisites
- Windows 10 or later
- No additional software required (self-contained application)

### Running the Application

1. **Development Mode:**
   ```bash
   npm install
   npm start
   ```

2. **Building for Production:**
   ```bash
   npm run build-win
   ```
   This creates a Windows installer in the `dist/` folder.

## Desktop Shortcuts

- `Ctrl+N` - New Task
- `Ctrl+O` - Open Project
- `Ctrl+S` - Save Project
- `Ctrl+F` - Focus Search/Filter
- `F5` - Refresh Application Data
- `Escape` - Close Active Modal
- `Ctrl+,` - Preferences
- `Ctrl+Q` - Quit Application

## File Menu

- **New Project** - Start a new construction project
- **Open Project** - Open existing ConstructFlow project (.cfp files)
- **Save Project** - Save current project state
- **Import IFC Model** - Import 3D building models
- **Exit** - Close the application

## Tools Menu

- **CO₂ Calculator** - Jump to emissions tracking
- **Repair Management** - Open repair reporting dialog
- **Preferences** - Application settings

## Technical Details

Built with:
- **Electron** - Cross-platform desktop app framework
- **HTML/CSS/JavaScript** - Modern web technologies
- **TailwindCSS** - Utility-first CSS framework
- **xeokit** - 3D BIM viewer library
- **FontAwesome** - Icon library

## Project Structure

```
constructflow-desktop/
├── main.js              # Electron main process
├── desktop.html         # Desktop-optimized UI
├── app.js              # Desktop application logic
├── package.json        # App configuration and dependencies
├── assets/             # Application assets (icons, etc.)
└── models/             # 3D model files (.xkt, .ifc)
```

## Building and Distribution

The application can be packaged as:
- **NSIS Installer** - Windows installer package
- **Portable Executable** - Standalone .exe file
- **Microsoft Store Package** - For Windows Store distribution

## Support

For issues and feature requests, visit the [GitHub repository](https://github.com/knoksen/-ConstructFlow).