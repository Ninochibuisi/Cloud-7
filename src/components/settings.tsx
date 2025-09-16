'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, X, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserDataManager, UserData } from '@/lib/user-data';

interface SettingsProps {
  userData: UserData | null;
  onClose: () => void;
}

export function Settings({ userData, onClose }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(userData?.name || '');
  const [location, setLocation] = useState(userData?.location || '');

  const handleSave = () => {
    if (userData) {
      const updatedData = {
        ...userData,
        name: name.trim(),
        location: location.trim()
      };
      UserDataManager.updateUserData(updatedData);
    }
    setIsOpen(false);
  };

  const handleResetOnboarding = () => {
    UserDataManager.clearUserData();
    window.location.reload();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 glassmorphism-video border border-white/20 text-white hover:bg-white/20"
        size="sm"
      >
        <SettingsIcon className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative glassmorphism-video rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white font-poppins">Settings</h2>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/80 text-sm mb-2 block">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-white/80 text-sm mb-2 block">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              placeholder="City, Country"
            />
          </div>

        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <Button
            onClick={handleSave}
            className="bg-white/20 hover:bg-white/30 border border-white/20 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          
          <Button
            onClick={handleResetOnboarding}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
}


