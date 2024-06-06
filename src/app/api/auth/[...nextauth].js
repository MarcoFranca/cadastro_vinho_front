// src/app/api/auth/[...nextauth].ts
import { authOptions } from '@/auth/auth';
import NextAuth from 'next-auth';

export default NextAuth(authOptions);
