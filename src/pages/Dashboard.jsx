import React from 'react';

function Dashboard({ books }) {
  return (
    <div className="container">
      <h2>📊 Library Dashboard</h2>
      <div className="card">
        <h3>Current Book Availability</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity in Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr><td colSpan="6">No books registered in system.</td></tr>
            ) : (
              books.map((book) => {
                const isLow = Number(book.quantity) < 2;
                return (
                  <tr key={book.id} className={isLow ? 'low-stock' : ''}>
                    <td><strong>{book.title}</strong></td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>
                    <td>
                      {isLow ? (
                        <span className="badge badge-low">Low Stock (&lt; 2)</span>
                      ) : (
                        <span className="badge badge-ok">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;