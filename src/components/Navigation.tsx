import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, Globe, Home, LogOut } from 'lucide-react';

interface NavigationProps {
  onExit: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onExit }) => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Coins className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-gray-900">World's Coin</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              
              <Link
                to="/trading"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/trading'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Coins className="w-4 h-4" />
                Trading
              </Link>
              
              <Link
                to="/global"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/global'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Globe className="w-4 h-4" />
                Global Trading
              </Link>
            </div>
          </div>
          
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>
    </nav>
  );
};