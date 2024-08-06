// pages/api/lists/stores.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Make sure this matches your login handler

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
      return handlePost(req, res, db, decodedToken.id);
    case 'PUT':
      return handlePut(req, res, db, decodedToken.id);
    case 'DELETE':
      return handleDelete(req, res, db, decodedToken.id);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, db: any, userId: number) {
  try {
    const stores = await db.all('SELECT * FROM stores WHERE user_id = ?', [userId]);
    for (let store of stores) {
      const items = await db.all('SELECT * FROM store_items WHERE store_id = ?', [store.id]);
      store.items = items;
    }
    res.status(200).json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, db: any, userId: number) {
  const { name, items } = req.body;
  if (!name || !items) {
    return res.status(400).json({ message: 'Name and items are required' });
  }

  try {
    const uniqueId = generateUniqueId();
    const result = await db.run(
      'INSERT INTO stores (user_id, name, unique_id) VALUES (?, ?, ?)',
      [userId, name, uniqueId]
    );
    const storeId = result.lastID;

    for (const item of items) {
      await db.run(
        'INSERT INTO store_items (store_id, name, price, quantity) VALUES (?, ?, ?, ?)',
        [storeId, item.name, item.price, item.quantity]
      );
    }

    const newStore = await db.get('SELECT * FROM stores WHERE id = ?', [storeId]);
    newStore.items = await db.all('SELECT * FROM store_items WHERE store_id = ?', [storeId]);

    res.status(201).json(newStore);
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, db: any, userId: number) {
  const { id } = req.query;
  const { name, items } = req.body;

  if (!id || !name || !items) {
    return res.status(400).json({ message: 'ID, name, and items are required' });
  }

  try {
    const store = await db.get('SELECT * FROM stores WHERE id = ? AND user_id = ?', [id, userId]);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    await db.run('UPDATE stores SET name = ? WHERE id = ?', [name, id]);

    await db.run('DELETE FROM store_items WHERE store_id = ?', [id]);

    for (const item of items) {
      await db.run(
        'INSERT INTO store_items (store_id, name, price, quantity) VALUES (?, ?, ?, ?)',
        [id, item.name, item.price, item.quantity]
      );
    }

    const updatedStore = await db.get('SELECT * FROM stores WHERE id = ?', [id]);
    updatedStore.items = await db.all('SELECT * FROM store_items WHERE store_id = ?', [id]);

    res.status(200).json(updatedStore);
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, db: any, userId: number) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Store ID is required' });
  }

  try {
    const store = await db.get('SELECT * FROM stores WHERE id = ? AND user_id = ?', [id, userId]);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    await db.run('DELETE FROM store_items WHERE store_id = ?', [id]);
    await db.run('DELETE FROM stores WHERE id = ?', [id]);

    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}