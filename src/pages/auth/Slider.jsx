import React, {useState, useEffect} from 'react'

const Slider = () => {

    const slides = [
        {
          image: "https://res.cloudinary.com/dmhvsyzch/image/upload/v1732032825/0f97c93d7e2a172dfab38a344f9b8ce0_r6frdm.jpg",
          title: "Meet people in your community",
        },
        {
          image: "https://res.cloudinary.com/dmhvsyzch/image/upload/v1732032776/212760ab183179b3b25c4e05722b52ed_rvwdpf.jpg",
          title: "Join local events",
        },
      ];


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  return (
      
    <div className="hidden md:block w-1/2 relative overflow-hidden">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentSlide === index ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover rounded-[2rem]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8 rounded-[2rem]">
          <h2 className="text-white text-4xl font-bold">{slide.title}</h2>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Slider
