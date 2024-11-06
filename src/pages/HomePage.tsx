import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, 
  Globe, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to World's Coin (WC)
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The first truly global cryptocurrency designed for traders,
            by traders. Experience the future of decentralized trading.
          </p>
          <Link
            to="/trading"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg mt-8 hover:bg-blue-600 transition-colors"
          >
            Start Trading
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced Trading</h3>
            <p className="text-gray-600">
              Trade with up to 100x leverage and take advantage of our 
              sophisticated trading features.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Your security is our priority. Trade with confidence on our
              protected platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Global Community</h3>
            <p className="text-gray-600">
              Join traders from around the world and be part of our growing
              community.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">About World's Coin</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  World's Coin (WC) is a revolutionary trading token with a
                  maximum supply of 20 million coins.
                </p>
                <p>
                  Initial Price: $12.28
                  <br />
                  Maximum Supply: 20,000,000 WC
                  <br />
                  Market Cap: ${(12.28 * 20000000).toLocaleString()}
                </p>
                <p>
                  Our unique price mechanism is driven by real trading activity,
                  creating a truly market-driven ecosystem.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Coins className="w-48 h-48 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};