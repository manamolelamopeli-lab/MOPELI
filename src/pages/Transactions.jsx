import React, { useState } from 'react';

function Transactions({ books, setBooks, transactions, setTransactions }) {
  const [selectedBookId, setSelectedBookId] = useState('');
  const [type, setType] = useState('ADD');
  const [amount, setAmount] = useState(1);

  const handleTransaction = (e) => {
    e.preventDefault();
    const book = books.find(b => b.id === selectedBookId);
    if (!book) {
      alert('Please select a valid book.');
      return;
    }

    const changeAmount = Number(amount);
    if (type === 'DEDUCT' && book.quantity < changeAmount) {
      alert('Cannot borrow more copies than available in stock!');
      return;
    }

    const updatedBooks = books.map(b => {
      if (b.id === selectedBookId) {
        const newQty = type === 'ADD' ? b.quantity + changeAmount : b.quantity - changeAmount;
        return { ...b, quantity: newQty };
      }
      return b;
    });

    const newLog = {
      id: Date.now().toString(),
      bookTitle: book.title,
      type: type === 'ADD' ? 'Stock Added' : 'Book Borrowed',
      amount: changeAmount,
      date: new Date().toLocaleString()
    };

    setBooks(updatedBooks);
    setTransactions([newLog, ...transactions]);
    setSelectedBookId('');
    setAmount(1);
  };

  return (
    <div className="container grid-2">
      <div className="card">
        <h3>Record Stock Transaction</h3>
        <form onSubmit={handleTransaction}>
          <div className="form-group">
            <label>Select Book</label>
            <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)} required>
              <option value="">-- Choose Book --</option>
              {books.map(b => (
                <option key={b.id} value={b.id}>{b.title} (In Stock: {b.quantity})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Action</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="ADD">Add Stock (New Arrivals)</option>
              <option value="DEDUCT">Deduct Stock (Borrowed)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <button type="submit">Submit Transaction</button>
        </form>
      </div>

      <div className="card">
        <h3>Transaction History Log</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Book</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan="4">No transactions recorded yet.</td></tr>
            ) : (
              transactions.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.bookTitle}</td>
                  <td>{t.type}</td>
                  <td>{t.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;