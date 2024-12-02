import { contextBridge, ipcRenderer } from 'electron';
import { ChatMessage } from '../shared/types';

// Expose protected APIs to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  selectDirectory: (panelId: string) => 
    ipcRenderer.invoke('select-directory', panelId),
  readFile: (path: string) => 
    ipcRenderer.invoke('read-file', path),
  readDirectory: (path: string) =>
    ipcRenderer.invoke('read-directory', path),
  
  // Chat history operations
  loadChatHistory: () =>
    ipcRenderer.invoke('load-chat-history'),
  saveChatHistory: (history: any[]) =>
    ipcRenderer.invoke('save-chat-history', history),
  clearChatHistory: () =>
    ipcRenderer.invoke('clear-chat-history'),
  
  // AI Assistant methods
  sendAIRequest: (data: { message: string; history: ChatMessage[] }) => 
    ipcRenderer.invoke('ai-request', data),
  
  // AI Feedback methods
  sendAIFeedback: (text: string) => 
    ipcRenderer.invoke('ai-feedback', text),
  
  // API Key management
  saveApiKey: (key: string) => 
    ipcRenderer.invoke('save-api-key', key),
  getApiKey: () => 
    ipcRenderer.invoke('get-api-key'),
  
  // AI Context loading
  loadAIContext: (contextPath: string) => 
    ipcRenderer.invoke('load-ai-context', contextPath),
}); 