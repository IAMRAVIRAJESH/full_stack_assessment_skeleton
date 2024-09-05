import React,{useState} from "react";
import { useQuery } from "@tanstack/react-query";

const homeList = ({ id }) => {
  const result = useQuery({
    queryKey: ['todos', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/user/find-by-home/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  
  return result?.data?.users?.map((item,index) => {
    return (
      <div key={index} className="flex  max-w-52 max-h-80 shadow-md mb-5  rounded-md">
        <div className="px-5 py-4 relative " key={item.id}>
          <div className="text-sm pt-1 h-[180px]  overflow-hidden">
            <p>ID: {item.id}</p>
            <p>Username: {item.username}</p>
            <p>Email: {item.email}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default homeList;
