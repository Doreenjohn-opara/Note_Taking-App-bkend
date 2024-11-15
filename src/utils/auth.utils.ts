import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: string | jwt.JwtPayload;
  }

