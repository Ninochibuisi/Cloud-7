'use client';

import { useState, useEffect } from 'react';
import { WeatherDashboard } from '@/components/weather-dashboard';
import { Onboarding } from '@/components/onboarding';
import { VideoBackground } from '@/components/video-background';
import { VisualCrossingAPI } from '@/lib/visual-crossing-api';
import { UserDataManager, UserData } from '@/lib/user-data';
import { poppins } from '@/lib/fonts';

export default function Home() {
  const [weatherAPI, setWeatherAPI] = useState<VisualCrossingAPI | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Visual Crossing API
    const apiKey = process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY || '2RX7Q8U9A9YHSL93HCS29Y2JL';
    if (apiKey) {
      setWeatherAPI(new VisualCrossingAPI(apiKey));
    }

    // Load user data
    const storedUserData = UserDataManager.getUserData();
    setUserData(storedUserData);
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (data: { name: string; location: string }) => {
    UserDataManager.completeOnboarding(data.name, data.location);
    setUserData({
      name: data.name,
      location: data.location,
      hasCompletedOnboarding: true,
      preferences: {
        units: 'metric',
        theme: 'dark'
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show onboarding if user hasn't completed it
  if (!userData?.hasCompletedOnboarding) {
    return (
      <div className={`min-h-screen ${poppins.variable} font-poppins`}>
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <main className={`min-h-screen relative overflow-hidden ${poppins.variable} font-poppins`}>
      {/* Video Background */}
      <VideoBackground weatherData={null} />
      
      {/* Main content */}
      <div className="relative z-10 p-6">
        <WeatherDashboard 
          weatherAPI={weatherAPI} 
          userData={userData}
        />
      </div>
    </main>
  );
}