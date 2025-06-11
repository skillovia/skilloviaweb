import React from "react";
import UserLayout from "../../UserLayout/UserLayout";
import BackButton from "../../../../componets/Back";

const PrivacyPolicy = () => (

   <UserLayout>

    <BackButton />
  <div className="max-w-3xl mx-auto px-4 py-10  shadow rounded text-gray-800">
    <h1 className="text-3xl font-bold mb-6">Skillovia – Privacy Policy</h1>
    <p className="mb-4 text-sm text-gray-600">Effective Date: [Insert Date]</p>
    <p className="mb-6">
      Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your data.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">1. Data We Collect</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>
        <span className="font-medium">Personal Data:</span> Name, email, address, phone number.
      </li>
      <li>
        <span className="font-medium">Service Data:</span> Skills, transactions, profile activity.
      </li>
      <li>
        <span className="font-medium">Payment Info:</span> Processed securely via Stripe, we do not store card details.
      </li>
    </ul>

    <h2 className="text-2xl font-semibold mb-2 mt-8">2. How We Use Your Data</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>To provide and personalise services.</li>
      <li>To process payments and issue Spark tokens.</li>
      <li>To improve platform performance.</li>
      <li>To prevent fraud and enforce platform policies.</li>
    </ul>

    <h2 className="text-2xl font-semibold mb-2 mt-8">3. Sharing Your Data</h2>
    <p className="mb-2">We do not sell your data. We only share with:</p>
    <ul className="list-disc pl-6 mb-6">
      <li>Stripe (for payments)</li>
      <li>Analytics and hosting providers (only as needed)</li>
    </ul>

    <h2 className="text-2xl font-semibold mb-2 mt-8">4. Cookies</h2>
    <p className="mb-6">
      We use cookies for site performance and analytics. You may disable them in browser settings.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">5. Your Rights</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>Request access to your data.</li>
      <li>Request corrections or deletions.</li>
      <li>Opt out of marketing communications.</li>
    </ul>

    <h2 className="text-2xl font-semibold mb-2 mt-8">6. Security</h2>
    <p className="mb-6">
      We use secure protocols (HTTPS, encryption) to protect your data.
    </p>

    <h2 className="text-2xl font-semibold mb-2 mt-8">7. Contact Us</h2>
    <ul className="mb-2">
      <li>
        <span className="font-medium">Email:</span>{" "}
        <a href="mailto:support@skillovia.com" className="text-blue-600 hover:underline">
          support@skillovia.com
        </a>
      </li>
      <li>
        <span className="font-medium">Address:</span> [Insert registered address]
      </li>
      <li>
        <span className="font-medium">Phone:</span> [Insert contact number]
      </li>
    </ul>
  </div>
      
  </UserLayout> 
);

export default PrivacyPolicy;