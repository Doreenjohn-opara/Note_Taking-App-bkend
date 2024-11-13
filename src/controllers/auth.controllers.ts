import { Request, Response } from 'express';
import User from '../models/User.models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../utils/user.utils';
import dotenv from 'dotenv';

dotenv.config()

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({username, email, password:hashedPassword});


        if(!user) {
            res.status(400).json({error: true, message: 'Invalid user data'})
        }
        await user.save();
        res.status(201).json({error: false, data: user, message: 'User registered successfully!'});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: true, message: 'Internal server error: '+ error.message });
        } else {
            // Handle unexpected error types
            res.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
} 

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user: any = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            res.status(401).json({ error: true, message: 'Invalid credentials'})
        }

        try {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
            res.json({token})
        } catch (err) {
            res.status(500).json({message: "Token generation failed"})
        }
    } catch (error: any) {
        res.status(400).json({error: error.message})
        }
}