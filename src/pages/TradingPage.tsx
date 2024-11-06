import React from 'react';
import { User, Trade, PricePoint } from '../types';
import { AccountBalance } from '../components/AccountBalance';
import { PriceChart } from '../components/PriceChart';
import { TradeForm } from '../components/TradeForm';
import { TradeHistory } from '../components/TradeHistory';

interface TradingPageProps {
  user: User;
  currentPrice: number;
  priceHistory: PricePoint[];
  trades: Trade[];
  leverage: number;
  onLeverageChange: (leverage: number) => void;
  onTrade: (amount: number, stopLoss: number, takeProfit: number) => void;
  onCloseTrade: (tradeId: string) => void;
}

export const TradingPage: React.FC<TradingPageProps> = ({
  user,
  currentPrice,
  priceHistory,
  trades,
  leverage,
  onLeverageChange,
  onTrade,
  onCloseTrade,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-8">
        <AccountBalance
          balance={user.balance}
          leverage={leverage}
          onLeverageChange={onLeverageChange}
        />

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">WC/USD</h2>
            <div className="text-2xl font-bold text-blue-600">
              ${currentPrice.toFixed(4)}
            </div>
          </div>
          
          <div className="h-[400px]">
            <PriceChart
              data={priceHistory}
              width={800}
              height={400}
            />
          </div>
        </div>

        <TradeForm
          currentPrice={currentPrice}
          onTrade={onTrade}
        />

        <TradeHistory
          trades={trades}
          onCloseTrade={onCloseTrade}
        />
      </div>
    </div>
  );
};