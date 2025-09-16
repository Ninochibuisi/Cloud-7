import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    services: {
      api: 'operational',
      database: 'not_required',
      external_apis: process.env.VISUAL_CROSSING_API_KEY ? 'configured' : 'not_configured'
    }
  };

  res.status(200).json(healthCheck);
}




