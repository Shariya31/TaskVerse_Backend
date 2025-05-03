import http from 'http';
import app from './app.js';
import connectDB from './config/connectDb.js';
import { socketConnect } from './config/socketConnect.js';

const mongoUri = process.env.MONGO_URI || '';
connectDB(mongoUri);

const PORT = process.env.PORT || 4300;
const server = http.createServer(app);
socketConnect(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
