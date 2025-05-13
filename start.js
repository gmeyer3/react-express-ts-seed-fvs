// Suppress deprecation warnings
process.env.NODE_NO_WARNINGS = 1;

const { spawn } = require('child_process');
const path = require('path');

// Start the server
const server = spawn('npm', ['run', 'server'], {
  stdio: 'inherit',
  shell: true
});

// Start the client
const client = spawn('npm', ['run', 'client'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  server.kill('SIGINT');
  client.kill('SIGINT');
  process.exit();
});

console.log('Starting both client and server...'); 