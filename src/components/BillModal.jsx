import React from 'react';
import './BillModal.css';

const BillModal = ({ orderItems, tableNumber, orderNumber, onClose }) => {
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const currentDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const billContent = document.getElementById('bill-content');
    const billText = `
${'='.repeat(50)}
           RESTAURANT BILLING
${'='.repeat(50)}

Table Number: #${tableNumber}
Order Number: #${orderNumber}
Date & Time: ${currentDate}

${'='.repeat(50)}
Item                    Qty    Price      Total
${'-'.repeat(50)}
${orderItems.map(item => 
  `${item.name.padEnd(20)} ${String(item.quantity).padStart(4)}  ₹${String(item.price).padStart(6)}  ₹${(item.price * item.quantity).toFixed(2).padStart(8)}`
).join('\n')}
${'-'.repeat(50)}

Subtotal:                              ₹${subtotal.toFixed(2)}
Tax (5%):                              ₹${tax.toFixed(2)}
${'='.repeat(50)}
Total:                                 ₹${total.toFixed(2)}
${'='.repeat(50)}

        Thank you! Visit again.
           Have a great day!

${'='.repeat(50)}
    `;

    const blob = new Blob([billText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill-${orderNumber}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bill-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="bill-content" id="bill-content">
          <div className="bill-header">
            <h1 className="restaurant-name">🍽️ Restaurant Billing</h1>
            <div className="bill-line"></div>
          </div>

          <div className="bill-info">
            <div className="bill-info-row">
              <span>Table Number:</span>
              <span className="bold">#{tableNumber}</span>
            </div>
            <div className="bill-info-row">
              <span>Order Number:</span>
              <span className="bold">#{orderNumber}</span>
            </div>
            <div className="bill-info-row">
              <span>Date & Time:</span>
              <span className="bold">{currentDate}</span>
            </div>
          </div>

          <div className="bill-line"></div>

          <div className="bill-items">
            <div className="bill-items-header">
              <span className="item-name-header">Item</span>
              <span className="item-qty-header">Qty</span>
              <span className="item-price-header">Price</span>
              <span className="item-total-header">Total</span>
            </div>
            <div className="bill-line"></div>
            
            {orderItems.map((item) => (
              <div key={item.id} className="bill-item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">{item.quantity}</span>
                <span className="item-price">₹{item.price}</span>
                <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="bill-line"></div>

          <div className="bill-summary">
            <div className="bill-summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="bill-summary-row">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="bill-line"></div>
            <div className="bill-summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bill-footer">
            <p>Thank you! Visit again.</p>
            <p className="bill-footer-small">Have a great day!</p>
          </div>
        </div>

        <div className="bill-actions">
          <button className="download-button" onClick={handleDownload}>
            💾 Download
          </button>
          <button className="print-button" onClick={handlePrint}>
            🖨️ Print Bill
          </button>
          <button className="close-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
