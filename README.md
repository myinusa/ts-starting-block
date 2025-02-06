# TS Starting Block

Welcome to the TS Starting Block project!

## Description


TS Starting Block is a TypeScript-based template project designed to provide a robust starting point for building applications. It integrates several essential tools and practices including Axios for HTTP requests, Pino for logging, PostgreSQL for database interactions, and ESLint & Prettier for code quality.

- **HTTP Requests Handling**: Utilizes Axios for making HTTP requests with request/response interceptors.
- **Logging**: Pino logger with console and file transport, extended to log to a database.
- **Database Interactions**: Supports PostgreSQL interactions using `pg-promise`.
- **Type Safety and Helpers**: Offers type guards, error handling, and utility functions.
- **Environment Management**: Manages environment variables through `.env` files.
- **Type Safety**: TypeScript usage with strict type checking.
- **Build Helpers**: Generates build numbers and retrieves application details from `package.json`.
- **Error Handling**: Centralized error handling utilities.
- **Development Tools**: ESLint, Prettier, and VS Code settings configured for a consistent development environment.

## Pre-requisites

- Node.js (version 16 or higher)
- pnpm

## Usage

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/myinusa/the-erratic-ensemble/ts-starting-block.git
   cd ts-starting-block
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Create a `.env` file in the root directory and add your environment variables:**

   ```
   cp .env.example .env
   POSTGRES_CONNECTION_STRING=your_postgres_connection_string_here
   ```

4. **Run the application:**

   ```bash
   pnpm start
   ```

5. **Build the application:**

   ```bash
   pnpm build
   ```

## Configuration

### Google Release Please Configuration

release-please requires a GitHub token to access the GitHub API. You configure this token via the token configuration option.

- [Release Please](https://github.com/googleapis/release-please-action?tab=readme-ov-file#github-credentials)

### TypeScript and Linter Configurations

- The `tsconfig.json` sets up the TypeScript compiler options, targeting ECMAScript next versions.
- ESLint is configured via `eslint.config.mjs`, enabling rules for TypeScript with plugins for security, SonarJS, and other utilities.

