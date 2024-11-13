import { Request, Response } from 'express';
import User from '../models/User.models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../utils/user.utils';

const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user: any = new User({ username, email, password: hashedPassword });

        if (!user) {
            return res.status(400).json({ error: true, data: null, message: 'Invalid user data' });
        }

        await user.save();

        // Convert user to an object and remove password before sending the response
        const userData = user.toObject() as any;
        delete userData.password;
        delete userData.email;
        res.status(201).json({ error: false, data: userData, message: 'User registered successfully!' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: true, data: null, message: 'Internal server error: ' + error.message });
        } else {
            res.status(400).json({ error: true, data: null, message: 'An unknown error occurred.' });
        }
    }
};

const login = async (req: Request, res: Response) => {
    try {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('User not found')
        return
    }

    const comparePassword = bcrypt.compare(password, user.password)
    if(!comparePassword) {
        throw new Error('Invalid')
        return
    }

    

    } catch (error: any) {
        res.status(400).json({ error: true, data: null, message: 'Internal server error: ' + error.message });
    }
} 