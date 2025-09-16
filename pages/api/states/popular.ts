import { NextApiRequest, NextApiResponse } from 'next';
import { POPULAR_STATES } from '../../../src/lib/nigerian-states';
import { VisualCrossingAPI } from '../../../src/lib/visual-crossing-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { includeWeather = 'false' } = req.query;

  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    let response = {
      states: POPULAR_STATES,
      total: POPULAR_STATES.length,
      lastUpdated: new Date().toISOString()
    };

    // If weather data is requested, fetch current weather for all popular states
    if (includeWeather === 'true') {
      const weatherAPI = new VisualCrossingAPI(apiKey);
      const weatherPromises = POPULAR_STATES.map(async (state) => {
        try {
          const weather = await weatherAPI.getCurrentWeather(
            `${state.latitude},${state.longitude}`,
            'metric'
          );
          return {
            ...state,
            currentWeather: {
              temperature: weather.temp,
              feelsLike: weather.feelslike,
              humidity: weather.humidity,
              conditions: weather.conditions,
              icon: weather.icon,
              windSpeed: weather.windspeed,
              windDirection: weather.winddir,
              pressure: weather.pressure,
              visibility: weather.visibility,
              uvIndex: weather.uvindex
            }
          };
        } catch (error) {
          console.error(`Failed to fetch weather for ${state.name}:`, error);
          return {
            ...state,
            currentWeather: null,
            weatherError: 'Failed to fetch weather data'
          };
        }
      });

      const statesWithWeather = await Promise.all(weatherPromises);
      response = {
        ...response,
        states: statesWithWeather
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Popular States API Error:', error);
    res.status(500).json({ error: 'Failed to fetch popular states data' });
  }
}
