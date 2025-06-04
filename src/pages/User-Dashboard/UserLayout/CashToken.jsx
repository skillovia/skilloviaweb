import React, { useState, useEffect } from "react";
import { HiCurrencyPound, HiSparkles } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QrcLQ09r1sd9IYht35RhBj1DoUQHGdeSUQx85N9gOzUW8vwBzurLss9Yq7SbeeioMr9HDi39f2gN3OV14oM7N9H00vEoA1iDS"
);

// Payment form component
const CheckoutForm = ({ clientSecret, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) return;

  //   setLoading(true);
  //   setError(null);

  //   const result = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       return_url: window.location.origin + "/payment-success",
  //     },
  //     redirect: "if_required",
  //   });

  //   if (result.error) {
  //     setError(result.error.message);
  //     setLoading(false);
  //   } else {
  //     // Payment succeeded
  //     onSuccess();
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      // Payment succeeded, call your confirm endpoint
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token not found");

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/wallet/confirm`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: parseFloat(fundingAmount) }), // make sure fundingAmount is accessible here
          }
        );

        if (!response.ok) {
          throw new Error("Failed to confirm funding");
        }

        onSuccess(); // Proceed after successful confirm
      } catch (confirmError) {
        setError(confirmError.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !stripe}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Pay"}
        </button>
      </div>
    </form>
  );
};

const SlidingPockets = ({ cash_balance, spark_token_balance }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fundingAmount, setFundingAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentStep, setPaymentStep] = useState("amount");
  const [balanceData, setBalanceData] = useState({
    cash: cash_balance || 0,
    tokens: spark_token_balance || 0,
    currency: "gbp",
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
        currency: data.currency,
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

  const handleInitiatePayment = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/wallet/fund`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: parseFloat(fundingAmount) }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate funding");
      }

      const data = await response.json();

      // Save the client secret and move to payment step
      setClientSecret(data.clientSecret);
      setPaymentStep("payment");
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    // Refresh the balance
    await fetchBalance();

    // Reset and close the modal
    setModalOpen(false);
    setPaymentStep("amount");
    setClientSecret("");
    setFundingAmount("");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPaymentStep("amount");
    setClientSecret("");
    setFundingAmount("");
  };

  const pockets = [
    {
      title: "Cash balance",
      amount: balanceData.cash,
      icon: <HiCurrencyPound className="text-secondary" />,
      bgColor: "bg-primary",
    },
    {
      title: "Spark tokens",
      amount: balanceData.tokens,
      icon: <HiSparkles className="text-black/40" />,
      bgColor: "bg-book",
    },
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
                  {index === 0 && (
                    <span className="text-xl font-semibold">£</span>
                  )}
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
              ${!isScrolled ? "bg-gray-800" : "bg-gray-300"}`}
          />
          <button
            onClick={() => setIsScrolled(true)}
            className={`w-2 h-2 rounded-full transition-colors duration-200
              ${isScrolled ? "bg-gray-800" : "bg-gray-300"}`}
          />
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 px-4 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {paymentStep === "amount" ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Fund Account</h2>
                <div className="mb-4">
                  <label
                    htmlFor="fundingAmount"
                    className="block text-sm font-medium mb-1"
                  >
                    Enter amount:
                  </label>
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
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInitiatePayment}
                    disabled={loading || !fundingAmount}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>
                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      onCancel={handleCloseModal}
                    />
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

export default SlidingPockets;
