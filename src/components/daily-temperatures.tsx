'use client';

import { VisualCrossingDay } from '@/lib/visual-crossing-api';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DailyTemperaturesProps {
  forecast: VisualCrossingDay[];
}

export function DailyTemperatures({ forecast }: DailyTemperaturesProps) {
  // Generate daily temperature data from Visual Crossing forecast
  const dailyData = forecast.slice(0, 7).map((day, index) => {
    const date = new Date(day.datetime);
    const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      day: dayName,
      high: Math.round(day.tempmax),
      low: Math.round(day.tempmin),
      temp: Math.round((day.tempmax + day.tempmin) / 2)
    };
  });

  // Create data for the wavy line chart
  const chartData = dailyData.map((item) => ({
    day: item.day,
    temp: item.temp,
    high: item.high,
    low: item.low,
  }));

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Daily Temperatures</h3>
      
      {/* Wavy Line Chart */}
      <div className="h-24 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#60a5fa" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: '#60a5fa' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature Pairs */}
      <div className="space-y-2">
        {dailyData.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>high {item.high}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span>low {item.low}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}