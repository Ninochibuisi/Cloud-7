// Visual Crossing Weather API Service
// Based on: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/

export interface VisualCrossingWeatherData {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: VisualCrossingDay[];
  currentConditions: VisualCrossingCurrentConditions;
  stations?: { [key: string]: any };
}

export interface VisualCrossingDay {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype?: string[];
  snow: number;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations?: string[];
  source: string;
  hours: VisualCrossingHour[];
}

export interface VisualCrossingHour {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number;
  preciptype?: string[];
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations?: string[];
  source: string;
}

export interface VisualCrossingCurrentConditions {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number;
  preciptype?: string[];
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations?: string[];
  source: string;
}

export interface WeatherAlert {
  event: string;
  description: string;
  starts: string;
  expires: string;
  ends: string;
  senderName: string;
  severity: string;
  certainty: string;
  urgency: string;
  areas: string[];
  affectedZones: string[];
}

export class VisualCrossingAPI {
  private apiKey: string;
  private baseUrl: string = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get current weather and forecast for a location
   * @param location - City name, coordinates, or address
   * @param days - Number of days to forecast (1-15, default: 15)
   * @param unitGroup - Unit system: 'us', 'uk', 'metric', 'base' (default: 'metric')
   * @param include - Data sections to include: 'days', 'hours', 'current', 'alerts'
   */
  async getWeatherData(
    location: string,
    days: number = 15,
    unitGroup: 'us' | 'uk' | 'metric' | 'base' = 'metric',
    include: string = 'days,hours,current,alerts'
  ): Promise<VisualCrossingWeatherData> {
    const url = `${this.baseUrl}/${encodeURIComponent(location)}`;
    const params = new URLSearchParams({
      key: this.apiKey,
      unitGroup,
      include,
      elements: 'datetime,temp,feelslike,humidity,precip,precipprob,preciptype,snow,snowdepth,windgust,windspeed,winddir,pressure,cloudcover,visibility,solarradiation,solarenergy,uvindex,severerisk,conditions,icon,sunrise,sunset,moonphase,description'
    });

    if (days < 15) {
      params.append('maxDays', days.toString());
    }

    try {
      const response = await fetch(`${url}?${params}`);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Visual Crossing API Error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Visual Crossing API Error:', error);
      throw error;
    }
  }

  /**
   * Get weather data for a specific date range
   * @param location - City name, coordinates, or address
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   * @param unitGroup - Unit system
   * @param include - Data sections to include
   */
  async getWeatherDataRange(
    location: string,
    startDate: string,
    endDate: string,
    unitGroup: 'us' | 'uk' | 'metric' | 'base' = 'metric',
    include: string = 'days,hours,current,alerts'
  ): Promise<VisualCrossingWeatherData> {
    const url = `${this.baseUrl}/${encodeURIComponent(location)}/${startDate}/${endDate}`;
    const params = new URLSearchParams({
      key: this.apiKey,
      unitGroup,
      include,
      elements: 'datetime,temp,feelslike,humidity,precip,precipprob,preciptype,snow,snowdepth,windgust,windspeed,winddir,pressure,cloudcover,visibility,solarradiation,solarenergy,uvindex,severerisk,conditions,icon,sunrise,sunset,moonphase,description'
    });

    try {
      const response = await fetch(`${url}?${params}`);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Visual Crossing API Error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Visual Crossing API Error:', error);
      throw error;
    }
  }

  /**
   * Get current weather conditions only
   * @param location - City name, coordinates, or address
   * @param unitGroup - Unit system
   */
  async getCurrentWeather(
    location: string,
    unitGroup: 'us' | 'uk' | 'metric' | 'base' = 'metric'
  ): Promise<VisualCrossingCurrentConditions> {
    const data = await this.getWeatherData(location, 1, unitGroup, 'current');
    return data.currentConditions;
  }

  /**
   * Get weather forecast for multiple days
   * @param location - City name, coordinates, or address
   * @param days - Number of days to forecast
   * @param unitGroup - Unit system
   */
  async getForecast(
    location: string,
    days: number = 7,
    unitGroup: 'us' | 'uk' | 'metric' | 'base' = 'metric'
  ): Promise<VisualCrossingDay[]> {
    const data = await this.getWeatherData(location, days, unitGroup, 'days');
    return data.days;
  }

  /**
   * Get hourly forecast for today
   * @param location - City name, coordinates, or address
   * @param unitGroup - Unit system
   */
  async getHourlyForecast(
    location: string,
    unitGroup: 'us' | 'uk' | 'metric' | 'base' = 'metric'
  ): Promise<VisualCrossingHour[]> {
    const data = await this.getWeatherData(location, 1, unitGroup, 'hours');
    return data.days[0]?.hours || [];
  }

  /**
   * Convert wind direction degrees to compass direction
   * @param degrees - Wind direction in degrees (0-360)
   */
  getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  /**
   * Get UV index level description
   * @param uvIndex - UV index value (0-11+)
   */
  getUVIndexLevel(uvIndex: number): { level: string; color: string; description: string } {
    if (uvIndex <= 2) {
      return { level: 'Low', color: 'text-green-600', description: 'Minimal protection required' };
    } else if (uvIndex <= 5) {
      return { level: 'Moderate', color: 'text-yellow-600', description: 'Some protection required' };
    } else if (uvIndex <= 7) {
      return { level: 'High', color: 'text-orange-600', description: 'Protection required' };
    } else if (uvIndex <= 10) {
      return { level: 'Very High', color: 'text-red-600', description: 'Extra protection required' };
    } else {
      return { level: 'Extreme', color: 'text-purple-600', description: 'Avoid sun exposure' };
    }
  }

  /**
   * Get air quality level from visibility (approximate)
   * @param visibility - Visibility in km
   */
  getAirQualityFromVisibility(visibility: number): { level: string; color: string; description: string } {
    if (visibility >= 10) {
      return { level: 'Good', color: 'text-green-600', description: 'Air quality is satisfactory' };
    } else if (visibility >= 5) {
      return { level: 'Moderate', color: 'text-yellow-600', description: 'Air quality is acceptable' };
    } else if (visibility >= 2) {
      return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', description: 'Sensitive groups may experience health effects' };
    } else {
      return { level: 'Unhealthy', color: 'text-red-600', description: 'Everyone may experience health effects' };
    }
  }
}
