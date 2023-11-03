import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req.query;
    const apiKey = process.env.API_KEY;
    const omdbAPI = process.env.OMDB_API;
    const response = await fetch(`${omdbAPI}?t=${query}&apikey=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};