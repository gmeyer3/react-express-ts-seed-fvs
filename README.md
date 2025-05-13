# React Express TypeScript Seed Project

A full-stack TypeScript application with React frontend and Express backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gmeyer3/react-express-ts-seed-fvs.git
cd react-express-ts-seed-fvs
```

2. Install all dependencies (server, client, and root):
```bash
npm run install-all
```

## Development

To run both frontend and backend in development mode:
```bash
npm run start
```

This will start:
- Frontend: React development server on http://localhost:3000
- Backend: Express server on http://localhost:5001

Use Ctrl+C to stop both servers.

## Features

- **TypeScript** - Fully typed codebase for both frontend and backend
- **React** - Modern React with hooks for the frontend
- **Express** - Fast and minimalist web framework for the backend
- **PrimeReact** - UI component library for React applications
- **Single API Call** - Frontend makes a single API call on load with manual refresh option
- **Comprehensive Error Handling** - Both client and server implement proper error handling
- **Debug Information** - Debug details available in the frontend for API responses
- **Production-Ready Configuration** - Includes setups for both development and production environments

## Utility Scripts

### restart.sh

A utility script for restarting the application with a clean environment:
```bash
./restart.sh
```

This script:
- Stops all running Node.js processes
- Clears the npm cache
- Restarts the application

Make sure to make it executable first with `chmod +x restart.sh`

## API Endpoints

- `/api/hello` - Returns a welcome message and timestamp
- `/test` - Returns server status

## CORS Configuration

The server is configured with CORS to allow requests from the React application:
- Origin: http://localhost:3000
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed Headers: Content-Type, Accept, Authorization, X-Requested-With, Cache-Control

## Build

To build the application for production:

```bash
npm run build
```

This will create optimized builds for both the client and server.

## Project Structure

```
├── client/             # React frontend with PrimeReact UI components
│   ├── public/         # Static assets
│   └── src/            # React source code
├── server/             # Express backend
│   └── src/            # TypeScript source code
├── package.json        # Root package.json with scripts
├── restart.sh          # Utility script for restarting the application
└── README.md           # This file
```