import React from "react";
import UserLayout from "../../UserLayout/UserLayout";
import { Link } from "react-router-dom"; // ⬅ make sure this is imported

import {
  ChevronRight,
  Lock,
  UserCircle,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";

const Legal = () => {
  const tabs = [
    {
      icon: <Lock className="w-5 h-5" />,
      label: "Terms of Service",
      link: "/terms",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      label: "Privacy Policy",
      link: "/policy",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      label: "Help Center",
      // link: '/settings/kyc'
    },
  ];
  return (
    <section>
      {tabs.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span className="text-gray-700">{item.label}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 text-secondary" />
        </Link>
      ))}
    </section>
  );
};

export default Legal;
