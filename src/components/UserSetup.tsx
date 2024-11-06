import React, { useState } from 'react';
import { User } from '../types';
import { Globe } from 'lucide-react';

interface UserSetupProps {
  onComplete: (user: User) => void;
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'China', 'India', 'Brazil', 'Other'
];

export const UserSetup: React.FC<UserSetupProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !country) {
      setError('Please fill in all fields');
      return;
    }

    onComplete({ username: username.trim(), country });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Globe className="w-12 h-12 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to World's Coin Trading
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label 
              htmlFor="country" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your country</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Trading
          </button>
        </form>
      </div>
    </div>
  );
};