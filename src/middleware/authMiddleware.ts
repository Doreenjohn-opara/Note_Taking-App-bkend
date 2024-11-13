import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: string | object;
  }

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          res.status(401).json({ message: 'Authorization token is missing' });
          return;
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    };

export default authMiddleware;

