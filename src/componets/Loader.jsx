
import React, { useState, useEffect } from 'react';



const Loader = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`flex items-center  justify-center fixed inset-0 bg-secondary z-50 ${isLoading ? 'block' : 'hidden'}`}>

<section className="bl">


<div className="spinner">
  <span>S</span>
  <span>K</span>
  <span>I</span>
  <span>L</span>
  <span>L</span>
  <span>O</span>
  <span>V</span>
 <span>I</span>
  <span>A</span>
</div>
</section>
    </div>
  );
};

export default Loader;
