import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// Initialize express app
const app = express();
const PORT = parseInt(process.env.PORT || '5001', 10);
const HOST = process.env.HOST || '0.0.0.0'; // Allow connections from any IP

// Increase timeout settings
app.use((req: Request, res: Response, next: NextFunction) => {
  req.setTimeout(30000); // 30 seconds
  res.setTimeout(30000); // 30 seconds
  next();
});

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  next();
});

// CORS configuration - Allow all origins in development
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Allow both localhost and 127.0.0.1
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With', 'Cache-Control'],
  credentials: true
}));

// Add CORS preflight handling
app.options('*', cors());

// Parse JSON bodies with increased limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from the React app in development
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../../client/public')));
}

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// API Routes
app.get('/api/hello', (req: Request, res: Response) => {
  try {
    const currentTime = new Date().toISOString();
    const responseData = { 
      message: 'Please follow the instructions in the README.md file to get started.',
      timestamp: Date.now()
    };
    
    console.log('Sending response:', responseData);
    
    // Set explicit headers for CORS
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Cache-Control');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.json(responseData);
    
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error in /api/hello:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New route for table1 data
app.get('/api/table1', (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, 'table1.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Set headers for CORS and caching
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Cache-Control');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.json(data);
    
    console.log('Table1 data sent successfully');
  } catch (error) {
    console.error('Error reading table1.json:', error);
    res.status(500).json({ 
      error: 'Failed to read table data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test endpoint
app.get('/test', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// Start server with proper error handling
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Test the API with: curl http://localhost:${PORT}/api/hello`);
}).on('error', (err: Error) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
}); 