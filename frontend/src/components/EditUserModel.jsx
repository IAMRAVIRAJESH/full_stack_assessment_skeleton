import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

const EditUserModal = ({homeId, homeData, usersOptions, onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  // const homeData = useQuery({
  //   queryKey: ['users', homeId],
  //   queryFn: async () => {
  //     const response = await fetch(`http://localhost:3000/user/find-by-home/${homeId}`)
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     return response.json()
  //   },
  // })
  const postData = async (homeId) => {
    const response = await fetch(`http://localhost:3000/user/find-by-home/${homeId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
   };

  useEffect(() => {
     postData(homeId).then((res) =>setSelectedUsers(res?.users.map(ele => ele.id), console.log(res.users)
     ))
  }, [homeId]);

  // const mutation = useMutation(updatedUsers => {
  //   // API call to update users in the DB
  // });

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const manageuserdata = async (data) => {
    return await fetch(`http://localhost:3000/home/update-users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } 
  const mutation = useMutation({
    mutationFn: manageuserdata,
    onSuccess: (data) => {
      console.log('POST Request Success:', data);
      onClose();
    },
    onError: (error) => {
      console.error('POST Request Error:', error);
    },
  });
 
  const handleSave = () => {
    if (selectedUsers.length === 0) {
      setError('At least one user must be selected');
      return;
    }
    console.log(selectedUsers.length);
    mutation.mutate({'user_ids': selectedUsers,'home_id': homeId});
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
                checked={selectedUsers?.includes(user.id)}
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
            disabled={selectedUsers.length === 0}
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
