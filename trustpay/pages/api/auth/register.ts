import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';

var bcrypt = require('bcryptjs');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, email, password } = req.body

  const db = await getDb()
  
  // Check if user already exists
  const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email])
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Insert user into database
  await db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword])

  res.status(201).json({ message: 'User registered successfully' })
}