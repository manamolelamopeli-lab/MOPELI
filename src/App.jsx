import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import BookManagement from './pages/BookManagement';
import Transactions from './pages/Transactions';
import UserManagement from './pages/UserManagement';
import './App.css';

// Initial sample data
const initialBooks = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', isbn: '9780743273565', quantity: 5 },
  { id: '2', title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', isbn: '9780132350884', quantity: 1 }
];

const initialUsers = [
  { id: '1', name: 'Alice Smith', membershipId: 'M001', role: 'Librarian' },
  { id: '2', name: 'Bob Johnson', membershipId: 'M002', role: 'Member' }
];

function App() {
  // Load initial data from localStorage or fallback to defaults
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('lib_books');
    return saved ? JSON.parse(saved) : initialBooks;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lib_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('lib_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lib_currentUser');
    return saved ? JSON.parse(saved) : initialUsers[0];
  });

  // Lifecycle synchronization with localStorage (useEffect)
  useEffect(() => {
    localStorage.setItem('lib_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('lib_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lib_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('lib_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <Router>
      <Navbar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
      <Routes>
        <Route path="/" element={<Dashboard books={books} />} />
        <Route path="/books" element={<BookManagement books={books} setBooks={setBooks} />} />
        <Route path="/transactions" element={<Transactions books={books} setBooks={setBooks} transactions={transactions} setTransactions={setTransactions} />} />
        <Route path="/users" element={<UserManagement users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;