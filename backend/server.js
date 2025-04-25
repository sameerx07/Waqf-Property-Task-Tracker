import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Global handlers to catch stray errors
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// CORS + body‐parsing + cookies
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Health-check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Error middleware (must go last)
app.use(errorHandler);

// Start server *only after* DB is connected
async function startServer() {
  await connectDB(); // will exit(1) on failure
  app.listen(PORT, () => {
    console.log(`✔ Server running on http://localhost:${PORT}`);
  });
}

startServer();
