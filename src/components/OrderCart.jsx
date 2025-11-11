import React, { useState } from 'react';
import ItemDetailModal from './ItemDetailModal';
import './OrderCart.css';

const OrderCart = ({ orderItems, onUpdateQuantity, onRemoveItem, tableNumber, orderNumber, onPlaceOrder, onGenerateBill }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="order-cart">
      <div className="order-header">
        <div className="order-info">
          <span className="table-number">Table #{tableNumber}</span>
          <span className="order-number">Order #{orderNumber}</span>
        </div>
      </div>

      <div className="order-items">
        {orderItems.length === 0 ? (
          <div className="empty-cart">
            <p>No items in order</p>
            <p className="empty-cart-subtitle">Add items from the menu</p>
          </div>
        ) : (
          orderItems.map((item) => (
            <div key={item.id} className="order-item">
              <div 
                className="order-item-image clickable"
                onClick={() => setSelectedItem(item)}
                title="Click to view details"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="cart-food-image"
                />
              </div>
              <div 
                className="order-item-details clickable"
                onClick={() => setSelectedItem(item)}
              >
                <h4 className="order-item-name">{item.name}</h4>
                <p className="order-item-size">Size: Medium</p>
                {item.extras && (
                  <p className="order-item-extras">
                    {item.extras.map(extra => `+ ${extra}`).join(', ')}
                  </p>
                )}
                {item.note && (
                  <p className="order-item-note">Note: {item.note}</p>
                )}
              </div>
              <button 
                className="remove-item-button"
                onClick={() => onRemoveItem(item.id)}
                title="Remove item"
              >
                🗑️
              </button>
              <div className="order-item-actions">
                <button 
                  className="quantity-button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="order-item-price">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total-row">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="order-actions">
        <button className="bill-button" onClick={onGenerateBill} disabled={orderItems.length === 0}>
          <span className="bill-icon">📄</span>
          Bill
        </button>
        <button className="place-order-button" onClick={onPlaceOrder} disabled={orderItems.length === 0}>
          <span className="order-icon">✓</span>
          Place Order
        </button>
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default OrderCart;
