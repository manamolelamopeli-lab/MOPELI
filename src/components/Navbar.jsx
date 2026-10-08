import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">📚 Community Library</div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/books">Book Management</NavLink></li>
        <li><NavLink to="/transactions">Transactions</NavLink></li>
        <li><NavLink to="/users">User Management</NavLink></li>
      </ul>
      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>👤 {currentUser.name} ({currentUser.role})</span>
          <button onClick={onLogout} className="danger" style={{ padding: '0.4rem 0.8rem' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;