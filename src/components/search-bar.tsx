'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onCityChange: (city: string) => void;
  currentCity: string;
  loading: boolean;
}

export function SearchBar({ onCityChange, currentCity, loading }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(currentCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onCityChange(searchValue.trim());
    }
  };

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a city..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-white/20 hover:bg-white/30 border border-white/20 text-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
