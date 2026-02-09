import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import taskRoutes from './routes/tasks.js';
import errorHandler from './middlewares/errormw.js';

connectDB();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
