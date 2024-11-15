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
        const user: any = new User({ username, email, password: hashedPassword });

        if (!user) {
            res.status(400).json({ error: true, data: null, message: 'Invalid user data' });
            return
        }

        await user.save();

        // Convert user to an object and remove password before sending the response
        const userData = user.toObject() as any;
        delete userData.password;
        res.status(201).json({ error: false, data: userData, message: 'User registered successfully!' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: true, data: null, message: 'Internal server error: ' + error.message });
            return;
        } else {
            res.status(400).json({ error: true, data: null, message: 'An unknown error occurred.' });
            return;
        }
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({error: true, data: null, message: 'Please Provide email or password'})
            return;
        }
        const user: any = await User.findOne({ email });
        if(!user) {
            res.status(400).json({error: true, data: null, message: 'User not found'})
            return
        }
        const comparePassword = bcrypt.compare(password, user.password)
        if(!comparePassword) {
            res.status(401).json({error: true, data: null, message: 'Invalid'})
            return
        }
        
        try {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
            res.status(200).json({error: false, data: token, message: 'Login Successful'})
            return;
        } catch (err) {
            res.status(500).json({error: true, data: null, message: "Token generation failed"})
            return;
        }
    } catch (error: any) {
        res.status(400).json({error: true, data: null, message: error.message})
        return;
        }
}