import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Avery Chen', email: 'avery@example.com', avatar: 'AC' },
      { name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'JL' },
      { name: 'Sam Rivera', email: 'sam@example.com', avatar: 'SR' },
      { name: 'Taylor Morgan', email: 'taylor@example.com', avatar: 'TM' },
    ]);

    await Team.create([
      { name: 'Trailblazers', members: [users[0]._id, users[1]._id] },
      { name: 'Morning Momentum', members: [users[2]._id, users[3]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 35, points: 350, recordedAt: new Date('2026-08-20') },
      { user: users[0]._id, type: 'strength', durationMinutes: 25, points: 250, recordedAt: new Date('2026-08-22') },
      { user: users[1]._id, type: 'walking', durationMinutes: 45, points: 225, recordedAt: new Date('2026-08-21') },
      { user: users[2]._id, type: 'running', durationMinutes: 28, points: 280, recordedAt: new Date('2026-08-23') },
      { user: users[3]._id, type: 'strength', durationMinutes: 40, points: 400, recordedAt: new Date('2026-08-24') },
    ]);

    await Workout.create([
      { title: 'Easy Start Run', description: 'A steady run to build your aerobic base.', activityType: 'running', difficulty: 'beginner' },
      { title: 'Power Circuit', description: 'A full-body strength circuit with simple movements.', activityType: 'strength', difficulty: 'intermediate' },
      { title: 'Recovery Walk', description: 'A low-impact walk designed to keep you moving.', activityType: 'walking', difficulty: 'beginner' },
      { title: 'Tempo Builder', description: 'Intervals that improve pace and running endurance.', activityType: 'running', difficulty: 'advanced' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
