import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();

  if (req.method === 'GET') {
    // Get all stores
    const stores = await db.all('SELECT * FROM stores');
    res.status(200).json(stores);
  } else if (req.method === 'POST') {
    // Create a new store
    const { name, unique_id, user_id } = req.body;
    const result = await db.run(
      'INSERT INTO stores (name, unique_id, user_id) VALUES (?, ?, ?)',
      [name, unique_id, user_id]
    );
    const newStore = await db.get('SELECT * FROM stores WHERE id = ?', [result.lastID]);
    res.status(201).json(newStore);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (req.method === 'PUT') {
    // Update a store
    const { name, unique_id } = req.body;
    await db.run(
      'UPDATE stores SET name = ?, unique_id = ? WHERE id = ?',
      [name, unique_id, id]
    );
    const updatedStore = await db.get('SELECT * FROM stores WHERE id = ?', [id]);
    res.status(200).json(updatedStore);
  } else if (req.method === 'DELETE') {
    // Delete a store
    await db.run('DELETE FROM stores WHERE id = ?', [id]);
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
}
