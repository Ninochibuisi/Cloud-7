'use client';

import { VisualCrossingWeatherData } from '@/lib/visual-crossing-api';
import { Wind, Droplets } from 'lucide-react';

interface CurrentWeatherProps {
  data: VisualCrossingWeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const getWeatherIcon = (icon: string) => {
    // Visual Crossing uses different icon format
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${icon}.svg`;
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const currentConditions = data.currentConditions;

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      {/* Temperature Display fixed */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-2">
          <img 
            src={getWeatherIcon(currentConditions.icon)} 
            alt={currentConditions.conditions}
            className="w-16 h-16"
          />
          <div>
            <div className="text-6xl font-bold text-white">
              {Math.round(currentConditions.temp)}°
            </div>
            <div className="text-white/70 text-sm">
              Feels like {Math.round(currentConditions.feelslike)}°
            </div>
          </div>
        </div>
        <div className="text-white/80 text-lg capitalize">
          {currentConditions.conditions}
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-white/80">
          <Droplets className="w-4 h-4" />
          <span className="text-sm">Humidity: {currentConditions.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Wind className="w-4 h-4" />
          <span className="text-sm">
            Wind: {getWindDirection(currentConditions.winddir)} {Math.round(currentConditions.windspeed)} km/h
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 text-center">
        <div className="text-white/60 text-sm">
          {data.resolvedAddress}
        </div>
        <div className="text-white/60 text-xs mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
}