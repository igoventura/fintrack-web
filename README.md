# FinTrack Web

A modern financial tracking web application built with Angular 21 and Angular Material.

## Overview

FinTrack Web is a comprehensive financial management platform that enables users to track transactions, manage accounts, categorize expenses, and gain insights into their financial health. The application uses a clean architecture with auto-generated API clients for seamless backend integration.

## Features

- 🔐 **Authentication** - Secure user registration and login
- 💰 **Transaction Management** - Track income and expenses with detailed categorization
- 🏦 **Account Management** - Manage multiple financial accounts
- 📊 **Categories & Tags** - Organize transactions with custom categories and tags
- 👥 **Multi-tenant Support** - Workspace isolation with tenant management
- 📱 **Responsive Design** - Built with Angular Material for a modern, accessible UI

## Tech Stack

- **Framework**: Angular 21
- **UI Library**: Angular Material 21
- **State Management**: Angular Signals
- **HTTP Client**: Auto-generated from OpenAPI spec via `ng-openapi`
- **Testing**: Vitest
- **Language**: TypeScript 5.9
- **Package Manager**: npm 10.9.4

## Prerequisites

- Node.js (v18 or higher recommended)
- npm 10.9.4 or compatible version

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fintrack-web

# Install dependencies
npm install
```

### API Client Generation

The application uses an auto-generated API client based on the OpenAPI specification:

```bash
# Generate the API client from openapi.yaml
npm run generate:api
```

This command will:
1. Convert Swagger 2.0 spec to OpenAPI 3.0 (if needed)
2. Generate TypeScript services and models in `src/api/providers/`

### Development Server

Start the development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed information about the application architecture and file organization.

## Development Guidelines

See [GUIDELINES.md](./GUIDELINES.md) for coding standards, best practices, and development workflow.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests with Vitest
- `npm run generate:api` - Regenerate API client from OpenAPI spec

## API Integration

The application integrates with the FinTrack API backend. The API client is auto-generated from the OpenAPI specification located at `src/api/openapi.yaml`.

### Key API Endpoints

- **Authentication**: `/auth/login`, `/auth/register`
- **Users**: `/users/profile`
- **Tenants**: `/tenants`
- **Accounts**: `/accounts`, `/accounts/{id}`
- **Categories**: `/categories`, `/categories/{id}`
- **Tags**: `/tags`, `/tags/{id}`
- **Transactions**: `/transactions`, `/transactions/{id}`

## Testing

Run the test suite:

```bash
npm test
```

Tests are written using Vitest and follow Angular testing best practices.

## Code Scaffolding

Generate new components:

```bash
ng generate component component-name
```

For a complete list of available schematics:

```bash
ng generate --help
```

## Contributing

1. Follow the coding standards outlined in [GUIDELINES.md](./GUIDELINES.md)
2. Ensure all tests pass before submitting changes
3. Keep the API client in sync with the backend OpenAPI spec
4. Use standalone components and Angular Signals for state management

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [Angular CLI Reference](https://angular.dev/tools/cli)

## License

[Add your license here]
