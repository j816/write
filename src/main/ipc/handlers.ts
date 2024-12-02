import { ipcMain, dialog } from 'electron';
import * as fs from 'fs/promises';
import { OpenAIService } from '../services/openai';
import * as path from 'path';
import { app } from 'electron';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function setupIpcHandlers() {
  const openAIService = OpenAIService.getInstance();
  const userDataPath = app.getPath('userData');
  const chatHistoryPath = path.join(userDataPath, 'chatHistory.json');

  // File system handlers
  ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    if (result.canceled) {
      return null;
    }

    return result.filePaths[0];
  });

  ipcMain.handle('read-file', async (_, filePath: string) => {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  });

  // Add handler for reading directory contents
  ipcMain.handle('read-directory', async (_, dirPath: string) => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const subfolders = entries
        .filter(entry => entry.isDirectory())
        .map(entry => ({
          name: entry.name,
          path: path.join(dirPath, entry.name)
        }));
      
      const files = entries
        .filter(entry => entry.isFile())
        .map(entry => ({
          name: entry.name,
          path: path.join(dirPath, entry.name)
        }));

      return { subfolders, files };
    } catch (error) {
      console.error('Error reading directory:', error);
      throw error;
    }
  });

  // Chat history handlers
  ipcMain.handle('load-chat-history', async () => {
    try {
      const exists = await fs.access(chatHistoryPath).then(() => true).catch(() => false);
      if (!exists) {
        return [];
      }
      const content = await fs.readFile(chatHistoryPath, 'utf-8');
      const history = JSON.parse(content) as ChatMessage[];
      openAIService.setChatHistory(history);
      return history;
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  });

  ipcMain.handle('save-chat-history', async (_, history: ChatMessage[]) => {
    try {
      await fs.writeFile(chatHistoryPath, JSON.stringify(history, null, 2), 'utf-8');
      openAIService.setChatHistory(history);
      return true;
    } catch (error) {
      console.error('Error saving chat history:', error);
      throw error;
    }
  });

  ipcMain.handle('clear-chat-history', async () => {
    try {
      await fs.unlink(chatHistoryPath).catch(() => {});
      openAIService.clearChatHistory();
      return true;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  });

  // AI operations handlers
  ipcMain.handle('ai-request', async (_, data: { message: string; history: ChatMessage[] }) => {
    try {
      const response = await openAIService.sendRequest(data);
      return response;
    } catch (error) {
      console.error('Error processing chat request:', error);
      throw error;
    }
  });

  ipcMain.handle('ai-feedback', async (_, prompt: string) => {
    try {
      const response = await openAIService.sendFeedbackRequest(prompt);
      return response;
    } catch (error) {
      console.error('Error processing feedback request:', error);
      throw error;
    }
  });

  // Settings handlers
  ipcMain.handle('save-api-key', async (_, apiKey: string) => {
    try {
      const success = await openAIService.setApiKey(apiKey);
      if (!success) {
        throw new Error('Failed to save API key');
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      throw error;
    }
  });

  ipcMain.handle('get-api-key', async () => {
    try {
      const apiKey = await openAIService.getApiKey();
      return !!apiKey;
    } catch (error) {
      console.error('Error getting API key:', error);
      throw error;
    }
  });
}
