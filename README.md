# Vue Monorepo

Modern Vue.js monorepo built with pnpm workspaces and Turborepo for efficient development and build orchestration.

## 🚀 Tech Stack

- **Frontend Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Monorepo Management**: Turborepo
- **Code Quality**: ESLint + Prettier
- **Testing**: Vitest

## 📁 Directory Structure

```
vue-monorepo/
├── apps/
│   └── web/                 # Main Vue application
│       ├── src/
│       ├── public/
│       └── package.json
├── packages/
│   ├── ui/                  # Shared UI components
│   │   └── src/
│   └── utils/               # Shared utilities
│       └── src/
├── package.json            # Root package.json with workspace config
├── turbo.json              # Turborepo configuration
├── .prettierrc.json        # Prettier configuration
└── .prettierignore         # Prettier ignore patterns
```

## 🛠️ Setup

### Prerequisites

- Node.js (>= 18)
- pnpm (>= 10.15.1)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:Kenshin0011/vue-monorepo.git
cd vue-monorepo
```

2. Install dependencies:

```bash
pnpm install
```

## 📋 Available Commands

### Development

```bash
# Start all applications in development mode
pnpm dev

# Start specific workspace
pnpm --filter web dev
```

The web application will be available at: **[http://localhost:3000](http://localhost:3000)**

### Build

```bash
# Build all applications
pnpm build

# Build specific workspace
pnpm --filter web build
```

### Code Quality

```bash
# Run linting across all workspaces
pnpm lint

# Format code with Prettier
pnpm format

# Type checking
pnpm typecheck
```

### Testing

```bash
# Run tests across all workspaces
pnpm test
```

### Workspace Management

```bash
# Add dependency to specific workspace
pnpm --filter web add vue-router

# Add dev dependency to root
pnpm add -D -w eslint

# Run command in specific workspace
pnpm --filter web <command>
```
