import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
import { verifyToken } from './user';


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

  try {
    const user = await db.get('SELECT unique_link FROM users WHERE id = ?', [decodedToken.id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ trustpayLink: user.unique_link });
  } catch (error) {
    console.error('Error fetching trustpay link:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}