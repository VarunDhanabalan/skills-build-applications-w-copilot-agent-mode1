import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')
  } catch (error) {
    console.warn('MongoDB is unavailable; API started without a database connection.', error)
  }
}

export default mongoose.connection
