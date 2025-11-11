import React from 'react';
import HeroSlider from './HeroSlider';
import './LandingPage.css';

function LandingPage({ onNavigateToLogin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <HeroSlider />
      
      <header className="landing-header">
        <div className="header-content">
          <button className="purchase-btn" onClick={onNavigateToLogin}>
            LOGIN
          </button>
        </div>
      </header>

      {/* Aesthetic Gallery Section */}
      <section className="aesthetic-gallery">
        <div className="gallery-grid">
          {/* Left Column - Restaurant Ambiance */}
          <div className="gallery-card large">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1000&fit=crop" alt="Restaurant Interior" />
            <div className="card-overlay">
              <h3>GOOD TIMES GREAT TASTES</h3>
              <p>Fidalgo is for everyone who collects beautiful moments</p>
              <p className="tagline">For the best memories</p>
            </div>
          </div>

          {/* Right Column - Two Images */}
          <div className="gallery-column">
            {/* Sushi Plate */}
            <div className="gallery-card medium">
              <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop" alt="Sushi" />
              <div className="card-overlay dark">
                <h2>MOON SUSHI</h2>
                <div className="menu-items">
                  <p>OMAKASE 🍱 NIGIRI EBI 🍤</p>
                  <p>SUSHI MAKI 🍣 SASHIMI SETS 🦞</p>
                  <p>SIDE DISH 🥟</p>
                </div>
                <p className="subtitle">SUSHI RESTAURANT</p>
              </div>
            </div>

            {/* Fine Dining */}
            <div className="gallery-card medium">
              <img src="https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&h=600&fit=crop" alt="Fine Dining" />
              <div className="card-overlay dark">
                <h3>CHEERS</h3>
                <p className="chef-message">FOR THE<br/>FINEST FOOD<br/>& GREAT<br/>SERVICE</p>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et lobortis massa, eget vehicula diam.</p>
              </div>
            </div>
          </div>

          {/* Ice Cream Card */}
          <div className="gallery-card small">
            <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=700&fit=crop" alt="Dessert" />
            <div className="card-overlay center">
              <div className="dessert-icon">🍦</div>
              <h4>CRISPY FRIKA</h4>
              <p>The original stick gelato icre cream with vanilla and chocalate</p>
            </div>
          </div>

          {/* Elegant Dish */}
          <div className="gallery-card medium-2">
            <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&h=800&fit=crop" alt="Gourmet Dish" />
            <div className="card-overlay bottom">
              <h3>ELEGANT RESTAURANT</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button className="scroll-top-btn-fixed" onClick={scrollToTop}>
        TOP
      </button>
    </div>
  );
}

export default LandingPage;
