import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

const EditUserModal = ({ home, usersOptions, onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setSelectedUsers(home?.users);
  }, [home?.users]);

  const mutation = useMutation(updatedUsers => {
    // API call to update users in the DB
    return fetch(`http://localhost:3000/home/update-users`, {
      method: 'POST',
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
    <div className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Modify Users for: </h3>
        <div className="mb-4 space-y-2">
           {usersOptions?.map(user => (
            <label key={user.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserToggle(user.id)}
              />
              {user.username}
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
