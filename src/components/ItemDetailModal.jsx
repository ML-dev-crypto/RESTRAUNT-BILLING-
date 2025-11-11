import React from 'react';
import './ItemDetailModal.css';

const ItemDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="item-modal-overlay" onClick={onClose}>
      <div className="item-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <div className="modal-image-container">
          <img 
            src={item.image} 
            alt={item.name}
            className="modal-item-image"
          />
          <div className="modal-category-badge">{item.category}</div>
        </div>

        <div className="modal-content">
          <h2 className="modal-item-name">{item.name}</h2>
          <p className="modal-item-description">{item.description}</p>

          <div className="modal-item-extras">
            <h4>Customizations</h4>
            <div className="extras-list">
              <label className="extra-option">
                <input type="checkbox" />
                <span>Extra Cheese</span>
              </label>
              <label className="extra-option">
                <input type="checkbox" />
                <span>Extra Spicy</span>
              </label>
              <label className="extra-option">
                <input type="checkbox" />
                <span>Less Oil</span>
              </label>
            </div>
          </div>

          <button className="modal-done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;
