import jwt from 'jsonwebtoken';
import { JWTPayload } from '../middleware/auth';

export const generateToken = (userId: string): string => {
  const payload: JWTPayload = { userId };
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  } as jwt.SignOptions);
};

