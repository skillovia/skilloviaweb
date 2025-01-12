import React from 'react';

const Footer = () => {
  return (
    <div className="bg-off min-h-48 lg:px-[4rem] px-3 pt-8 mb-4">
 

 
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and copyright */}
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
              <img src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327781/WHT_Horiz._Logo_bbkq77.png"
              className=' w-[150px] lg:w-[200px] h-[50px]  object-contain' alt="" />
              </div>
              <p className="text-[12px] text-gray-600">© 2024 Present. All rights reserved.</p>
            </div>

            {/* Footer links */}
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Pages</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQs</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Follow us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default Footer;