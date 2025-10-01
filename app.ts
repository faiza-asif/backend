import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userroutes';

dotenv.config();
const app = express();

// 🟢 Middlewares
app.use(cors());
app.use(express.json());

// 🟢 Database connect
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 🟢 Test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// 🟢 User routes enable
app.use('/api', userRoutes);

export default app;