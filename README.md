# AI Writing Assistant

An Electron-based desktop application that helps you improve your writing with AI-powered feedback.

## Features

- Three-panel layout for efficient workflow
- AI-powered writing feedback using OpenAI's GPT-4
- Writing prompts management
- Dark/light theme support
- Secure API key storage

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- An OpenAI API key

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ai-writing-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Configuration

1. Open the application
2. Go to the Settings tab
3. Enter your OpenAI API key
4. Click "Save API Key"

## Development

To start the application in development mode:

```bash
npm run start
```

To watch for changes during development:

```bash
npm run watch
```

## Project Structure

```
src/
├── main/           # Main process code
│   ├── services/   # Backend services
│   └── ipc/        # IPC handlers
├── renderer/       # Renderer process code
│   ├── components/ # UI components
│   └── styles/     # CSS styles
└── shared/         # Shared types and utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
