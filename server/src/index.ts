import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  next();
});

// CORS configuration - Allow all origins in development
app.use(cors({
  origin: 'http://localhost:3000', // React app address
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With', 'Cache-Control']
}));

// Add CORS preflight handling
app.options('*', cors());

// Parse JSON bodies
app.use(express.json());

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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API with: curl http://localhost:${PORT}/api/hello`);
}); 