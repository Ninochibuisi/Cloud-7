'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, User, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (userData: { name: string; location: string }) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && location.trim()) {
      onComplete({ name: name.trim(), location: location.trim() });
    }
  };

  const handleSkip = () => {
    onComplete({ name: 'User', location: 'Nigeria' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/clear sky.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 font-poppins">
              Welcome to Cloud7 for G7
            </h1>
            <p className="text-white/80 text-lg">
              Set up your personalized weather dashboard
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
            </div>
          </div>

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2 font-poppins">
                  What's your name?
                </h2>
                <p className="text-white/70">
                  We'll use this to personalize your weather experience
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 text-lg py-3"
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2 font-poppins">
                  Where are you located?
                </h2>
                <p className="text-white/70">
                  This helps us show you accurate weather information
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="City, Country (e.g., Nigeria)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 text-lg py-3"
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col space-y-3 mt-8">
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !name.trim()) || (step === 2 && !location.trim())}
              className="bg-white/20 hover:bg-white/30 border border-white/20 text-white py-3 text-lg font-medium"
            >
              {step === 1 ? 'Continue' : 'Get Started'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

