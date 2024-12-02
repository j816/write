import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { setupIpcHandlers } from './ipc/handlers';

class MainProcess {
  private mainWindow: BrowserWindow | null = null;

  async init() {
    await this.handleAppReady();
    this.handleWindowsAllClosed();
    this.handleActivate();
  }

  private async handleAppReady() {
    await app.whenReady();
    this.createWindow();
    setupIpcHandlers();
  }

  private createWindow() {
    console.log('Creating main window...');
    
    // Get the preload script path
    const preloadPath = path.join(__dirname, 'preload.js');
    console.log('Preload script path:', preloadPath);
    
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: preloadPath
      }
    });

    // Load the index.html file
    const indexPath = path.join(__dirname, '../renderer/index.html');
    console.log('Index path:', indexPath);
    
    this.mainWindow.loadFile(indexPath).catch(err => {
      console.error('Failed to load index.html:', err);
      console.log('Attempted to load from:', indexPath);
      console.log('Current directory:', __dirname);
      
      // Show error in window
      this.mainWindow?.loadURL(`data:text/html;charset=utf-8,
        <html>
          <head><title>Error</title></head>
          <body>
            <h2>Failed to load application</h2>
            <pre>${err.message}</pre>
            <p>Path: ${indexPath}</p>
            <p>Directory: ${__dirname}</p>
          </body>
        </html>
      `);
    });

    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Opening DevTools (development mode)');
      this.mainWindow.webContents.openDevTools();
    }

    // Log when the window is ready
    this.mainWindow.webContents.on('did-finish-load', () => {
      console.log('Window loaded successfully');
    });

    // Log any load errors
    this.mainWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription) => {
      console.error('Failed to load:', errorCode, errorDescription);
    });
  }

  private handleWindowsAllClosed() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  private handleActivate() {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }
}

// Initialize the application
console.log('Starting application...');
new MainProcess().init().catch(err => {
  console.error('Failed to initialize application:', err);
}); 