import React from 'react';

const SignUp = () => {
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
      `https://testapi.humanserve.net/api/auth/google`,
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
          // You can trigger a callback or state update here
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
    <div className="bg-red-500 w-full h-screen flex justify-center items-center">
      
      <button onClick={handleGoogleAuth}>
            Sign up with Google
          </button>
    </div>
  );
};

export default SignUp;