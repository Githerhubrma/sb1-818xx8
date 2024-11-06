import React from 'react';
import { Trade } from '../types';
import { ArrowDown, ArrowUp, X } from 'lucide-react';

interface TradeHistoryProps {
  trades: Trade[];
  onCloseTrade: (tradeId: string) => void;
}

export const TradeHistory: React.FC<TradeHistoryProps> = ({ trades, onCloseTrade }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Trade History</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 text-sm font-medium text-gray-500">Time</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Entry</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Exit</th>
              <th className="pb-3 text-sm font-medium text-gray-500">P/L</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => {
              const isProfit = trade.profit && trade.profit > 0;
              
              return (
                <tr key={trade.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm">
                    {new Date(trade.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 text-sm">
                    ${trade.amount.toFixed(2)}
                  </td>
                  <td className="py-3 text-sm">
                    ${trade.entryPrice.toFixed(4)}
                  </td>
                  <td className="py-3 text-sm">
                    {trade.exitPrice 
                      ? `$${trade.exitPrice.toFixed(4)}`
                      : '-'
                    }
                  </td>
                  <td className="py-3 text-sm">
                    {trade.profit ? (
                      <div className={`flex items-center gap-1 ${
                        isProfit ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {isProfit ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        ${Math.abs(trade.profit).toFixed(2)}
                        <span className="text-xs">
                          ({trade.profitPercentage?.toFixed(2)}%)
                        </span>
                      </div>
                    ) : '-'}
                  </td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      trade.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    {trade.status === 'active' && (
                      <button
                        onClick={() => onCloseTrade(trade.id)}
                        className="p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                        title="Close Trade"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};