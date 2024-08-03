import { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { sellerId, buyerId, amount, refundableAmount } = req.body

  const db = await getDb()

  // Insert transaction into database
  const result = await db.run(
    'INSERT INTO transactions (seller_id, buyer_id, amount, refundable_amount, status) VALUES (?, ?, ?, ?, ?)',
    [sellerId, buyerId, amount, refundableAmount, 'PENDING']
  )

  res.status(201).json({ transactionId: result.lastID, message: 'Transaction initiated successfully' })
}