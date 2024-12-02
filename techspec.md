# Macro View of Project

## Environment Setup Requirements

Development Tools Installation

Node.js (Latest LTS version)

npm or yarn package manager

3.  Git for version control

TypeScript compiler

A code editor (VSCode recommended for TypeScript integration)

System Requirements

Operating system compatibility check

Sufficient disk space (minimum 2GB)

Required build tools for native modules

Windows: Visual Studio Build Tools

macOS: Xcode Command Line Tools

Linux: build-essential package

2.  Project Creation Architecture

Base Project Structure

Root directory organization

/src - Source code

/config - Configuration files

/assets - Static resources

/build - Build output

/types - TypeScript type definitions

Configuration Files Setup

TypeScript configuration

Strict type checking

Module resolution settings

Source map configuration

Target ECMAScript version

2.  Electron configuration

Main process settings

Renderer process settings

IPC communication setup

Security policies

Package Management

Dependencies categorization

Production dependencies

Development dependencies

Optional dependencies

Peer dependencies

3.  Logical Flow

Initialization Flow

Environment validation

Check Node.js version

Verify TypeScript installation

Validate build tools

Project scaffolding

Create directory structure

Initialize Git repository

Generate package.json

Configure TypeScript

Development environment setup

Install development dependencies

Configure build scripts

Set up development tools

Build Process Flow

Source compilation

TypeScript to JavaScript

Asset processing

Bundle optimization

Development workflow

Hot reload setup

Debug configuration

Source map generation

Testing Strategy

Unit testing setup

Test framework configuration

Mock system setup

Test runner integration

Integration testing

Cross-platform testing

IPC communication testing

Window management testing

4.  Security Considerations

Process Isolation

Main process security

Limited system access

Controlled IPC channels

Resource restrictions

Renderer process security

Context isolation

Sandbox configuration

Content Security Policy

Data Protection

Configuration security

Secure storage of sensitive data

Environment variable management

API key protection

5.  Cross-Platform Compatibility

Platform-Specific Considerations

Windows compatibility

Native module compilation

Windows-specific APIs

Installation requirements

macOS compatibility

Code signing requirements

App notarization

System integration

Linux compatibility

Package dependencies

Desktop integration

Distribution requirements

6.  Development Workflow

Version Control Strategy

Git workflow

Branch management

Commit conventions

Release tagging

Documentation Requirements

Code documentation

JSDoc comments

API documentation

Usage examples

Project documentation

Setup instructions

Development guidelines

Troubleshooting guide

## Configuration Architecture Analysis

1.  Configuration Directory Structure

The central config/ directory should be organized into distinct
configuration files based on functionality:

Core Configuration Files Needed:

1. Application Configuration (appConfig.ts)

Contains basic app settings like window dimensions, default paths

Environment-specific settings (dev/prod)

App-wide constants

Panel Configuration (panelConfig.ts)

Layout settings for the three main panels

Default dimensions and constraints

Panel-specific behavior settings

File System Configuration (fileSystemConfig.ts)

File handling settings

Permitted file types and extensions

Default save/load paths

File watching configurations

OpenAI Configuration (openAIConfig.ts)

API configuration settings

Model parameters

Rate limiting settings

Response formatting preferences

UI Configuration (uiConfig.ts)

Theme settings

Font configurations

UI element sizing

Animation settings

2.  Configuration Management System

A. Configuration Loading Flow:

Initial load during app startup

Environment detection (dev/prod)

User preferences merge

Configuration validation

Configuration distribution to modules

B. Configuration Updates Handling:

Runtime configuration changes

Persistence of user preferences

Configuration change event propagation

Validation of changes

Rollback mechanism for invalid changes

3.  Type System

A. Configuration Interfaces:

Base configuration interface

Module-specific configuration interfaces

Validation schemas

Type guards for runtime checking

B. Type Safety:

Strict typing for all configuration values

Runtime type checking

Default value handling

Type coercion rules

4.  Configuration Access Pattern

A. Configuration Service:

Singleton pattern for global access

Cached configuration values

Change notification system

Configuration inheritance hierarchy

B. Access Control:

Read-only vs. modifiable settings

Environment-specific restrictions

Module-level access control

Configuration change audit trail

5.  Integration Points

A. Module Integration:

Configuration injection patterns

Module initialization sequence

Configuration dependency resolution

Error handling for missing configurations

B. Cross-module Configuration:

Shared configuration values

Configuration value inheritance

Configuration conflict resolution

Default fallback values

6.  Security Considerations

A. Sensitive Data:

Encryption of sensitive values

Secure storage of credentials

Environment variable integration

Secret management

B. Access Control:

Configuration read/write permissions

Configuration value validation

Audit logging of changes

Security boundary enforcement

7.  Error Handling

A. Configuration Errors:

Missing configuration detection

Invalid value handling

Type mismatch resolution

Required vs. optional settings

B. Error Recovery:

Default value fallbacks

Configuration reset capability

Error notification system

Recovery logging

8.  Testing Strategy

A. Configuration Testing:

Configuration loading tests

Validation tests

Type safety tests

Integration tests

B. Error Condition Testing:

Missing configuration tests

Invalid value tests

Permission boundary tests

Recovery mechanism tests

This architecture ensures:

Clear separation of concerns

Type safety throughout the system

Secure handling of sensitive data

Robust error handling

Flexible configuration management

Easy maintenance and updates

Clear testing strategy

## Set Up Electron Main Process

Objective: Initialize the main process to manage the app lifecycle.

Create a Main Script: This script, typically named main.js or main.ts,
will serve as the entry point for your Electron application.
It should be specified in the main field of your package.json.

Initialize the App: Use Electron's app module
to handle the lifecycle of the application. This includes setting up
event listeners for ready, window-all-closed, and activate events.

Create a Browser Window: Use the BrowserWindow class to create the main
application window. Configure its properties such as width, height, and
webPreferences.

Load HTML Content: Use the loadFile or loadURL method to load
the initial HTML file into the window.

Handle App Events: Ensure the app quits when all windows are closed,
except on macOS where it is common for applications to
stay active until the user explicitly quits.

2.  Create Preload Script

Objective: Expose necessary APIs to the renderer process.

Purpose of Preload Script: The preload script runs in
the renderer process but has access to Node.js APIs. It
is used to safely expose specific APIs to the renderer
process using contextBridge.

Security Considerations:
Enable contextIsolation in the webPreferences of BrowserWindow to prevent the
renderer from accessing Node.js APIs directly.
Use contextBridge to expose only the necessary APIs.

Implement Preload Script: Create a preload.js or preload.ts file.
Use contextBridge.exposeInMainWorld to define the APIs that the renderer
can access.

3.  Set Up IPC Communication

Objective: Enable communication between the main and renderer processes.

Use IPC Modules: Utilize ipcMain in
the main process and ipcRenderer in the renderer process to send
and receive messages.

Define Communication Channels: Establish specific
channels for different types of messages. This helps in organizing the
communication flow and maintaining security.

Handle IPC Events: In the main process,
use ipcMain.handle or ipcMain.on to listen for messages from the
renderer. In the renderer,
use ipcRenderer.send or ipcRenderer.invoke to send messages to
the main process.

Security Best Practices: Validate and sanitize all data
received through IPC to prevent injection attacks. Limit the exposure of
sensitive operations to the renderer process.

Dependencies

Configuration Files: Ensure that all necessary configuration files are
in place before setting up the main process.
These files might include settings for the application window,
security configurations, and API keys.

Logic Flow

1. Initialization: The main process initializes the application
and creates the main window.

2. Preload Execution: The preload script runs
before the renderer process loads its content,
setting up the environment and exposing APIs.

3. IPC Communication: The renderer and
main processes communicate through IPC, allowing the
renderer to request operations that require Node.js capabilities.

By following these steps, you will establish a robust
main application structure that adheres to Electron's best practices and
ensures a secure and efficient application lifecycle.

## Application Frame Implementation Plan

1.  Main Window Creation Requirements

Core Dependencies

Electron's BrowserWindow module

Node.js path module for file path handling

Configuration files for window settings

Window Configuration Considerations

Window Dimensions

Need to define default width and height

Should handle minimum window size constraints

Must consider screen size adaptability

Window Properties

Title bar configuration

Frame styling (whether to use native or custom)

Window state management (maximized, minimized, etc.)

Focus and blur event handling

Security Settings

Context isolation configuration

Node integration settings

Sandbox configuration

Content Security Policy implementation

2.  Panel Layout Structure

Layout Requirements

Three-Panel Design

Left Panel (Writing Prompts & AI Assistant)

Middle Panel (Text Editor)

Right Panel (AI Feedback, Criteria, Settings)

Panel Behavior

Resizable panels with minimum/maximum constraints

Collapsible panels

Panel state persistence

Independent scroll containers

Panel Communication

Inter-Panel Messaging

Event system for panel communication

State management between panels

Data flow architecture

3.  Implementation Flow

Initialization Sequence

Create window with secure defaults

Load HTML template

Initialize panel structure

Set up event listeners

Configure window state persistence

State Management Requirements

Window State

Save/restore window position

Save/restore window size

Handle multiple displays

Panel State

Save/restore panel sizes

Maintain panel collapse states

Preserve panel content states

4.  Error Handling Requirements

Window Creation

Handle creation failures

Manage resource allocation

Implement cleanup procedures

Panel Management

Handle panel resize errors

Manage panel content loading failures

Handle state restoration errors

5.  Performance Considerations

Resource Management

Efficient panel rendering

Memory usage optimization

Event listener cleanup

Loading Optimization

Lazy loading of panel content

Efficient resource allocation

Background process management

6.  Cross-Platform Compatibility

Platform-Specific Behavior

Windows-specific window management

macOS-specific window features

Linux-specific considerations

UI Consistency

Consistent panel behavior across platforms

Platform-appropriate styling

Uniform user experience

7.  Testing Requirements

Window Testing

Creation/destruction cycles

State management verification

Event handling validation

Panel Testing

Resize functionality

Content loading

Inter-panel communication

State persistence

8.  Documentation Needs

Code Documentation

Window configuration options

Panel setup procedures

Event system documentation

State management explanation

User Documentation

Panel interaction guidelines

Window management features

Customization options

This architecture ensures a robust, maintainable, and secure application
frame while providing a solid foundation for the rest of the
application's features. The implementation should follow this structure
to maintain consistency and reliability across the application.

## Back-end Features

1.  OS Manipulation Implementation

File System Configuration

Purpose: Create a centralized configuration system for file system
operations

Key Requirements:

Define allowed file types (txt, md, json)

Set default paths for different operations

Configure file operation permissions

Specify encoding standards (UTF-8)

Define exclusion patterns (.DS_Store, etc.)

File System Service

Core Functionalities:

Directory selection and validation

File reading and writing operations

Directory scanning and filtering

File path management

Error handling for file operations

Implementation Requirements:

Use Electron's native dialog module for file selection

Implement async operations using Node's fs/promises

Create methods for common file operations

Handle platform-specific path separators

Implement proper error handling and logging

2.  File Manipulation Implementation

Content Combiner Configuration

Purpose: Define rules for combining different content types for AI
evaluation

Configuration Requirements:

Define content section markers

Set separator patterns

Configure content ordering rules

Define maximum content sizes

Set validation rules for combined content

Content Combiner Service

1. Core Functionalities:

Combine prompt, submission, and criteria content

Validate combined content

Format content for AI processing

Handle content size limitations

Manage content section separation

Implementation Requirements:

Create methods for content validation

Implement content formatting rules

Handle different content types consistently

Manage content size limits

Implement error handling for invalid content

3.  OpenAI Integration Implementation

OpenAI Configuration

Purpose: Manage OpenAI API settings and behavior

Configuration Requirements:

Define API endpoints

Set model parameters (temperature, tokens, etc.)

Configure response formats

Set timeout values

Define retry strategies

API Key Management

Security Requirements:

Secure storage using system keychain

Encryption for stored keys

Key validation

Access control

Key rotation support

Implementation Requirements:

Use Electron's keytar for secure storage

Implement key validation logic

Create key retrieval methods

Handle key updates securely

Implement error handling for key operations

OpenAI API Calls

Core Functionalities:

Initialize OpenAI client

Make API requests

Handle responses

Manage rate limiting

Handle errors

Implementation Requirements:

Create API client initialization

Implement request methods

Handle response parsing

Implement retry logic

Manage API quotas and limits

Dependencies and Flow

Module Dependencies:

Electron's native modules

Node.js fs/promises

keytar for secure storage

OpenAI API client

Error handling utilities

Initialization Flow:

   1. Load File System Configuration
   2. Initialize File System Service
   3. Load Content Combiner Configuration
   4. Initialize Content Combiner Service
   5. Load OpenAI Configuration    6. Initialize API Key Management
   7. Initialize OpenAI Client

Error Handling Flow:

   1. Validate operation parameters    2. Attempt operation
   3. Catch specific errors    4. Log error details
   5. Return appropriate error response    6. Notify user if necessary

Data Flow:

   1. User initiates action
   2. File System Service handles file operations
   3. Content Combiner processes content
   4. OpenAI Service makes API calls
   5. Results return to user interface

This architecture ensures:

Secure handling of sensitive data

Proper error handling and logging

Consistent file operations

Efficient content processing

Reliable API integration

Clear separation of concerns

Maintainable codebase structure

## Overall UI Architecture

1.  Overall UI Architecture

Core UI Framework Selection

We should use native HTML/CSS/JavaScript with Electron's IPC for
communication

Consider using a lightweight CSS framework for consistent styling

Implement a responsive grid system for panel layouts

Layout Structure

Main Window Container

Fixed header height

Flexible content area using CSS Grid or Flexbox

Three-panel layout with adjustable widths

Minimum window dimensions to prevent layout breaking

Panel Management System

Each panel should be independently scrollable

Panels should maintain state independently

Implement a tab management system for panels with multiple tabs

Handle panel resizing with proper content reflow

2.  Panel-Specific Requirements

Left Panel Implementation

1. Tab System

Toggle between "Writing Prompts" and "AI Assistant"

Maintain separate state for each tab

Smooth transitions between tabs

Writing Prompts Tab

Folder selection interface

Directory tree visualization

Prompt display area with proper text formatting

Controls for prompt management (refresh, new prompt, use prompt)

AI Assistant Tab

Chat-style interface

Message history display

Input area with send button

Auto-scroll to latest messages

Loading states for API responses

Middle Panel Implementation

Text Editor Requirements

Plain text editing capabilities

Word count display

Auto-save functionality

Undo/redo support

Copy/paste handling

Action Buttons

Clear positioning below editor

Consistent button styling

Loading states for async operations

Proper spacing and grouping

Right Panel Implementation

Tab Management

Three distinct tabs: AI Feedback, Criteria, Settings

Tab state persistence

Active tab indicator

Content Areas

AI Feedback: Scrollable feedback display

Criteria: Selection interface and display

Settings: Form-based configuration

3.  State Management

Panel State

Track active tabs

Remember panel sizes

Maintain scroll positions

Cache user inputs

Application State

Current prompt

Editor content

Selected criteria

AI conversation history

User settings

4.  Event Handling

User Interactions

Panel resizing events

Tab switching

Button clicks

Text input/editing

File selection

System Events

Window resize handling

Focus/blur events

Save/load operations

Error conditions

5.  Cross-Panel Communication

Event Bus

Define events for panel communication

Implement pub/sub system

Handle state updates

Data Flow

Define clear data paths between panels

Implement proper error handling

Manage loading states

6.  Styling Requirements

Theme System

Consistent color palette

Typography scale

Spacing system

Component-specific styles

Responsive Design

Panel minimum/maximum sizes

Content overflow handling

Dynamic layout adjustments

Mobile-friendly considerations (if applicable)

7.  Performance Considerations

Optimization Strategies

Lazy loading of tab content

Efficient DOM updates

Proper event delegation

Memory management for large documents

Resource Management

Handle large text files efficiently

Manage memory for chat history

Optimize panel resizing operations

8.  Accessibility Requirements

Implementation Needs

Proper ARIA labels

Keyboard navigation

Focus management

Screen reader compatibility

This architecture provides a solid foundation for implementing the UI
components while maintaining good separation of concerns and ensuring
maintainable, performant code. Each section can be implemented
incrementally while maintaining the overall system integrity.

## Implementation Strategy for Panel Components

Prerequisites & Dependencies

Core Dependencies

Electron's IPC system must be configured

Main process must be set up with proper window management

Context isolation and preload scripts must be properly configured

File system access permissions must be established

UI Framework Requirements

Need a consistent styling approach (CSS/SCSS)

Panel layout system must be defined

Event handling system must be in place

Left Panel Implementation Logic

Writing Prompts Tab

Folder Selection System

Create folder selection dialog integration

Implement folder path persistence

Set up file system watchers for folder changes

Subfolder Navigation

Build subfolder listing mechanism

Implement refresh functionality

Create dropdown population logic

Prompt Management

Develop random prompt selection algorithm

Create prompt history tracking

Implement prompt display system

Build prompt transfer mechanism to editor

AI Assistant Tab

Chat Interface

Design message storage system

Implement message display logic

Create input handling system

OpenAI Integration

Set up secure API key management

Create message queue system

Implement response handling

Build error management system

Middle Panel Implementation Logic

Text Editor Core

Editor Foundation

Implement basic text editing capabilities

Create auto-save mechanism

Set up word count tracking

Implement undo/redo functionality

File Management

Create temporary file handling

Implement file persistence logic

Build auto-recovery system

Control Buttons

Action Management

Implement submission logic

Create save functionality

Build clear mechanism with confirmation

Implement location selection system

Right Panel Implementation Logic

AI Feedback Tab

Feedback System

Create progress indication system

Implement feedback display mechanism

Build feedback persistence logic

Criteria Tab

Criteria Management

Implement folder selection system

Create category navigation

Build criteria set selection

Implement file display system

Settings Tab

Configuration Management

Create API key management system

Implement validation logic

Build secure storage mechanism

Data Flow Architecture

Panel Communication

Define inter-panel messaging system

Create state management approach

Implement event propagation logic

File System Integration

Define file access patterns

Create file watching system

Implement change detection

State Management

Define state persistence strategy

Create state restoration logic

Implement state synchronization

Error Handling Strategy

User Input Validation

Define input validation rules

Create error message system

Implement recovery mechanisms

System Error Management

Define error categories

Create error logging system

Implement recovery procedures

Performance Considerations

Resource Management

Implement lazy loading for panels

Create memory management strategy

Define cleanup procedures

Response Time Optimization

Implement debouncing for frequent operations

Create caching strategy

Define performance metrics

## Integration Architecture Analysis

1.  Core Integration Requirements

IPC Communication Layer

Need to establish bidirectional communication between main and renderer
processes

Must maintain context isolation for security

Requires preload script configuration to expose safe APIs

Event Handler System

Needs centralized event management

Must handle both UI events and IPC responses

Should include error handling and timeout management

2.  Key Integration Points

Main Process Integration

IPC Channel Registration

Define clear channel naming conventions

Set up main process listeners for each feature

Implement response handling and error management

Service Connections

Create bridges between IPC handlers and backend services

Manage service lifecycle and state

Handle service errors and recovery

Renderer Process Integration

UI Event Binding

Connect UI elements to IPC channels

Implement response handling for async operations

Manage loading states and user feedback

State Management

Handle UI updates based on IPC responses

Maintain consistent UI state

Cache responses when appropriate

3.  Critical Workflows

File System Operations

Directory Selection

User triggers directory selection

Main process handles native dialog

Results communicated back to renderer

UI updates to reflect selection

Content Management

Content Combination

Collect content from different UI elements

Format data for API submission

Handle response and update multiple UI components

OpenAI Integration

API Communication

Secure API key management

Request formation and validation

Response parsing and error handling

UI feedback during API operations

4.  Error Handling Strategy

Error Categories

1. IPC Errors

Channel unavailable

Message timeout

Invalid data format

Service Errors

API failures

File system errors

Permission issues

UI Errors

Invalid user input

State inconsistencies

Rendering failures

Error Recovery

Implement retry mechanisms

Provide user feedback

Maintain system stability

Log errors for debugging

5.  Performance Considerations

Response Time Management

Implement loading states

Consider debouncing frequent events

Cache heavy operations

Resource Usage

Monitor memory usage

Manage concurrent operations

Implement cleanup procedures

6.  Security Measures

Data Validation

Validate all IPC messages

Sanitize user input

Verify file system operations

Permission Management

Implement principle of least privilege

Validate operations before execution

Handle permission changes

7.  Testing Requirements

Integration Tests

Test IPC communication flows

Verify error handling

Validate state management

End-to-End Tests

Test complete user workflows

Verify UI feedback

Validate data persistence

8.  Monitoring and Debugging

Logging System

Log IPC communications

Track error occurrences

Monitor performance metrics

Debug Tools

Implement debug modes

Create debugging utilities

Add performance monitoring

This architecture ensures:

Clear separation of concerns

Robust error handling

Secure communication

Maintainable codebase

Testable components

Performance optimization

User-friendly experience

## Testing Strategy Overview

1.  Test Categories Required

Unit Testing

Individual component testing in isolation

Focus on pure functions and utilities

Test each panel's core functionality independently

Verify file system operations

Validate OpenAI integration methods

Integration Testing

Test communication between main and renderer processes

Verify IPC message handling

Test panel interactions

Validate data flow between components

Ensure proper state management

End-to-End Testing

Complete workflow testing

User interaction simulation

Full feature validation

Cross-platform compatibility verification

2.  Testing Framework Requirements

Core Testing Tools

Spectron for Electron-specific testing

