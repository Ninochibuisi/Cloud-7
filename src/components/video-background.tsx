'use client';

import { useEffect, useState } from 'react';
import { VisualCrossingWeatherData } from '@/lib/visual-crossing-api';

interface VideoBackgroundProps {
  weatherData: VisualCrossingWeatherData | null;
}

export function VideoBackground({ weatherData }: VideoBackgroundProps) {
  const [currentVideo, setCurrentVideo] = useState('clear sky.mp4');

  useEffect(() => {
    if (!weatherData) return;

    const conditions = weatherData.currentConditions.conditions.toLowerCase();

    let videoFile = 'clear sky.mp4'; // default

    if (conditions.includes('rain') || conditions.includes('storm') || conditions.includes('drizzle')) {
      videoFile = 'rainy sky.mp4';
    } else if (conditions.includes('cloud') || conditions.includes('overcast')) {
      videoFile = 'cloudy sky.mp4';
    } else if (conditions.includes('clear') || conditions.includes('sunny')) {
      videoFile = 'clear sky.mp4';
    }

    setCurrentVideo(videoFile);
  }, [weatherData]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        key={currentVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`/${currentVideo}`} type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
    </div>
  );
}

