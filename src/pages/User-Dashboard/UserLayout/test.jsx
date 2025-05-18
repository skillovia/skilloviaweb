import React, { useState, useEffect } from 'react';
import { HiCurrencyPound, HiSparkles } from 'react-icons/hi';
import { IoMdWallet } from 'react-icons/io';
import { Loader2, X, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51QrcLQ09r1sd9IYht35RhBj1DoUQHGdeSUQx85N9gOzUW8vwBzurLss9Yq7SbeeioMr9HDi39f2gN3OV14oM7N9H00vEoA1iDS"
);

const SlidingPockets = ({ cash_balance, spark_token_balance }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balanceData, setBalanceData] = useState({
    cash: cash_balance || 0,
    tokens: spark_token_balance || 0,
    currency: 'gbp'
  });
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState(50);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  const handleFundAccount = () => {
    setShowFundModal(true);
  };
  
  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Create payment intent
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/wallet/fund/intent`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            amount: fundAmount,
            currency: 'gbp'
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // When fund modal opens, create payment intent
  useEffect(() => {
    if (showFundModal) {
      createPaymentIntent();
    }
  }, [showFundModal]);

  const handleFundingComplete = async (paymentIntentId) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Complete the funding process
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/wallet/fund/complete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            paymentIntentId: paymentIntentId,
            amount: fundAmount
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete funding");
      }

      // Refresh balance and show success
      fetchBalance();
      setPaymentSuccess(true);
      
      // Close modal after delay
      setTimeout(() => {
        setShowFundModal(false);
        setPaymentSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error completing funding:", error);
      alert("Something went wrong. Please try again.");
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
          onClick={handleFundAccount}
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
      
      {/* Fund Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Fund Your Account</h3>
              <button
                onClick={() => setShowFundModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Your account has been funded successfully.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Amount to Fund (£)</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="10"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(Number(e.target.value))}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="h-px bg-gray-200 w-full mb-4"></div>
                  <div className="flex justify-between text-sm mb-4">
                    <span>Amount to fund:</span>
                    <span className="font-medium">£{fundAmount.toFixed(2)}</span>
                  </div>
                </div>

                {clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#10b981",
                        },
                      },
                    }}
                  >
                    <CheckoutForm onSuccess={handleFundingComplete} />
                  </Elements>
                )}
              </>
            )}
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

// Checkout Form Component
const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/payment-confirmation",
        },
        redirect: "if_required",
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment successful
        onSuccess(paymentIntent.id);
      } else {
        setError("Something went wrong with your payment. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement />
      </div>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full px-6 py-3 rounded-full font-semibold ${
          !stripe || processing
            ? "bg-gray-400 text-gray-700"
            : "bg-primary hover:bg-green-500 text-secondary"
        } flex items-center justify-center gap-2`}
      >
        {processing ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>Pay Now</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SlidingPockets;