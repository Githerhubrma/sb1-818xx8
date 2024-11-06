import React, { useState } from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

interface TradeFormProps {
  currentPrice: number;
  onTrade: (amount: number, stopLoss: number, takeProfit: number) => void;
}

export const TradeForm: React.FC<TradeFormProps> = ({ 
  currentPrice, 
  onTrade 
}) => {
  const [amount, setAmount] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    const stopLossNum = stopLoss ? parseFloat(stopLoss) : 0;
    const takeProfitNum = takeProfit ? parseFloat(takeProfit) : 0;

    if (amountNum > 0) {
      onTrade(amountNum, stopLossNum, takeProfitNum);
      setAmount('');
      setStopLoss('');
      setTakeProfit('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Amount (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tokens to receive
            </label>
            <div className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700">
              {amount ? (Number(amount) / currentPrice).toFixed(4) : '0.0000'} WC
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stop Loss (USD)
            </label>
            <div className="relative">
              <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Take Profit (USD)
            </label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Place Trade
        </button>
      </div>
    </form>
  );
};