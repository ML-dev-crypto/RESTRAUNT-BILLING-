import React, { useState } from 'react';
import MenuItem from './components/MenuItem';
import OrderCart from './components/OrderCart';
import BillModal from './components/BillModal';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import { menuData } from './data/menuData';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Dishes');
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber] = useState(12);
  const [orderNumber] = useState(123456);
  const [showBill, setShowBill] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  const categories = ['All Dishes', 'Main', 'Sides', 'Desserts', 'Drinks'];

  const filteredMenu = menuData
    .filter(item => {
      const matchesCategory = selectedCategory === 'All Dishes' || item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (searchQuery === '') return 0;
      const searchLower = searchQuery.toLowerCase();
      const aNameMatch = a.name.toLowerCase().includes(searchLower);
      const bNameMatch = b.name.toLowerCase().includes(searchLower);
      
      // Prioritize exact name matches first
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Then prioritize items starting with search term
      const aStartsWith = a.name.toLowerCase().startsWith(searchLower);
      const bStartsWith = b.name.toLowerCase().startsWith(searchLower);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      return 0;
    });

  const handleAddToOrder = (item) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(orderItem => orderItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
    } else {
      setOrderItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) return;
    
    setShowOrderSuccess(true);
    setTimeout(() => {
      setShowOrderSuccess(false);
      setOrderItems([]);
    }, 3000);
  };

  const handleGenerateBill = () => {
    if (orderItems.length === 0) return;
    setShowBill(true);
  };

  const handleCloseBill = () => {
    setShowBill(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLanding(true);
    setOrderItems([]);
    setSearchQuery('');
    setSelectedCategory('All Dishes');
  };

  const handleNavigateToLogin = () => {
    setShowLanding(false);
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onNavigateToLogin={handleNavigateToLogin} />;
  }

  // Show login page if no user
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Show dashboard for admin
  if (user.role === 'admin') {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Show billing page for employee
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
          </div>
        </div>
        <nav className="nav">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`nav-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="nav-icon">
                {index === 0 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7zm-5-7H4v16h2V2z"/>
                  </svg>
                )}
                {index === 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"/>
                  </svg>
                )}
                {index === 2 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
                  </svg>
                )}
                {index === 3 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.24 2 7 4.24 7 7l5 7-5 7c0 2.76 2.24 5 5 5s5-2.24 5-5l-5-7 5-7c0-2.76-2.24-5-5-5zm0 18c-1.66 0-3-1.34-3-3 0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                )}
                {index === 4 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 21h19v-3H2v3zM20 8H4V5h16v3zm-.26-7H4.26C3.56 1 3 1.56 3 2.26v3.48C3 6.44 3.56 7 4.26 7h15.48c.7 0 1.26-.56 1.26-1.26V2.26C21 1.56 20.44 1 19.74 1zm-1.59 13H5.85l-.23 2h12.76l-.23-2zM16 11H8l-.5 2h9l-.5-2z"/>
                  </svg>
                )}
              </span>
              <span className="nav-label">{category}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="page-title">{selectedCategory}</h1>
          <div className="header-actions">
            <div className="search-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="search" 
                placeholder="Search dishes..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="menu-grid">
          {filteredMenu.length > 0 ? (
            filteredMenu.map(item => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToOrder={handleAddToOrder}
              />
            ))
          ) : (
            <div className="no-results">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h3>No dishes found</h3>
              <p>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </main>

      <aside className={`order-sidebar ${showCart ? 'open' : ''}`}>
        <button className="close-cart-btn" onClick={() => setShowCart(false)}>✕</button>
        <OrderCart
          orderItems={orderItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          tableNumber={tableNumber}
          orderNumber={orderNumber}
          onPlaceOrder={handlePlaceOrder}
          onGenerateBill={handleGenerateBill}
        />
      </aside>

      {/* Floating Cart Button for Mobile */}
      <button className="floating-cart-btn" onClick={() => setShowCart(true)}>
        <span className="cart-icon">🛒</span>
        {orderItems.length > 0 && (
          <span className="cart-badge">{orderItems.length}</span>
        )}
      </button>

      {showBill && (
        <BillModal
          orderItems={orderItems}
          tableNumber={tableNumber}
          orderNumber={orderNumber}
          onClose={handleCloseBill}
        />
      )}

      {showOrderSuccess && (
        <div className="success-toast">
          <div className="success-toast-content">
            <span className="success-icon">✓</span>
            <div>
              <h3>Order Placed Successfully!</h3>
              <p>Your order will be ready shortly</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
