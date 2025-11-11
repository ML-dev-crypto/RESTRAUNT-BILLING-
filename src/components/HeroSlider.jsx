import React, { useEffect, useRef } from 'react';
import './HeroSlider.css';

function HeroSlider() {
  const sliderRef = useRef(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      title: "Gourmet Sushi",
      subtitle: "Fresh & Authentic"
    },
    {
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      title: "Wine & Dine",
      subtitle: "Premium Selection"
    },
    {
      url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
      title: "Artisan Pastries",
      subtitle: "Handcrafted Daily"
    },
    {
      url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop",
      title: "Steak House",
      subtitle: "Premium Cuts"
    },
    {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      title: "Fine Dining",
      subtitle: "Elegant Experience"
    },
    {
      url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&h=600&fit=crop",
      title: "Signature Cocktails",
      subtitle: "Mixology Art"
    }
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll when we've scrolled through half the images
      if (scrollPosition >= slider.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      slider.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(scroll);
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="hero-slider-wrapper">
      <div className="hero-overlay">
        <h1 className="hero-title">Fidalgo</h1>
      </div>
      
      <div className="hero-slider" ref={sliderRef}>
        <div className="slider-track">
          {/* Duplicate images for seamless loop */}
          {[...images, ...images].map((image, index) => (
            <div 
              key={index} 
              className="slide"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="slide-content">
                <h3>{image.title}</h3>
                <p>{image.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSlider;
