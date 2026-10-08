import React, { useState } from 'react';

function UserManagement({ users, setUsers, currentUser, setCurrentUser }) {
  const [loginId, setLoginId] = useState('');
  const [formData, setFormData] = useState({ name: '', membershipId: '', role: 'Member' });
  const [editingId, setEditingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.membershipId === loginId);
    if (user) {
      setCurrentUser(user);
      setLoginId('');
    } else {
      alert('User with this Membership ID was not found.');
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.membershipId) {
      alert('Please provide name and membership ID.');
      return;
    }

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...formData, id: editingId } : u));
      setEditingId(null);
    } else {
      setUsers([...users, { ...formData, id: Date.now().toString() }]);
    }
    setFormData({ name: '', membershipId: '', role: 'Member' });
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData(user);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="container grid-2">
      <div className="card">
        <h3>User Login</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Membership ID</label>
            <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="e.g. M001" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="card">
        <h3>{editingId ? 'Edit User' : 'Register New User'}</h3>
        <form onSubmit={handleUserSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Membership ID</label>
            <input value={formData.membershipId} onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="Member">Member</option>
              <option value="Librarian">Librarian</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">{editingId ? 'Update User' : 'Add User'}</button>
        </form>

        <h3 style={{ marginTop: '2rem' }}>Registered Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.membershipId}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <button className="warning" style={{ marginRight: '0.5rem' }} onClick={() => handleEdit(u)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;