import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';

// 2. Initialize the Server
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Setup "Middleware" (The Security Guards & Loggers)
app.use(express.json()); // This allows the server to understand data sent in JSON format
app.use(cors());         // This allows our Frontend to talk to this Backend
app.use(helmet());       // This adds security headers to protect our app
app.use(morgan('dev'));  // This logs every request to the terminal so we can see what's happening

// 4. Routes
app.use('/api/auth', authRoutes);

// When someone visits http://localhost:5000/
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the PMS API!' });
});

// 5. Start Listening!
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
