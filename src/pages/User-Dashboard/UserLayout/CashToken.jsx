import React, { useState } from 'react';
import { HiCurrencyPound, HiSparkles } from 'react-icons/hi';

const SlidingPockets = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const pockets = [
    {
      title: 'Cash balance',
      amount: '3,000.00',
      icon: <HiCurrencyPound className="text-secondary" />,
      bgColor: 'bg-primary'
    },
    {
      title: 'Spark tokens',
      amount: '50',
      icon: <HiSparkles className="text-black/40" />,
      bgColor: 'bg-book'
    }
  ];

  return (
    <div className="w-full max-w-4xl">
      <div className="text-sm font-medium mb-2 px-1">Pockets</div>
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
        
        <div className="flex  justify-center gap-1 mt-3">
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