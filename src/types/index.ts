export interface User {
  username: string;
  country: string;
  balance: number;
  leverage: number;
  accountCode?: string;
}

export interface Trade {
  id: string;
  userId: string;
  username: string;
  country: string;
  entryPrice: number;
  amount: number;
  quantity: number;
  stopLoss: number;
  takeProfit: number;
  timestamp: number;
  status: 'active' | 'closed';
  exitPrice?: number;
  profit?: number;
  profitPercentage?: number;
  leverage: number;
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface TokenInfo {
  currentPrice: number;
  maxSupply: number;
  circulatingSupply: number;
  marketCap: number;
  volume24h: number;
}