Jest for unit and integration tests

Mocha for asynchronous operations

Chai for assertions

Sinon for mocking and stubbing

Test Environment Setup

Separate test configuration files

Mock data generation utilities

Test database setup

Environment variable management

Cross-platform test runners

Error Handling Strategy

1.  Error Categories to Handle

System-Level Errors

File system access failures

Permission issues

Memory constraints

Process communication failures

Application-Level Errors

Invalid user input

State management issues

Configuration errors

Resource loading failures

Network-Related Errors

API communication failures

Timeout issues

Rate limiting handling

Connection problems

2.  Error Handling Implementation Requirements

Global Error Handler

Central error logging system

Error categorization

User-friendly error messages

Error recovery procedures

Process-Specific Error Handling

Main process error management

Renderer process error catching

IPC error handling

Preload script error handling

Recovery Mechanisms

Automatic retry logic

Graceful degradation procedures

State recovery systems

Data persistence safeguards

Testing Workflow

1.  Development Phase Testing

Component Development

Write tests before implementation

Continuous test execution

Code coverage monitoring

Performance benchmarking

Integration Phase

Component integration verification

System integration testing

Cross-component communication testing

State management validation

2.  Pre-Release Testing

System Verification

Full system testing

Performance testing

Security testing

Cross-platform validation

User Acceptance Testing

Feature completeness verification

Usability testing

Edge case validation

Error recovery testing

Error Monitoring and Reporting

1.  Runtime Monitoring

Performance Monitoring

Resource usage tracking

Response time monitoring

Memory leak detection

CPU usage optimization

Error Tracking

Error frequency monitoring

Error pattern analysis

Impact assessment

Resolution tracking

2.  Reporting Systems

Developer Feedback

Detailed error logs

Stack traces

System state information

Debug information

User Feedback

User-friendly error messages

Error reporting interface

Feedback collection

Issue tracking integration

## Best Practices Overview

1.  Component Registration System

Purpose:

Create a centralized registry to manage all UI components and their
dependencies

Enable dynamic loading/unloading of components

Facilitate component lifecycle management

Provide dependency injection capabilities

Key Elements:

Registry Interface

Define a clear contract for component registration

Include methods for registration, deregistration, and lookup

Support component versioning and dependencies

Component Metadata

Unique identifier for each component

Component type/category (UI, service, utility)

Dependencies list

Initialization status

Component state

Lifecycle Management

Initialization sequence

Cleanup procedures

Error handling

State management

2.  Type-First Development

Purpose:

Ensure type safety across the application

Provide better IDE support and developer experience

Reduce runtime errors through compile-time checks

Key Elements:

Type Definitions

Interface definitions for all components

Type guards for runtime checks

Generic types for reusable components

Strict null checks

Type Architecture

Shared types across modules

Component-specific types

Event type definitions

State management types

Type Safety Measures

Strict TypeScript configuration

No implicit any

Strict function types

Strict property initialization

3.  Documentation System

Purpose:

Provide comprehensive documentation for all components

Enable easy onboarding for new developers

Maintain clear API documentation

Document architectural decisions

Key Elements:

Documentation Structure

Component documentation

API documentation

Architecture documentation

Usage examples

Type documentation

Documentation Standards

JSDoc comments for all public APIs

Markdown documentation for architecture

Inline comments for complex logic

Version history documentation

Documentation Tools

TypeDoc for API documentation

Markdown for general documentation

Diagrams for architecture

Version control for documentation

Implementation Flow

Setup Phase

Initialize TypeScript configuration

Set up documentation tools

Create component registry structure

Development Phase

Define interfaces before implementation

Create component registration system

Implement type safety measures

Write documentation as code is developed

Integration Phase

Register components with the registry

Validate type safety across modules

Generate documentation

Verify component dependencies

Maintenance Phase

Update documentation as needed

Maintain type definitions

Monitor component registry health

Handle component updates

Key Considerations

1. Performance

Lazy loading of components

Efficient type checking

Optimized documentation generation

2. Scalability

Extensible component registry

Modular type system

Maintainable documentation structure

Security

Type-safe component communication

Secure component registration

Protected documentation access

Cross-Platform

Platform-agnostic type definitions

Consistent component behavior

Platform-specific documentation

# Implementation

## Environment Setup Requirements Analysis

Section Overview

We're focusing on the "Environment Setup Requirements" section, which is
critical for ensuring developers can properly set up their
development environment for the Electron application.

Implementation Strategy

1.  Setup Verification Script

Let's create a setup verification script that will check and guide
through the installation process:

verify-setup.ts

Apply

import { exec } from 'child_process'; import { promisify } from 'util';
import * as os from 'os'; import * as fs from 'fs';
import \* as path from 'path';

const execAsync = promisify(exec);

interface VersionRequirements {   node: string;   npm: string;
  typescript: string;   git: string; }

const MINIMUM_VERSIONS: VersionRequirements = {   node: '14.0.0',
  npm: '6.0.0',   typescript: '4.0.0',   git: '2.0.0' };

const MINIMUM_DISK_SPACE = 1024 * 1024 * 1024; // 1GB in bytes

class SetupVerifier {
  private static async checkVersion(command: string, regex: RegExp): Promise`<string>`{=html} {
    try {       const { stdout } = await execAsync(command);
      const match = stdout.match(regex);
      return match ? match\[1\] : '';     } catch (error) {
      return '';     }   }

  private static async checkDiskSpace(directory: string): Promise`<number>`{=html} {
    return new Promise((resolve) =\> {
      if (process.platform === 'win32') {
        exec(`wmic logicaldisk get size,freespace,caption`, (error, stdout) =\> {
          const drive = directory.split(path.sep)\[0\];
          const lines = stdout.trim().split('`\n`{=tex}');
          for (const line of lines) {
            if (line.startsWith(drive)) {
              const \[, freeSpace\] = line.trim().split(/`\s`{=tex}+/);
              resolve(parseInt(freeSpace, 10));             }
          }           resolve(0);         });       } else {
        exec(`df -k "${directory}"`, (error, stdout) =\> {
          const lines = stdout.trim().split('`\n`{=tex}');
          if (lines.length \> 1) {
            const \[, , , free\] = lines\[1\].trim().split(/`\s`{=tex}+/);
            resolve(parseInt(free, 10) \* 1024);           }
          resolve(0);         });       }     });   }

  public static async verifyEnvironment(): Promise\<{
    success: boolean;     issues: string\[\];   }\> {
    const issues: string\[\] = \[\];

    // Check Node.js version
    const nodeVersion = await this.checkVersion('node -v', /v(`\d+`{=tex}.`\d+`{=tex}.`\d+`{=tex})/);
    if (!nodeVersion) {
      issues.push('Node.js is not installed. Download from https://nodejs.org/');
    }

    // Check npm version
    const npmVersion = await this.checkVersion('npm -v', /(`\d+`{=tex}.`\d+`{=tex}.`\d+`{=tex})/);
    if (!npmVersion) {
      issues.push('npm is not installed properly');     }

    // Check TypeScript version
    const tsVersion = await this.checkVersion('tsc -v', /Version (`\d+`{=tex}.`\d+`{=tex}.`\d+`{=tex})/);
    if (!tsVersion) {
      issues.push('TypeScript is not installed. Install using: npm install -g typescript');
    }

    // Check Git version
    const gitVersion = await this.checkVersion('git --version', /git version (`\d+`{=tex}.`\d+`{=tex}.`\d+`{=tex})/);
    if (!gitVersion) {
      issues.push('Git is not installed. Visit https://git-scm.com/downloads');
    }

    // Check disk space
    const freeSpace = await this.checkDiskSpace(process.cwd());
    if (freeSpace \< MINIMUM_DISK_SPACE) {
      issues.push(`Insufficient disk space. Required: 1GB, Available: ${Math.floor(freeSpace / 1024 / 1024)}MB`);
    }

    // Check OS compatibility     const platform = os.platform();
    const release = os.release();
    if (\!['win32', 'darwin', 'linux'\].includes(platform)) {
      issues.push(`Unsupported operating system: ${platform}`);     }

    return {       success: issues.length === 0,       issues     };   }

  public static async generateSetupGuide(): Promise`<string>`{=html} {
    const guide = \[
      '# Development Environment Setup Guide`\n`{=tex}',
      '## Required Tools`\n`{=tex}',       '1. Node.js and npm:',
      '   - Download: https://nodejs.org/',
      '   - Verify: `node -v` and `npm -v``\n`{=tex}',
      '2. TypeScript:',
      '   - Install: `npm install -g typescript`',
      '   - Verify: `tsc -v``\n`{=tex}',       '3. Git:',
      '   - Download: https://git-scm.com/downloads',
      '   - Configure:',
      '     `bash',       '     git config --global user.name "Your Name"',       '     git config --global user.email "your.email@example.com"',       '     ``\n`{=tex}',
      '## System Requirements`\n`{=tex}',
      `- Operating System: ${os.platform()} ${os.release()}`,
      `- Architecture: ${os.arch()}`,
      `- Memory: ${Math.floor(os.totalmem() / 1024 / 1024 / 1024)}GB RAM`,
      `- Free Disk Space: ${Math.floor(os.freemem() / 1024 / 1024 / 1024)}GB\n`
    \].join('`\n`{=tex}');

    return guide;   } }

export default SetupVerifier;

2.  Setup Script Runner

setup.ts

Apply

import SetupVerifier from './verify-setup';

async function runSetup() {
  console.log('Verifying development environment...`\n`{=tex}');

  const { success, issues } = await SetupVerifier.verifyEnvironment();

  if (!success) {
    console.log('`\n`{=tex}❌ Environment verification failed. Issues found:');
    issues.forEach(issue =\> console.log(`  - ${issue}`));     
    console.log('`\nGenerating`{=tex} setup guide...`\n`{=tex}');
    const guide = await SetupVerifier.generateSetupGuide();
    console.log(guide);          process.exit(1);   }

  console.log('✅ Environment verification successful!`\n`{=tex}'); }

runSetup().catch(console.error);

3.  Package.json Updates

package.json

Apply

{   "scripts": {     "verify-setup": "ts-node scripts/setup.ts",
    "preinstall": "npm run verify-setup"   },   "engines": {
    "node": "\>=14.0.0",     "npm": "\>=6.0.0"   } }

Implementation Notes

Dependencies:

Node.js runtime

TypeScript compiler

ts-node for running TypeScript scripts

Native OS commands for disk space checking

Cross-Platform Compatibility:

Uses os module for platform-agnostic system information

Implements different disk space checking methods for Windows and
Unix-like systems

Handles path separators correctly using path module

Security Considerations:

Sanitizes command outputs

Uses child_process.exec with proper error handling

Avoids executing user-provided input

Error Handling:

Graceful degradation when commands fail

Clear error messages for missing requirements

Comprehensive setup guide generation

Usage Instructions

Install the verification script:

npm install

Run the setup verification:

npm run verify-setup

Follow the generated guide if issues are found.

Testing Strategy

Unit Tests:

Version parsing logic

Disk space calculation

OS compatibility checks

Integration Tests:

Full environment verification

Guide generation

Command execution

Cross-Platform Testing:

Windows-specific disk space checking

Unix-like systems disk space checking

Path handling

## Section Analysis: Project Creation Architecture

Overview

We're setting up a robust Electron application structure with TypeScript
support, focusing on maintainability and cross-platform compatibility.
The documentation suggests using Electron Forge1 as the primary build
tool.

Implementation Plan

1.  Project Initialization

First, let's create the project using Electron Forge with TypeScript
template:

# Initialize new project
npx create-electron-app@latest my-ai-writing-app --template=typescript

# Navigate to project directory cd my-ai-writing-app

2.  Directory Structure Setup

Create the following directory structure:

project-structure.ts

Apply

my-ai-writing-app/ ├── src/ │   ├── main/           # Main process code
│   │   ├── services/   # Backend services
│   │   └── ipc/        # IPC handlers
│   ├── renderer/       # Renderer process code
│   │   ├── components/ # UI components
│   │   └── styles/     # CSS/SCSS files
│   └── shared/         # Shared types and utilities
├── config/             # Configuration files
├── assets/            # Static assets
├── build/             # Compiled output
└── types/             # Type definitions

3.  Configuration Files

TypeScript Configuration

tsconfig.json

Apply

{   "compilerOptions": {     "target": "ES2021",
    "module": "commonjs",     "lib": \["dom", "es2021"\],
    "declaration": true,     "declarationMap": true,
    "sourceMap": true,     "outDir": "./build",     "rootDir": "./src",
    "strict": true,     "noUnusedLocals": true,
    "noUnusedParameters": true,     "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,     "moduleResolution": "node",
    "esModuleInterop": true,     "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,     "baseUrl": ".",
    "paths": {       "@/*": \["src/\*"\],
      "@main/*": \["src/main/\*"\],
      "@renderer/*": \["src/renderer/\*"\],
      "@shared/*": \["src/shared/\*"\]     }   },
  "include": \["src/\*\*/\*"\],   "exclude": \["node_modules", "build"\]
}

Package.json Configuration

package.json

Apply

{   "name": "my-ai-writing-app",   "version": "1.0.0",
  "description": "AI-assisted writing application",
  "main": ".webpack/main",   "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "lint": "eslint src --ext .ts,.tsx",     "test": "jest"   },
  "devDependencies": {     "@electron-forge/cli": "\^7.x.x",
    "@electron-forge/maker-deb": "\^7.x.x",
    "@electron-forge/maker-rpm": "\^7.x.x",
    "@electron-forge/maker-squirrel": "\^7.x.x",
    "@electron-forge/maker-zip": "\^7.x.x",
    "@electron-forge/plugin-webpack": "\^7.x.x",
    "@types/jest": "\^29.x.x",     "@types/node": "\^20.x.x",
    "@typescript-eslint/eslint-plugin": "\^5.x.x",
    "@typescript-eslint/parser": "\^5.x.x",     "electron": "\^28.x.x",
    "eslint": "\^8.x.x",     "jest": "\^29.x.x",
    "ts-jest": "\^29.x.x",     "typescript": "\^5.x.x"   },
  "dependencies": {     "electron-squirrel-startup": "\^1.0.0",
    "electron-store": "\^8.x.x",     "openai": "\^4.x.x"   } }

4.  Main Process Setup

index.ts

Apply

import { setupIpcHandlers } from './ipc';

if (require('electron-squirrel-startup')) {   app.quit(); }

class MainProcess {   private mainWindow: BrowserWindow \| null = null;

  async init() {     await this.handleAppReady();
    this.handleWindowsAllClosed();     this.handleActivate();   }

  private async handleAppReady() {     await app.whenReady();
    this.createWindow();     setupIpcHandlers();   }

  private createWindow() {     this.mainWindow = new BrowserWindow({
      width: 1200,       height: 800,       webPreferences: {
        nodeIntegration: false,         contextIsolation: true,
        preload: join(\_\_dirname, 'preload.js')       }     });

    // Load the index.html from a url
    this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);   }

  private handleWindowsAllClosed() {
    app.on('window-all-closed', () =\> {
      if (process.platform !== 'darwin') {         app.quit();       }
    });   }

  private handleActivate() {     app.on('activate', () =\> {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();       }     });   } }

// Initialize the application
new MainProcess().init().catch(console.error);
import { app, BrowserWindow } from 'electron';
import { join } from 'path';

5.  Preload Script Setup

preload.ts

Apply

import { contextBridge, ipcRenderer } from 'electron';
import type { IpcApi } from '@shared/types';

const api: IpcApi = {   // File operations
  selectDirectory: (panelId: string) =\> 
    ipcRenderer.invoke('select-directory', panelId),
  readFile: (path: string) =\> 
    ipcRenderer.invoke('read-file', path),      // AI operations
  sendAIRequest: (prompt: string) =\> 
    ipcRenderer.invoke('ai-request', prompt),   
  // Settings operations   saveApiKey: (key: string) =\> 
    ipcRenderer.invoke('save-api-key', key),   getApiKey: () =\> 
    ipcRenderer.invoke('get-api-key') };

// Expose protected API to renderer
contextBridge.exposeInMainWorld('electronAPI', api);

6.  Shared Types

types.ts

Apply

export interface IpcApi {
  selectDirectory: (panelId: string) =\> Promise\<string \| null\>;
  readFile: (path: string) =\> Promise`<string>`{=html};
  sendAIRequest: (prompt: string) =\> Promise`<string>`{=html};
  saveApiKey: (key: string) =\> Promise`<void>`{=html};
  getApiKey: () =\> Promise`<boolean>`{=html}; }

declare global {   interface Window {     electronAPI: IpcApi;   } }

Key Implementation Notes

Security Considerations:

Context isolation is enabled by default

Node integration is disabled

Preload script exposes only necessary APIs

Cross-Platform Compatibility:

Using path.join for file paths

Platform-specific checks for app lifecycle

Type Safety:

Strict TypeScript configuration

Shared type definitions

ESLint integration

Development Workflow:

Hot reload support through Electron Forge

Source maps for debugging

Jest configuration for testing

Next Steps

Install dependencies:

npm install

Start development:

npm start

Build for production:

npm run make

## Logical Flow

1.  Initialization Flow

Objective: Set up the development environment and project structure.

Environment Validation:

Ensure Node.js and TypeScript are installed:

    node -v     tsc -v

-   If not installed, download and install Node.js from nodejs.org,
    and install TypeScript globally:

    npm install -g typescript

Project Scaffolding:

Create the necessary directories for your project:

    mkdir src config assets build types

-   Initialize a Git repository:

    git init

Development Environment Setup:

Install necessary development dependencies:

    npm install --save-dev electron @types/node

-   Set up build scripts in package.json:

    "scripts": {       "start": "electron .",       "build": "tsc"     }

2.  Testing Strategy

Objective: Ensure the application is robust and error-free.

Testing Framework:

Install Jest for unit testing:

    npm install --save-dev jest

-   Configure Jest for TypeScript by creating a jest.config.js file:

    module.exports = {       preset: 'ts-jest',
      testEnvironment: 'node',     };

Sample Unit Test:

Create a simple test file, e.g., sum.test.ts:

    function sum(a: number, b: number): number {       return a + b;
    }

    test('adds 1 + 2 to equal 3', () =\> {
      expect(sum(1, 2)).toBe(3);     });

Dependencies and Logic Flow

Dependencies:

Ensure Node.js and TypeScript are installed and configured.

Use Electron for building the desktop application.

Jest is used for testing the application logic.

Logic Flow:

1. Environment Setup: Validate and install necessary tools.

2. Project Scaffolding: Create the directory structure and
initialize version control.

3. Development Setup: Install dependencies and configure build scripts.

Testing: Implement unit tests to ensure code quality and reliability.

Implementation Considerations

Cross-Platform Compatibility: Ensure that all scripts and configurations
work on Windows, macOS, and Linux.

Code Quality: Use TypeScript for type safety and maintainability.

Testing: Regularly run tests to catch errors
early in the development process.

## Security Implementation Analysis

Section Overview

We're focusing on implementing security measures for the AI-assisted
writing app, specifically:

Process Isolation

Data Protection

Content Security Policy (CSP)

Implementation Details

1.  Process Isolation

First, let's create a secure main process configuration:

securityConfig.ts

Apply

export const SECURITY_CONFIG = {   contextIsolation: true,
  nodeIntegration: false,   sandbox: true,   webSecurity: true,
  allowRunningInsecureContent: false,
  csp: "default-src 'self'; script-src 'self'" };

export const ALLOWED_ORIGINS = \[   'https://api.openai.com'\];

Main window creation with security settings:

window.ts

Apply

import { app, BrowserWindow } from 'electron';
import \* as path from 'path';
import { SECURITY_CONFIG } from './config/securityConfig';

export function createSecureWindow(): BrowserWindow {
  // Ensure app is ready   if (!app.isReady()) {
    throw new Error('Cannot create window before app is ready');   }

  const window = new BrowserWindow({     width: 1200,     height: 800,
    webPreferences: {       ...SECURITY_CONFIG,
      preload: path.join(\_\_dirname, 'preload.js'),     },   });

  // Set CSP headers
  window.webContents.session.webRequest.onHeadersReceived((details, callback) =\> {
    callback({       responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': \[SECURITY_CONFIG.csp\]       }
    });   });

  // Prevent navigation to unknown origins
  window.webContents.on('will-navigate', (event, url) =\> {
    const targetUrl = new URL(url);
    if (!ALLOWED_ORIGINS.includes(targetUrl.origin)) {
      event.preventDefault();
      console.warn(`Navigation to ${url} was blocked`);     }   });

  return window; }

2.  Data Protection

Let's implement secure storage using electron-store and keytar:

SecureStorageService.ts

Apply

import Store from 'electron-store'; import \* as keytar from 'keytar';

const APP_NAME = 'AI-Writing-App'; const KEYTAR_SERVICE = APP_NAME;
const KEYTAR_ACCOUNT = 'default';

export class SecureStorageService {   private store: Store;   
  constructor() {     this.store = new Store({       name: 'config',
      encryptionKey: 'your-encryption-key', // Consider generating this dynamically
      clearInvalidConfig: true,     });   }

  // For sensitive data (API keys, credentials)
  async setSecureItem(key: string, value: string): Promise`<void>`{=html} {
    try {       await keytar.setPassword(KEYTAR_SERVICE, key, value);
    } catch (error) {
      console.error('Error storing secure item:', error);
      throw new Error('Failed to store secure item');     }   }

  async getSecureItem(key: string): Promise\<string \| null\> {
    try {       return await keytar.getPassword(KEYTAR_SERVICE, key);
    } catch (error) {
      console.error('Error retrieving secure item:', error);
      return null;     }   }

