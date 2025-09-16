'use client';

import { useState, useEffect } from 'react';

import { UserData } from '@/lib/user-data';

interface GreetingProps {
  userData: UserData | null;
}

export function Greeting({ userData }: GreetingProps) {
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      
      let timeGreeting = '';
      let timeOfDayText = '';
      
      if (hour >= 5 && hour < 12) {
        timeGreeting = 'Good Morning';
        timeOfDayText = 'morning';
      } else if (hour >= 12 && hour < 17) {
        timeGreeting = 'Good Afternoon';
        timeOfDayText = 'afternoon';
      } else if (hour >= 17 && hour < 21) {
        timeGreeting = 'Good Evening';
        timeOfDayText = 'evening';
      } else {
        timeGreeting = 'Good Night';
        timeOfDayText = 'night';
      }
      
      setGreeting(timeGreeting);
      setTimeOfDay(timeOfDayText);
    };

    updateGreeting();
    
    // Update every minute
    const interval = setInterval(updateGreeting, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (!userData) return null;

  return (
    <div className="glassmorphism-video rounded-2xl p-6 mb-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 font-poppins">
          {greeting}, {userData.name}!
        </h1>
        <p className="text-white/80 text-lg">
          Here's your weather for {userData.location}
        </p>
        <div className="mt-2 text-white/60 text-sm">
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
