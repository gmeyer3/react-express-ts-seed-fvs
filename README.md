# React Express TypeScript Seed Project

A full-stack TypeScript application with React frontend and Express backend. This is the basis for simple feature requests/fixes.

## DEVELOPMENT TASKS FOR SOC

- Install and run the development mode for this project (instructions below this set of bullets)
- The existing Prime React component in the default screen doesn't have sorting. Please establish sorting by all the headers with ascending/descending clickable icons
- After the above 'fix' is completed, there is a 'table2.json' file within the server back end files. Give it a back end route and GET request by which to be called from a new front end route that contains a Prime React route/page that displays the data in a Prime React sortable table.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

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

To run both frontend and backend in development mode (Mac/Linux):
```bash
npm run start
```
To run both frontend and backend in development mode (Windows):
```bash
npm run start:win
```

This will start:
- Frontend: React development server on http://localhost:3000
- Backend: Express server on http://localhost:5001

Use Ctrl+C to stop both servers.

## Platform-Specific Instructions

### Windows

If you're running on Windows 11:

1. Make sure to run PowerShell or Command Prompt as Administrator
2. If you encounter port conflicts:
   ```bash
   # Check if ports are in use
   netstat -ano | findstr :3000
   netstat -ano | findstr :5001
   
   # Kill process using a port (replace PID with the process ID)
   taskkill /F /PID <PID>
   ```
3. If you get permission errors, try:
   ```bash
   # Allow Node.js through Windows Firewall
   netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes
   ```
4. If the frontend times out:
   - Use `http://127.0.0.1:3000` instead of `localhost:3000`
   - Clear your browser cache
   - Check Windows Defender Firewall settings
   - Ensure no antivirus is blocking Node.js

### macOS

If you're running on macOS:

1. If you encounter port conflicts:
   ```bash
   # Check if ports are in use
   lsof -i :3000
   lsof -i :5001
   
   # Kill process using a port (replace PID with the process ID)
   kill -9 <PID>
   ```
2. If you get permission errors:
   ```bash
   # Fix permissions
   sudo chown -R $USER:$(id -gn $USER) .
   ```
3. If the frontend times out:
   - Clear your browser cache
   - Check your hosts file: `sudo nano /etc/hosts`
   - Ensure localhost is properly configured

## Features

- **TypeScript** - Fully typed codebase for both frontend and backend
- **React** - Modern React with hooks for the frontend
- **Express** - Fast and minimalist web framework for the backend
- **PrimeReact** - UI component library for React applications
- **Single API Call** - Frontend makes a single API call on load with manual refresh option
- **Comprehensive Error Handling** - Both client and server implement proper error handling
- **Debug Information** - Debug details available in the frontend for API responses
- **Production-Ready Configuration** - Includes setups for both development and production environments
- **Request Logging** - Server logs all incoming requests with timestamps
- **CORS Configuration** - Properly configured for development and production environments

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

### Additional Scripts

- `npm run clean` - Removes all node_modules directories
- `npm run build` - Builds both client and server for production
- `npm run server` - Runs only the server in development mode
- `npm run client` - Runs only the client in development mode

## API Endpoints

- `/api/hello` - Returns a welcome message and timestamp
  - Response includes: message and timestamp
  - Headers: Properly configured CORS and cache control
- `/test` - Returns server status
  - Simple endpoint to verify server is running

## CORS Configuration

The server is configured with CORS to allow requests from the React application:
- Origin: http://localhost:3000
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed Headers: Content-Type, Accept, Authorization, X-Requested-With, Cache-Control
- Cache Control: no-store, no-cache, must-revalidate

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
│       ├── components/ # React components
│       ├── hooks/      # Custom React hooks
│       ├── services/   # API services
│       ├── App.tsx     # Main application component
│       └── index.tsx   # Application entry point
├── server/             # Express backend
│   └── src/            # TypeScript source code
│       ├── controllers/# Route controllers
│       ├── middleware/ # Express middleware
│       ├── routes/     # API routes
│       └── index.ts    # Server entry point
├── package.json        # Root package.json with scripts
├── restart.sh          # Utility script for restarting the application
└── README.md           # This file
```

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that the ports 3000 and 5001 are not in use
3. Try running the restart script: `./restart.sh`
4. Clear your browser cache
5. Check the server console for request logs
6. Verify CORS settings if you're getting cross-origin errors
7. On Windows:
   - Run terminal as Administrator
   - Check Windows Firewall settings
   - Ensure no antivirus is blocking Node.js
   - Try using `127.0.0.1` instead of `localhost`
8. If the server times out:
   - Check your network settings
   - Verify no proxy is interfering
   - Try increasing the timeout in server/src/index.ts
   - Check Windows Defender Firewall settings

## License

ISC