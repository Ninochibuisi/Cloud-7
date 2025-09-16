import { NextApiRequest, NextApiResponse } from 'next';
import { VisualCrossingAPI } from '../../../../src/lib/visual-crossing-api';
import { getStateByName } from '../../../../src/lib/nigerian-states';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { location } = req.query;
  const { unitGroup = 'metric' } = req.query;

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const weatherAPI = new VisualCrossingAPI(apiKey);
    
    // Check if location is a Nigerian state
    const state = getStateByName(location);
    let searchLocation = location;
    
    if (state) {
      // Use coordinates for better accuracy
      searchLocation = `${state.latitude},${state.longitude}`;
    }

    const currentWeather = await weatherAPI.getCurrentWeather(
      searchLocation,
      unitGroup as 'us' | 'uk' | 'metric' | 'base'
    );

    // Add state information if available
    const response = {
      ...currentWeather,
      location: {
        name: state?.name || location,
        capital: state?.capital,
        region: state?.region,
        coordinates: state ? { lat: state.latitude, lng: state.longitude } : undefined
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Weather API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        return res.status(404).json({ error: 'Location not found' });
      } else if (error.message.includes('401')) {
        return res.status(401).json({ error: 'Invalid API key' });
      } else if (error.message.includes('429')) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
