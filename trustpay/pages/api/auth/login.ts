import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  const db = await getDb()

  // Check if user exists
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email])
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' })

  res.status(200).json({ message: 'Login successful', token })
}
