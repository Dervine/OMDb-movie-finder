import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req.query;
    const response = await fetch(`http://www.omdbapi.com/?t=${query}&apikey=31d7e182`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};