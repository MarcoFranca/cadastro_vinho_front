// src/lib/auth.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

export function verifyJwtToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
