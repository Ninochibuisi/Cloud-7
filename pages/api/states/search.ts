import { NextApiRequest, NextApiResponse } from 'next';
import { searchStates } from '../../../src/lib/nigerian-states';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q: query, limit = '10' } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = searchStates(query);
    const limitNum = parseInt(limit as string);
    
    if (isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({ error: 'Limit must be a positive number' });
    }

    const limitedResults = results.slice(0, limitNum);

    res.status(200).json({
      query,
      results: limitedResults,
      total: results.length,
      limit: limitNum
    });
  } catch (error) {
    console.error('States Search Error:', error);
    res.status(500).json({ error: 'Failed to search states' });
  }
}
