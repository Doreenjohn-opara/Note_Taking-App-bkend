import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.config';
import noteRouter from './routes/note.routes';
import authRouter from './routes/auth.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());       // CORS: is a security feature implemented in web browsers that allows or restricts resources requested from another domain outside the domain from which the first resource was served. 

// Routes
app.use('/api/notes', noteRouter);    // Mount the router under a specific path
app.use('/api/auth', authRouter);


const server = app.listen(PORT, () => {
    console.log(
        colors.green.bold(`Server listening on port ${PORT}`))
});

