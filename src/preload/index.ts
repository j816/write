import { contextBridge, ipcRenderer } from 'electron';

interface ChatMessage {
  role: string;
  content: string;
}

interface ElectronAPI {
  selectDirectory: () => Promise<string | null>;
  readFile: (path: string) => Promise<string>;
  readDirectory: (path: string) => Promise<{ subfolders: { path: string; name: string }[]; files: { path: string; name: string }[] }>;
  sendAIRequest: (data: { message: string; history: ChatMessage[] }) => Promise<string>;
  sendAIFeedback: (prompt: string) => Promise<string>;
  saveChatHistory: (history: ChatMessage[]) => Promise<void>;
  loadChatHistory: () => Promise<ChatMessage[]>;
  clearChatHistory: () => Promise<void>;
  saveApiKey: (apiKey: string) => Promise<void>;
  getApiKey: () => Promise<boolean>;
}

contextBridge.exposeInMainWorld('electronAPI', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  readFile: (path: string) => ipcRenderer.invoke('read-file', path),
  readDirectory: (path: string) => ipcRenderer.invoke('read-directory', path),
  sendAIRequest: (data: { message: string; history: ChatMessage[] }) => ipcRenderer.invoke('ai-request', data),
  sendAIFeedback: (prompt: string) => ipcRenderer.invoke('ai-feedback', prompt),
  saveChatHistory: (history: ChatMessage[]) => ipcRenderer.invoke('save-chat-history', history),
  loadChatHistory: () => ipcRenderer.invoke('load-chat-history'),
  clearChatHistory: () => ipcRenderer.invoke('clear-chat-history'),
  saveApiKey: (apiKey: string) => ipcRenderer.invoke('save-api-key', apiKey),
  getApiKey: () => ipcRenderer.invoke('get-api-key')
} as ElectronAPI); 