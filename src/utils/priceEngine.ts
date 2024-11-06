import { Trade } from '../types';

const INITIAL_PRICE = 12.28;
const MAX_SUPPLY = 20_000_000;
const PRICE_IMPACT_FACTOR = 0.00001;
const VOLATILITY_FACTOR = 0.002;

export class PriceEngine {
  private currentPrice: number;
  private trades: Trade[] = [];
  private listeners: ((price: number) => void)[] = [];

  constructor() {
    const savedPrice = localStorage.getItem('currentPrice');
    this.currentPrice = savedPrice ? Number(savedPrice) : INITIAL_PRICE;
    this.loadTrades();
    this.startPriceUpdates();
  }

  private loadTrades() {
    const savedTrades = localStorage.getItem('trades');
    if (savedTrades) {
      this.trades = JSON.parse(savedTrades);
    }
  }

  private calculateNewPrice(): number {
    // Calculate buy/sell pressure from recent trades
    const recentTrades = this.trades.filter(
      t => t.timestamp > Date.now() - 3600000
    );
    
    const netBuyPressure = recentTrades.reduce((acc, trade) => {
      return acc + (trade.status === 'active' ? trade.amount : -trade.amount);
    }, 0);

    // Apply market impact
    const marketImpact = netBuyPressure * PRICE_IMPACT_FACTOR;
    
    // Add minimal volatility for smoother price action
    const randomVolatility = 
      (Math.random() - 0.5) * VOLATILITY_FACTOR * this.currentPrice;

    // Calculate new price
    let newPrice = this.currentPrice * (1 + marketImpact + randomVolatility);
    
    // Ensure price stays reasonable
    newPrice = Math.max(newPrice, INITIAL_PRICE * 0.1);
    newPrice = Math.min(newPrice, INITIAL_PRICE * 10);
    
    // Save the new price to localStorage
    const finalPrice = Number(newPrice.toFixed(4));
    localStorage.setItem('currentPrice', finalPrice.toString());
    
    return finalPrice;
  }

  private startPriceUpdates() {
    setInterval(() => {
      this.currentPrice = this.calculateNewPrice();
      this.notifyListeners();
      this.checkStopLossAndTakeProfit();
    }, 1000);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentPrice));
  }

  private checkStopLossAndTakeProfit() {
    this.trades.forEach(trade => {
      if (trade.status !== 'active') return;

      const profitLoss = 
        ((this.currentPrice - trade.entryPrice) / trade.entryPrice) * 100;

      if (
        (trade.stopLoss && this.currentPrice <= trade.stopLoss) ||
        (trade.takeProfit && this.currentPrice >= trade.takeProfit)
      ) {
        this.closeTrade(trade.id);
      }
    });
  }

  public getCurrentPrice(): number {
    return this.currentPrice;
  }

  public addPriceListener(listener: (price: number) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public addTrade(trade: Trade) {
    this.trades.push(trade);
    localStorage.setItem('trades', JSON.stringify(this.trades));
  }

  public closeTrade(tradeId: string) {
    this.trades = this.trades.map(trade => {
      if (trade.id === tradeId && trade.status === 'active') {
        const exitPrice = this.currentPrice;
        const profit = (exitPrice - trade.entryPrice) * trade.quantity;
        const profitPercentage = 
          ((exitPrice - trade.entryPrice) / trade.entryPrice) * 100;
        
        return {
          ...trade,
          status: 'closed',
          exitPrice,
          profit,
          profitPercentage
        };
      }
      return trade;
    });
    
    localStorage.setItem('trades', JSON.stringify(this.trades));
  }

  public getTrades(): Trade[] {
    return this.trades;
  }
}