  // For non-sensitive settings
  setItem(key: string, value: any): void {
    this.store.set(key, value);   }

  getItem(key: string): any {     return this.store.get(key);   }

  deleteItem(key: string): void {     this.store.delete(key);   } }

3.  IPC Security

Implement secure IPC communication:

secureIPC.ts

Apply

import { ipcMain } from 'electron';
import { SecureStorageService } from '../services/SecureStorageService';

const storage = new SecureStorageService();

export function setupSecureIPC(): void {   // Handle API key storage
  ipcMain.handle('store-api-key', async (\_, apiKey: string) =\> {
    try {       await storage.setSecureItem('openai-api-key', apiKey);
      return true;     } catch (error) {
      console.error('Failed to store API key:', error);
      return false;     }   });

  // Handle API key retrieval
  ipcMain.handle('get-api-key', async () =\> {     try {
      return await storage.getSecureItem('openai-api-key');
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;     }   }); }

4.  Preload Script

Create a secure preload script:

preload.ts

Apply

import { contextBridge, ipcRenderer } from 'electron';

// Validate input before sending to main process
function validateApiKey(apiKey: string): boolean {
  return typeof apiKey === 'string' && apiKey.length \> 0; }

// Expose secure API to renderer
contextBridge.exposeInMainWorld('secureApi', {
  storeApiKey: async (apiKey: string) =\> {
    if (!validateApiKey(apiKey)) {
      throw new Error('Invalid API key format');     }
    return await ipcRenderer.invoke('store-api-key', apiKey);   },
  getApiKey: async () =\> {
    return await ipcRenderer.invoke('get-api-key');   } });

Dependencies Required

{   "dependencies": {     "electron-store": "\^8.1.0",
    "keytar": "\^7.9.0"   },   "devDependencies": {
    "@types/keytar": "\^4.4.2"   } }

Implementation Steps

Install dependencies:

npm install electron-store keytar npm install --save-dev @types/keytar

Create the security configuration files and services as shown above.

Update your main process to use the secure window creation:

main.ts

Apply

import { app } from 'electron';
import { createSecureWindow } from './window';
import { setupSecureIPC } from './ipc/secureIPC';

app.whenReady().then(() =\> {   setupSecureIPC();
  createSecureWindow(); });

Implement error handling and logging:

logger.ts

Apply

import { app } from 'electron'; import * as path from 'path';
import * as fs from 'fs';

export class Logger {
  private static logFile = path.join(app.getPath('userData'), 'security.log');

  static logSecurityEvent(event: string, details: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${event}: ${JSON.stringify(details)}\n`;
         fs.appendFile(this.logFile, logEntry, (err) =\> {
      if (err) console.error('Failed to write to security log:', err);
    });   } }

Security Considerations

The implementation follows Electron's security best practices1.

Context isolation is enabled by default to prevent direct access to
Node.js APIs.

Sensitive data is stored securely using keytar.

CSP headers are set to restrict resource loading.

Navigation is restricted to allowed origins only.

Testing Strategy

Create tests to verify security implementations:

security.test.ts

Apply

import { SecureStorageService } from '../main/services/SecureStorageService';

describe('SecureStorageService', () =\> {
  let storage: SecureStorageService;

  beforeEach(() =\> {     storage = new SecureStorageService();   });

  test('should securely store and retrieve API key', async () =\> {
    const testKey = 'test-api-key';
    await storage.setSecureItem('openai-api-key', testKey);
    const retrieved = await storage.getSecureItem('openai-api-key');
    expect(retrieved).toBe(testKey);   }); });

## Section Analysis: Cross-Platform Compatibility

Implementation Strategy

1.  Platform Detection and Configuration Module

Let's create a dedicated module to handle platform-specific logic:

platformHelper.ts

Apply

import { platform } from 'process'; import { app } from 'electron';

export class PlatformHelper {   // Platform detection
  static readonly isWindows = platform === 'win32';
  static readonly isMacOS = platform === 'darwin';
  static readonly isLinux = platform === 'linux';      // App paths
  static readonly userDataPath = app.getPath('userData');
  static readonly appPath = app.getAppPath();   
  // Platform-specific paths   static getConfigPath(): string {
    if (this.isWindows) {       return `${this.userDataPath}\\config`;
    }     return `${this.userDataPath}/config`;   }   
  // Platform-specific behaviors   static getFileDialogOptions() {
    const baseOptions = {
      properties: \['openFile', 'multiSelections'\] as const,
      filters: \[
        { name: 'Text Files', extensions: \['txt', 'md'\] },
        { name: 'All Files', extensions: \['\*'\] }       \]     };

    if (this.isMacOS) {       return {         ...baseOptions,
        message: 'Select files to open',         buttonLabel: 'Open'
      };     }          return baseOptions;   }

  // Window management   static getWindowOptions() {     const base = {
      width: 1200,       height: 800,       webPreferences: {
        contextIsolation: true,         nodeIntegration: false       }
    };

    if (this.isMacOS) {       return {         ...base,
        titleBarStyle: 'hiddenInset',
        trafficLightPosition: { x: 20, y: 20 }       };     }

    if (this.isWindows) {       return {         ...base,
        frame: false,         backgroundColor: '#ffffff'       };     }

    return base;   } }

2.  Platform-Specific Setup Script

platformSetup.ts

Apply

import { execSync } from 'child_process';
import { PlatformHelper } from '../utils/platformHelper';

export class PlatformSetup {
  static async checkDependencies(): Promise`<boolean>`{=html} {
    try {       if (PlatformHelper.isWindows) {
        // Check for Visual Studio Build Tools
        const vsResult = execSync('where cl.exe').toString();
        return vsResult.length \> 0;       }       
      if (PlatformHelper.isMacOS) {
        // Check for Xcode Command Line Tools
        const xcodeResult = execSync('xcode-select -p').toString();
        return xcodeResult.length \> 0;       }       
      if (PlatformHelper.isLinux) {         // Check for build-essential
        const buildResult = execSync('dpkg -s build-essential').toString();
        return buildResult.includes('Status: install ok installed');
      }              return false;     } catch (error) {
      console.error('Dependency check failed:', error);
      return false;     }   }

  static async installDependencies(): Promise`<void>`{=html} {     try {
      if (PlatformHelper.isWindows) {
        console.log('Please install Visual Studio Build Tools from: https://visualstudio.microsoft.com/visual-cpp-build-tools/');
      }              if (PlatformHelper.isMacOS) {
        execSync('xcode-select --install');       }       
      if (PlatformHelper.isLinux) {
        execSync('sudo apt-get update && sudo apt-get install -y build-essential');
      }     } catch (error) {
      console.error('Failed to install dependencies:', error);
      throw error;     }   } }

3.  Integration with Main Process

main.ts

Apply

import { PlatformSetup } from './scripts/platformSetup';

async function initialize() {   try {     // Check platform dependencies
    const dependenciesInstalled = await PlatformSetup.checkDependencies();
    if (!dependenciesInstalled) {
      await PlatformSetup.installDependencies();     }

    // Create window with platform-specific options
    const mainWindow = new BrowserWindow(PlatformHelper.getWindowOptions());

    // Platform-specific window event handling
    if (PlatformHelper.isMacOS) {       app.on('activate', () =\> {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();         }       });     }

    // Common window handling     app.on('window-all-closed', () =\> {
      if (!PlatformHelper.isMacOS) {         app.quit();       }     });
  } catch (error) {     console.error('Initialization failed:', error);
    app.quit();   } }

app.whenReady().then(initialize);
import { app, BrowserWindow } from 'electron';
import { PlatformHelper } from './utils/platformHelper';

Key Dependencies

Node.js native modules:

process for platform detection

child_process for running system commands

path for cross-platform path handling

Electron modules:

app for application lifecycle management

BrowserWindow for window creation and management

Development tools:

Windows: Visual Studio Build Tools

macOS: Xcode Command Line Tools

Linux: build-essential package

Implementation Notes

Platform Detection:

Use process.platform for reliable OS detection

Create helper methods for common platform-specific operations

Centralize platform-specific logic in the PlatformHelper class

File System Operations:

Use path.join() instead of string concatenation for paths

Handle different path separators ( vs /)

Consider case sensitivity differences between platforms

Window Management:

Implement platform-specific window decorations

Handle different window controls (traffic lights on macOS, title bar on
Windows)

Support platform-specific keyboard shortcuts

Error Handling:

Implement platform-specific error messages

Handle permission differences between platforms

Provide clear installation instructions for missing dependencies

Testing Strategy

Platform-Specific Tests:

platform.test.ts

Apply

import { PlatformHelper } from '../utils/platformHelper';
import { PlatformSetup } from '../scripts/platformSetup';

describe('Platform Compatibility', () =\> {
  test('Platform detection is correct', () =\> {
    const platform = process.platform;     expect(
      PlatformHelper.isWindows \|\|        PlatformHelper.isMacOS \|\| 
      PlatformHelper.isLinux     ).toBe(true);   });

  test('Config path is platform appropriate', () =\> {
    const configPath = PlatformHelper.getConfigPath();
    expect(configPath).toMatch(
      PlatformHelper.isWindows ? /\\/ : ///     );   });

  test('Dependencies check works', async () =\> {
    const result = await PlatformSetup.checkDependencies();
    expect(typeof result).toBe('boolean');   }); });

## Section Analysis: Configuration Architecture

Overview

We need to create a robust configuration management system that handles:

Application-wide settings

User preferences

Runtime configuration changes

Cross-platform compatibility

Implementation Plan

1.  Configuration Structure

First, let's create a centralized configuration directory structure:

types.ts

Apply

export interface WindowConfig {   width: number;   height: number;
  minWidth: number;   minHeight: number; }

export interface AppConfig {   appName: string;   version: string;
  window: WindowConfig;   isDevelopment: boolean; }

export interface UserConfig {   theme: 'light' \| 'dark' \| 'system';
  fontSize: number;   autoSave: boolean;   autoSaveInterval: number; }

export interface OpenAIConfig {   model: string;   temperature: number;
  maxTokens: number; }

export type ConfigKey = keyof (AppConfig & UserConfig & OpenAIConfig);

2.  Default Configurations

defaults.ts

Apply

import { AppConfig, UserConfig, OpenAIConfig } from './types';

export const defaultAppConfig: AppConfig = {
  appName: 'AI Writing Assistant',   version: '1.0.0',   window: {
    width: 1200,     height: 800,     minWidth: 800,     minHeight: 600
  },   isDevelopment: process.env.NODE_ENV === 'development' };

export const defaultUserConfig: UserConfig = {   theme: 'system',
  fontSize: 14,   autoSave: true,
  autoSaveInterval: 30000 // 30 seconds };

export const defaultOpenAIConfig: OpenAIConfig = {   model: 'gpt-4',
  temperature: 0.7,   maxTokens: 2000 };

3.  Configuration Manager Service

ConfigManager.ts

Apply

import { app } from 'electron'; import Store from 'electron-store';
import { AppConfig, UserConfig, OpenAIConfig, ConfigKey } from '../config/types';
import { defaultAppConfig, defaultUserConfig, defaultOpenAIConfig } from '../config/defaults';
import { EventEmitter } from 'events';

export class ConfigManager extends EventEmitter {
  private static instance: ConfigManager;   private store: Store;
  private configs: {     app: AppConfig;     user: UserConfig;
    openai: OpenAIConfig;   };

  private constructor() {     super();     this.store = new Store({
      name: 'config',       defaults: {         user: defaultUserConfig,
        openai: defaultOpenAIConfig       }     });

    this.configs = {       app: defaultAppConfig,
      user: this.store.get('user') as UserConfig,
      openai: this.store.get('openai') as OpenAIConfig     };   }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();     }
    return ConfigManager.instance;   }

  public get\<T extends ConfigKey\>(key: T): any {
    const \[section, ...path\] = key.split('.');
    const config = this.configs\[section as keyof typeof this.configs\];
    return path.length ? path.reduce((obj, key) =\> obj\[key\], config) : config;
  }

  public async set\<T extends ConfigKey\>(key: T, value: any): Promise`<void>`{=html} {
    const \[section, ...path\] = key.split('.');     
    if (section === 'app') {
      throw new Error('App configuration cannot be modified at runtime');
    }

    let config = this.configs\[section as keyof typeof this.configs\];
    if (path.length) {       let current = config;
      for (let i = 0; i \< path.length - 1; i++) {
        current = current\[path\[i\]\];       }
      current\[path\[path.length - 1\]\] = value;     } else {
      config = value;     }

    await this.store.set(section, config);
    this.emit('configChanged', { key, value, section });   }

  public watch(callback: (change: { key: string; value: any; section: string }) =\> void): void {
    this.on('configChanged', callback);   }

  public unwatch(callback: (change: { key: string; value: any; section: string }) =\> void): void {
    this.off('configChanged', callback);   } }

4.  IPC Integration

configHandlers.ts

Apply

import { ipcMain } from 'electron';
import { ConfigManager } from '../services/ConfigManager';

export function setupConfigHandlers(): void {
  const configManager = ConfigManager.getInstance();

  ipcMain.handle('config:get', async (\_, key: string) =\> {
    return configManager.get(key);   });

  ipcMain.handle('config:set', async (\_, { key, value }) =\> {
    try {       await configManager.set(key, value);       return true;
    } catch (error) {
      console.error('Error setting config:', error);       return false;
    }   }); }

5.  Preload Script Integration

config.ts

Apply

import { contextBridge, ipcRenderer } from 'electron';

export function exposeConfigAPI(): void {
  contextBridge.exposeInMainWorld('configAPI', {
    get: (key: string) =\> ipcRenderer.invoke('config:get', key),
    set: (key: string, value: any) =\> ipcRenderer.invoke('config:set', { key, value }),
    onChange: (callback: (change: { key: string; value: any }) =\> void) =\> {
      ipcRenderer.on('config:changed', (\_, change) =\> callback(change));
    }   }); }

6.  Usage Example

Settings.ts

Apply

// Example of using the configuration system in a component
export class Settings {
  private async updateTheme(theme: string): Promise`<void>`{=html} {
    try {       await window.configAPI.set('user.theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
      console.error('Failed to update theme:', error);     }   }

  private async initialize(): Promise`<void>`{=html} {
    const theme = await window.configAPI.get('user.theme');
    document.documentElement.setAttribute('data-theme', theme);

    window.configAPI.onChange(({ key, value }) =\> {
      if (key === 'user.theme') {
        document.documentElement.setAttribute('data-theme', value);
      }     });   } }

Dependencies Required

electron-store: npm install electron-store

TypeScript configuration with strict mode enabled

Node.js types: npm install @types/node

Key Features

Singleton pattern for configuration management

Type-safe configuration access

Runtime configuration changes with event emission

Persistent storage for user preferences

Separation of app and user configurations

IPC communication for renderer process access

Security Considerations

App configurations are read-only at runtime

Configuration changes are validated before saving

Uses electron-store for secure storage

Implements proper IPC security with contextIsolation

Testing Strategy

Unit tests for ConfigManager

Integration tests for IPC communication

E2E tests for configuration persistence

## Section Analysis: Set Up Electron Main Process

Overview

This section focuses on establishing the core foundation of the Electron
application through three main components:

Main Process (main.ts)

Preload Script (preload.ts)

IPC Communication System

Implementation Plan

1.  Project Structure

First, let's establish the correct file structure:

src/ ├── main/ │   ├── main.ts │   ├── ipc/ │   │   ├── handlers.ts
│   │   └── channels.ts │   └── window/ │       └── windowManager.ts
├── preload/ │   ├── preload.ts │   └── api/ │       └── exposed-apis.ts
└── types/     └── electron.d.ts

2.  Implementation

Let's implement each component with production-ready code:

Main Process Setup

windowManager.ts

Apply

import { BrowserWindow, screen } from 'electron';
import \* as path from 'path';

export class WindowManager {
  private mainWindow: BrowserWindow \| null = null;

  constructor() {
    this.setupWindowEvents = this.setupWindowEvents.bind(this);   }

  createMainWindow(): BrowserWindow {
    // Get screen dimensions for responsive sizing
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
         this.mainWindow = new BrowserWindow({
      width: Math.min(1200, width * 0.8),
      height: Math.min(800, height * 0.8),
      show: false, // Don't show until ready       webPreferences: {
        contextIsolation: true,         nodeIntegration: false,
        sandbox: true,
        preload: path.join(\_\_dirname, '../../preload/preload.js')
      }     });

    // Load the entry point
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.loadURL('http://localhost:3000');
      this.mainWindow.webContents.openDevTools();     } else {
      this.mainWindow.loadFile(path.join(\_\_dirname, '../renderer/index.html'));
    }

    this.setupWindowEvents();     return this.mainWindow;   }

  private setupWindowEvents(): void {     if (!this.mainWindow) return;

    // Show window when ready to prevent flickering
    this.mainWindow.once('ready-to-show', () =\> {
      this.mainWindow?.show();     });

    // Handle window state     this.mainWindow.on('closed', () =\> {
      this.mainWindow = null;     });   }

  getMainWindow(): BrowserWindow \| null {     return this.mainWindow;
  } }

channels.ts

Apply

export const IpcChannels = {   FILE_SYSTEM: {
    SELECT_DIRECTORY: 'file:select-directory',
    READ_FILE: 'file:read',     WRITE_FILE: 'file:write'   },   AI: {
    PROCESS_REQUEST: 'ai:process-request',
    GET_FEEDBACK: 'ai:get-feedback'   },   APP: {
    GET_VERSION: 'app:get-version',     CHECK_UPDATE: 'app:check-update'
  } } as const;

handlers.ts

Apply

import { ipcMain } from 'electron';
import { IpcChannels } from './channels';
import type { IpcMainInvokeEvent } from 'electron';

export class IpcHandlers {   static register(): void {
    // File System Handlers     ipcMain.handle(
      IpcChannels.FILE_SYSTEM.SELECT_DIRECTORY,
      async (\_event: IpcMainInvokeEvent, options: any) =\> {
        // Implementation for directory selection       }     );

    // AI Processing Handlers     ipcMain.handle(
      IpcChannels.AI.PROCESS_REQUEST,
      async (\_event: IpcMainInvokeEvent, prompt: string) =\> {
        // Implementation for AI processing       }     );

    // App Info Handlers     ipcMain.handle(
      IpcChannels.APP.GET_VERSION,
      (\_event: IpcMainInvokeEvent) =\> {
        return process.env.npm_package_version;       }     );   } }

main.ts

Apply

import { app } from 'electron';
import { WindowManager } from './window/windowManager';
import { IpcHandlers } from './ipc/handlers';

export class MainProcess {   private windowManager: WindowManager;

  constructor() {     this.windowManager = new WindowManager();
    this.initialize();   }

  private initialize(): void {     // Handle app ready
    app.whenReady().then(() =\> {
      this.windowManager.createMainWindow();       
      // Register all IPC handlers       IpcHandlers.register();

      // Handle macOS activation       app.on('activate', () =\> {
        if (!this.windowManager.getMainWindow()) {
          this.windowManager.createMainWindow();         }       });
    });

    // Handle window-all-closed     app.on('window-all-closed', () =\> {
      if (process.platform !== 'darwin') {         app.quit();       }
    });   } }

// Start the application new MainProcess();

exposed-apis.ts

Apply

import { IpcChannels } from '../../main/ipc/channels';

export const exposedApis = {   fileSystem: {
    selectDirectory: async (options: any) =\> 
      window.electron.invoke(IpcChannels.FILE_SYSTEM.SELECT_DIRECTORY, options),
    readFile: async (path: string) =\>
      window.electron.invoke(IpcChannels.FILE_SYSTEM.READ_FILE, path)
  },   ai: {     processRequest: async (prompt: string) =\>
      window.electron.invoke(IpcChannels.AI.PROCESS_REQUEST, prompt)
  },   app: {     getVersion: async () =\>
      window.electron.invoke(IpcChannels.APP.GET_VERSION)   } };

preload.ts

Apply

import { contextBridge, ipcRenderer } from 'electron';
import { exposedApis } from './api/exposed-apis';
import { IpcChannels } from '../main/ipc/channels';

// Type-safe wrapper for IPC communication const electronHandler = {
  invoke: (channel: string, ...args: any\[\]) =\> {
    // Validate channel name
    if (Object.values(IpcChannels).flat().includes(channel)) {
      return ipcRenderer.invoke(channel, ...args);     }
    throw new Error(`Invalid IPC channel: ${channel}`);   } };

// Expose APIs to renderer
contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('api', exposedApis);

3.  Dependencies

Add these to your package.json:

{   "dependencies": {     "electron": "\^25.0.0",
    "typescript": "\^5.0.0"   },   "devDependencies": {
    "@types/electron": "\^1.6.10",     "electron-builder": "\^24.0.0",
    "ts-node": "\^10.9.1"   } }

4.  TypeScript Configuration

tsconfig.json

Apply

{   "compilerOptions": {     "target": "ES2020",
    "module": "commonjs",     "strict": true,
    "esModuleInterop": true,     "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,     "outDir": "./dist",
    "baseUrl": ".",     "paths": {       "\*": \["node_modules/\*"\]
    }   },   "include": \["src/\*\*/\*"\],
  "exclude": \["node_modules"\] }

Testing Strategy

Create a test file for each major component:

windowManager.test.ts

Apply

import { WindowManager } from '../window/windowManager';

describe('WindowManager', () =\> {   let windowManager: WindowManager;

  beforeEach(() =\> {     windowManager = new WindowManager();   });

  test('creates main window with correct options', () =\> {
    const window = windowManager.createMainWindow();
    expect(window).toBeDefined();
    expect(window.webContents.getURL()).toBeDefined();   }); });

Security Considerations

Context Isolation is enabled by default

Node Integration is disabled

Sandbox is enabled

IPC channels are validated before use

Preload script exposes only necessary APIs

## Application Frame

1.  UI Mockups

Create Visual Aids: Use tools like Figma or even hand-drawn sketches
to design the layout of the application. This will help visualize
the three-panel structure and ensure
that all elements are placed correctly.

Three-Panel Layout: The application should have a left panel, a
middle panel, and a right panel. Each panel will serve a specific
purpose as outlined in your project documentation.

2.  Implementing Resizable Panels

Use CSS Grid or Flexbox: These CSS techniques are ideal for creating a
flexible and responsive layout. Here's a basic example using CSS Grid:

\<div class="container"\>   \<div class="left-panel"\>Left Panel
</div>
  \<div class="middle-panel"\>Middle Panel
</div>
  \<div class="right-panel"\>Right Panel
</div>
</div>

.container {   display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Adjust the fractions to change panel sizes */
  height: 100vh; /* Full viewport height */ }

.left-panel, .middle-panel, .right-panel {
  overflow: auto; /* Ensure content is scrollable */ }

Resizable Panels: Consider using JavaScript libraries
like react-resizable or split.js if you need
more advanced resizing capabilities.

3.  Handling Window Events

Listen for Resize Events: Use JavaScript to adjust the layout
dynamically when the window is resized.
This ensures that the UI remains user-friendly on different screen sizes.

window.addEventListener('resize', () =\> {
  // Logic to adjust layout or re-render components if necessary });

4.  Dependencies and Tools

Electron: Ensure you have Electron set up to create the main application
window using BrowserWindow.

HTML/CSS/JavaScript: Use these technologies to build the UI components
and handle interactions.

Node.js: Ensure Node.js is installed to manage dependencies and run the
Electron app.

5.  Logic Flow

Initialize the Main Window:
Use Electron's BrowserWindow to create the main application window. Set
the webPreferences to enable context isolation and use the preload
script.

Load the HTML File: The HTML file should include the structure for the
three panels.

Apply CSS for Layout: Use the CSS Grid or Flexbox styles to arrange the
panels.

Add JavaScript for Interactivity: Implement event listeners for window
resizing and any other interactions needed for the panels.

6.  Testing and Verification

Responsive Testing: Test the application on different screen sizes to
ensure the layout adapts correctly.

Functionality Testing: Verify that all UI elements are interactive and
perform their intended functions.

## Section Analysis: Back-end Features

Overview

This section requires implementing two main services:

File System Service - For handling file operations

OpenAI Integration - For AI-powered features

Implementation Plan

1.  File System Service

First, let's create a robust FileSystemService class that handles all
file operations:

FileSystemService.ts

Apply

import { dialog } from 'electron'; import * as fs from 'fs/promises';
import * as path from 'path';
import { FILE_SYSTEM_CONFIG } from '../config/fileSystemConfig';

interface FileOperationResult {   success: boolean;   data?: any;
  error?: string; }

export class FileSystemService {
  private static instance: FileSystemService;   
  private constructor() {}   
  static getInstance(): FileSystemService {
    if (!FileSystemService.instance) {
      FileSystemService.instance = new FileSystemService();     }
    return FileSystemService.instance;   }

  async readFile(filePath: string): Promise`<FileOperationResult>`{=html} {
    try {       const data = await fs.readFile(filePath, 'utf-8');
      return { success: true, data };     } catch (error) {
      return {          success: false, 
        error: `Error reading file: ${error.message}`        };     }
  }

  async writeFile(filePath: string, content: string): Promise`<FileOperationResult>`{=html} {
    try {       await fs.writeFile(filePath, content, 'utf-8');
      return { success: true };     } catch (error) {       return { 
        success: false, 
        error: `Error writing file: ${error.message}`        };     }
  }

  async selectDirectory(panelId: keyof typeof FILE_SYSTEM_CONFIG.panelConfigs): Promise`<FileOperationResult>`{=html} {
    try {
      const config = FILE_SYSTEM_CONFIG.panelConfigs\[panelId\];       
      if (!config.enabled) {
        throw new Error(`File selection not enabled for panel: ${panelId}`);
      }

      const result = await dialog.showOpenDialog({
        properties: config.properties,         filters: config.filters
      });

      if (result.canceled) {
        return { success: false, error: 'Selection cancelled' };       }

      return { success: true, data: result.filePaths\[0\] };
    } catch (error) {       return {          success: false, 
        error: `Error selecting directory: ${error.message}`        };
    }   }

  async listDirectoryContents(directoryPath: string): Promise`<FileOperationResult>`{=html} {
    try {
      const entries = await fs.readdir(directoryPath, { withFileTypes: true });
      const files = entries
        .filter(entry =\> entry.isFile() && !entry.name.startsWith('.'))
        .map(entry =\> entry.name);       
      return { success: true, data: files };     } catch (error) {
      return {          success: false, 
        error: `Error listing directory: ${error.message}`        };
    }   } }

2.  OpenAI Integration Service

Now, let's implement the OpenAI service with proper error handling and
API key management:

OpenAIService.ts

Apply

import OpenAI from 'openai'; import \* as keytar from 'keytar';
import { GPT_CONFIG } from '../config/openaiConfig';

interface AIResponse {   success: boolean;   content?: string;
  error?: string; }

export class OpenAIService {   private static instance: OpenAIService;
  private client: OpenAI \| null = null;
  private readonly SERVICE_NAME = 'electron-writing-app';
  private readonly ACCOUNT_NAME = 'openai-api-key';

  private constructor() {}

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();     }
    return OpenAIService.instance;   }

  async initialize(): Promise`<boolean>`{=html} {     try {
      const apiKey = await this.getApiKey();
      if (!apiKey) return false;       
      this.client = new OpenAI({ apiKey });       return true;
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      return false;     }   }

  async getApiKey(): Promise\<string \| null\> {     try {
      return await keytar.getPassword(this.SERVICE_NAME, this.ACCOUNT_NAME);
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;     }   }

  async setApiKey(apiKey: string): Promise`<boolean>`{=html} {     try {
      await keytar.setPassword(this.SERVICE_NAME, this.ACCOUNT_NAME, apiKey);
      return await this.initialize();     } catch (error) {
      console.error('Error saving API key:', error);       return false;
    }   }

  async getCompletion(prompt: string): Promise`<AIResponse>`{=html} {
    try {       if (!this.client) {
        throw new Error('OpenAI client not initialized');       }

      const response = await this.client.chat.completions.create({
        ...GPT_CONFIG,
        messages: \[{ role: 'user', content: prompt }\]       });

      return {         success: true,
        content: response.choices\[0\].message.content       };
    } catch (error) {       return {         success: false,
        error: `AI request failed: ${error.message}`       };     }   }
}

3.  IPC Handler Setup

Finally, let's set up the IPC handlers in the main process:

backendHandlers.ts

Apply

import { ipcMain } from 'electron';
import { FileSystemService } from '../services/FileSystemService';
import { OpenAIService } from '../services/OpenAIService';

export function setupBackendHandlers() {
  const fs = FileSystemService.getInstance();
  const ai = OpenAIService.getInstance();

  // File System handlers
  ipcMain.handle('select-directory', async (\_, panelId) =\> {
    return await fs.selectDirectory(panelId);   });

  ipcMain.handle('read-file', async (\_, path) =\> {
    return await fs.readFile(path);   });

  ipcMain.handle('write-file', async (\_, path, content) =\> {
    return await fs.writeFile(path, content);   });

  ipcMain.handle('list-directory', async (\_, path) =\> {
    return await fs.listDirectoryContents(path);   });

  // OpenAI handlers
  ipcMain.handle('set-api-key', async (\_, apiKey) =\> {
    return await ai.setApiKey(apiKey);   });

  ipcMain.handle('get-ai-completion', async (\_, prompt) =\> {
    return await ai.getCompletion(prompt);   }); }

Dependencies

electron - For IPC and dialog functionality

openai - For OpenAI API integration

keytar - For secure API key storage

fs/promises - For file system operations

Installation

npm install openai keytar

Key Features

Singleton pattern for services

Comprehensive error handling

Type safety with TypeScript

Secure API key management

Cross-platform compatibility

Proper resource cleanup

Testing Strategy

Unit tests for individual service methods

Integration tests for IPC communication

E2E tests for file operations

Mock OpenAI responses for testing

## Section Analysis: Overall UI Architecture

Overview

Based on the documentation, we need to create a three-panel desktop
application with complex state management, real-time updates, and
cross-platform compatibility. The UI needs to be responsive and
maintain consistent styling across platforms.

Architecture Decision

After analyzing the requirements and Electron's best practices1, I
recommend using React with TypeScript for the following reasons:

Better TypeScript integration for type safety

Component-based architecture aligns with the panel structure

Robust state management options

Large ecosystem of UI components

Strong developer tooling support

Implementation Plan

1.  Project Structure

index.tsx

Apply

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App'; import './styles/global.css';

const root = createRoot(document.getElementById('root')!);
root.render(\<App /\>);

2.  State Management

We'll use Zustand for state management as it's lightweight and works
well with TypeScript:

appStore.ts

Apply

import create from 'zustand';

interface AppState {   activePanel: 'left' \| 'middle' \| 'right';
  currentPrompt: string \| null;   editorContent: string;
  criteria: string\[\];   settings: {     theme: 'light' \| 'dark';
    fontSize: number;   };
  setActivePanel: (panel: AppState\['activePanel'\]) =\> void;
  setEditorContent: (content: string) =\> void;   // ... other actions }

export const useAppStore = create`<AppState>`{=html}((set) =\> ({
  activePanel: 'middle',   currentPrompt: null,   editorContent: '',
  criteria: \[\],   settings: {     theme: 'light',     fontSize: 14
  },   setActivePanel: (panel) =\> set({ activePanel: panel }),
  setEditorContent: (content) =\> set({ editorContent: content }),
  // ... other actions }));

3.  Layout Component

MainLayout.tsx

Apply

import React from 'react';
import { LeftPanel } from '../Panels/LeftPanel';
import { MiddlePanel } from '../Panels/MiddlePanel';
import { RightPanel } from '../Panels/RightPanel';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = () =\> {   return (
    \<div className={styles.container}\>       \<LeftPanel /\>
      \<MiddlePanel /\>       \<RightPanel /\>     
</div>

  ); };

4.  Styling Setup

MainLayout.module.css

Apply

.container {   display: grid;
  grid-template-columns: minmax(200px, 1fr) minmax(400px, 2fr) minmax(200px, 1fr);
  height: 100vh;   overflow: hidden; }

.panel {   border: 1px solid var(--border-color);   overflow: auto;
  display: flex;   flex-direction: column; }

/* Theme variables */ :root {   --primary-color: #2563eb;
  --background-color: #ffffff;   --text-color: #1f2937;
  --border-color: #e5e7eb; }

\[data-theme='dark'\] {   --primary-color: #3b82f6;
  --background-color: #1f2937;   --text-color: #f3f4f6;
  --border-color: #374151; }

5.  Panel Components

LeftPanel.tsx

Apply

import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Tab } from '../common/Tab';
import styles from './Panel.module.css';

export const LeftPanel: React.FC = () =\> {
  const \[activeTab, setActiveTab\] = React.useState\<'prompts' \| 'assistant'\>('prompts');
     return (     \<div className={styles.panel}\>
      \<div className={styles.tabContainer}\>         \<Tab 
          active={activeTab === 'prompts'} 
          onClick={() =\> setActiveTab('prompts')}         \>
          Writing Prompts         `</Tab>`{=html}         \<Tab 
          active={activeTab === 'assistant'} 
          onClick={() =\> setActiveTab('assistant')}         \>
          AI Assistant         `</Tab>`{=html}       
</div>
      {activeTab === 'prompts' ? \<PromptsContent /\> : \<AssistantContent /\>}
    
</div>

  ); };

6.  IPC Communication Layer

ipc.ts

Apply

import { IpcRendererEvent } from 'electron';

export const ipcBridge = {
  sendMessage: `<T>`{=html}(channel: string, data?: T) =\> {
    return window.electronAPI.send(channel, data);   },   
  onMessage: `<T>`{=html}(channel: string, callback: (data: T) =\> void) =\> {
    const handler = (\_event: IpcRendererEvent, data: T) =\> callback(data);
    window.electronAPI.receive(channel, handler);
    return () =\> window.electronAPI.removeListener(channel, handler);
  } };

7.  Theme Provider

ThemeProvider.tsx

Apply

import React from 'react';
import { useAppStore } from '../store/appStore';

export const ThemeProvider: React.FC\<{ children: React.ReactNode }\> = ({ children }) =\> {
  const theme = useAppStore((state) =\> state.settings.theme);   
  React.useEffect(() =\> {
    document.documentElement.setAttribute('data-theme', theme);
  }, \[theme\]);      return \<\>{children}\</\>; };

Dependencies Required

Add to package.json:

{   "dependencies": {     "react": "\^18.2.0",
    "react-dom": "\^18.2.0",     "zustand": "\^4.4.1",
    "@types/react": "\^18.2.0",     "@types/react-dom": "\^18.2.0",
    "typescript": "\^5.0.0"   },   "devDependencies": {
    "vite": "\^4.4.9",     "@vitejs/plugin-react": "\^4.0.4",
    "postcss": "\^8.4.29",     "autoprefixer": "\^10.4.15"   } }

Build Configuration

vite.config.ts

Apply

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({   plugins: \[react()\],   base: './',
  build: {     outDir: 'dist',     emptyOutDir: true,
    sourcemap: true   } });

Implementation Steps

Initialize the project with the dependencies

Set up the build configuration

Create the folder structure

Implement the state management store

Create the layout components

Implement the panel components

Set up the theme system

Configure IPC communication

Add error boundaries and loading states

Testing Strategy

Unit tests for store actions

Component tests for panels

Integration tests for IPC communication

E2E tests for critical user flows

Key Considerations

Performance: Use React.memo for expensive components

Accessibility: Implement ARIA attributes and keyboard navigation

Error Handling: Implement error boundaries

Cross-Platform: Test on all target platforms

State Persistence: Save state to electron-store

## Section Analysis: Implementation Strategy for Panel Components

Overview

This section focuses on implementing the three main panels (Left,
Middle, Right) of the application, their components, and the data flow
between them.

Dependencies Required

npm install electron electron-store monaco-editor @types/node

Implementation Strategy

1.  Panel Layout Structure

First, let's create the base HTML structure:

index.html

Apply

\<!DOCTYPE html\>
<html>
<head>
    \<meta charset="UTF-8"\>     
<title>
AI Writing Assistant
</title>
    \<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" /\>
    \<link rel="stylesheet" href="styles/main.css"\>
</head>
<body>
    \<div class="container"\>
        \<div id="left-panel" class="panel"\>
            \<div class="tab-container"\>
                \<div class="tab-header"\>
                    \<button class="tab-button active" data-tab="prompts"\>Writing Prompts`</button>`{=html}
                    \<button class="tab-button" data-tab="assistant"\>AI Assistant`</button>`{=html}
                
</div>
                \<div id="prompts-tab" class="tab-content active"\>
</div>
                \<div id="assistant-tab" class="tab-content"\>
</div>
            
</div>
        
</div>
                 \<div id="middle-panel" class="panel"\>
            \<div id="editor-container"\>
</div>
            \<div class="button-container"\>
                \<button id="submit-feedback"\>Submit for Feedback`</button>`{=html}
                \<button id="save-writing"\>Save Writing`</button>`{=html}
                \<button id="clear-editor"\>Clear`</button>`{=html}
            
</div>
        
</div>
                 \<div id="right-panel" class="panel"\>
            \<div class="tab-container"\>
                \<div class="tab-header"\>
                    \<button class="tab-button active" data-tab="feedback"\>AI Feedback`</button>`{=html}
                    \<button class="tab-button" data-tab="criteria"\>Criteria`</button>`{=html}
                    \<button class="tab-button" data-tab="settings"\>Settings`</button>`{=html}
                
</div>
                \<div id="feedback-tab" class="tab-content active"\>
</div>
                \<div id="criteria-tab" class="tab-content"\>
</div>
                \<div id="settings-tab" class="tab-content"\>
</div>
            
</div>
        
</div>
    
</div>
    \<script src="renderer.js" type="module"\>`</script>`{=html}
</body>
</html>

2.  Panel Manager Class

Create a central manager for panel coordination:

PanelManager.ts

Apply

import { EventEmitter } from 'events';

export class PanelManager extends EventEmitter {
    private static instance: PanelManager;
    private panels: Map\<string, HTMLElement\>;     
    private constructor() {         super();
        this.panels = new Map();     }     
    static getInstance(): PanelManager {
        if (!PanelManager.instance) {
            PanelManager.instance = new PanelManager();         }
        return PanelManager.instance;     }     
    registerPanel(id: string, element: HTMLElement): void {
        this.panels.set(id, element);     }     
    getPanel(id: string): HTMLElement \| undefined {
        return this.panels.get(id);     }     
    emitPanelEvent(panelId: string, eventName: string, data: any): void {
        this.emit(`${panelId}:${eventName}`, data);     } }

3.  Base Panel Class

Create a base class for common panel functionality:

BasePanel.ts

Apply

import { PanelManager } from './PanelManager';

export abstract class BasePanel {     protected element: HTMLElement;
    protected panelManager: PanelManager;     
    constructor(elementId: string) {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element with id ${elementId} not found`);
                 this.element = element;
        this.panelManager = PanelManager.getInstance();
        this.panelManager.registerPanel(elementId, element);         
        this.initialize();     }     
    protected abstract initialize(): void;     
    protected emit(eventName: string, data: any): void {
        this.panelManager.emitPanelEvent(this.element.id, eventName, data);
    }     
    protected on(eventName: string, callback: (data: any) =\> void): void {
        this.panelManager.on(`${this.element.id}:${eventName}`, callback);
    } }

