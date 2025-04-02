import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCreditCard,
  FiDollarSign,
  FiCheck,
  FiX,
  FiLoader,
  FiExternalLink,
} from "react-icons/fi";

const StripeOnboarding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stripeAccount, setStripeAccount] = useState(null);
  const [onboardingUrl, setOnboardingUrl] = useState(null);
  const [step, setStep] = useState("initial"); // initial, account-created, onboarding-ready, completed

  const navigate = useNavigate();

  // Create Stripe account
  const createStripeAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("You must be logged in to set up payment processing.");
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/stripe/create/connected/account`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        throw new Error(
          data.message || `Request failed with status ${response.status}`
        );
      }

      setStripeAccount(data.data);
      setStep("account-created");

      // Automatically proceed to get onboarding link
      await getOnboardingLink(data.data.stripe_account_id);
    } catch (err) {
      console.error("Error creating Stripe account:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get onboarding link using the stripe account ID
  const getOnboardingLink = async (stripeAccountId) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("You must be logged in to continue onboarding.");
      }

      // The API expects the stripeAccountId in the request body
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/stripe/connected/account/link`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ stripeAccountId }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        throw new Error(
          data.message || `Request failed with status ${response.status}`
        );
      }

      setOnboardingUrl(data.data.url);
      setStep("onboarding-ready");
    } catch (err) {
      console.error("Error getting onboarding link:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setError(null);
    setStep("initial");
    setStripeAccount(null);
    setOnboardingUrl(null);
  };

  const redirectToOnboarding = () => {
    if (onboardingUrl) {
      window.location.href = onboardingUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Payment Processing Setup
          </h1>
          <p className="mt-2 text-gray-600">
            Connect with Stripe to receive payments on our platform
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-secondary px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiCreditCard className="text-white text-xl mr-2" />
                <h2 className="text-xl font-semibold text-white">Skillovia</h2>
              </div>
              <span className="bg-white text-indigo-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Secure
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-6 py-8">
            {!loading && step === "initial" && !error && (
              <>
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Benefits of connecting:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">
                        Receive payments directly to your bank account
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">
                        Secure payment processing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">
                        Detailed transaction reporting
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    By connecting, you agree to Stripe's
                    <a
                      href="https://stripe.com/tos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Terms of Service
                    </a>{" "}
                    and
                    <a
                      href="https://stripe.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                <button
                  onClick={createStripeAccount}
                  className="w-full flex justify-center items-center px-4 py-3 bg-secondary hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FiDollarSign className="mr-2" />
                  Set Up Payment Processing
                </button>
              </>
            )}

            {loading && (
              <div className="text-center py-10">
                <FiLoader className="animate-spin text-indigo-600 text-3xl mx-auto mb-4" />
                <p className="text-gray-600">
                  {step === "initial"
                    ? "Creating your Stripe account..."
                    : step === "account-created"
                    ? "Generating onboarding link..."
                    : "Processing..."}
                </p>
              </div>
            )}

            {step === "onboarding-ready" && onboardingUrl && !loading && (
              <div className="text-center py-6">
                <div className="rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-green-600 text-2xl" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Account Created Successfully!
                </h3>

                <p className="text-gray-600 mb-6">
                  Your Stripe account has been created. Now you need to complete
                  the onboarding process.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Account Details:
                  </h4>
                  {stripeAccount && (
                    <>
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-medium">Account ID:</span>{" "}
                        {stripeAccount.stripe_account_id}
                      </p>
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(stripeAccount.created_at).toLocaleString()}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Charges:{" "}
                          {stripeAccount.charges_enabled
                            ? "Enabled"
                            : "Pending"}
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Payouts:{" "}
                          {stripeAccount.payouts_enabled
                            ? "Enabled"
                            : "Pending"}
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Details:{" "}
                          {stripeAccount.details_submitted
                            ? "Submitted"
                            : "Pending"}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={redirectToOnboarding}
                  className="w-full flex justify-center items-center px-4 py-3 bg-secondary hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors mb-3"
                >
                  <FiExternalLink className="mr-2" />
                  Complete Stripe Onboarding
                </button>

                <p className="text-sm text-gray-500 mt-2">
                  You'll be redirected to Stripe to complete your account setup.
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-6">
                <div className="rounded-full bg-red-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiX className="text-red-600 text-2xl" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Something Went Wrong
                </h3>

                <p className="text-gray-600 mb-6">{error}</p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleTryAgain}
                    className="px-4 py-3 bg-secondary hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={() => navigate("/support")}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Support Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a href="/support" className="text-secondary hover:text-indigo-500">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StripeOnboarding;
