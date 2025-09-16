'use client';

import { useState, useEffect } from 'react';
import { VisualCrossingAPI, VisualCrossingWeatherData } from '@/lib/visual-crossing-api';
import { SearchBar } from './search-bar';
import { CurrentWeather } from './current-weather';
import { AirQuality } from './air-quality';
import { TemperatureGraph } from './temperature-graph';
import { WeatherForecast } from './weather-forecast';
import { DailyTemperatures } from './daily-temperatures';
import { CityTemperatures } from './city-temperatures';
import { Greeting } from './greeting';
import { Settings } from './settings';
import { UserData } from '@/lib/user-data';

interface WeatherDashboardProps {
  weatherAPI: VisualCrossingAPI | null;
  userData: UserData | null;
}

export function WeatherDashboard({ weatherAPI, userData }: WeatherDashboardProps) {
  const [currentCity, setCurrentCity] = useState(userData?.location || 'Lagos');
  const [weatherData, setWeatherData] = useState<VisualCrossingWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherData = async (city: string) => {
    if (!weatherAPI) {
      setError('Weather API not available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherAPI.getWeatherData(city, 7, 'metric', 'days,hours,current');
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to load weather data:', err);
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
    loadWeatherData(city);
  };


  useEffect(() => {
    if (userData?.location) {
      loadWeatherData(userData.location);
    } else {
      loadWeatherData(currentCity);
    }
  }, [userData?.location]);

  return (
    <div className="min-h-screen relative">
      {/* Greeting */}
      <Greeting userData={userData} />

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <SearchBar 
            onCityChange={handleCityChange}
            currentCity={currentCity}
            loading={loading}
          />
          
          {weatherData && (
            <>
              <CurrentWeather data={weatherData} />
              <AirQuality 
                data={weatherData} 
                cityName={weatherData.resolvedAddress}
              />
              <TemperatureGraph data={weatherData} />
            </>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white">
              <p className="text-red-200">{error}</p>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {weatherData && (
            <>
              <WeatherForecast 
                forecast={weatherData.days} 
                currentWeather={weatherData.currentConditions}
              />
              <DailyTemperatures forecast={weatherData.days} />
              <CityTemperatures currentTemp={weatherData.currentConditions.temp} />
            </>
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex justify-between items-center mt-6 text-white text-sm">
        <div>{weatherData?.currentConditions.temp}°C</div>
        <div>{weatherData?.resolvedAddress} Weather</div>
      </div>

      {/* Settings */}
      {userData && (
        <Settings 
          userData={userData} 
          onClose={() => {}}
        />
      )}
    </div>
  );
}