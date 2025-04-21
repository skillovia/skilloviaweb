import React, { useState, useEffect } from 'react';
import { HiCurrencyPound, HiSparkles } from 'react-icons/hi';
import { IoMdWallet } from 'react-icons/io';
import { Loader2 } from 'lucide-react';

const SlidingPockets = ({ cash_balance, spark_token_balance }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');
  const [balanceData, setBalanceData] = useState({
    cash: cash_balance || 0,
    tokens: spark_token_balance || 0,
    currency: 'gbp'
  });

  // Function to fetch the latest balance
  const fetchBalance = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/wallet/balance`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      setBalanceData({
        cash: data.balance,
        tokens: data.spark_tokens,
        currency: data.currency
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBalance();
  }, []);

  const handleFundAccount = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/wallet/fund`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount: fundingAmount })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate funding");
      }

      const data = await response.json();
      
      // Refresh the balance
      fetchBalance();
      
      setModalOpen(false);
    } catch (error) {
      console.error("Error funding account:", error);
    } finally {
      setLoading(false);
    }
  };

  const pockets = [
    {
      title: 'Cash balance',
      amount: balanceData.cash,
      icon: <HiCurrencyPound className="text-secondary" />,
      bgColor: 'bg-primary'
    },
    {
      title: 'Spark tokens',
      amount: balanceData.tokens,
      icon: <HiSparkles className="text-black/40" />,
      bgColor: 'bg-book'
    }
  ];

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="text-sm font-medium">Pockets</div>
        <button
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <IoMdWallet className="text-lg" />
          )}
          <span>Fund Account</span>
        </button>
      </div>
      
      <div className="relative">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 w-max">
            {pockets.map((pocket, index) => (
              <div
                key={index}
                className={`${pocket.bgColor} rounded-xl p-4 w-[280px] flex-shrink-0`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">{pocket.title}</span>
                  {pocket.icon}
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  {index === 0 && <span className="text-xl font-semibold">£</span>}
                  <span className="text-xl font-semibold">{pocket.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-1 mt-3">
          <button
            onClick={() => setIsScrolled(false)}
            className={`w-2 h-2 rounded-full transition-colors duration-200
              ${!isScrolled ? 'bg-gray-800' : 'bg-gray-300'}`}
          />
          <button
            onClick={() => setIsScrolled(true)}
            className={`w-2 h-2 rounded-full transition-colors duration-200
              ${isScrolled ? 'bg-gray-800' : 'bg-gray-300'}`}
          />
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Fund Account</h2>
            <div className="mb-4">
              <label htmlFor="fundingAmount" className="block text-sm font-medium mb-1">Enter amount:</label>
              <input
                type="number"
                id="fundingAmount"
                value={fundingAmount}
                onChange={(e) => setFundingAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFundAccount}
                disabled={loading || !fundingAmount}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Fund'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SlidingPockets;