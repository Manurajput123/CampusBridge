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
    status: 'ok',
    endpoints: [
      '/api/health',
      '/api/colleges',
      '/api/events',
      '/api/passes',
      '/api/users'
    ]
  });
});

// Colleges API
app.get('/api/colleges', async (req, res) => {
  try {
    const db = await connectMongo();
    const colleges = await db.collection('colleges').find({}).toArray();
    res.json({ count: colleges.length, colleges });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/colleges/:id', async (req, res) => {
  try {
    const db = await connectMongo();
    const college = await db.collection('colleges').findOne({ id: req.params.id });
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events API
app.get('/api/events', async (req, res) => {
  try {
    const db = await connectMongo();
    const events = await db.collection('events').find({}).toArray();
    res.json({ count: events.length, events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Passes API (Visit & Event Passes)
app.get('/api/passes', async (req, res) => {
  try {
    const db = await connectMongo();
    const passes = await db.collection('passes').find({}).toArray();
    res.json({ count: passes.length, passes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/passes', async (req, res) => {
  try {
    const db = await connectMongo();
    const pass = req.body;
    await db.collection('passes').insertOne(pass);
    res.status(201).json({ success: true, pass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gate Scanner Verification API
app.post('/api/passes/checkin', async (req, res) => {
  try {
    const db = await connectMongo();
    const { token, checkedInBy } = req.body;
    const pass = await db.collection('passes').findOne({ token });
    if (!pass) return res.status(404).json({ success: false, message: 'Invalid pass token' });
    if (pass.used) return res.status(400).json({ success: false, message: 'Pass already used' });

    const updated = await db.collection('passes').findOneAndUpdate(
      { token },
      { $set: { used: true, checkedInAt: new Date().toISOString(), checkedInBy: checkedInBy || 'Gate Security' } },
      { returnDocument: 'after' }
    );
    res.json({ success: true, pass: updated.value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Users API
app.get('/api/users', async (req, res) => {
  try {
    const db = await connectMongo();
    const users = await db.collection('users').find({}).toArray();
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
