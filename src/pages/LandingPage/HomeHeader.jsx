import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`py-4 px-6 fixed w-full left-0 right-0 z-40 transition-all duration-300 ${
      scroll ? "bg-darkSec h-20 shadow-md" : "h-16"
    }`}>
      <nav className="lg:px-20 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327571/SkilSpark%20%286%29/WHT_Horiz._Logo_2x_mwst8n.png"
            alt="Logo"
            className="w-[100px] lg:w-[200px] lg:h-[50px] object-contain"
          />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-darkSec/50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-slate-50" />
          ) : (
            <Menu className="w-6 h-6 text-slate-50" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <a href="/blog" className="text-slate-50 font-semibold hover:text-gray-300 transition-colors">
            Blog
          </a>
          <a href="/contact" className="text-slate-50 font-semibold hover:text-gray-300 transition-colors">
            Contact
          </a>
          <a href="/faqs" className="text-slate-50 font-semibold hover:text-gray-300 transition-colors">
            FAQs
          </a>
          <Link
            to="/login"
            className="bg-primary text-secondary font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute top-full left-0 right-0 bg-darkSec shadow-lg md:hidden transform transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col py-4">
            <a
              href="/blog"
              className="px-6 py-3 text-slate-50 hover:bg-darkSec/50 hover:text-gray-300 transition-colors"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="px-6 py-3 text-slate-50 hover:bg-darkSec/50 hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
            <a
              href="/faqs"
              className="px-6 py-3 text-slate-50 hover:bg-darkSec/50 hover:text-gray-300 transition-colors"
            >
              FAQs
            </a>
            <div className="px-6 py-3">
              <Link
                to="/login"
                className="block bg-primary text-secondary font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;