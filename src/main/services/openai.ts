import OpenAI from 'openai';
import * as keytar from 'keytar';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import * as fs from 'fs/promises';

const SERVICE_NAME = 'ai-writing-assistant';
const ACCOUNT_NAME = 'openai-api-key';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private client: OpenAI | null = null;
  private chatHistory: ChatMessage[] = [];
  private contextPrompt: string = '';

  private constructor() {}

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      const apiKey = await this.getApiKey();
      if (!apiKey) return false;

      this.client = new OpenAI({ apiKey });
      return true;
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      return false;
    }
  }

  async getApiKey(): Promise<string | null> {
    try {
      return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  }

  async setApiKey(apiKey: string): Promise<boolean> {
    try {
      await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, apiKey);
      return await this.initialize();
    } catch (error) {
      console.error('Error saving API key:', error);
      return false;
    }
  }

  setChatHistory(history: ChatMessage[]): void {
    this.chatHistory = history;
  }

  getChatHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  clearChatHistory(): void {
    this.chatHistory = [];
  }

  async loadContext(filePath: string): Promise<void> {
    try {
      const contextData = await fs.readFile(filePath, 'utf-8');
      const context = JSON.parse(contextData);
      this.contextPrompt = context.systemPrompt || '';
    } catch (error) {
      console.error('Error loading context:', error);
      throw new Error('Failed to load AI context');
    }
  }

  async sendRequest(data: { message: string; history: ChatMessage[] }): Promise<string> {
    try {
      if (!this.client) {
        throw new Error('OpenAI client not initialized');
      }

      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: this.contextPrompt || 'You are a helpful AI assistant.'
        },
        ...data.history.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content || 'No response available';
    } catch (error) {
      console.error('Error getting response:', error);
      throw new Error('Failed to get response');
    }
  }

  async sendFeedbackRequest(text: string): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    try {
      // Important: Don't use chatHistory for feedback requests
      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI writing assistant that provides detailed feedback on writing submissions based on provided criteria.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content || 'No response available';
    } catch (error) {
      console.error('Error getting feedback response:', error);
      throw new Error('Failed to get feedback response');
    }
  }

  async sendMessage(message: string) {
    try {
      if (!this.client) {
        throw new Error('OpenAI client not initialized');
      }

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [{
          role: 'user',
          content: message
        }],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content || 'No response available';
    } catch (error: unknown) {
      console.error('OpenAI API Error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to send message: ${error.message}`);
      }
      throw new Error('Failed to send message: Unknown error occurred');
    }
  }
}
