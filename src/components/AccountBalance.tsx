import React from 'react';
import { DollarSign } from 'lucide-react';

interface AccountBalanceProps {
  balance: number;
  leverage: number;
  onLeverageChange: (leverage: number) => void;
}

export const AccountBalance: React.FC<AccountBalanceProps> = ({
  balance,
  leverage,
  onLeverageChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Account Balance</h2>
          <div className="flex items-center gap-2 mt-1">
            <DollarSign className="w-6 h-6 text-green-500" />
            <span className="text-2xl font-bold">{balance.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <label className="text-sm font-medium text-gray-500 mb-1">
            Leverage
          </label>
          <select
            value={leverage}
            onChange={(e) => onLeverageChange(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 5, 10, 20, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}x
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};