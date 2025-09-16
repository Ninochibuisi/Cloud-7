'use client';

import { VisualCrossingWeatherData } from '@/lib/visual-crossing-api';

interface AirQualityProps {
  data: VisualCrossingWeatherData | null;
  cityName: string;
}

export function AirQuality({ data, cityName }: AirQualityProps) {
  if (!data) return null;

  const visibility = data.currentConditions.visibility;
  const uvIndex = data.currentConditions.uvindex;

  const getAirQualityFromVisibility = (visibility: number) => {
    if (visibility >= 10) return { 
      level: 'Good', 
      color: 'bg-green-500', 
      description: 'Air quality is satisfactory.',
      range: 'Excellent visibility'
    };
    if (visibility >= 5) return { 
      level: 'Moderate', 
      color: 'bg-yellow-500', 
      description: 'Air quality is acceptable.',
      range: 'Good visibility'
    };
    if (visibility >= 2) return { 
      level: 'Unhealthy for Sensitive Groups', 
      color: 'bg-orange-500', 
      description: 'Sensitive groups may experience health effects.',
      range: 'Reduced visibility'
    };
    return { 
      level: 'Unhealthy', 
      color: 'bg-red-500', 
      description: 'Everyone may experience health effects.',
      range: 'Poor visibility'
    };
  };

  const getUVIndexLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400' };
    return { level: 'Extreme', color: 'text-purple-400' };
  };

  const qualityInfo = getAirQualityFromVisibility(visibility);
  const uvInfo = getUVIndexLevel(uvIndex);
  const percentage = Math.min((visibility / 10) * 100, 100);

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Air Quality & UV Index</h3>
      
      {/* Air Quality Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70 text-sm">Visibility Level</span>
          <span className="text-white text-sm font-medium">{visibility.toFixed(1)} km</span>
        </div>
        
        {/* Visual Bar */}
        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-green-500"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-orange-500"></div>
            <div className="flex-1 bg-red-500"></div>
          </div>
          <div 
            className={`absolute top-0 left-0 h-full ${qualityInfo.color} transition-all duration-500`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* UV Index */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70 text-sm">UV Index</span>
          <span className={`text-sm font-medium ${uvInfo.color}`}>
            {uvIndex} - {uvInfo.level}
          </span>
        </div>
      </div>

      {/* Quality Levels */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="text-white/70">
          <div className="font-medium text-green-400">Good</div>
          <div>Excellent visibility</div>
          <div>Good visibility</div>
        </div>
        <div className="text-white/70">
          <div className="font-medium text-red-400">Poor</div>
          <div>Reduced visibility</div>
          <div>Poor visibility</div>
        </div>
      </div>

      {/* City Description */}
      <div className="bg-white/5 rounded-lg p-3">
        <h4 className="text-white font-medium mb-1">{cityName}</h4>
        <p className="text-white/70 text-sm leading-relaxed">
          {qualityInfo.description}
        </p>
        <p className="text-white/60 text-xs mt-2">
          UV Index: {uvIndex} ({uvInfo.level})
        </p>
      </div>
    </div>
  );
}