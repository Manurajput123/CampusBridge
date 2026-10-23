import { connectMongo, closeMongo } from './db.js';
import {
  INITIAL_COLLEGES,
  DEMO_USERS,
  INITIAL_EVENTS,
  INITIAL_NOTICES,
  INITIAL_PASSES,
  INITIAL_ACCESS_REQUESTS,
  INITIAL_TEAMS
} from '../src/data/mockData.js';

async function seedDatabase() {
  try {
    const db = await connectMongo();
    console.log(`\n========================================`);
    console.log(`🌱 Seeding MongoDB Database: "${db.databaseName}"`);
    console.log(`========================================\n`);

    // 1. Colleges
    await db.collection('colleges').deleteMany({});
    await db.collection('colleges').insertMany(INITIAL_COLLEGES);
    console.log(`✅ Seeded ${INITIAL_COLLEGES.length} Colleges (AKGEC, KIET, ABES, MITS, NIET...)`);

    // 2. Users
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(DEMO_USERS);
    console.log(`✅ Seeded ${DEMO_USERS.length} Demo Users (Students & College Admins)`);

    // 3. Events
    await db.collection('events').deleteMany({});
    await db.collection('events').insertMany(INITIAL_EVENTS);
    console.log(`✅ Seeded ${INITIAL_EVENTS.length} Inter-College Events & Hackathons`);

    // 4. Notices
    await db.collection('notices').deleteMany({});
    await db.collection('notices').insertMany(INITIAL_NOTICES);
    console.log(`✅ Seeded ${INITIAL_NOTICES.length} College Circulars & Notices`);

    // 5. Passes
    await db.collection('passes').deleteMany({});
    await db.collection('passes').insertMany(INITIAL_PASSES);
    console.log(`✅ Seeded ${INITIAL_PASSES.length} College Visit & Event Passes`);

    // 6. Access Requests
    await db.collection('accessRequests').deleteMany({});
    await db.collection('accessRequests').insertMany(INITIAL_ACCESS_REQUESTS);
    console.log(`✅ Seeded ${INITIAL_ACCESS_REQUESTS.length} Lab Access Requests`);

    // 7. Teams
    await db.collection('teams').deleteMany({});
    await db.collection('teams').insertMany(INITIAL_TEAMS);
    console.log(`✅ Seeded ${INITIAL_TEAMS.length} Hackathon Teams`);

    console.log(`\n========================================`);
    console.log(`🎉 ALL DATA POPULATED SUCCESSFULLY!`);
    console.log(`👉 Open or refresh MongoDB Compass to see all 7 collections and documents.`);
    console.log(`========================================\n`);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await closeMongo();
    process.exit(0);
  }
}

seedDatabase();
