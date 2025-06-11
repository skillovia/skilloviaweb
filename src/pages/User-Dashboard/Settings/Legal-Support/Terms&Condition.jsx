import React from "react";
import UserLayout from "../../UserLayout/UserLayout";
import BackButton from "../../../../componets/Back";
const TermsAndConditions = () => (
<UserLayout>

<BackButton/>

  <div className="max-w-3xl mx-auto px-4 py-10  shadow rounded text-gray-800">
    <h1 className="text-3xl font-bold mb-6">Skillovia – Terms and Conditions</h1>
    <p className="mb-4 text-sm text-gray-600">Effective Date: [Insert Date]</p>
    <p className="mb-6">
      Welcome to Skillovia (“we”, “us”, or “our”). These Terms and Conditions (“Terms”) govern your access to and use of the Skillovia platform (the “Service”), available via our web app and (soon) mobile apps.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">1. Use of the Platform</h2>
    <p className="mb-6">
      You must be 18 years or older to use Skillovia. By accessing our platform, you agree to use the services lawfully and responsibly.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">2. Services Offered</h2>
    <p className="mb-6">
      Skillovia enables users to exchange skills and services through barter (Spark tokens) or hybrid payments (cash + tokens). All service listings and transactions are user-generated.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">3. Payments and Spark Tokens</h2>
    <ul className="list-disc pl-6 mb-2">
      <li>
        <span className="font-medium">Spark tokens:</span> Awarded or purchased to facilitate trades.
      </li>
      <li>
        <span className="font-medium">Cash payments:</span> Processed securely via Stripe during booking.
      </li>
    </ul>
    <p className="mb-6">
      You are charged at the time of checkout for paid services. Skillovia does not guarantee the quality of any services exchanged.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">4. Disputes and Refund Policy</h2>
    <p className="mb-2">
      If a service is unsatisfactory, please contact our support team within 5 days. Refunds for cash payments are handled on a case-by-case basis. Spark tokens are non-refundable unless due to platform error.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">5. Cancellation Policy</h2>
    <p className="mb-6">
      Users can cancel bookings up to 24 hours in advance for a full refund. Late cancellations may be subject to partial or no refunds.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">6. Prohibited Conduct</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>Misrepresent skills or reviews.</li>
      <li>Engage in illegal, fraudulent, or abusive activity.</li>
      <li>Circumvent payments outside the platform.</li>
    </ul>

    <h2 className="text-2xl font-semibold mb-2 mt-8">7. Termination</h2>
    <p className="mb-6">
      We reserve the right to suspend or terminate access if these Terms are violated.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">8. Liability</h2>
    <p>
      Skillovia is a facilitator and is not responsible for the services provided by users. You use the platform at your own risk.
    </p>
  </div>
  </UserLayout>
);

export default TermsAndConditions;