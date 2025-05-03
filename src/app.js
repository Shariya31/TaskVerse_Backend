import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import Errorhandler from './utils/Errorhandler.js';

//import routes
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/error', (req, res, next) => {
  // Example of throwing a custom error
  next(new Errorhandler('This is a custom error message', 400));
});

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app;
