import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, Trade, PricePoint } from './types';
import { PriceEngine } from './utils/priceEngine';
import { Navigation } from './components/Navigation';
import { UserSetup } from './components/UserSetup';
import { ExitModal } from './components/ExitModal';
import { HomePage } from './pages/HomePage';
import { TradingPage } from './pages/TradingPage';
import { GlobalTradingPage } from './pages/GlobalTradingPage';

const priceEngine = new PriceEngine();
const INITIAL_BALANCE = 10000;

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [currentPrice, setCurrentPrice] = useState(priceEngine.getCurrentPrice());
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [trades, setTrades] = useState<Trade[]>(priceEngine.getTrades());
  const [leverage, setLeverage] = useState(1);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const cleanup = priceEngine.addPriceListener((price) => {
      setCurrentPrice(price);
      setPriceHistory(prev => [
        ...prev,
        { timestamp: Date.now(), price }
      ].slice(-100));
      setTrades(priceEngine.getTrades());
    });

    return cleanup;
  }, []);

  const handleUserSetup = (newUser: User) => {
    setUser({
      ...newUser,
      balance: INITIAL_BALANCE,
      leverage: 1
    });
  };

  const handleTrade = (amount: number, stopLoss: number, takeProfit: number) => {
    if (!user) return;

    const trade: Trade = {
      id: crypto.randomUUID(),
      userId: user.username,
      username: user.username,
      country: user.country,
      entryPrice: currentPrice,
      amount: amount * leverage,
      quantity: (amount * leverage) / currentPrice,
      stopLoss,
      takeProfit,
      timestamp: Date.now(),
      status: 'active',
      leverage
    };

    priceEngine.addTrade(trade);
    setUser(prev => prev ? {
      ...prev,
      balance: prev.balance - amount
    } : null);
  };

  const handleCloseTrade = (tradeId: string) => {
    const trade = trades.find(t => t.id === tradeId);
    if (trade && user) {
      priceEngine.closeTrade(tradeId);
      const updatedTrade = priceEngine.getTrades().find(t => t.id === tradeId);
      if (updatedTrade && updatedTrade.profit) {
        setUser({
          ...user,
          balance: user.balance + trade.amount + updatedTrade.profit
        });
      }
    }
  };

  const handleExit = (keepAccount: boolean) => {
    if (keepAccount) {
      const accountCode = btoa(JSON.stringify({
        ...user,
        timestamp: Date.now()
      }));
      setUser(prev => prev ? { ...prev, accountCode } : null);
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  if (!user) {
    return <UserSetup onComplete={handleUserSetup} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation onExit={() => setShowExitModal(true)} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/trading" 
            element={
              <TradingPage
                user={user}
                currentPrice={currentPrice}
                priceHistory={priceHistory}
                trades={trades.filter(t => t.userId === user.username)}
                leverage={leverage}
                onLeverageChange={setLeverage}
                onTrade={handleTrade}
                onCloseTrade={handleCloseTrade}
              />
            }
          />
          <Route 
            path="/global" 
            element={<GlobalTradingPage trades={trades} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ExitModal
          isOpen={showExitModal}
          onClose={() => setShowExitModal(false)}
          onExit={handleExit}
          accountCode={user.accountCode}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;