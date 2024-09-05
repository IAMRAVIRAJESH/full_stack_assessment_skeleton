import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

const EditUserModal = ({ home, users, onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize selected users based on the home’s current related users
    setSelectedUsers(home.users);
  }, [home.users]);

  const mutation = useMutation(updatedUsers => {
    // API call to update users in the DB
    return fetch("http://localhost:3000/home/update-users", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users: updatedUsers }),
    });
  });

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = () => {
    if (selectedUsers.length === 0) {
      setError('At least one user must be selected');
      return;
    }
    mutation.mutate(selectedUsers, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Users</h3>
        {users.map(user => (
          <label key={user.id} className="user-checkbox">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleUserToggle(user.id)}
            />
            {user.name}
          </label>
        ))}
        {error && <div className="error">{error}</div>}
        <div className="modal-actions">
          <button className="save-button" onClick={handleSave} disabled={selectedUsers.length === 0 || mutation.isLoading}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;