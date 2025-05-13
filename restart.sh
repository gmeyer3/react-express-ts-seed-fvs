#!/bin/bash

# Stop any running Node.js processes
echo "Stopping all Node.js processes..."
pkill -f "node" || true

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Give processes time to terminate
sleep 2

# Start the application with clean environment
echo "Starting application..."
npm start 