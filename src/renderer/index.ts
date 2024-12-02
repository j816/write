import { Settings } from './components/Settings';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ElectronAPI {
  selectDirectory: (panelId: string) => Promise<string | null>;
  readFile: (path: string) => Promise<string>;
  sendAIRequest: (data: { message: string; history: ChatMessage[] }) => Promise<string>;
  sendAIFeedback: (prompt: string) => Promise<string>;
  saveApiKey: (key: string) => Promise<void>;
  getApiKey: () => Promise<boolean>;
  readDirectory: (path: string) => Promise<{ subfolders: { path: string; name: string }[]; files: { path: string; name: string }[] }>;
  loadChatHistory: () => Promise<ChatMessage[]>;
  saveChatHistory: (history: ChatMessage[]) => Promise<void>;
  clearChatHistory: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

class App {
  private editor: HTMLElement | null = null;
  private promptsFolder: string | null = null;
  private criteriaFolder: string | null = null;
  private dropdowns: Map<string, HTMLSelectElement> = new Map();
  private prompts: { name: string, path: string }[] = [];
  private selectedCategory: string | null = null;
  private settings: Settings;
  private promptHistory: Map<string, Set<string>> = new Map();
  private chatHistory: ChatMessage[] = [];
  private selectedPrompt: string | null = null;

  constructor() {
    this.settings = new Settings();
    this.init().catch(console.error);
  }

  private async init() {
    console.log('Initializing application...');
    try {
      await this.settings.initialize();
      this.editor = document.getElementById('editor-container');
      this.setupDropdowns();
      this.setupEventListeners();
      await this.loadChatHistory();
      await this.loadSavedFolders();
      this.loadSavedPromptHistory();
      this.updatePromptNowButton();

      // Check if settings need to be shown
      if (!await this.settings.hasApiKey()) {
        this.setActiveTab('settings', 'right-panel');
      }
    } catch (error: unknown) {
      console.error('Error during initialization:', error);
      this.showError('Failed to initialize application', error);
    }
  }

  private setupDropdowns() {
    console.log('Setting up dropdowns...');
    
    // Initialize dropdown references
    ['prompts-category', 'criteria-category', 'criteria-set'].forEach(id => {
      const dropdown = document.getElementById(id) as HTMLSelectElement;
      if (dropdown) {
        this.dropdowns.set(id, dropdown);
        console.log(`Found dropdown: ${id}`);
      } else {
        console.error(`Dropdown not found: ${id}`);
      }
    });

    this.setupDropdownListeners();
  }

  private setupDropdownListeners() {
    console.log('Setting up dropdown listeners...');
    
    // Prompts category dropdown
    const promptsCategory = this.dropdowns.get('prompts-category');
    if (promptsCategory) {
      promptsCategory.addEventListener('change', async () => {
        const selectedCategory = promptsCategory.value;
        console.log('Category selected:', selectedCategory);
        
        if (selectedCategory) {
          await this.loadPromptsForCategory(selectedCategory);
          localStorage.setItem('dropdown-prompts-category', selectedCategory);
        } else {
          // Clear prompts when no category is selected
          this.prompts = [];
          this.updatePromptNowButton();
        }
      });
    }

    // Criteria dropdowns
    const criteriaCategory = this.dropdowns.get('criteria-category');
    const criteriaSet = this.dropdowns.get('criteria-set');

    if (criteriaCategory) {
      criteriaCategory.addEventListener('change', async () => {
        if (criteriaCategory.value) {
          await this.loadCriteriaSet(criteriaCategory.value);
          localStorage.setItem('dropdown-criteria-category', criteriaCategory.value);
        }
      });
    }

    if (criteriaSet) {
      criteriaSet.addEventListener('change', () => {
        if (criteriaSet.value) {
          localStorage.setItem('dropdown-criteria-set', criteriaSet.value);
        }
      });
    }
  }

  private async loadSavedFolders() {
    // Load saved prompts folder
    const savedPromptsFolder = localStorage.getItem('prompts-folder');
    if (savedPromptsFolder) {
      this.promptsFolder = savedPromptsFolder;
      await this.loadFolderContents(savedPromptsFolder);
    }

    // Load saved criteria folder
    const savedCriteriaFolder = localStorage.getItem('criteria-folder');
    if (savedCriteriaFolder) {
      this.criteriaFolder = savedCriteriaFolder;
      await this.loadCriteria();
    }

    // Restore saved dropdown selections
    const savedPromptsCategory = localStorage.getItem('dropdown-prompts-category');
    const savedCriteriaCategory = localStorage.getItem('dropdown-criteria-category');
    const savedCriteriaSet = localStorage.getItem('dropdown-criteria-set');

    if (savedPromptsCategory) {
      const dropdown = this.dropdowns.get('prompts-category');
      if (dropdown) {
        dropdown.value = savedPromptsCategory;
        await this.loadPromptsForCategory(savedPromptsCategory);
      }
    }

    if (savedCriteriaCategory) {
      const dropdown = this.dropdowns.get('criteria-category');
      if (dropdown) {
        dropdown.value = savedCriteriaCategory;
        await this.loadCriteriaSet(savedCriteriaCategory);
      }
    }

    if (savedCriteriaSet) {
      const dropdown = this.dropdowns.get('criteria-set');
      if (dropdown) {
        dropdown.value = savedCriteriaSet;
      }
    }
  }

  private async loadFolderContents(folderPath: string) {
    const promptsCategory = this.dropdowns.get('prompts-category');
    if (promptsCategory) {
      promptsCategory.innerHTML = '<option value="">Select Category</option>';
      
      try {
        const { subfolders } = await window.electronAPI.readDirectory(folderPath);
        subfolders.forEach(folder => {
          const option = document.createElement('option');
          option.value = folder.path;
          option.textContent = folder.name;
          promptsCategory.appendChild(option);
        });

        console.log('Loaded folder contents:', {
          path: folderPath,
          categories: subfolders.length
        });

        // Restore saved category if exists
        const savedCategory = localStorage.getItem('dropdown-prompts-category');
        if (savedCategory) {
          promptsCategory.value = savedCategory;
          if (savedCategory) {
            await this.loadPromptsForCategory(savedCategory);
          }
        }
      } catch (error: unknown) {
        console.error('Error loading folder contents:', error);
        this.showError('Failed to load folder contents', error);
      }
    } else {
      throw new Error('Prompt category dropdown not found');
    }
  }

  private async selectFolder(type: 'prompts' | 'criteria') {
    try {
      const folder = await window.electronAPI.selectDirectory(type);
      if (folder) {
        if (type === 'prompts') {
          this.promptsFolder = folder;
          localStorage.setItem('prompts-folder', folder);
          await this.loadFolderContents(folder);
          this.updatePromptNowButton();
        } else {
          this.criteriaFolder = folder;
          localStorage.setItem('criteria-folder', folder);
          await this.loadCriteria();
        }
      }
    } catch (error: unknown) {
      console.error(`Error selecting ${type} folder:`, error);
      this.showError(`Failed to select ${type} folder`, error);
    }
  }

  private async loadCriteria() {
    try {
      if (!this.criteriaFolder) {
        throw new Error('No criteria folder selected');
      }

      const { subfolders } = await window.electronAPI.readDirectory(this.criteriaFolder);
      
      const categoryDropdown = this.dropdowns.get('criteria-category');
      if (!categoryDropdown) {
        throw new Error('Criteria category dropdown not found');
      }

      // Clear existing options
      categoryDropdown.innerHTML = '<option value="">Select Category</option>';
      
      // Add new options
      subfolders.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder.path;
        option.textContent = folder.name;
        categoryDropdown.appendChild(option);
      });

      // Clear criteria set dropdown
      const criteriaSetDropdown = this.dropdowns.get('criteria-set');
      if (criteriaSetDropdown) {
        criteriaSetDropdown.innerHTML = '<option value="">Select Criteria Set</option>';
      }
    } catch (error: unknown) {
      console.error('Error loading criteria:', error);
      this.showError('Failed to load criteria', error);
    }
  }

  private async loadCriteriaSet(category: string) {
    try {
      const criteriaSetDropdown = this.dropdowns.get('criteria-set');
      if (!criteriaSetDropdown) {
        throw new Error('Criteria set dropdown not found');
      }

      criteriaSetDropdown.innerHTML = '<option value="">Select Criteria Set</option>';

      if (!category) return;

      const { files } = await window.electronAPI.readDirectory(category);
      files.forEach(file => {
        const option = document.createElement('option');
        option.value = file.path;
        option.textContent = file.name.replace(/\.(txt|md)$/, '');
        criteriaSetDropdown.appendChild(option);
      });
    } catch (error: unknown) {
      console.error('Error loading criteria sets:', error);
      this.showError('Failed to load criteria sets', error);
    }
  }

  private setupEventListeners() {
    // Set up tab switching
    ['left-panel', 'right-panel'].forEach(panelId => {
      const panel = document.getElementById(panelId);
      if (panel) {
        const buttons = panel.querySelectorAll('.tab-button');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
              this.setActiveTab(tabId, panelId);
            }
          });
        });
      }
    });

    // Set up button handlers
    const eventHandlers: { [key: string]: () => Promise<void> } = {
      'select-prompts-folder': async () => await this.selectFolder('prompts'),
      'select-criteria-folder': async () => await this.selectFolder('criteria'),
      'send-message': async () => await this.sendMessage(),
      'submit-feedback': async () => await this.submitForFeedback(),
      'clear-chat': async () => await this.clearChatHistory(),
      'prompt-now': async () => await this.selectRandomPrompt(),
      'save-writing': async () => await this.saveWriting(),
      'clear-editor': async () => await this.clearEditor()
    };

    // Bind click events
    Object.entries(eventHandlers).forEach(([id, handler]) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('click', async () => {
          try {
            await handler();
          } catch (error: unknown) {
            this.showError('Operation failed', error instanceof Error ? error : new Error(String(error)));
          }
        });
      }
    });

    // Set up chat input
    const chatInput = document.querySelector('#chat-input') as HTMLTextAreaElement;
    if (chatInput) {
      chatInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          try {
            await this.sendMessage();
          } catch (error: unknown) {
            this.showError('Failed to send message', error instanceof Error ? error : new Error(String(error)));
          }
        }
      });
    }

    // Set up editor auto-save
    if (this.editor) {
      this.editor.addEventListener('input', () => this.saveEditorContent());
    }
  }

  private setActiveTab(tabId: string, panelId: string) {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    // Update button states
    const buttons = panel.querySelectorAll('.tab-button');
    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-tab') === tabId) {
        button.classList.add('active');
      }
    });

    // Update tab visibility
    const tabs = panel.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === `${tabId}-tab`) {
        tab.classList.add('active');
      }
    });

    // Save active tab state
    localStorage.setItem(`${panelId}-active-tab`, tabId);
  }

  private async loadChatHistory() {
    try {
      const history = await window.electronAPI.loadChatHistory();
      this.chatHistory = history;
      this.displayChatHistory();
    } catch (error: unknown) {
      console.error('Error loading chat history:', error);
      this.showError('Failed to load chat history', error);
    }
  }

  private displayChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    chatMessages.innerHTML = this.chatHistory.map(msg => `
      <div class="message ${msg.role}">
        <div class="message-content">${this.formatMessage(msg.content)}</div>
      </div>
    `).join('');

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  private formatMessage(content: string): string {
    // Convert newlines to <br> tags
    return content.replace(/\n/g, '<br>');
  }

  private async clearChatHistory() {
    try {
      this.chatHistory = [];
      await window.electronAPI.clearChatHistory();
      this.displayChatHistory();
    } catch (error: unknown) {
      console.error('Error clearing chat history:', error);
      this.showError('Failed to clear chat history', error);
    }
  }

  private async sendMessage() {
    try {
      const chatInput = document.querySelector('#chat-input') as HTMLTextAreaElement;
      if (!chatInput?.value.trim()) return;

      const message = chatInput.value.trim();
      chatInput.value = '';

      // Add user message to chat history
      this.chatHistory.push({ role: 'user', content: message });
      this.displayChatHistory();

      // Send message to AI assistant
      const response = await window.electronAPI.sendAIRequest({
        message,
        history: this.chatHistory
      });

      // Add AI response to chat history
      this.chatHistory.push({ role: 'assistant', content: response });
      this.displayChatHistory();

      // Save chat history
      await window.electronAPI.saveChatHistory(this.chatHistory);
    } catch (error: unknown) {
      this.showError('Failed to send message', error);
    }
  }

  private async loadPromptsForCategory(categoryPath: string) {
    try {
      if (!this.promptsFolder) {
        throw new Error('No prompts folder selected');
      }

      this.selectedCategory = categoryPath;
      const { files } = await window.electronAPI.readDirectory(categoryPath);
      this.prompts = files.filter(file => file.name.endsWith('.txt') || file.name.endsWith('.md'));
      
      const promptList = document.querySelector('.prompt-list');
      if (!promptList) {
        throw new Error('Prompt list element not found');
      }
      
      promptList.innerHTML = '';
      this.prompts.forEach(prompt => {
        const promptElement = document.createElement('div');
        promptElement.className = 'prompt-item';
        promptElement.textContent = prompt.name.replace(/\.(txt|md)$/, '');
        promptElement.addEventListener('click', () => this.loadPrompt(prompt.path));
        promptList.appendChild(promptElement);
      });

      // Update button state after loading prompts
      this.updatePromptNowButton();
    } catch (error: unknown) {
      console.error('Error loading prompts for category:', error);
      this.showError('Failed to load prompts for category', error);
    }
  }

  private async loadPrompt(path: string) {
    try {
      const content = await window.electronAPI.readFile(path);
      this.selectedPrompt = content;
      
      const promptList = document.querySelector('.prompt-list');
      if (promptList) {
        promptList.innerHTML = `
          <div class="selected-prompt">
            <div class="prompt-controls">
              <button class="back-button">Back to List</button>
              <button class="use-prompt-button">Use This Prompt</button>
            </div>
            <div class="prompt-content">${content}</div>
          </div>
        `;

        // Add event listeners
        const backButton = promptList.querySelector('.back-button');
        const useButton = promptList.querySelector('.use-prompt-button');

        if (backButton) {
          backButton.addEventListener('click', () => {
            if (this.selectedCategory) {
              this.loadPromptsForCategory(this.selectedCategory);
            }
            this.selectedPrompt = null;
          });
        }

        if (useButton) {
          useButton.addEventListener('click', () => {
            if (this.editor) {
              this.editor.textContent = '';  // Clear the editor
              this.editor.focus();  // Focus the editor
              this.setActiveTab('editor', 'left-panel');  // Switch to editor tab
            }
          });
        }

        // Update prompt history if this is from random selection
        if (this.selectedCategory) {
          const usedPrompts = this.promptHistory.get(this.selectedCategory) || new Set();
          usedPrompts.add(path);
          this.promptHistory.set(this.selectedCategory, usedPrompts);
          this.savePromptHistory();
        }
      }
    } catch (error: unknown) {
      console.error('Error loading prompt:', error);
      this.showError('Failed to load prompt', error);
    }
  }

  private async selectRandomPrompt() {
    try {
      if (!this.prompts.length) {
        throw new Error('No prompts available. Please select a category first.');
      }

      const unusedPrompts = this.prompts.filter(prompt => {
        const category = this.selectedCategory;
        if (!category) return true;
        const usedPrompts = this.promptHistory.get(category) || new Set();
        return !usedPrompts.has(prompt.path);
      });

      if (!unusedPrompts.length) {
        if (this.selectedCategory) {
          this.promptHistory.set(this.selectedCategory, new Set());
        }
        await this.loadPrompt(this.prompts[Math.floor(Math.random() * this.prompts.length)].path);
      } else {
        await this.loadPrompt(unusedPrompts[Math.floor(Math.random() * unusedPrompts.length)].path);
      }
    } catch (error: unknown) {
      console.error('Error selecting random prompt:', error);
      this.showError('Failed to load random prompt', error);
    }
  }

  private savePromptHistory() {
    const historyObj = Object.fromEntries(
      Array.from(this.promptHistory.entries()).map(([category, usedPrompts]) => [
        category,
        Array.from(usedPrompts)
      ])
    );
    localStorage.setItem('promptHistory', JSON.stringify(historyObj));
  }

  private loadSavedPromptHistory() {
    const savedHistory = localStorage.getItem('promptHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        this.promptHistory = new Map(
          Object.entries(parsed).map(([category, usedPrompts]) => [
            category,
            new Set(usedPrompts as string[])
          ])
        );
      } catch (error: unknown) {
        console.error('Error loading prompt history:', error);
        this.showError('Failed to load prompt history', error);
      }
    }
  }

  private showError(message: string, error: unknown) {
    console.error(message, error);
    const errorObject = error instanceof Error ? error : new Error(String(error));
    // Implement your error display logic here using errorObject
    alert(`${message}: ${errorObject.message}`);
  }

  private async submitForFeedback() {
    try {
      // Check if editor exists and has content
      if (!this.editor) {
        throw new Error('Editor not initialized');
      }

      const submissionContent = this.editor.textContent?.trim() || '';
      if (!submissionContent) {
        throw new Error('Please write something before submitting for feedback.');
      }

      const criteriaContent = await this.getCurrentCriteria();
      if (!criteriaContent) {
        throw new Error('Failed to load evaluation criteria. Please make sure a criteria set is selected.');
      }
      
      // Combine content for AI processing
      const combinedContent = this.combineContent({
        prompt: this.selectedPrompt,
        submission: submissionContent,
        criteria: criteriaContent
      });

      // Send to AI for feedback
      const feedback = await window.electronAPI.sendAIFeedback(combinedContent);
      
      // Display feedback in the feedback tab
      const feedbackContent = document.querySelector('.feedback-content');
      if (feedbackContent) {
        feedbackContent.textContent = feedback;
      }
      
      // Switch to the feedback tab
      this.setActiveTab('feedback', 'right-panel');
    } catch (error: unknown) {
      console.error('Error in submitForFeedback:', error);
      this.showError('Failed to get AI feedback', error);
    }
  }

  private async getCurrentCriteria(): Promise<string | null> {
    try {
      const criteriaSet = this.dropdowns.get('criteria-set');
      const criteriaCategory = this.dropdowns.get('criteria-category');
      
      if (!criteriaCategory?.value || !criteriaSet?.value) {
        return null;
      }

      const content = await window.electronAPI.readFile(criteriaSet.value);
      if (!content) {
        throw new Error('Empty criteria file');
      }
      return content;
    } catch (error: unknown) {
      console.error('Error loading criteria:', error);
      this.showError('Failed to load criteria', error);
      return null;
    }
  }

  private combineContent(content: {
    prompt: string | null;
    submission: string;
    criteria: string | null;
  }): string {
    const sections: string[] = [];

    // Add prompt section if available
    if (content.prompt) {
      sections.push(
        '=== Writing Prompt ===\n' +
        content.prompt +
        '\n===================='
      );
    }

    // Add submission section
    sections.push(
      '=== Submission ===\n' +
      content.submission +
      '\n===================='
    );

    // Add criteria section if available
    if (content.criteria) {
      sections.push(
        '=== Criteria ===\n' +
        content.criteria +
        '\n===================='
      );
    }

    return sections.join('\n\n');
  }

  private async saveEditorContent() {
    if (this.editor) {
      const content = this.editor.textContent || '';
      localStorage.setItem('editor-content', content);
    }
  }

  private async saveWriting() {
    if (!this.editor?.textContent) {
      this.showError('Nothing to save', new Error('Editor is empty'));
      return;
    }

    try {
      // Implementation will be added
      console.log('Saving content:', this.editor.textContent);
    } catch (error: unknown) {
      this.showError('Failed to save writing', error);
    }
  }

  private clearEditor() {
    if (!this.editor) return;
    
    if (confirm('Are you sure you want to clear the editor? This cannot be undone.')) {
      this.editor.textContent = '';
      localStorage.removeItem('editor-content');
    }
  }

  private updatePromptNowButton() {
    const button = document.getElementById('prompt-now') as HTMLButtonElement;
    if (button) {
      const shouldBeEnabled = this.promptsFolder && 
        this.selectedCategory && 
        this.prompts.length > 0;
      
      button.disabled = !shouldBeEnabled;
      
      // Set helpful tooltip based on state
      button.title = !this.promptsFolder ? 'No prompts folder selected' :
                    !this.selectedCategory ? 'No category selected' :
                    this.prompts.length === 0 ? 'No prompts available in this category' :
                    'Click to get a random prompt';

      console.log('Updated Prompt Now button state:', {
        shouldBeEnabled,
        reason: button.title,
        promptsFolder: this.promptsFolder,
        selectedCategory: this.selectedCategory,
        promptCount: this.prompts.length
      });
    }
  }
}

// Initialize the application
new App(); 