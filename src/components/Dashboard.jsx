import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { id: 1, title: 'Total Orders', value: '1,234', change: '+12%', icon: '📦', color: '#ff8c42' },
    { id: 2, title: 'Revenue', value: '₹45,678', change: '+8%', icon: '💰', color: '#4caf50' },
    { id: 3, title: 'Customers', value: '856', change: '+15%', icon: '👥', color: '#2196f3' },
    { id: 4, title: 'Menu Items', value: '14', change: '0%', icon: '🍽️', color: '#9c27b0' }
  ];

  const recentOrders = [
    { id: 123456, table: 12, items: 3, total: 540, status: 'Completed', time: '10 mins ago' },
    { id: 123455, table: 8, items: 5, total: 890, status: 'Completed', time: '25 mins ago' },
    { id: 123454, table: 5, items: 2, total: 340, status: 'Completed', time: '35 mins ago' },
    { id: 123453, table: 15, items: 4, total: 720, status: 'Completed', time: '1 hour ago' },
    { id: 123452, table: 3, items: 6, total: 1250, status: 'Completed', time: '2 hours ago' }
  ];

  const topItems = [
    { name: 'Margherita Pizza', orders: 145, revenue: 36250 },
    { name: 'Classic Burger', orders: 132, revenue: 15840 },
    { name: 'Pasta Carbonara', orders: 98, revenue: 17640 },
    { name: 'Chocolate Cake', orders: 87, revenue: 13050 },
    { name: 'French Fries', orders: 156, revenue: 12480 }
  ];

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
            <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
          </svg>
          <span>Restaurant</span>
        </div>

        <nav className="dashboard-nav">
          <button 
            className={`dash-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Overview
          </button>
        </nav>

        <button className="logout-button" onClick={onLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {user.username}!</h1>
            <p>Here's what's happening with your restaurant today</p>
          </div>
          <div className="user-badge">
            <span className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </span>
            <div>
              <div className="user-name">{user.username}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map(stat => (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <p className="stat-title">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                  <span className="stat-change positive">{stat.change} from last week</span>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            {/* Recent Orders */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Recent Orders</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Table</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>Table {order.table}</td>
                        <td>{order.items} items</td>
                        <td>₹{order.total}</td>
                        <td><span className="status-badge completed">{order.status}</span></td>
                        <td>{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Items */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Top Selling Items</h2>
              </div>
              <div className="top-items-list">
                {topItems.map((item, index) => (
                  <div key={index} className="top-item">
                    <div className="item-rank">{index + 1}</div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.orders} orders • ₹{item.revenue}</p>
                    </div>
                    <div className="item-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(item.orders / 156) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
