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

- `/api/hello` - Returns a JSON message and timestamp
- `/test` - Returns server status

## CORS Configuration

The server is configured with CORS to allow requests from the React application:
- Origin: http://localhost:3000
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed Headers: Content-Type, Accept, Authorization, X-Requested-With, Cache-Control

## Project Structure

```
├── client/             # React frontend
├── server/             # Express backend
├── package.json        # Root package.json
├── restart.sh          # Utility script for restarting the application
└── README.md           # This file
```