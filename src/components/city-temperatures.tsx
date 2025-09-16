'use client';

interface CityTemperaturesProps {
  currentTemp: number;
}

export function CityTemperatures({ currentTemp }: CityTemperaturesProps) {
  const nigerianCities = [
    { name: 'Lagos', temp: 32 },
    { name: 'Abuja', temp: currentTemp },
    { name: 'Kano', temp: 28 },
    { name: 'Port Harcourt', temp: 30 },
    { name: 'Ibadan', temp: 29 },
    { name: 'Kaduna', temp: 26 },
    { name: 'Benin City', temp: 31 },
  ];

  return (
    <div className="glassmorphism-video rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Nigerian Cities</h3>
      
      <div className="space-y-3">
        {nigerianCities.map((city, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
              city.name === 'Abuja' 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                city.temp >= 30 ? 'bg-red-400' :
                city.temp >= 25 ? 'bg-orange-400' :
                city.temp >= 20 ? 'bg-yellow-400' :
                'bg-blue-400'
              }`}></div>
              <span className="text-white font-medium">{city.temp}°C</span>
            </div>
            <span className="text-white/80 text-sm">{city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}