4.  Left Panel Implementation

LeftPanel.ts

Apply

import { BasePanel } from './BasePanel';
import { dialog } from '@electron/remote';

export class LeftPanel extends BasePanel {
    private promptsTab: HTMLElement;
    private assistantTab: HTMLElement;          constructor() {
        super('left-panel');     }     
    protected initialize(): void {
        this.promptsTab = document.getElementById('prompts-tab')!;
        this.assistantTab = document.getElementById('assistant-tab')!;
                 this.setupTabs();         this.setupFolderSelection();
    }          private setupTabs(): void {
        const tabButtons = this.element.querySelectorAll('.tab-button');
        tabButtons.forEach(button =\> {
            button.addEventListener('click', () =\> {
                const tabName = button.getAttribute('data-tab')!;
                this.switchTab(tabName);             });         });
    }          private async setupFolderSelection(): void {
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select Prompt Folder';
        selectButton.addEventListener('click', async () =\> {
            const result = await dialog.showOpenDialog({
                properties: \['openDirectory'\]             });
                         if (!result.canceled) {
                const folderPath = result.filePaths\[0\];
                this.emit('folder-selected', folderPath);             }
        });                  this.promptsTab.appendChild(selectButton);
    }          private switchTab(tabName: string): void {
        const tabs = this.element.querySelectorAll('.tab-content');
        const buttons = this.element.querySelectorAll('.tab-button');
                 tabs.forEach(tab =\> tab.classList.remove('active'));
        buttons.forEach(button =\> button.classList.remove('active'));
        
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
        this.element.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    } }

5.  Preload Script Updates

preload.ts

Apply

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: async () =\> {
        return await ipcRenderer.invoke('dialog:selectFolder');     },
         saveFile: async (content: string, defaultPath?: string) =\> {
        return await ipcRenderer.invoke('dialog:saveFile', content, defaultPath);
    },          readFolder: async (folderPath: string) =\> {
        return await ipcRenderer.invoke('fs:readFolder', folderPath);
    } }); import { contextBridge, ipcRenderer } from 'electron';

6.  Main Process IPC Handlers

main.ts

Apply

import { ipcMain, dialog } from 'electron';
import * as fs from 'fs/promises'; import * as path from 'path';

// ... existing main process code ...

ipcMain.handle('dialog:selectFolder', async () =\> {
    const result = await dialog.showOpenDialog({
        properties: \['openDirectory'\]     });
    return result.canceled ? undefined : result.filePaths\[0\]; });

ipcMain.handle('dialog:saveFile', async (event, content: string, defaultPath?: string) =\> {
    const result = await dialog.showSaveDialog({         defaultPath,
        filters: \[
            { name: 'Text Files', extensions: \['txt'\] }         \]
    });          if (!result.canceled && result.filePath) {
        await fs.writeFile(result.filePath, content, 'utf8');
        return result.filePath;     }     return undefined; });

ipcMain.handle('fs:readFolder', async (event, folderPath: string) =\> {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    return files         .filter(file =\> file.isFile())
        .map(file =\> ({             name: file.name,
            path: path.join(folderPath, file.name)         })); });

Data Flow and Event Handling

Panel Communication Flow:

Panels communicate through the PanelManager using events

Events are namespaced by panel ID to prevent conflicts

All panel state changes emit events for other panels to react to

Event Types:

events.ts

Apply

export interface PanelEvents {     'folder-selected': string;
    'content-changed': string;     'feedback-requested': string;
    'criteria-selected': string;
    'settings-updated': Record\<string, any\>; }

Testing Strategy

Unit Tests:

PanelManager.test.ts

Apply

import { PanelManager } from '../components/PanelManager';

