import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item, onAddToOrder }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img 
          src={item.image} 
          alt={item.name}
          className="food-image"
          loading="lazy"
        />
      </div>
      <div className="menu-item-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-price">₹{item.price}</span>
          <button 
            className="add-button"
            onClick={() => onAddToOrder(item)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
