import React from 'react';

const Footer = () => {
  return (
    <div className="bg-off lg:px-[4rem]">
      <div className="container mx-auto py-12">
        {/* Top Section with Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <img
                src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327781/WHT_Horiz._Logo_bbkq77.png"
                className="lg:w-[180px] w-[100px] h-auto object-contain"
                alt="Logo"
              />
              <p className="text-sm text-gray-600 mt-4 max-w-xs">
                Join our community and stay updated with the latest news and updates.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">About Us</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Our Services</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Blog</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Support</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Help Center</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">FAQs</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Connect</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Facebook</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Instagram</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">LinkedIn</a>
            </nav>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 Present. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Accessibility</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Legal Notice</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;