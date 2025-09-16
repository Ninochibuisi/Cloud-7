'use client';

import { VisualCrossingDay, VisualCrossingCurrentConditions } from '@/lib/visual-crossing-api';
import { ArrowRight, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherForecastProps {
  forecast: VisualCrossingDay[];
  currentWeather: VisualCrossingCurrentConditions;
}

export function WeatherForecast({ forecast, currentWeather }: WeatherForecastProps) {
  const getWeatherIcon = (icon: string) => {
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${icon}.svg`;
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const currentDay = forecast[0];
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">Weather Forecast</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Current Day Forecast */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={getWeatherIcon(currentWeather.icon)} 
            alt={currentWeather.conditions}
            className="w-12 h-12"
          />
          <div className="flex-1">
            <div className="text-white font-semibold text-lg">
              {currentWeather.conditions}
            </div>
            <div className="text-white/70 text-sm">
              {Math.round(currentWeather.temp)}°C
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-white/80 text-sm mb-2">
            {formattedDate}, {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="text-white/70 text-sm leading-relaxed">
            {currentDay?.description || 'Current weather conditions with detailed forecast information.'}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="space-y-3">
        <h4 className="text-white/80 font-medium text-sm">7-Day Forecast</h4>
        {forecast.slice(0, 7).map((day, index) => {
          const date = new Date(day.datetime);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <div key={day.datetime} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="text-white/70 text-sm w-12">{dayName}</div>
                <img 
                  src={getWeatherIcon(day.icon)} 
                  alt={day.conditions}
                  className="w-8 h-8"
                />
                <div className="text-white/80 text-sm capitalize">
                  {day.conditions}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-white text-sm">
                  {Math.round(day.tempmax)}°/{Math.round(day.tempmin)}°
                </div>
                {day.precipprob > 0 && (
                  <div className="flex items-center gap-1 text-blue-400 text-xs">
                    <CloudRain className="w-3 h-3" />
                    {Math.round(day.precipprob)}%
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-white/70 hover:text-white hover:bg-white/10"
        >
          SEE DETAILS
        </Button>
      </div>
    </div>
  );
}