import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(`${process.env.MONGO_URI}`);
      console.log(colors.cyan.bold('MongoDB connected successfully'));
    } catch (error) {
      console.error('MongoDB connection failed:', error);
    }
  };

export default connectDB;