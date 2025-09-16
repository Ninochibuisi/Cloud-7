'use client';

import { VisualCrossingWeatherData } from '@/lib/visual-crossing-api';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface TemperatureGraphProps {
  data: VisualCrossingWeatherData;
}

export function TemperatureGraph({ data }: TemperatureGraphProps) {
  // Generate hourly data from Visual Crossing data
  const hourlyData = data.days[0]?.hours?.slice(0, 12).map((hour, index) => {
    const time = new Date(hour.datetime);
    const timeString = time.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    });
    
    return {
      time: timeString,
      temp: Math.round(hour.temp)
    };
  }) || [
    { time: '11 PM', temp: 19 },
    { time: '1 AM', temp: 18 },
    { time: '3 AM', temp: 17 },
    { time: '5 AM', temp: 16 },
    { time: '7 AM', temp: 17 },
    { time: '9 AM', temp: 19 },
    { time: '11 AM', temp: 21 },
    { time: '1 PM', temp: 23 },
    { time: '3 PM', temp: 24 },
    { time: '5 PM', temp: 22 },
    { time: '7 PM', temp: 20 },
    { time: '9 PM', temp: 19 },
  ];

  const currentTemp = Math.round(data.currentConditions.temp);
  const avgTemp = Math.round(hourlyData.reduce((sum, item) => sum + item.temp, 0) / hourlyData.length);
  const tempDiff = currentTemp - avgTemp;

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Temperature Trend</h3>
        <div className="flex items-center gap-2">
          <div className="text-white text-sm">
            {currentTemp}°C
          </div>
          <div className={`text-sm font-medium ${tempDiff >= 0 ? 'text-green-400' : 'text-blue-400'}`}>
            {tempDiff >= 0 ? '+' : ''}{tempDiff}°
          </div>
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            />
            <YAxis 
              hide
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#60a5fa" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#60a5fa' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-white/60 text-xs mt-2">
        {hourlyData.slice(0, 4).map((item, index) => (
          <span key={index}>{item.time}</span>
        ))}
      </div>
    </div>
  );
}