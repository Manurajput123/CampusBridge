import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const db = await connectMongo();
    const stats = await db.command({ dbStats: 1 });

    res.json({
      status: 'ok',
      database: db.databaseName,
      collections: stats.collections,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'MongoDB connection failed',
      details: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'CampusBridge API is running',
    status: 'ok'
  });
});

async function startServer() {
  try {
    await connectMongo();
    app.listen(port, () => {
      console.log(`CampusBridge API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  process.exit(0);
});
