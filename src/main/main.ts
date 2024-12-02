import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { OpenAIService } from './services/openai';
import * as fs from 'fs/promises';
import { ChatMessage } from '../shared/types';

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  const openAIService = OpenAIService.getInstance();
  await openAIService.initialize();

  // Load default AI context
  try {
    const contextPath = path.join(__dirname, '../config/ai-context.json');
    await openAIService.loadContext(contextPath);
  } catch (error) {
    console.error('Failed to load default AI context:', error);
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  setupIpcHandlers();
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

function setupIpcHandlers() {
  const openAIService = OpenAIService.getInstance();

  ipcMain.handle('ai-request', async (_, data: { message: string; history: ChatMessage[] }) => {
    return await openAIService.sendRequest(data);
  });

  ipcMain.handle('ai-feedback', async (_, text: string) => {
    return await openAIService.sendFeedbackRequest(text);
  });

  ipcMain.handle('save-api-key', async (_, apiKey: string) => {
    return await openAIService.setApiKey(apiKey);
  });

  ipcMain.handle('get-api-key', async () => {
    const apiKey = await openAIService.getApiKey();
    return !!apiKey;
  });

  ipcMain.handle('save-chat-history', async (_, history: any[]) => {
    const userDataPath = app.getPath('userData');
    const historyPath = path.join(userDataPath, 'chat-history.json');
    await fs.writeFile(historyPath, JSON.stringify(history));
  });

  ipcMain.handle('load-chat-history', async () => {
    try {
      const userDataPath = app.getPath('userData');
      const historyPath = path.join(userDataPath, 'chat-history.json');
      const data = await fs.readFile(historyPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  });

  ipcMain.handle('clear-chat-history', async () => {
    const userDataPath = app.getPath('userData');
    const historyPath = path.join(userDataPath, 'chat-history.json');
    await fs.writeFile(historyPath, '[]');
  });

  ipcMain.handle('load-ai-context', async (_, contextPath: string) => {
    try {
      await openAIService.loadContext(contextPath);
      return true;
    } catch (error) {
      console.error('Failed to load AI context:', error);
      return false;
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
