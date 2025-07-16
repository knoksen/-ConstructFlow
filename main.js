const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

// Enable live reload for development
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

let mainWindow;

function createMainWindow() {
  // Create the main application window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png'), // Add icon when available
    titleBarStyle: 'default',
    show: false // Don't show until ready
  });

  // Load the main HTML file
  mainWindow.loadFile('desktop.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus on the window
    if (process.platform === 'darwin') {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Prevent navigation to external sites
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

function createApplicationMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Implement new project functionality
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'New Project',
              message: 'New project functionality will be implemented here.'
            });
          }
        },
        {
          label: 'Open Project',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // Implement open project functionality
            dialog.showOpenDialog(mainWindow, {
              title: 'Open ConstructFlow Project',
              filters: [
                { name: 'ConstructFlow Projects', extensions: ['cfp'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            });
          }
        },
        {
          label: 'Save Project',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            // Implement save project functionality
            dialog.showSaveDialog(mainWindow, {
              title: 'Save ConstructFlow Project',
              filters: [
                { name: 'ConstructFlow Projects', extensions: ['cfp'] }
              ]
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Import IFC Model',
          click: () => {
            dialog.showOpenDialog(mainWindow, {
              title: 'Import IFC Model',
              filters: [
                { name: 'IFC Files', extensions: ['ifc'] },
                { name: 'XKT Files', extensions: ['xkt'] }
              ]
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'CO₂ Calculator',
          click: () => {
            // Focus on CO₂ tracker in the main window
            mainWindow.webContents.executeJavaScript(`
              document.querySelector('[class*="co2"]')?.scrollIntoView({ behavior: 'smooth' });
            `);
          }
        },
        {
          label: 'Repair Management',
          click: () => {
            // Open repair modal
            mainWindow.webContents.executeJavaScript(`
              if (typeof openRepairModal === 'function') {
                openRepairModal();
              }
            `);
          }
        },
        { type: 'separator' },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // Implement preferences functionality
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Preferences',
              message: 'Preferences window will be implemented here.'
            });
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://github.com/knoksen/-ConstructFlow/blob/main/README.md');
          }
        },
        {
          label: 'Report Issue',
          click: () => {
            shell.openExternal('https://github.com/knoksen/-ConstructFlow/issues');
          }
        },
        { type: 'separator' },
        {
          label: 'About ConstructFlow',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About ConstructFlow',
              message: 'ConstructFlow v1.0.0',
              detail: 'Desktop Construction Project Management Application\\n\\nBuilt with Electron and modern web technologies.\\n\\n© 2025 ConstructFlow Team'
            });
          }
        }
      ]
    }
  ];

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Edit menu
    template[2].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    );

    // Window menu
    template.splice(4, 0, {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(() => {
  createMainWindow();
  createApplicationMenu();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});