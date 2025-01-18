import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const handleGoogleAuth = () => {
    // Window features for the popup
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const windowFeatures = `
      toolbar=no,
      menubar=no,
      width=${width},
      height=${height},
      top=${top},
      left=${left}
    `;

    // Open the popup and store the reference
    const authWindow = window.open(
      `https://testapi.humanserve.net/api/auth/google?redirectUrl=${encodeURIComponent(window.location.origin + '/explore')}`,
      'Google Authentication',
      windowFeatures
    );

    // Handle communication from popup
    const checkPopup = setInterval(() => {
      try {
        // Check if window is closed
        if (authWindow?.closed) {
          clearInterval(checkPopup);
          // Handle popup closed without authentication
          console.log('Authentication cancelled');
          return;
        }

        // Check for successful authentication
        if (authWindow?.location?.href?.includes('success')) {
          clearInterval(checkPopup);
          authWindow.close();
          // Handle successful authentication
          console.log('Authentication successful');
          // Redirect to the explore page
          window.location.href = '/explore';
        }
      } catch (error) {
        // Catch cross-origin errors
        if (error.name === 'SecurityError') {
          // This is normal - we can't access the popup while it's on a different domain
          return;
        }
        console.error('Error checking popup:', error);
      }
    }, 1000);
  };

  return (
    <div className="">
      <button className="w-full bg-white text-gray-700 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none" onClick={handleGoogleAuth}>
        <FcGoogle size={30} /> Sign up with Google
      </button>
    </div>
  );
};

export default GoogleAuth;