describe('PanelManager', () =\> {     let manager: PanelManager;     
    beforeEach(() =\> {         manager = PanelManager.getInstance();
    });          test('should register panel', () =\> {
        const element = document.createElement('div');
        manager.registerPanel('test-panel', element);
        expect(manager.getPanel('test-panel')).toBe(element);     });
});

Security Considerations

Content Security Policy in index.html restricts script sources

IPC communication is limited to necessary functions

File system access is restricted to user-selected directories only

Next Steps

Implement the Middle and Right panels following similar patterns

Add error handling and loading states

Implement the Monaco editor integration for the middle panel

Add persistence for panel states and user preferences

## Section Analysis: Testing Strategy Overview

Intent

Create a robust testing framework for the Electron application that
covers unit tests, integration tests, and end-to-end testing using Jest
and Spectron.1

Implementation Plan

1.  Setup Testing Environment

First, let's install the necessary dependencies:

npm install --save-dev jest @types/jest ts-jest @testing-library/jest-dom
npm install --save-dev spectron @types/spectron
npm install --save-dev electron-mocha

2.  Configure Jest for TypeScript

Create a jest.config.js file in the project root:

jest.config.js

Apply

/\*\* @type {import('ts-jest').JestConfigWithTsJest} \*/
module.exports = {   preset: 'ts-jest',   testEnvironment: 'node',
  roots: \['`<rootDir>`{=html}/src'\],   testMatch: \[
    '**/**tests**/**/\*.+(ts\|tsx\|js)',
    '\*\*/?(\*.)+(spec\|test).+(ts\|tsx\|js)'   \],   transform: {
    '\^.+\\.(ts\|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '`<rootDir>`{=html}/src/\$1'   },
  collectCoverage: true,   coverageDirectory: 'coverage',
  coverageReporters: \['text', 'lcov'\],
  testPathIgnorePatterns: \['/node_modules/', '/dist/'\] };

3.  Create Test Setup File

setup.ts

Apply

import '@testing-library/jest-dom';

// Mock electron jest.mock('electron', () =\> ({   app: {
    getPath: jest.fn()   },   ipcMain: {     handle: jest.fn(),
    on: jest.fn()   },   ipcRenderer: {     invoke: jest.fn(),
    on: jest.fn()   } }));

4.  Create Test Utilities

TestHelper.ts

Apply

import { Application } from 'spectron'; import \* as path from 'path';

export class TestHelper {   static async createSpectronApp() {
    const app = new Application({       path: require('electron'),
      args: \[path.join(\_\_dirname, '../../')\],
      startTimeout: 10000     });

    await app.start();     return app;   }

  static async cleanupSpectronApp(app: Application) {
    if (app && app.isRunning()) {       await app.stop();     }   } }

5.  Implement Test Examples

Unit Tests

FileSystemService.test.ts

Apply

import FileSystemService from '../FileSystemService';
import { dialog } from 'electron'; import \* as fs from 'fs/promises';

jest.mock('electron', () =\> ({   dialog: {
    showOpenDialog: jest.fn()   } }));

jest.mock('fs/promises');

describe('FileSystemService', () =\> {   beforeEach(() =\> {
    jest.clearAllMocks();   });

  describe('selectDirectory', () =\> {
    it('should return selected directory path', async () =\> {
      const mockPath = '/test/path';
      (dialog.showOpenDialog as jest.Mock).mockResolvedValue({
        canceled: false,         filePaths: \[mockPath\]       });

      const result = await FileSystemService.selectDirectory('left');
      expect(result).toBe(mockPath);     });

    it('should return null when selection is canceled', async () =\> {
      (dialog.showOpenDialog as jest.Mock).mockResolvedValue({
        canceled: true,         filePaths: \[\]       });

      const result = await FileSystemService.selectDirectory('left');
      expect(result).toBeNull();     });   }); });

Integration Tests

AppIntegration.test.ts

Apply

import { Application } from 'spectron';
import { TestHelper } from '../../test/utils/TestHelper';

describe('Application Integration', () =\> {   let app: Application;

  beforeEach(async () =\> {
    app = await TestHelper.createSpectronApp();   });

  afterEach(async () =\> {     await TestHelper.cleanupSpectronApp(app);
  });

  it('shows initial window', async () =\> {
    const windowCount = await app.client.getWindowCount();
    expect(windowCount).toBe(1);   });

  it('has correct title', async () =\> {
    const title = await app.client.getTitle();
    expect(title).toBe('AI Writing Assistant');   }); });

6.  Add NPM Scripts

Update package.json:

package.json

Apply

{   "scripts": {     "test": "jest",     "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "jest --config jest.e2e.config.js",
    "test:integration": "electron-mocha --require ts-node/register \"src/integration/\*\*/\*.test.ts\""
  } }

7.  Create E2E Test Configuration

jest.e2e.config.js

Apply

const baseConfig = require('./jest.config');

module.exports = {   ...baseConfig,
  testMatch: \['\*\*/?(\*.)+(e2e-spec\|e2e-test).+(ts\|tsx\|js)'\],
  testTimeout: 30000,
  setupFilesAfterEnv: \['`<rootDir>`{=html}/src/test/e2e-setup.ts'\] };

Key Implementation Notes

Test Organization:

Unit tests go in **tests** directories next to the files they test

Integration tests go in src/integration

E2E tests go in src/e2e

Test Coverage:

Aim for at least 80% code coverage

Focus on critical paths and error handling

Use Jest's coverage reporting to identify gaps

Continuous Integration:

Add GitHub Actions workflow for automated testing

Run tests on pull requests and main branch commits

Best Practices:

Mock external dependencies

Use beforeEach/afterEach for test setup/cleanup

Follow AAA pattern (Arrange, Act, Assert)

Keep tests focused and isolated

Dependencies

Jest: Testing framework

Spectron: Testing utility for Electron apps

ts-jest: TypeScript support for Jest

electron-mocha: Test runner for Electron

@testing-library/jest-dom: DOM testing utilities

Verification Steps

Run npm test to execute unit tests

Run npm run test:integration for integration tests

Run npm run test:coverage to generate coverage report

Verify all critical paths are covered

Ensure tests pass in CI environment

This implementation provides a solid foundation for testing the Electron
application, covering unit tests, integration tests, and E2E testing
scenarios. The setup is extensible and can be enhanced as the
application grows.

## Section Analysis: Best Practices Overview

Overview

This section focuses on implementing robust architectural patterns and
development practices for the Electron application. The main components
are:

Component Registration System

Type-First Development

Documentation System

Implementation Plan

1.  Component Registration System

Let's create a more robust component registry that includes type safety,
error handling, and lifecycle management.

ComponentRegistry.ts

Apply

import { EventEmitter } from 'events';

// Define component interface export interface IComponent {
  name: string;   init?: () =\> Promise`<void>`{=html};
  destroy?: () =\> Promise`<void>`{=html}; }

// Define registry events export enum RegistryEvent {
  COMPONENT_REGISTERED = 'componentRegistered',
  COMPONENT_UNREGISTERED = 'componentUnregistered',   ERROR = 'error' }

export class ComponentRegistry extends EventEmitter {
  private static instance: ComponentRegistry;
  private components: Map\<string, IComponent\>;
  private initialized: Set`<string>`{=html};

  private constructor() {     super();     this.components = new Map();
    this.initialized = new Set();   }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();     }
    return ComponentRegistry.instance;   }

  public async register(component: IComponent): Promise`<void>`{=html} {
    try {       // Validate component       if (!component.name) {
        throw new Error('Component must have a name');       }

      // Check for duplicate registration
      if (this.components.has(component.name)) {
        throw new Error(`Component ${component.name} is already registered`);
      }

      // Register component
      this.components.set(component.name, component);

      // Initialize if init method exists       if (component.init) {
        await component.init();
        this.initialized.add(component.name);       }

      this.emit(RegistryEvent.COMPONENT_REGISTERED, component.name);
    } catch (error) {       this.emit(RegistryEvent.ERROR, error);
      throw error;     }   }

  public async unregister(name: string): Promise`<void>`{=html} {
    try {       const component = this.components.get(name);
      if (!component) {
        throw new Error(`Component ${name} not found`);       }

      // Cleanup if destroy method exists       if (component.destroy) {
        await component.destroy();       }

      this.components.delete(name);       this.initialized.delete(name);
      this.emit(RegistryEvent.COMPONENT_UNREGISTERED, name);
    } catch (error) {       this.emit(RegistryEvent.ERROR, error);
      throw error;     }   }

  public get\<T extends IComponent\>(name: string): T {
    const component = this.components.get(name) as T;
    if (!component) {
      throw new Error(`Component ${name} not found`);     }
    return component;   }

  public isInitialized(name: string): boolean {
    return this.initialized.has(name);   }

  public getRegisteredComponents(): string\[\] {
    return Array.from(this.components.keys());   } }

2.  Type-First Development

Let's implement the type system for our components:

components.ts

Apply

// Panel component interfaces
export interface IPanelComponent extends IComponent {
  render(): HTMLElement;   update(data: any): void;   getState(): any; }

// Left panel specific interface
export interface ILeftPanelComponent extends IPanelComponent {
  setPrompts(prompts: string\[\]): void;
  onPromptSelect(callback: (prompt: string) =\> void): void; }

// Middle panel specific interface
export interface IMiddlePanelComponent extends IPanelComponent {
  setText(text: string): void;   getText(): string;
  onTextChange(callback: (text: string) =\> void): void; }

// Right panel specific interface
export interface IRightPanelComponent extends IPanelComponent {
  setFeedback(feedback: string): void;
  setCriteria(criteria: string\[\]): void;
  onCriteriaSelect(callback: (criteria: string\[\]) =\> void): void; }

3.  Documentation System

Let's set up JSDoc configuration and documentation patterns:

jsdoc.config.js

Apply

module.exports = {   source: {     include: \['src'\],
    exclude: \['node_modules', 'dist'\],
    includePattern: '.+\\.ts(x)?\$'   },
  plugins: \['plugins/markdown'\],   opts: {
    template: 'templates/default',     destination: 'docs',
    recurse: true,     readme: 'README.md'   },   templates: {
    cleverLinks: false,     monospaceLinks: false   },   tags: {
    allowUnknownTags: true,     dictionaries: \['jsdoc', 'closure'\]   }
};

Example of documented component implementation:

LeftPanel.ts

Apply

import { ILeftPanelComponent } from '../types/components';

