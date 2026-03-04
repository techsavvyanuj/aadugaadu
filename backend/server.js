const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/database');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: '🚀 Aadugaadu Backend is running!', timestamp: new Date() });
});

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact',  require('./routes/contact'));
app.use('/api/team',     require('./routes/team'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
