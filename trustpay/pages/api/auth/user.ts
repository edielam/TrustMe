// pages/api/auth/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

interface DecodedToken {
  id: number;
  username: string;
  email: string;
}

const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const db = await getDb();

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, db, decodedToken.id);
    case 'POST':
      return handleProfileImageUpdate(req, res, db, decodedToken.id);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, db: any, userId: number) {
  try {
    const user = await db.get('SELECT id, username, email, profile_image FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleProfileImageUpdate(req: NextApiRequest, res: NextApiResponse, db: any, userId: number) {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    await db.run('UPDATE users SET profile_image = ? WHERE id = ?', [image, userId]);
    const updatedUser = await db.get('SELECT id, username, email, profile_image FROM users WHERE id = ?', [userId]);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
