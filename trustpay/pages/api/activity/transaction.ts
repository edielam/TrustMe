import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
var jwt = require('jsonwebtoken');

interface Transaction {
  id: number;
  amount: string;
  refundable_amount: string;
  type: 'sent' | 'received';
  status: 'pending' | 'completed' | 'failed';
  counterparty: string;
  created_at: string;
}

interface FormattedTransaction {
  id: number;
  amount: number;
  refundableAmount: number;
  type: 'sent' | 'received';
  status: 'pending' | 'completed' | 'failed';
  counterparty: string;
  date: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as { id: number };
    const userId = decoded.id;

    const db = await getDb();

    const transactions: Transaction[] = await db.all(
      `SELECT id, amount, refundable_amount, type, status, counterparty, created_at
       FROM transactions
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );

    const formattedTransactions: FormattedTransaction[] = transactions.map(t => ({
      id: t.id,
      amount: parseFloat(t.amount),
      refundableAmount: parseFloat(t.refundable_amount),
      type: t.type,
      status: t.status,
      counterparty: t.counterparty,
      date: new Date(t.created_at).toISOString(),
    }));

    res.status(200).json(formattedTransactions);
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}