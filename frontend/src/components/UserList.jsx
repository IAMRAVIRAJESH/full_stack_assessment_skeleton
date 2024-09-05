import React,{useState} from "react";
import { useQuery } from "@tanstack/react-query";
import EditUserModal from "./EditUserModel";
import axios from 'axios';

const userList = ({ id, usersOptions,isModalOpen,handleEditUserClick,handleModalClose}) => {
  const result = useQuery({
    queryKey: ['todos', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/home/find-by-user/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  
  return result?.data?.homes?.map((item,index) => {
    return (
      <div key={index} className="flex  max-w-52 max-h-80 shadow-md mb-5  rounded-md">
        <div className="px-5 py-4 relative " key={item.id}>
          <p className="font-bold ">{item.street_address}</p>
          <div className="text-sm pt-1 h-[180px]  overflow-hidden">
            <p>List Price: ${item.list_price}</p>
            <p>State: {item.state}</p>
            <p>Zip: {item.zip}</p>
            <p>Sqft: {item.sqft}</p>
            <p>Beds:{item.beds}</p>
            <p>Baths: {item.baths}</p>
          </div>

          <div className=" pb-3 absolute bottom-3 ">
            <button className="px-4 py-2 bg-blue-500 text-white rounded font-semibold text-sm"
            onClick={handleEditUserClick}
            >
              Edit Users
            </button>
          </div>
        </div>
        {isModalOpen && (
        <EditUserModal
        usersOptions = {usersOptions}
          onClose={handleModalClose}
        />
      )}
      </div>
    );
  });
};

export default userList;
