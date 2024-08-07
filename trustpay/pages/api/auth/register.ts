import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
var bcrypt = require('bcryptjs');

function generateUniqueLink(username: string): string {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `trustpay.com/@${username}_${randomNumber}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, email, password, phoneNumber, countryCode } = req.body;

  try {
    const db = await getDb();

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique link
    const uniqueLink = generateUniqueLink(username);

    // Insert new user
    const result = await db.run(
      'INSERT INTO users (username, email, password, phone_number, country_code, unique_link) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, phoneNumber, countryCode, uniqueLink]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.lastID });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}