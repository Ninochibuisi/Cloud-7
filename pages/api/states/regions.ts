import { NextApiRequest, NextApiResponse } from 'next';
import { getAllRegions, getStatesByRegion } from '../../../src/lib/nigerian-states';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { region } = req.query;

  try {
    if (region && typeof region === 'string') {
      // Get states for specific region
      const states = getStatesByRegion(region);
      
      if (states.length === 0) {
        return res.status(404).json({ error: 'Region not found' });
      }

      res.status(200).json({
        region,
        states,
        total: states.length
      });
    } else {
      // Get all regions
      const regions = getAllRegions();
      
      res.status(200).json({
        regions,
        total: regions.length
      });
    }
  } catch (error) {
    console.error('Regions API Error:', error);
    res.status(500).json({ error: 'Failed to fetch regions data' });
  }
}
