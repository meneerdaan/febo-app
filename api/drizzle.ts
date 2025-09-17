import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../db/drizzle-client';
import { persoon } from '../db/schema';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Vercel provides this environment variable. If it exists, we're on Vercel.
  if (process.env.VERCEL_ENV) {
    // Vercel environment: Connect to the database
    try {
      const allPersonen = await db.select().from(persoon);
      return res.status(200).json(allPersonen);
    } catch (error: any) {
      console.error('Error fetching data from database:', error);
      return res.status(500).json({ message: 'Failed to fetch data from database.' });
    }
  } else {
    // Local/AI Studio environment: Return dummy data
    console.log("Running in a non-Vercel environment. Returning dummy data.");
    const dummyPeople = [
      { id: 1, name: 'Alice (dummy data)' },
      { id: 2, name: 'Bob (dummy data)' },
      { id: 3, name: 'Charlie (dummy data)' },
      { id: 4, name: 'Diana (dummy data)' },
    ];
    return res.status(200).json(dummyPeople);
  }
}