/\*\*  * Left Panel Component  * @implements {ILeftPanelComponent}
 * @description Manages the left panel of the application, containing writing prompts and AI assistant
 */ export class LeftPanel implements ILeftPanelComponent {
  private element: HTMLElement;   private prompts: string\[\] = \[\];
  private promptCallback?: (prompt: string) =\> void;

  /\*\*    * Creates an instance of LeftPanel
   * @throws {Error} If required DOM elements are not found    \*/
  constructor() {     this.element = document.createElement('div');
    this.element.className = 'left-panel';   }

  /\*\*    * Initializes the component    * @async
   * @returns {Promise`<void>`{=html}}    */
  async init(): Promise`<void>`{=html} {     // Implementation   }

  /\*\*    * Updates the list of available prompts
   * @param {string\[\]} prompts - Array of writing prompts
   * @throws {Error} If prompts parameter is invalid    */
  setPrompts(prompts: string\[\]): void {
    if (!Array.isArray(prompts)) {
      throw new Error('Prompts must be an array');     }
    this.prompts = prompts;     this.render();   }

  // ... other implementations }

Usage Example

Here's how to use these implementations together:

main.ts

Apply

import { ComponentRegistry } from './core/registry/ComponentRegistry';
import { LeftPanel } from './components/LeftPanel';

async function initializeApp() {
  const registry = ComponentRegistry.getInstance();

  // Register components   const leftPanel = new LeftPanel();
  await registry.register(leftPanel);

  // Use registered components
  const panel = registry.get`<LeftPanel>`{=html}('LeftPanel');
  panel.setPrompts(\['Prompt 1', 'Prompt 2'\]);

  // Listen for registry events
  registry.on(RegistryEvent.COMPONENT_REGISTERED, (name) =\> {
    console.log(`Component ${name} registered`);   }); }

initializeApp().catch(console.error);

Dependencies Required

Development Dependencies:

{   "devDependencies": {     "typescript": "\^4.9.0",
    "jsdoc": "\^4.0.0",     "@types/node": "\^16.0.0",
    "typedoc": "\^0.24.0",     "eslint": "\^8.0.0",
    "@typescript-eslint/parser": "\^5.0.0",
    "@typescript-eslint/eslint-plugin": "\^5.0.0"   } }

Scripts to add to package.json:

{   "scripts": {     "docs": "jsdoc -c jsdoc.config.js",
    "type-check": "tsc --noEmit",
    "lint": "eslint 'src/\*\*/\*.{js,ts}'",
    "build-docs": "typedoc --out docs src/"   } }

Testing Strategy

Create test files for the component registry:

ComponentRegistry.test.ts

Apply

import { ComponentRegistry, IComponent, RegistryEvent } from '../core/registry/ComponentRegistry';

describe('ComponentRegistry', () =\> {
  let registry: ComponentRegistry;

  beforeEach(() =\> {     registry = ComponentRegistry.getInstance();
  });

  test('should register a component', async () =\> {
    const component: IComponent = {       name: 'TestComponent',
      init: jest.fn()     };

    await registry.register(component);
    expect(registry.get('TestComponent')).toBe(component);
    expect(component.init).toHaveBeenCalled();   });

  // Add more tests... });

Implementation Notes

The Component Registry uses the Singleton pattern to ensure only one
registry exists.

Event emitter integration allows for reactive programming patterns.

3.  Async initialization and cleanup support proper lifecycle
    management.

Type safety is enforced through TypeScript interfaces.

Documentation follows JSDoc standards for automatic documentation
generation.

# Best Practices Implementation

## Component Registration System

1.  Define a Base Component Interface

Create a base interface for components to ensure they adhere
to a standard structure.
This interface will include optional init and destroy methods for lifecycle management.

IComponent.ts

Apply

export interface IComponent {   name: string;
  init?: () =\> Promise`<void>`{=html};
  destroy?: () =\> Promise`<void>`{=html}; }

2.  Implement the Component Registry

The ComponentRegistry class will manage the registration,
initialization, and destruction of components.
It will also handle singleton instantiation to ensure only one instance of
the registry exists.

ComponentRegistry.ts

Apply

import { EventEmitter } from 'events';
import { IComponent } from './IComponent';

export class ComponentRegistry extends EventEmitter {
  private static instance: ComponentRegistry;
  private components: Map\<string, IComponent\> = new Map();
  private initialized: Set`<string>`{=html} = new Set();

  private constructor() {     super();   }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();     }
    return ComponentRegistry.instance;   }

  public async register(component: IComponent): Promise`<void>`{=html} {
    if (this.components.has(component.name)) {
      throw new Error(`Component ${component.name} is already registered.`);
    }     this.components.set(component.name, component);

    if (component.init) {       await component.init();
      this.initialized.add(component.name);     }

    this.emit('componentRegistered', component.name);   }

  public async unregister(name: string): Promise`<void>`{=html} {
    const component = this.components.get(name);     if (!component) {
      throw new Error(`Component ${name} not found.`);     }

    if (component.destroy) {       await component.destroy();     }

    this.components.delete(name);     this.initialized.delete(name);
    this.emit('componentUnregistered', name);   }

  public getComponent\<T extends IComponent\>(name: string): T {
    const component = this.components.get(name) as T;
    if (!component) {
      throw new Error(`Component ${name} not found.`);     }
    return component;   }

  public isInitialized(name: string): boolean {
    return this.initialized.has(name);   } }

3.  Create and Register Components

Define components that implement the IComponent interface.
Register these components with the ComponentRegistry.

LeftPanel.ts

Apply

import { IComponent } from '../core/registry/IComponent';

export class LeftPanel implements IComponent {   name = 'LeftPanel';

  async init() {     // Initialization logic   }

  async destroy() {     // Cleanup logic   }

  render(): HTMLElement {     // Render the component
    const element = document.createElement('div');
    element.innerText = 'Left Panel';     return element;   } }

4.  Register Components in the Main Application

In the main application file, instantiate the ComponentRegistry and
register components.

main.ts

Apply

import { ComponentRegistry } from './core/registry/ComponentRegistry';
import { LeftPanel } from './components/LeftPanel';

(async () =\> {   const registry = ComponentRegistry.getInstance();
  const leftPanel = new LeftPanel();
  await registry.register(leftPanel);

  // Access the component
  const panel = registry.getComponent`<LeftPanel>`{=html}('LeftPanel');
  document.body.appendChild(panel.render()); })();

Dependencies and Tools

TypeScript: Ensure TypeScript is set up with strict type checking to
catch errors early.

Node.js: Required for running the application.

EventEmitter: Used for handling events within the ComponentRegistry.

Logic Flow

Component Definition: Define components using the IComponent interface.

2. Registry Initialization: Use a singleton
pattern to ensure a single instance of ComponentRegistry.

Component Registration: Register components with the registry,
initializing them if necessary.

Component Management: Use the registry to manage component lifecycles,
including initialization and destruction.

Testing and Verification

Unit Tests: Write tests for the ComponentRegistry to ensure components
are registered, retrieved, and unregistered correctly.

Integration Tests: Verify that components interact correctly with the
registry and the application.

## Section Analysis: Type-First Development

Overview

This section focuses on implementing a robust type system using
TypeScript to ensure type safety and maintainability across the
application.

Key Components Required

TypeScript Configuration

Base Interfaces and Types

Component Type Definitions

Type Guards and Utilities

Integration with Electron IPC

Implementation Plan

1.  Project Structure

src/ ├── types/ │   ├── components.ts │   ├── panels.ts │   ├── ipc.ts
│   └── utils.ts ├── components/ │   ├── LeftPanel.ts
│   ├── MiddlePanel.ts │   └── RightPanel.ts └── utils/
    └── typeGuards.ts

2.  Base Type Definitions

components.ts

Apply

export interface BaseComponent {   id: string;   name: string;
  isVisible: boolean;   initialize(): Promise`<void>`{=html};
  destroy(): Promise`<void>`{=html}; }

export interface PanelComponent extends BaseComponent {
  position: 'left' \| 'middle' \| 'right';   width: number;
  height: number;   render(): HTMLElement;
  update(data: unknown): void;
  resize(width: number, height: number): void; }

export interface TabComponent extends BaseComponent {
  parentPanel: PanelComponent;   isActive: boolean;   activate(): void;
  deactivate(): void; }

panels.ts

Apply

import { PanelComponent, TabComponent } from './components';

export interface LeftPanelConfig {   promptsFolder?: string;
  aiAssistantEnabled: boolean; }

export interface LeftPanel extends PanelComponent {
  config: LeftPanelConfig;   setPrompts(prompts: string\[\]): void;
  clearPrompts(): void;   getCurrentPrompt(): string \| null; }

export interface MiddlePanel extends PanelComponent {   content: string;
  wordCount: number;   setContent(content: string): void;
  getContent(): string;   clear(): void; }

export interface RightPanel extends PanelComponent {
  feedback: string \| null;   criteria: string\[\];
  setCriteria(criteria: string\[\]): void;
  setFeedback(feedback: string): void; }

3.  Type Guards Implementation

typeGuards.ts

Apply

import { BaseComponent, PanelComponent, TabComponent } from '../types/components';
import { LeftPanel, MiddlePanel, RightPanel } from '../types/panels';

export function isBaseComponent(obj: unknown): obj is BaseComponent {
  return (     typeof obj === 'object' &&     obj !== null &&
    'id' in obj &&     'name' in obj &&     'isVisible' in obj &&
    typeof (obj as BaseComponent).initialize === 'function' &&
    typeof (obj as BaseComponent).destroy === 'function'   ); }

export function isPanelComponent(obj: unknown): obj is PanelComponent {
  return (     isBaseComponent(obj) &&     'position' in obj &&
    'width' in obj &&     'height' in obj &&
    typeof (obj as PanelComponent).render === 'function' &&
    typeof (obj as PanelComponent).update === 'function'   ); }

export function isLeftPanel(obj: unknown): obj is LeftPanel {   return (
    isPanelComponent(obj) &&     'config' in obj &&
    typeof (obj as LeftPanel).setPrompts === 'function'   ); }

4.  IPC Type Definitions

ipc.ts

Apply

export interface IPCMessage\<T = unknown\> {   channel: string;
  payload: T;   timestamp: number; }

export interface IPCResponse\<T = unknown\> {   success: boolean;
  data?: T;   error?: string; }

export type IPCHandler\<T = unknown, R = unknown\> = (
  message: IPCMessage`<T>`{=html}
) =\> Promise\<IPCResponse`<R>`{=html}\>;

export interface IPCChannel {   name: string;   handler: IPCHandler; }

5.  Configuration

tsconfig.json

Apply

{   "compilerOptions": {     "target": "ES2021",
    "module": "commonjs",     "lib": \["dom", "es2021"\],
    "strict": true,     "noImplicitAny": true,
    "strictNullChecks": true,     "noUnusedLocals": true,
    "noImplicitReturns": true,     "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",     "resolveJsonModule": true,
    "esModuleInterop": true,     "allowSyntheticDefaultImports": true,
    "sourceMap": true,     "outDir": "dist",     "baseUrl": ".",
    "paths": {       "@/\*": \["src/\*"\]     }   },
  "include": \["src/\*\*/\*"\],   "exclude": \["node_modules", "dist"\]
}

Testing Strategy

typeGuards.test.ts

Apply

import { isBaseComponent, isPanelComponent, isLeftPanel } from '../utils/typeGuards';
import { LeftPanel } from '../components/LeftPanel';

describe('Type Guards', () =\> {
  test('isBaseComponent correctly identifies BaseComponent', () =\> {
    const mockComponent = {       id: '1',       name: 'test',
      isVisible: true,       initialize: async () =\> {},
      destroy: async () =\> {}     };
    expect(isBaseComponent(mockComponent)).toBe(true);
    expect(isBaseComponent({})).toBe(false);   }); });

Dependencies Required

TypeScript: npm install --save-dev typescript @types/node

ESLint with TypeScript: npm install --save-dev eslint
@typescript-eslint/parser @typescript-eslint/eslint-plugin

Jest for TypeScript: npm install --save-dev jest @types/jest ts-jest

Implementation Notes

All components must implement their respective interfaces

Use type guards when handling dynamic data or IPC messages

Avoid using any type - prefer unknown for maximum type safety

Implement proper error handling with custom error types

Use TypeScript's strict mode to catch potential issues early

## Section Analysis: Documentation System

Overview

This section focuses on implementing a comprehensive documentation
system using JSDoc, TypeDoc, and structured documentation files. The
goal is to maintain clear, up-to-date documentation that helps
developers understand and maintain the codebase.

Implementation Plan

1.  Project Structure Setup

First, let's create the necessary directory structure and configuration
files:

mkdir -p docs/api mkdir -p docs/guides mkdir -p .github/CONTRIBUTING
touch typedoc.json touch .jsdoc.conf.json

2.  Configuration Files

TypeDoc Configuration

typedoc.json

Apply

{   "entryPoints": \["src/"\],   "out": "docs/api",
  "exclude": \["\*\*/\*.spec.ts", "\*\*/\*.test.ts"\],
  "theme": "default",   "excludePrivate": true,
  "excludeProtected": false,   "excludeExternals": true,
  "includeVersion": true,   "categorizeByGroup": true,
  "categoryOrder": \["Core", "Components", "Services", "\*"\],
  "readme": "none",   "name": "AI Writing Assistant Documentation" }

JSDoc Configuration

.jsdoc.conf.json

Apply

{   "tags": {     "allowUnknownTags": true,
    "dictionaries": \["jsdoc", "closure"\]   },   "source": {
    "include": \["src"\],     "includePattern": ".+\\.ts(x)?\$",
    "excludePattern": "(\^\|\\/\|\\\\)\_"   },   "plugins": \[
    "plugins/markdown",     "node_modules/jsdoc-typescript"   \],
  "typescript": {     "moduleRoot": "src"   },   "templates": {
    "cleverLinks": true,     "monospaceLinks": true   },   "opts": {
    "destination": "./docs/jsdoc",     "recurse": true,
    "readme": "./README.md"   } }

3.  Documentation Generator Service

Let's create a service to manage documentation generation:

DocumentationService.ts

Apply

import { exec } from 'child_process'; import { promisify } from 'util';
import * as fs from 'fs/promises'; import * as path from 'path';

const execAsync = promisify(exec);

export class DocumentationService {
  private static instance: DocumentationService;
  private isGenerating: boolean = false;

  private constructor() {}

  public static getInstance(): DocumentationService {
    if (!DocumentationService.instance) {
      DocumentationService.instance = new DocumentationService();     }
    return DocumentationService.instance;   }

  public async generateDocs(): Promise`<void>`{=html} {
    if (this.isGenerating) {
      throw new Error('Documentation generation already in progress');
    }

    try {       this.isGenerating = true;
      await this.validateEnvironment();
      await this.generateTypeDoc();       await this.generateJSDoc();
      await this.generateMarkdownDocs();     } catch (error) {
      console.error('Documentation generation failed:', error);
      throw error;     } finally {       this.isGenerating = false;
    }   }

  private async validateEnvironment(): Promise`<void>`{=html} {
    try {       await execAsync('typedoc --version');
      await execAsync('jsdoc --version');     } catch (error) {
      throw new Error('Required documentation tools not installed');
    }   }

  private async generateTypeDoc(): Promise`<void>`{=html} {
    await execAsync('typedoc --options typedoc.json');   }

  private async generateJSDoc(): Promise`<void>`{=html} {
    await execAsync('jsdoc -c .jsdoc.conf.json');   }

  private async generateMarkdownDocs(): Promise`<void>`{=html} {
    // Generate README.md if it doesn't exist
    const readmePath = path.join(process.cwd(), 'README.md');
    if (!await this.fileExists(readmePath)) {
      await this.generateReadme();     }

    // Generate ARCHITECTURE.md
    await this.generateArchitectureDoc();     
    // Generate CONTRIBUTING.md
    await this.generateContributingDoc();   }

  private async fileExists(filePath: string): Promise`<boolean>`{=html} {
    try {       await fs.access(filePath);       return true;
    } catch {       return false;     }   }

  private async generateReadme(): Promise`<void>`{=html} {
    const readmeContent = \`# AI Writing Assistant

## Overview
This application is an AI-powered writing assistant that helps users improve their writing skills through prompts, feedback, and real-time assistance.

## Getting Started 1. Install dependencies: \`npm install\`
2. Run the application: \`npm start\`
3. Build the application: \`npm run build\`

## Documentation - API Documentation: \`/docs/api\`
- User Guide: \`/docs/guides\` - Architecture: \`ARCHITECTURE.md\`
- Contributing: \`CONTRIBUTING.md\`

## License MIT \`;     await fs.writeFile('README.md', readmeContent);
  }

  private async generateArchitectureDoc(): Promise`<void>`{=html} {
    // Implementation for generating ARCHITECTURE.md   }

  private async generateContributingDoc(): Promise`<void>`{=html} {
    // Implementation for generating CONTRIBUTING.md   } }

4.  Documentation Scripts

Add these scripts to package.json:

package.json

Apply

{   "scripts": {     "docs": "node scripts/generate-docs.js",
    "docs:watch": "nodemon --watch src --ext ts,tsx --exec 'npm run docs'",
    "docs:serve": "http-server docs/api -p 8080",
    "precommit": "npm run docs && git add docs/"   } }

5.  Documentation Generation Script

generate-docs.ts

Apply

import { DocumentationService } from '../src/services/DocumentationService';

async function generateDocs() {   try {
    const docService = DocumentationService.getInstance();
    await docService.generateDocs();
    console.log('Documentation generated successfully');
  } catch (error) {
    console.error('Failed to generate documentation:', error);
    process.exit(1);   } }

generateDocs();

Dependencies Required

npm install --save-dev typedoc jsdoc jsdoc-typescript http-server nodemon husky

Integration Steps

Add Git hooks for documentation updates:

npx husky install npx husky add .husky/pre-commit "npm run precommit"

Update your CI/CD pipeline to include documentation generation:

docs.yml

Apply

name: Documentation on:   push:     branches: \[ main \] jobs:   docs:
    runs-on: ubuntu-latest     steps:       - uses: actions/checkout@v2
      - uses: actions/setup-node@v2         with:
          node-version: '16'       - run: npm ci
      - run: npm run docs       - name: Deploy docs
        uses: peaceiris/actions-gh-pages@v3         with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs

Testing Strategy

Create tests for the DocumentationService:

DocumentationService.test.ts

Apply

import { DocumentationService } from './DocumentationService';
import \* as fs from 'fs/promises';
import { exec } from 'child_process';

jest.mock('fs/promises'); jest.mock('child_process');

describe('DocumentationService', () =\> {
  let service: DocumentationService;

  beforeEach(() =\> {     service = DocumentationService.getInstance();
    jest.clearAllMocks();   });

  test('should generate documentation successfully', async () =\> {
    const mockExec = exec as jest.Mock;
    mockExec.mockImplementation((cmd, callback) =\> callback(null, { stdout: '', stderr: '' }));

    await service.generateDocs();
    expect(mockExec).toHaveBeenCalledTimes(4); // TypeDoc, JSDoc, and environment checks
  });

  test('should handle errors during generation', async () =\> {
    const mockExec = exec as jest.Mock;
    mockExec.mockImplementation((cmd, callback) =\> callback(new Error('Generation failed')));

    await expect(service.generateDocs()).rejects.toThrow('Generation failed');
  }); });

This implementation provides a robust documentation system that:

Automatically generates API documentation using TypeDoc

Includes JSDoc comments for inline documentation

Maintains structured markdown documentation

Integrates with the development workflow through Git hooks

Includes CI/CD pipeline integration

Provides testing coverage for the documentation generation process

# Exact Specifications

## Environment Setup Requirements

environment-setup.md

Apply

## Environment Setup Requirements

To ensure a smooth development experience and avoid compatibility issues, please follow these detailed setup instructions:

1. **Node.js and npm/yarn**
   - **Node.js**: Install the latest Long Term Support (LTS) version. You can download it from the [official Node.js website](https://nodejs.org/).
   - **npm**: Comes bundled with Node.js. Verify installation with `node -v` and `npm -v`.
   - **Yarn**: Install globally using npm: `npm install -g yarn`. Verify with `yarn -v`.

2. **TypeScript Compiler**
   - Install globally using npm: `npm install -g typescript`.
   - Verify installation with `tsc -v`.

3. **Visual Studio Code (VSCode)**
   - Download and install the latest stable version from the [VSCode website](https://code.visualstudio.com/).
   - Recommended extensions:
     - **ESLint**: For linting JavaScript/TypeScript code.
     - **Prettier**: For code formatting.
     - **TypeScript Hero**: For TypeScript development.

4. **Git**    - Install the latest version for your operating system:
     - **Windows**: [Git for Windows](https://gitforwindows.org/)
     - **macOS**: Install via Homebrew: `brew install git`
     - **Linux**: Install via package manager, e.g., `sudo apt-get install git` for Debian-based systems.
   - Configure Git with your user information:     `bash      git config --global user.name "Your Name"      git config --global user.email "your.email@example.com"     `

5. **Disk Space**
   - Ensure at least 2GB of free disk space is available for the project setup and dependencies.

## Package Management

package.json

Apply

{   "dependencies": {     // Core Framework     "electron": "\^29.1.0",
    "react": "\^18.2.0",     "react-dom": "\^18.2.0",     
    // State Management     "@reduxjs/toolkit": "\^2.2.1",
    "react-redux": "\^9.1.0",          // UI Components
    "@mui/material": "\^5.15.12",
    "@mui/icons-material": "\^5.15.12",
    "@emotion/react": "\^11.11.4",     "@emotion/styled": "\^11.11.0",
         // OpenAI Integration     "openai": "\^4.28.4",     
    // Secure Storage     "electron-store": "\^8.2.0",
    "keytar": "\^7.9.0",          // File System & Path Management
    "fs-extra": "\^11.2.0"   },   "devDependencies": {
    // TypeScript Support     "typescript": "\^5.3.3",
    "@types/react": "\^18.2.61",     "@types/react-dom": "\^18.2.19",
    "@types/node": "\^20.11.24",          // Build Tools
    "electron-forge": "\^7.3.0",     "electron-builder": "\^24.12.0",
         // Bundling     "vite": "\^5.1.4",
    "@vitejs/plugin-react": "\^4.2.1",          // Testing
    "jest": "\^29.7.0",     "@testing-library/react": "\^14.2.1",
    "@testing-library/jest-dom": "\^6.4.2",     
    // Development Tools     "electron-devtools-installer": "\^3.2.0",
    "eslint": "\^8.57.0",     "prettier": "\^3.2.5"   } }

Justification for key choices:

Build System: Electron Forge1 for packaging and distribution, as it's
the officially recommended tool with better integration with
Electron's ecosystem.

UI Framework: React with Material-UI (MUI) because:

Mature ecosystem with TypeScript support

Comprehensive component library

Excellent documentation and community support

Built-in accessibility features

State Management: Redux Toolkit because:

Official Redux solution with built-in best practices

Simplified boilerplate

Excellent TypeScript integration

DevTools for debugging

Bundler: Vite instead of Webpack because:

Faster development server

Better build performance

Simpler configuration

Native TypeScript support

Storage: Combination of electron-store (for app settings) and keytar
(for sensitive data) to ensure secure data handling across platforms.

## Build Process

improvements.md

Apply

Build Process Flow:

1. Build Tools
   - Primary Bundler: Webpack v5.x (preferred over Parcel/Rollup for Electron due to better HMR support and extensive plugin ecosystem)
   - Build Orchestration: electron-builder (for packaging and distribution)
   - TypeScript Compiler: tsc v5.x

2. Asset Processing    - Images:       - Formats: PNG, SVG, JPEG
     - Optimization: imagemin-webpack-plugin for automatic compression
     - SVG Processing: SVGO for optimization    - Fonts:
     - Formats: WOFF2, WOFF (fallback)
     - Subsetting: unicode-range for loading only required characters
   - Styles:      - Preprocessor: SCSS
     - PostCSS with autoprefixer for cross-platform compatibility

3. Bundle Optimization    - Code Splitting:
     - Separate bundles for main and renderer processes
     - Dynamic imports for lazy-loaded components    - Minification:
     - JavaScript: terser-webpack-plugin
     - CSS: css-minimizer-webpack-plugin
   - Tree Shaking: Enabled via Webpack production mode
   - Module Concatenation: Enabled via optimization.concatenateModules
   - Cache Busting: contenthash in output filenames

4. Development Workflow
   - Hot Module Replacement (HMR) for renderer process
   - Source Maps: 'source-map' for production, 'eval-source-map' for development
   - Watch Mode: electron-webpack-dev-server for live reloading

5. Production Optimizations
   - Code Compression: Brotli for modern platforms, gzip fallback
   - Dead Code Elimination: Unused exports removal
   - Module Resolution: optimize-module-resolution plugin
   - Bundle Analysis: webpack-bundle-analyzer for size optimization

## Testing Strategy

1. Testing Frameworks:

Unit Testing: Use Jest for unit testing.
Jest is a popular testing framework for JavaScript and TypeScript that provides a simple API,
built-in mocking, and a rich set of features for testing.

Integration Testing: Use Spectron for integration testing with Electron
applications. Spectron
is built on top of WebDriverIO and is specifically designed for testing
Electron apps.

End-to-End Testing: Use Cypress for end-to-end testing.
Cypress is known for its fast, reliable
testing capabilities and easy setup.

2. Mock System Setup:

Mocking with Jest:
Use Jest's built-in mocking capabilities to mock modules and functions.
For example,
you can mock API calls or file system operations to isolate the unit under test.

Example:

     // Mocking a module in Jest      jest.mock('fs', () =\> ({
       readFileSync: jest.fn().mockReturnValue('mocked file content'),
     }));

3. Integration Testing:

Integration Points:
Focus on testing the interaction between the main process and renderer process in your Electron app.
This includes IPC communication, file system operations, and API calls.

Example:

     // Spectron test example
     const { Application } = require('spectron');
     const path = require('path');

     describe('Application launch', () =\> {        let app;

       beforeAll(() =\> {          app = new Application({
           path: path.join(\_\_dirname, '../node_modules/.bin/electron'),
           args: \[path.join(\_\_dirname, '../app')\],          });
         return app.start();        });

       afterAll(() =\> {          if (app && app.isRunning()) {
           return app.stop();          }        });

       test('should open a window', async () =\> {
         const count = await app.client.getWindowCount();
         expect(count).toBe(1);        });      });

4. End-to-End Testing:

Cypress Setup: Use Cypress to simulate
user interactions and verify that the application
behaves as expected from the user's perspective.

Example:

     // Cypress test example      describe('User Login', () =\> {
       it('should allow a user to log in', () =\> {
         cy.visit('/login');
         cy.get('input\[name=username\]').type('testuser');
         cy.get('input\[name=password\]').type('password');
         cy.get('button\[type=submit\]').click();
         cy.url().should('include', '/dashboard');        });      });

## Security

improvements.md

Apply

### Security Considerations

#### Process and Context Isolation

1. **Process Isolation Implementation**
   - Use Electron's built-in process isolation by strictly separating the main and renderer processes
   - Required packages:     `json      {        "dependencies": {          "electron": "^28.0.0"        }      }     `
   - Implementation in main process:     `typescript:src/main.ts      const mainWindow = new BrowserWindow({        webPreferences: {          nodeIntegration: false,          contextIsolation: true,          sandbox: true,          preload: path.join(__dirname, 'preload.js')        }      });     `

2. **Content Security Policy (CSP)**
   - Implementation method: HTTP headers
   - Required configuration in main process:     `typescript:src/main.ts      mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {        callback({          responseHeaders: {            ...details.responseHeaders,            'Content-Security-Policy': [              "default-src 'self'",              "script-src 'self'",              "style-src 'self' 'unsafe-inline'",              "img-src 'self' data:",              "connect-src 'self' https://api.openai.com"            ].join('; ')          }        });      });     `

3. **Secure Data Storage**
   - Required packages:     `json      {        "dependencies": {          "keytar": "^7.9.0",          "electron-store": "^8.1.0"        }      }     `
   - Implementation approach:
     - API keys: Use system keychain via keytar
     - App settings: Use electron-store with encryption
     - User data: File system encryption using node:crypto

4. **IPC Communication Security**
   - Expose only necessary APIs through preload script
   - Implementation example:     \`\`\`typescript:src/preload.ts
     import { contextBridge, ipcRenderer } from 'electron';

     contextBridge.exposeInMainWorld('api', {
       // Explicitly define allowed channels
       sendMessage: (channel: string, data: any) =\> {
         const validChannels = \['save-document', 'load-document'\];
         if (validChannels.includes(channel)) {
           ipcRenderer.send(channel, data);          }        },
       // Explicitly type and validate all data
       receiveMessage: (channel: string, func: Function) =\> {
         const validChannels = \['document-saved', 'document-loaded'\];
         if (validChannels.includes(channel)) {
           ipcRenderer.on(channel, (event, ...args) =\> func(...args));
         }        }      });     \`\`\`

5. **Additional Security Measures**
   - ASAR packaging for resource protection
   - Code signing requirements:      - Windows: Microsoft Authenticode
     - macOS: Apple Developer ID
     - Required tools:       `json        {          "devDependencies": {            "electron-builder": "^24.0.0"          }        }       `

## Cross-Platform

improvements.md

Apply

## Cross-Platform Compatibility

### Target Platforms & Versions

#### Windows - Windows 10 (Version 1809 or later) - Windows 11
- Architecture: x64 and ARM64

#### macOS - macOS 10.15 (Catalina) or later
- Architecture: x64 and ARM64 (Apple Silicon)

#### Linux - Ubuntu 20.04 LTS or later - Debian 10 or later
- Architecture: x64

### Code Signing & Notarization

#### Windows Code Signing 1. Requirements:
   - Extended Validation (EV) or Organization Validation (OV) Code Signing Certificate
   - Windows SDK (latest version)
   - signtool.exe (part of Windows SDK)

2. Signing Process:

powershell

signtool sign /tr http://timestamp.digicert.com /td sha256 /fd sha256
/a "path/to/your-app.exe"

#### macOS Code Signing & Notarization 1. Requirements:
   - Apple Developer ID Certificate (Application type)
   - Apple Developer account (\$99/year)    - Xcode Command Line Tools

2. Signing Process:

bash

Sign the app

codesign --sign "Developer ID Application: Your Name (TEAM_ID)"
--options runtime --timestamp "path/to/YourApp.app"

Notarize the app

xcrun notarytool submit "path/to/YourApp.zip" --apple-id
"your@email.com" --password "app-specific-password" --team-id "TEAM_ID"

Staple the notarization ticket

xcrun stapler staple "path/to/YourApp.app"

### Desktop Integration

#### File Associations

typescript:src/main/fileAssociations.ts

app.setAsDefaultProtocolClient('yourapp'); // Custom protocol handler

app.setUserTasks(\[{ // Windows Jump Lists

program: process.execPath,

arguments: '--new-document',

iconPath: process.execPath,

iconIndex: 0,

title: 'New Document',

description: 'Create a new document'

}\]);

#### System Menu Integration
- Windows: Start Menu shortcuts and Jump Lists
- macOS: Dock menu and system menu bar integration
- Linux: .desktop file for application launchers

#### System Tray

typescript:src/main/tray.ts

const tray = new Tray('path/to/icon.png');

const contextMenu = Menu.buildFromTemplate(\[

{ label: 'Open', click: () =\> mainWindow.show() },

{ label: 'Quit', click: () =\> app.quit() }

\]);

tray.setContextMenu(contextMenu);

### Platform-Specific Features
- Windows: Task bar progress, thumbnail toolbars
- macOS: Touch bar support, native notifications
- Linux: Unity launcher integration, native notifications

### Build Configuration

json:electron-builder.json

{

"appId": "com.yourcompany.yourapp",

"mac": {

"category": "public.app-category.productivity",

"hardenedRuntime": true,

"gatekeeperAssess": false,

"entitlements": "build/entitlements.mac.plist",

"entitlementsInherit": "build/entitlements.mac.plist",

"target": \["dmg", "zip"\]

},

"win": {

"target": \["nsis", "portable"\],

"certificateFile": "path/to/certificate.pfx",

"certificatePassword": "env:CERTIFICATE_PASSWORD"

},

"linux": {

"target": \["AppImage", "deb"\],

"category": "Development"

}

}

## Development Workflow

Git Workflow and Branch Management

Branching Strategy: Use the Gitflow workflow,
which includes the following branches:

main: The production-ready state of the project.

develop: The integration branch for features.

feature/\*: Branches for developing new features.
Merge into develop when complete.

release/\*: Prepare for a new production release.
Merge into main and develop after release.

hotfix/\*: Quick patches to the production code.
Merge into main and develop after the fix.

Branch Naming Conventions: Use descriptive names for branches,
such as feature/add-login, bugfix/fix-crash, or hotfix/urgent-fix.

Commit Conventions

Commit Message Format: Follow the Conventional Commits specification:

Structure: type(scope): subject

Types: feat (new feature), fix (bug fix), docs (documentation changes), style (formatting,
missing semi-colons,
etc.), refactor (code change that neither fixes a bug
nor adds a feature), test (adding missing tests), chore (updating build tasks,
package manager configs, etc.).

Example: feat(auth): add user login functionality

Commit Message Body: Provide a detailed explanation of the changes,
if necessary, and reference any issues or tasks.

Code Documentation

Documentation Tool: Use JSDoc for documenting the codebase.

Level of Detail:
Ensure all public functions and classes are documented with:

Description: A brief overview of what the function or class does.

Parameters: List and describe each parameter,
including type and purpose.

Returns: Describe the return value, including type.

Example: Provide usage examples where applicable.

Usage Examples:
Include examples in the documentation to demonstrate how to use complex functions or components.
This can be done within the JSDoc comments or in separate markdown files.

## Configuration Architecture

improvements.md

Apply

Configuration Architecture Analysis:

1. Configuration Format & Storage:
   - Use TypeScript-based configuration files for development-time type safety
   - Store runtime configurations in JSON format using `electron-store` (v8.1.0 or later) for:
     - Persistent settings      - User preferences
     - Window state management
   - Avoid YAML due to potential parsing vulnerabilities in dependencies

2. Configuration Loading & Distribution:
   - Implement a centralized ConfigurationService using the singleton pattern
   - Load configurations in this order:
     1. Default values (bundled TypeScript)
     2. User settings (electron-store)
     3. Command line arguments (via electron's process.argv)
   - Use strong typing with TypeScript interfaces for all configuration objects

3. Runtime Changes:
   - Handle configuration updates through IPC messages between main and renderer
   - Implement a pub/sub system using Electron's IpcMain/IpcRenderer
   - Cache configurations in memory with proper invalidation

4. Validation:
   - Use Zod (v3.22.0 or later) for runtime configuration validation
   - Implement schema validation for all configuration files
   - Add type guards for configuration objects

Example Implementation Structure:

typescript:src/config/types.ts

interface AppConfig {

window: {

width: number;

height: number;

minWidth: number;

minHeight: number;

};

theme: 'light' \| 'dark' \| 'system';

openAI: {

model: string;

temperature: number;

};

}

## Configuration Access

ConfigurationService.ts

Apply

import \* as path from 'path'; import Store from 'electron-store';
import { z } from 'zod'; // For runtime type validation

// Define configuration schema using Zod const configSchema = z.object({
  app: z.object({     name: z.string(),     version: z.string()   }),
  window: z.object({     width: z.number().min(400),
    height: z.number().min(300),     minWidth: z.number().min(400),
    minHeight: z.number().min(300)   }),   panels: z.object({
    left: z.object({       width: z.number().min(200),
      collapsible: z.boolean()     }),     right: z.object({
      width: z.number().min(200),       collapsible: z.boolean()     })
  }),   openai: z.object({     model: z.string(),
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().positive()   }) });

// Type inference from schema
type ConfigType = z.infer\<typeof configSchema\>;

export class ConfigurationService {
  private static instance: ConfigurationService;
  private store: Store`<ConfigType>`{=html};
  private defaults: ConfigType;

  private constructor() {     this.defaults = {       app: {
        name: 'AI Writing Assistant',         version: app.getVersion()
      },       window: {         width: 1200,         height: 800,
        minWidth: 800,         minHeight: 600       },       panels: {
        left: {           width: 300,           collapsible: true
        },         right: {           width: 300,
          collapsible: true         }       },       openai: {
        model: 'gpt-4',         temperature: 0.7,
        maxTokens: 2000       }     };

    this.store = new Store`<ConfigType>`{=html}({
import { app } from 'electron';       schema: configSchema.shape,
      defaults: this.defaults,       name: 'config',
      cwd: path.join(app.getPath('userData'), 'config'),
      clearInvalidConfig: true,
      accessPropertiesByDotNotation: true     });   }

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();     }
    return ConfigurationService.instance;   }

  public get\<K extends keyof ConfigType\>(key: K): ConfigType\[K\] {
    return this.store.get(key);   }

  public set\<K extends keyof ConfigType\>(key: K, value: ConfigType\[K\]): void {
    try {
      // Validate the specific part of the config being updated
      const schema = configSchema.shape\[key\];
      schema.parse(value);       this.store.set(key, value);
    } catch (error) {
      console.error(`Invalid configuration value for ${String(key)}:`, error);
      throw new Error(`Invalid configuration value for ${String(key)}`);
    }   }

  public reset(key?: keyof ConfigType): void {     if (key) {
      this.store.set(key, this.defaults\[key\]);     } else {
      this.store.clear();       this.store.set(this.defaults);     }   }

  public getStore(): Store`<ConfigType>`{=html} {     return this.store;
  } }

This implementation:

Uses specific tools:

electron-store for persistent configuration storage1

zod for runtime type validation2

Follows best practices:

Singleton pattern for global configuration access

Strong typing with TypeScript

Runtime validation of configuration values

Secure storage in the user's app data directory

Default values for all settings

Provides features:

Type-safe configuration access

Dot notation support for nested properties

Ability to reset to defaults

Validation before saving changes

Clear error handling

To use this service in your application:

main.ts

Apply

import { ConfigurationService } from '../core/config/ConfigurationService';

const config = ConfigurationService.getInstance();

// Get a configuration value const windowConfig = config.get('window');

// Set a configuration value config.set('window', {   width: 1000,
  height: 700,   minWidth: 800,   minHeight: 600 });

// Reset specific section to defaults config.reset('window');

## Application Frame Implementation

ImplementationGuide.md

Apply

### Application Frame Implementation Plan

1. **Window Dimensions and Properties**
   - Use Electron's `BrowserWindow` to create the main application window.
   - Set initial dimensions and properties in the `main.ts` file:     `typescript      const mainWindow = new BrowserWindow({        width: 1200,        height: 800,        webPreferences: {          contextIsolation: true,          preload: path.join(__dirname, 'preload.js'),        },      });     `

2. **Panel Behavior**
   - **Resizable Panels**: Use CSS Grid or Flexbox to create a responsive layout that allows panels to be resizable.     `css      .container {        display: grid;        grid-template-columns: 1fr 2fr 1fr;        grid-template-rows: auto;        height: 100vh;      }      .panel {        overflow: auto;        resize: horizontal;      }     `
   - **Collapsible Panels**: Implement collapsible functionality using JavaScript to toggle the display of panels.     `javascript      document.querySelector('.toggle-button').addEventListener('click', () => {        const panel = document.querySelector('.left-panel');        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';      });     `

3. **Inter-Panel Messaging**
   - Use Electron's IPC (Inter-Process Communication) to handle messaging between panels.
   - Set up IPC handlers in the `main.ts` file:     `typescript      ipcMain.on('panel-message', (event, message) => {        // Handle the message and possibly forward it to other panels      });     `
   - In the renderer process, use `ipcRenderer` to send and receive messages:     `javascript      ipcRenderer.send('panel-message', { data: 'example' });      ipcRenderer.on('panel-response', (event, response) => {        console.log(response);      });     `

4. **UI Library**
   - **Vanilla JavaScript**: If you prefer a lightweight approach without additional dependencies, use vanilla JavaScript for UI interactions.
   - **React**: For a more structured approach with state management, consider using React. Install it with:     `bash      npm install react react-dom     `
   - **Vue**: If you prefer a progressive framework, Vue is a good choice. Install it with:     `bash      npm install vue     `
   - **Angular**: For a full-featured framework, Angular can be used. Install it with:     `bash      npm install @angular/core     `

## Back-end Features

Content Combiner

Configuration File:

Use a configuration file to define how content will be combined.
This can be a simple JSON or JavaScript file that specifies
separators and other settings.

Example: config/contentCombinerConfig.js

Service Implementation:

Implement a service class in TypeScript to
handle content combination logic.

Example:

     // src/services/ContentCombinerService.ts
     import { CONTENT_COMBINER_CONFIG } from '../config/contentCombinerConfig';

     class ContentCombinerService {
       static combineContent(originalPrompt: string, userSubmission: string, evaluationCriteria: string): string {
         const separator = CONTENT_COMBINER_CONFIG.separator;
         return (
           `===Original Prompt===\n${originalPrompt}${separator}` +
           `===User Submission===\n${userSubmission}${separator}` +
           `===Evaluation Criteria===\n${evaluationCriteria}${separator}`
         );        }      }

     export default ContentCombinerService;

OpenAI Integration

1. OpenAI SDK:

Use the official OpenAI SDK for Node.js to interact with the OpenAI API.

Install via npm: npm install openai

Configuration:

Create a configuration file to store API settings such as model type,
temperature, and token limits.

Example: config/openaiConfig.js

3. Service Implementation:

Implement a service class to handle API requests.

Example:

     // src/services/OpenAIService.ts
     import { Configuration, OpenAIApi } from 'openai';
     import { GPT_CONFIG } from '../config/openaiConfig';

     class OpenAIService {        private openai: OpenAIApi;

       constructor(apiKey: string) {
         const configuration = new Configuration({ apiKey });
         this.openai = new OpenAIApi(configuration);        }

       async getAIResponse(prompt: string): Promise`<string>`{=html} {
         const response = await this.openai.createCompletion({
           model: GPT_CONFIG.model,            prompt,
           max_tokens: GPT_CONFIG.max_tokens,          });
         return response.data.choices\[0\].text;        }      }

     export default OpenAIService;

API Key Management

1. Secure Storage:

Use the keytar module to securely store and retrieve API keys.

Install via npm: npm install keytar

2. Implementation:

Store the API key securely and retrieve it when needed.

Example:

     // src/services/ApiKeyService.ts
     import \* as keytar from 'keytar';

     class ApiKeyService {
       static async saveApiKey(apiKey: string): Promise`<void>`{=html} {
         await keytar.setPassword('MyAIApp', 'openai-api-key', apiKey);
       }

       static async getApiKey(): Promise\<string \| null\> {
         return await keytar.getPassword('MyAIApp', 'openai-api-key');
       }      }

     export default ApiKeyService;

## Overall UI Architecture

20documents.md

Apply

### Overall UI Architecture

- **UI Framework**: We will use **React** for building the user interface. React is chosen for its component-based architecture, which promotes reusability and maintainability.

- **Responsive Grid System**: The project will utilize **CSS Grid** for creating a responsive layout. CSS Grid is selected for its flexibility and ability to create complex layouts with minimal code.

- **State Management**: We will implement state management using **Redux**. Redux is chosen for its predictable state container, which helps manage application state in a consistent manner across the app.

- **Styling**: For styling, we will use **Styled Components** to leverage the full power of CSS within JavaScript, allowing for dynamic styling based on component props.

- **Accessibility**: Ensure all UI components are accessible, with proper ARIA roles and keyboard navigation support.

- **Testing**: Use **React Testing Library** and **Jest** for unit and integration testing of UI components to ensure they function as expected.

## Implementation Strategy

improvements.md

Apply

## Implementation Strategy for Panel Components

### Text Editor Implementation
- **Selected Library**: Monaco Editor (v0.45.0 or later)([1](https://microsoft.github.io/monaco-editor/))
  - Rationale: Built-in TypeScript support, VS Code-like experience, and excellent performance
  - Installation: `npm install @monaco-editor/react`

### Prompt Management
- **Storage**: electron-store (v8.1.0 or later)([2](https://github.com/sindresorhus/electron-store))
  - Installation: `npm install electron-store`
  - Purpose: Persistent storage of prompts and categories
  - Format: JSON structure for prompt organization

### OpenAI Integration
- **API Client**: OpenAI Node.js Library (v4.0.0 or later)([3](https://github.com/openai/openai-node))
  - Installation: `npm install openai`
  - Security: Use keytar (v7.9.0 or later) for API key storage
  - Models: GPT-4 (primary), GPT-3.5-turbo (fallback)

### UI State Management
- **Loading States**: react-loading-skeleton (v3.4.0 or later)
  - Installation: `npm install react-loading-skeleton`
  - Purpose: Consistent loading indicators across panels

### Error Handling
- **Toast Notifications**: react-hot-toast (v2.4.0 or later)
  - Installation: `npm install react-hot-toast`
  - Purpose: User-friendly error messages and notifications

### Required Dependencies

json

{

"dependencies": {

"@monaco-editor/react": "\^4.6.0",

"electron-store": "\^8.1.0",

"openai": "\^4.0.0",

"keytar": "\^7.9.0",

"react-loading-skeleton": "\^3.4.0",

"react-hot-toast": "\^2.4.0"

}

}

Ask

Copy

Apply

\`\`\`

## Integration Architecture

improvements.md

Apply

## Integration Architecture Analysis

### Event Handler System
- **Primary Technology**: Custom event system built on Electron's IPC (Inter-Process Communication)
- **Supporting Libraries**: 
  - `electron-store` v4.0.0 or later for persistent storage
  - TypeScript's built-in event system (`EventEmitter`) for renderer process events

#### Implementation Details 1. **Main Process Events**:
   - Use Electron's built-in `ipcMain` for handling main process events([1](https://www.electronjs.org/docs/latest/api/ipc-main))
   - Implement request-response pattern for synchronous operations
   - Use event streams for asynchronous operations

2. **Renderer Process Events**:
   - Utilize `contextBridge` and `ipcRenderer` for secure IPC communication
   - Implement event delegation pattern for UI components
   - Use TypeScript's `EventEmitter` for local state changes

### Service Connections
- **Primary Technology**: Electron's IPC bridge pattern
- **Supporting Libraries**:
  - `keytar` v7.7.0 or later for secure credential storage
  - `axios` v1.6.0 or later for HTTP requests

#### Implementation Details 1. **External Services**:
   - OpenAI API connection using `axios`
   - File system operations through Electron's native APIs
   - Secure storage using `keytar` for API keys

2. **Internal Services**:    - Content management through main process
   - Configuration service using `electron-store`
   - File watching service using Node.js `fs.watch`

### State Management
- **Primary Technology**: React Context API with hooks
- **Supporting Libraries**:
  - `zustand` v4.5.0 or later for global state management
  - `immer` v10.0.0 or later for immutable state updates

#### Implementation Details 1. **Global State**:
   - Application settings    - User preferences
   - Current document state    - AI interaction history

2. **Local State**:    - Panel-specific states    - UI component states
   - Form states

3. **Persistence Layer**:    - Settings stored in `electron-store`
   - Document drafts in IndexedDB    - Credentials in system keychain

# Addendum

## Panels

### Prompt Management in the Left Panel

1. Prompt Categorization and Filtering:

Implementation: Use the file system to allow
users to select a directory. Each subfolder within
this directory represents a category.

Code Example:

     import { dialog } from 'electron';

     async function selectPromptFolder(): Promise\<string \| null\> {
       const result = await dialog.showOpenDialog({
         properties: \['openDirectory'\]        });
       return result.canceled ? null : result.filePaths\[0\];      }

Random Prompt Selection Algorithm:

Implementation: Implement a "smart random" selection algorithm that
tracks which prompts have been used. Use a counter to ensure all prompts
are used before repeating.

Code Example:

     class PromptManager {
       private usedPrompts: Set`<string>`{=html} = new Set();
       private prompts: string\[\] = \[\];

       constructor(prompts: string\[\]) {
         this.prompts = prompts;        }

       getRandomPrompt(): string {
         if (this.usedPrompts.size === this.prompts.length) {
           this.usedPrompts.clear(); // Reset when all prompts are used
         }

         let prompt;          do {
           prompt = this.prompts\[Math.floor(Math.random() \* this.prompts.length)\];
         } while (this.usedPrompts.has(prompt));

         this.usedPrompts.add(prompt);          return prompt;        }
     }

3. Prompt Format:

Implementation: Support both plain text and Markdown formats.
Use a library like marked for rendering Markdown if needed.

### AI Feedback in the Right Panel

AI Assistant (Chat-like Implementation):

Implementation: Create a chat interface styled like iOS Messenger. Use
a JSON file to store the conversation history.

Code Example:

     class ChatHistory {
       private history: { role: string, content: string }\[\] = \[\];

       addMessage(role: string, content: string) {
         this.history.push({ role, content });
         this.saveHistory();        }

       saveHistory() {          // Save to JSON file
         fs.writeFileSync('chatHistory.json', JSON.stringify(this.history));
       }

       loadHistory() {          // Load from JSON file
         if (fs.existsSync('chatHistory.json')) {
           this.history = JSON.parse(fs.readFileSync('chatHistory.json', 'utf8'));
         }        }

       clearHistory() {          this.history = \[\];
         fs.unlinkSync('chatHistory.json');        }      }

### AI Evaluator

AI Evaluator: Implementation: Send the prompt, user submission,
and criteria to the GPT model. Display the response in a
text area without saving it.

### Criteria Tab

1. Criteria Definition and Selection:

Implementation: Allow users to select a folder. Subfolders represent
criteria, and files within represent criteria sets.

Code Example:

     async function selectCriteriaFolder(): Promise\<string \| null\> {
       const result = await dialog.showOpenDialog({
         properties: \['openDirectory'\]        });
       return result.canceled ? null : result.filePaths\[0\];      }

2. Criteria File Format:

Implementation: Support plain text, Markdown, and JSON files.

### Settings Tab

1. Configurable Settings:

Implementation: Provide an input field for the OpenAI API key. Validate
the key format and store it securely using keytar.

Code Example:

     async function saveApiKey(apiKey: string): Promise`<void>`{=html} {
       if (!isValidApiKey(apiKey)) {
         throw new Error('Invalid API key format');        }
       await keytar.setPassword('MyAIApp', 'openai-api-key', apiKey);
     }

     function isValidApiKey(apiKey: string): boolean {
       // Basic validation logic
       return /[^1]{32}\$/.test(apiKey);      }

### Content Combiner

contentCombinerConfig.ts

Apply

interface SectionConfig {   prefix: string;   suffix: string;
  required: boolean;   maxLength?: number;   trim?: boolean; }

interface ContentCombinerConfig {   sections: {
    prompt: SectionConfig;     submission: SectionConfig;
    criteria: SectionConfig;   };   separator: string;
  maxTotalLength: number;   preserveWhitespace: boolean;
  errorMessages: {     maxLengthExceeded: string;
    missingRequired: string;     invalidContent: string;   }; }

export const CONTENT_COMBINER_CONFIG: ContentCombinerConfig = {
  sections: {     prompt: {
      prefix: "===Writing Prompt===`\n`{=tex}",
      suffix: "`\n`{=tex}=====`\n`{=tex}",       required: true,
      maxLength: 2000,       trim: true     },     submission: {
      prefix: "===User Submission===`\n`{=tex}",
      suffix: "`\n`{=tex}=====`\n`{=tex}",       required: true,
      maxLength: 8000,       trim: false     },     criteria: {
      prefix: "===Evaluation Criteria===`\n`{=tex}",
      suffix: "`\n`{=tex}=====`\n`{=tex}",       required: true,
      maxLength: 2000,       trim: true     }   },
  separator: "`\n`{=tex}",
  maxTotalLength: 12000, // Adjust based on GPT model token limits
  preserveWhitespace: false,   errorMessages: {
    maxLengthExceeded: "Content exceeds maximum allowed length",
    missingRequired: "Required section is missing",
    invalidContent: "Invalid content provided"   } };

ContentCombinerService.ts

Apply

import { CONTENT_COMBINER_CONFIG } from '../config/contentCombinerConfig';

export class ContentValidationError extends Error {
  constructor(message: string, public section?: string) {
    super(message);     this.name = 'ContentValidationError';   } }

export class ContentCombinerService {
  private validateSection(content: string, section: keyof typeof CONTENT_COMBINER_CONFIG.sections): void {
    const config = CONTENT_COMBINER_CONFIG.sections\[section\];     
    if (!content && config.required) {
      throw new ContentValidationError(
        CONTENT_COMBINER_CONFIG.errorMessages.missingRequired,
        section       );     }

    if (config.maxLength && content.length \> config.maxLength) {
      throw new ContentValidationError(
        CONTENT_COMBINER_CONFIG.errorMessages.maxLengthExceeded,
        section       );     }   }

  private formatSection(content: string, section: keyof typeof CONTENT_COMBINER_CONFIG.sections): string {
    const config = CONTENT_COMBINER_CONFIG.sections\[section\];
    let processedContent = content;

    if (config.trim) {       processedContent = processedContent.trim();
    }

    return `${config.prefix}${processedContent}${config.suffix}`;   }

  public combineContent(prompt: string, submission: string, criteria: string): string {
    // Validate all sections     this.validateSection(prompt, 'prompt');
    this.validateSection(submission, 'submission');
    this.validateSection(criteria, 'criteria');

    // Format each section
    const formattedPrompt = this.formatSection(prompt, 'prompt');
    const formattedSubmission = this.formatSection(submission, 'submission');
    const formattedCriteria = this.formatSection(criteria, 'criteria');

    // Combine sections     const combinedContent = \[
      formattedPrompt,       formattedSubmission,
      formattedCriteria     \].join(CONTENT_COMBINER_CONFIG.separator);

    // Validate total length
    if (combinedContent.length \> CONTENT_COMBINER_CONFIG.maxTotalLength) {
      throw new ContentValidationError(
        CONTENT_COMBINER_CONFIG.errorMessages.maxLengthExceeded       );
    }

    return combinedContent;   } }

This implementation provides several benefits:

Type Safety: Using TypeScript interfaces ensures type checking and
better IDE support.

Configurability: All formatting strings and limits are defined in the
config file, making it easy to adjust without changing the service code.

Validation: Built-in validation for:

Required sections

Maximum length per section

Total combined length

Custom error handling

Maintainability: Clear separation between configuration and logic.

Flexibility: The configuration allows for:

Different prefix/suffix per section

Optional trimming per section

Customizable error messages

Adjustable length limits

Example usage:

const combiner = new ContentCombinerService();

try {   const combined = combiner.combineContent(
    "Write about your favorite season...",
    "My favorite season is summer because...",
    "Evaluate based on clarity, detail, and personal connection."   );
     // Send to GPT model   console.log(combined); } catch (error) {
  if (error instanceof ContentValidationError) {
    console.error(`Validation error in ${error.section}: ${error.message}`);
  } else {     console.error('Unexpected error:', error);   } }

The output will look like:

===Writing Prompt=== Write about your favorite season... =====

===User Submission=== My favorite season is summer because... =====

===Evaluation Criteria===
Evaluate based on clarity, detail, and personal connection. =====

This implementation aligns with Electron's best practices and provides a
robust foundation for the content combination functionality in your
application.

### Panel Persistence

Panel State Persistence

1. Implementation Details

The application will use electron-store for persistent storage of panel configurations and states. This provides secure, cross-platform storage with type safety when combined with TypeScript.

2. Data to be Persisted

a) Window State - Default window size: 1920x1080 pixels
- Last window position {x, y} - Last window size {width, height}
- Window maximized state (boolean)

b) Panel Layout - Panel sizes (percentages of window width)
  - Left panel: 25% default   - Middle panel: 50% default
  - Right panel: 25% default - Panel visibility states (boolean)
- Panel minimum widths   - Left: 200px   - Middle: 400px
  - Right: 200px

c) Tab States - Active tab in each panel
  - Left: 'prompts' \| 'assistant'
  - Right: 'feedback' \| 'criteria' \| 'settings'

d) Editor State - Content autosave (every 30 seconds) - Cursor position
- Scroll position - Selection state

3. Configuration Interface

typescript

interface PanelState {

width: number; // Percentage of window width

visible: boolean; // Panel visibility

activeTab?: string; // Current active tab

minWidth: number; // Minimum width in pixels

}

interface WindowState {

x: number;

y: number;

width: number;

height: number;

isMaximized: boolean;

}

interface EditorState {

content: string;

cursorPosition: number;

scrollPosition: number;

selection?: {

start: number;

end: number;

};

lastSaved: string; // ISO timestamp

}

interface AppState {

window: WindowState;

panels: {

left: PanelState;

middle: PanelState;

right: PanelState;

};

editor: EditorState;

}

4. Default Configuration

typescript

const defaultConfig: AppState = {

window: {

x: undefined, // Center on first launch

y: undefined,

width: 1920,

height: 1080,

isMaximized: false

},

panels: {

left: {

width: 25, // 25% of window width

visible: true,

activeTab: 'prompts',

minWidth: 200

},

middle: {

width: 50, // 50% of window width

visible: true,

minWidth: 400

},

right: {

width: 25, // 25% of window width

visible: true,

activeTab: 'feedback',

minWidth: 200

}

},

editor: {

content: '',

cursorPosition: 0,

scrollPosition: 0,

lastSaved: new Date().toISOString()

}

};

5. State Management Service

typescript

import Store from 'electron-store';

import { AppState } from './types';

export class StateManager {

private store: Store`<AppState>`{=html};

private autoSaveInterval: NodeJS.Timer;

constructor() {

this.store = new Store`<AppState>`{=html}({

defaults: defaultConfig,

clearInvalidConfig: true,

migrations: {

// Add migrations for future schema changes

}

});

// Set up autosave for editor content

this.autoSaveInterval = setInterval(() =\> {

this.saveEditorState();

}, 30000); // 30 seconds

}

public saveWindowState(state: Partial`<WindowState>`{=html}): void {

this.store.set('window', {

...this.store.get('window'),

...state

});

}

public savePanelState(panel: 'left' \| 'middle' \| 'right', state:
Partial`<PanelState>`{=html}): void {

this.store.set(panels.\${panel}, {

...this.store.get(panels.\${panel}),

...state

});

}

private saveEditorState(): void {

// Only save if content has changed

const currentContent = this.getEditorContent();

if (currentContent !== this.store.get('editor.content')) {

this.store.set('editor', {

...this.store.get('editor'),

content: currentContent,

lastSaved: new Date().toISOString()

});

}

}

public dispose(): void {

clearInterval(this.autoSaveInterval);

}

}

6. Recovery Mechanism

The application will implement a recovery system for unsaved changes:
- Backup file created alongside each autosave
- On application startup, check for crash recovery data
- If found, prompt user to restore last session
- Maintain up to 5 backup files in rotation

This implementation provides a robust, type-safe approach to state persistence while maintaining good performance and user experience. The state manager handles all persistence operations asynchronously to prevent UI blocking.

## OpenAI Integration

Create a Configuration File:

Create a file named openaiConfig.js in your config directory.
This file will export an object containing all the
necessary configuration settings for the OpenAI API.

   // config/openaiConfig.js    const OPENAI_CONFIG = {
       model: 'gpt-4', // Specify the model version
       temperature: 0.7, // Control the randomness of the output
       max_tokens: 2000, // Limit the number of tokens in the response
       top_p: 1, // Use nucleus sampling
       presence_penalty: 0, // Penalize new tokens based on their presence in the text so far
       frequency_penalty: 0, // Penalize new tokens based on their frequency in the text so far
       system_message: {            role: 'system',
           content: 'You are a helpful assistant.'        },
       defaultErrorMessage: 'An error occurred while processing your request.',
       stream: false, // Whether to stream the response
       n: 1, // Number of completions to generate
       stop: null, // Stop sequence    };

   module.exports = {        OPENAI_CONFIG    };

2. Import the Configuration:

In your main application file or wherever you need to use the
OpenAI API, import the configuration object. This ensures that you have
a centralized place to manage your OpenAI settings, making it easier to
update and maintain.

   // main.ts or wherever you need the configuration
   import { OPENAI_CONFIG } from './config/openaiConfig';
   import OpenAI from 'openai';

   // Initialize OpenAI with the imported configuration
   const openai = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is securely stored
       ...OPENAI_CONFIG    });

   // Example function to make an API call
   async function getAIResponse(prompt: string): Promise`<string>`{=html} {
       try {
           const response = await openai.chat.completions.create({
               ...OPENAI_CONFIG,
               messages: \[{ role: 'user', content: prompt }\],
           });            return response.choices\[0\].message.content;
       } catch (error) {
           console.error('Error fetching AI response:', error);
           return OPENAI_CONFIG.defaultErrorMessage;        }    }

### API Key Management

Initial Setup and Storage:

Settings Dialog: Implement a settings dialog in the UI where users
can input their OpenAI API key. This dialog should include an input
field with the type set to password to mask the input.

Secure Storage with Keytar: Use the keytar module to securely store
the API key. Avoid storing keys in plain text or configuration files.

   // Example of saving the API key using keytar
   import \* as keytar from 'keytar';

   async function saveApiKey(apiKey: string): Promise`<void>`{=html} {
       await keytar.setPassword('MyAIApp', 'openai-api-key', apiKey);
   }

Retrieval and Initialization:

Retrieve on Startup: On application startup, retrieve the API key
from keytar and initialize the OpenAI client. This ensures the key
is only stored in memory when needed.

   // Example of retrieving the API key
   async function getApiKey(): Promise\<string \| null\> {
       return await keytar.getPassword('MyAIApp', 'openai-api-key');
   }

   // Initialize OpenAI client    const apiKey = await getApiKey();
   if (apiKey) {        openai = new OpenAI({ apiKey });    }

3. Key Rotation and Revocation:

Key Rotation: Implement a mechanism to allow users to update their API
key. This can be done by providing an option in the settings dialog to
enter a new key, which will replace the old one in keytar.

Revocation: Allow users to revoke the API key by providing
a "Revoke Key" button in the settings. This should remove the
key from keytar and ensure the application no longer uses it.

   // Example of revoking the API key
   async function revokeApiKey(): Promise`<void>`{=html} {
       await keytar.deletePassword('MyAIApp', 'openai-api-key');    }

4. Security Considerations:

Input Validation: Validate the API key format before saving it to
ensure it meets expected criteria.

Error Handling: Provide user-friendly error messages if key
storage or retrieval fails, and log errors for debugging purposes.

Testing and Verification:

Unit Tests: Write tests to verify that the API key is correctly stored,
retrieved, and deleted using keytar.

Integration Tests: Ensure that the application behaves correctly
when the API key is missing, invalid, or revoked.

## IPC Security

Create a Configuration File for IPC Channels:

Create a configuration file, ipcChannelsConfig.js, to define the allowed
IPC channels. This file will serve as a single source of truth for all
valid channels.

   // config/ipcChannelsConfig.js    const IPC_CHANNELS = {
     SAVE_API_KEY: 'save-api-key',      GET_API_KEY: 'get-api-key',
     AI_REQUEST: 'ai-request',      // Add more channels as needed    };

   module.exports = IPC_CHANNELS;

2. Export Constants from the Main Process:

Import the configuration file in your main process and use it to set up
IPC handlers. This ensures that any changes to the channels are
centralized.

   // main.ts    import { app, BrowserWindow, ipcMain } from 'electron';
   import \* as path from 'path';
   import IPC_CHANNELS from './config/ipcChannelsConfig';

   function createWindow() {      const win = new BrowserWindow({
       width: 1200,        height: 800,        webPreferences: {
         contextIsolation: true,
         preload: path.join(\_\_dirname, 'preload.js'),        },
     });

     win.loadFile('index.html');    }

   app.whenReady().then(() =\> {      createWindow();    });

   ipcMain.handle(IPC_CHANNELS.SAVE_API_KEY, async (event, apiKey) =\> {
     // Handle saving API key    });

   ipcMain.handle(IPC_CHANNELS.GET_API_KEY, async () =\> {
     // Handle getting API key    });

   ipcMain.handle(IPC_CHANNELS.AI_REQUEST, async (event, prompt) =\> {
     // Handle AI request    });

3. Use the Configuration in the Preload Script:

In your preload script, use the same configuration
file to expose the allowed channels to the renderer process.
This ensures that the renderer can only communicate over
predefined channels.

   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');
   const IPC_CHANNELS = require('./config/ipcChannelsConfig');

   contextBridge.exposeInMainWorld('electronAPI', {
     saveApiKey: (apiKey) =\> ipcRenderer.invoke(IPC_CHANNELS.SAVE_API_KEY, apiKey),
     getApiKey: () =\> ipcRenderer.invoke(IPC_CHANNELS.GET_API_KEY),
     sendAIRequest: (prompt) =\> ipcRenderer.invoke(IPC_CHANNELS.AI_REQUEST, prompt),
     // Additional methods as needed    });

## Testing Strategy

goimprovement1.md

Apply

Testing Strategy Examples:

### Test Framework Setup

1. **Core Testing Stack**

typescript:test/setup.ts

import { Application } from 'spectron'

import { resolve } from 'path'

import { expect } from 'chai'

import as cypress from 'cypress'

import as istanbul from 'nyc'

// Configure code coverage reporting

const coverage = new istanbul({

include: \['src//.ts'\],

exclude: \['/.spec.ts'\],

reporter: \['text', 'html', 'lcov'\],

'check-coverage': true,

branches: 80,

lines: 85,

functions: 85,

statements: 85

})

2. **Integration Test Example - OpenAI API**

typescript:test/integration/openai.spec.ts

import { mockOpenAI } from '../mocks/openai'

import { OpenAIService } from '../../src/services/openai'

describe('OpenAI Integration', () =\> {

let openaiService: OpenAIService

beforeEach(() =\> {

// Mock OpenAI API responses

mockOpenAI.reset()

openaiService = new OpenAIService()

})

it('should handle API rate limiting', async () =\> {

mockOpenAI.setRateLimit(true)

const result = await openaiService.getCompletion('test prompt')

expect(result.retryAfter).to.equal(60)

expect(result.status).to.equal('rate_limited')

})

it('should retry failed requests with exponential backoff', async () =\>
{

mockOpenAI.simulateNetworkError(2) // Fail twice then succeed

const startTime = Date.now()

const result = await openaiService.getCompletion('test prompt')

const duration = Date.now() - startTime

expect(result.success).to.be.true

expect(duration).to.be.greaterThan(3000) // Verify backoff occurred

})

})

3. **E2E Test Example - Writing Flow**

typescript:cypress/integration/writing-flow.spec.ts

describe('Complete Writing Flow', () =\> {

beforeEach(() =\> {

cy.intercept('POST', 'https://api.openai.com/v1/', {

fixture: 'openai-response.json'

}).as('openaiCall')

cy.visit('/')

})

it('should complete full writing and feedback cycle', () =\> {

// Select prompt folder

cy.get('\[data-test="folder-select"\]').click()

cy.get('\[data-test="file-dialog"\]').should('be.visible')

cy.uploadFolder('test-prompts')

// Verify prompt loading

cy.get('\[data-test="prompt-list"\]')

.should('contain', 'Writing Prompt 1')

// Write content

cy.get('\[data-test="editor"\]')

.type('This is a test submission')

.should('have.value', 'This is a test submission')

// Submit for feedback

cy.get('\[data-test="submit-button"\]').click()

cy.wait('@openaiCall')

// Verify feedback display

cy.get('\[data-test="feedback-panel"\]')

.should('contain', 'AI Feedback')

.should('be.visible')

})

})

4. **Unit Test Example - File System Operations**

typescript:test/unit/file-system.spec.ts

import { FileSystemService } from '../../src/services/file-system'

import { mockFS } from '../mocks/fs'

describe('FileSystemService', () =\> {

let fsService: FileSystemService

beforeEach(() =\> {

mockFS.reset()

fsService = new FileSystemService()

})

it('should handle large directory structures', async () =\> {

// Create mock directory with 1000+ files

mockFS.createLargeDirectory(1000)

const files = await fsService.readDirectory('/test-dir')

expect(files.length).to.equal(1000)

expect(fsService.getMemoryUsage()).to.be.lessThan(50 1024 1024) // 50MB
limit

})

it('should handle concurrent file operations', async () =\> {

const operations = Array(100).fill(null).map((, i) =\>

fsService.writeFile(/test-${i}.txt, content-${i})

)

const results = await Promise.all(operations)

expect(results.every(r =\> r.success)).to.be.true

})

})

### Code Coverage Requirements

1. **Coverage Thresholds** - Statements: 85% - Branches: 80%
- Functions: 85% - Lines: 85%

2. **Coverage Reporting**

json:package.json

{

"scripts": {

"test:coverage": "nyc npm test",

"coverage:report": "nyc report --reporter=html --reporter=text-lcov \>
coverage/lcov.info"

}

}

3. **CI Integration**

yaml:github/workflows/test.yml

jobs:

test:

runs-on: ubuntu-latest

steps:

uses: actions/checkout@v2

name: Run Tests with Coverage

run: npm run test:coverage

name: Upload Coverage

uses: codecov/codecov-action@v2

with:

file: ./coverage/lcov.info

fail_ci_if_error: true

threshold: 80

This testing strategy ensures: - Comprehensive testing of core features
- Realistic simulation of user workflows
- Proper error handling and edge cases - Performance monitoring
- Maintainable test suites - Consistent code coverage tracking

The examples demonstrate practical scenarios including:
- API integration testing with error handling
- End-to-end user flow testing - File system operation testing
- Performance and resource usage verification

## JSDoc

1.  JSDoc Comments

Level of Detail:

Parameters: Clearly describe each parameter, including its type and
purpose. If a parameter is optional, indicate this in the comment.

Return Types: Specify the return type and describe what the
function returns. If the function does not return anything,
use @returns {void}.

Examples: Provide usage examples for complex functions or those with
non-obvious behavior. This helps developers understand how to use the
function in practice.

Example:

  /\*\*    * Calculates the sum of two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The sum of the two numbers.    * @example
   * const result = add(2, 3);    * console.log(result); // 5    */
  function add(a, b) {     return a + b;   }

2.  Automatic API Documentation Generation

Tool Selection: Use a tool like TypeDoc for TypeScript
projects or JSDoc for JavaScript projects to automatically generate
API documentation from your comments.

Setup:

Install the documentation tool as a development dependency.

Configure the tool to generate documentation in a docs/ directory.

Add a script in your package.json to generate the documentation,
e.g., "docs": "typedoc --out docs src/".

3.  User Guides

Creation:

Structure: Organize the user guide into sections such
as "Getting Started", "Features", "Troubleshooting", and "FAQs".

Content: Use clear, concise language and include screenshots or
diagrams where helpful. Ensure each section has a logical flow.

Maintenance:

Version Control: Store user guides in the same repository as
your code to keep them versioned and in sync with the application.

Regular Updates: Update the guides with each release to
reflect new features or changes. Assign a team member to review and
update the documentation regularly.

4.  Additional Documentation Practices

Architecture Documentation: Create an ARCHITECTURE.md file to describe
the overall architecture of the application, including key
components and their interactions.

Contribution Guidelines: Provide a CONTRIBUTING.md file to guide
new contributors on how to set up the development environment, submit
changes, and adhere to coding standards.

Changelog: Maintain a CHANGELOG.md to document changes, bug fixes, and
new features in each release. This helps users and developers
track the evolution of the project.

## Electron Version

// ... existing content ...

Electron Version Pinning: The application should explicitly pin the Electron version to ensure consistent behavior across development and production environments.

json:package.json

{

"dependencies": {

"electron": "33.2.1" // Remove caret to prevent auto-updates

}

}

Key Implementation Details:
- Use exact version number (33.2.1) rather than caret (\^) or tilde (\~) to prevent any automatic updates
- Include Electron security checklist in your CI/CD pipeline:
  `bash   npx electronegativity -i ./   `
- Set up automated dependency scanning with:   \`\`\`json:package.json
  {     "scripts": {
      "audit": "npm audit && npx electronegativity -i ./"     }   }

## Error Handling

// Define base error class for application-specific errors
export class ApplicationError extends Error {   constructor(
    message: string,     public readonly code: string,
    public readonly severity: 'low' \| 'medium' \| 'high' \| 'critical'
  ) {     super(message);     this.name = this.constructor.name;   } }

// Network-related errors
export class NetworkError extends ApplicationError {   constructor(
    message: string,     public readonly statusCode?: number,
    public readonly endpoint?: string   ) {
    super(message, 'ERR_NETWORK', 'high');
    this.statusCode = statusCode;     this.endpoint = endpoint;   } }

// File system errors
export class FileSystemError extends ApplicationError {   constructor(
    message: string,     public readonly path?: string,
    public readonly operation?: 'read' \| 'write' \| 'delete' \| 'create'
  ) {     super(message, 'ERR_FILESYSTEM', 'high');
    this.path = path;     this.operation = operation;   } }

// OpenAI API specific errors
export class OpenAIError extends ApplicationError {   constructor(
    message: string,     public readonly apiError?: any,
    public readonly prompt?: string   ) {
    super(message, 'ERR_OPENAI', 'high');     this.apiError = apiError;
    this.prompt = prompt;   } }

// Configuration errors
export class ConfigurationError extends ApplicationError {
  constructor(     message: string,
    public readonly configKey?: string   ) {
    super(message, 'ERR_CONFIG', 'critical');
    this.configKey = configKey;   } }

// IPC communication errors
export class IPCError extends ApplicationError {   constructor(
    message: string,     public readonly channel?: string,
    public readonly data?: any   ) {
    super(message, 'ERR_IPC', 'high');     this.channel = channel;
    this.data = data;   } }

ErrorHandler.ts

Apply

import { dialog } from 'electron';
import { ApplicationError } from './ApplicationErrors';

export class ErrorHandler {   private static instance: ErrorHandler;
  private readonly errorLog: Error\[\] = \[\];   
  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();     }
    return ErrorHandler.instance;   }

  public async handleError(error: Error \| ApplicationError): Promise`<void>`{=html} {
    // Log the error     this.logError(error);

    // Handle based on error type and severity
    if (error instanceof ApplicationError) {
      await this.handleApplicationError(error);     } else {
      // Handle unknown errors
      await this.handleUnknownError(error);     }   }

  private async handleApplicationError(error: ApplicationError): Promise`<void>`{=html} {
    switch (error.severity) {       case 'critical':
        await this.showErrorDialog(error);
        // Force app restart for critical errors
        require('electron').app.relaunch();
        require('electron').app.exit(0);         break;       
      case 'high':         await this.showErrorDialog(error);
        break;              case 'medium':         console.error(error);
        // Show notification instead of dialog
        require('electron').Notification.show({
          title: 'Error',           body: error.message         });
        break;              case 'low':         console.warn(error);
        break;     }   }

  private async handleUnknownError(error: Error): Promise`<void>`{=html} {
    console.error('Unknown error:', error);
    await this.showErrorDialog(error);   }

  private async showErrorDialog(error: Error): Promise`<void>`{=html} {
    await dialog.showErrorBox(       'Error',
      `${error.name}: ${error.message}\n\nPlease contact support if this issue persists.`
    );   }

  private logError(error: Error): void {     this.errorLog.push(error);
    // Limit log size     if (this.errorLog.length \> 100) {
      this.errorLog.shift();     }
    // Log to file system or monitoring service
    console.error(error);   }

  public getErrorLog(): Error\[\] {     return \[...this.errorLog\];   }
}

[^1]: a-zA-Z0-9
