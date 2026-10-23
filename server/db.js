import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusbridge';
const client = new MongoClient(mongoUri);

export async function connectMongo() {
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
    return client.db();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

export async function closeMongo() {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error while closing MongoDB connection:', error.message);
  }
}

export default client;
