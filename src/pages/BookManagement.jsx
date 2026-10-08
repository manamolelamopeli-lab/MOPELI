import React, { useState } from 'react';

function BookManagement({ books, setBooks }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.genre || !formData.isbn || !formData.quantity) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingId) {
      setBooks(books.map(b => b.id === editingId ? { ...formData, id: editingId, quantity: Number(formData.quantity) } : b));
      setEditingId(null);
    } else {
      const newBook = { ...formData, id: Date.now().toString(), quantity: Number(formData.quantity) };
      setBooks([...books, newBook]);
    }

    setFormData({ title: '', author: '', genre: '', isbn: '', quantity: '' });
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setFormData(book);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  return (
    <div className="container grid-2">
      <div className="card">
        <h3>{editingId ? 'Edit Book Details' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input name="author" value={formData.author} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input name="genre" value={formData.genre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>ISBN</label>
            <input name="isbn" value={formData.isbn} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Initial Quantity</label>
            <input type="number" min="0" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
          <button type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>
          {editingId && (
            <button type="button" className="danger" onClick={() => { setEditingId(null); setFormData({ title: '', author: '', genre: '', isbn: '', quantity: '' }); }}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h3>Book Directory</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>
                  <button className="warning" style={{ marginRight: '0.5rem' }} onClick={() => handleEdit(book)}>Update</button>
                  <button className="danger" onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookManagement;