import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const protect = async (req:Request, res:Response, next:NextFunction): Promise<void> => {

  const authHeader = req.headers.authorization;

    // Ensure authHeader is defined and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: No or malformed token' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    if (!token) {
    res.status(401).json({ message: 'Unauthorized: Token missing' });
    return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      // Cast req to AuthenticatedRequest after validation
      req.user = decoded;
      next(); // Pass control to the next middleware or route handler
    } catch (err) {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
    return;
    }
  };


export default protect;