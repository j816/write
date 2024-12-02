export class Settings {
  private settingsTab: HTMLElement;
  private apiKeyInput!: HTMLInputElement;
  private hasKey: boolean = false;

  constructor() {
    const settingsTab = document.getElementById('settings-tab');
    if (!settingsTab) throw new Error('Settings tab not found');
    this.settingsTab = settingsTab;
  }

  async initialize() {
    this.createSettingsForm();
    await this.checkApiKey();
  }

  private createSettingsForm() {
    const form = document.createElement('form');
    form.className = 'settings-form';

    // API Key input
    const apiKeyLabel = document.createElement('label');
    apiKeyLabel.textContent = 'OpenAI API Key:';
    
    this.apiKeyInput = document.createElement('input');
    this.apiKeyInput.type = 'password';
    this.apiKeyInput.placeholder = 'Enter your OpenAI API key';
    this.apiKeyInput.required = true;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save API Key';
    saveButton.type = 'submit';

    form.appendChild(apiKeyLabel);
    form.appendChild(this.apiKeyInput);
    form.appendChild(saveButton);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.saveApiKey();
    });

    // Clear existing content
    this.settingsTab.innerHTML = '';
    this.settingsTab.appendChild(form);
  }

  private async checkApiKey() {
    try {
      this.hasKey = await window.electronAPI.getApiKey();
      if (this.hasKey) {
        this.apiKeyInput.placeholder = '••••••••••••••••';
      }
    } catch (error) {
      console.error('Error checking API key:', error);
      this.hasKey = false;
    }
  }

  private async saveApiKey() {
    const apiKey = this.apiKeyInput.value.trim();
    if (!apiKey) {
      alert('Please enter an API key');
      return;
    }

    try {
      await window.electronAPI.saveApiKey(apiKey);
      this.hasKey = true;
      this.apiKeyInput.value = '';
      this.apiKeyInput.placeholder = '••••••••••••••••';
      alert('API key saved successfully');
    } catch (error) {
      console.error('Error saving API key:', error);
      alert('Failed to save API key. Please try again.');
    }
  }

  hasApiKey(): boolean {
    return this.hasKey;
  }
} 