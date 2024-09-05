import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { useQuery,useMutation } from "@tanstack/react-query";

const userDashboard = () => {
  const [userId, SetUserId] = useState(0);
  const [homeId, SetHomeId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditUserClick = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const  userOption  = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:3000/user/find-all`).then((res) => res.json()),
  });

  const handleChangeInput = (e)=> {
    SetUserId(e.target.value)
  }


  if (userOption.isPending  ) return "Loading...";

  if (userOption.error ) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="flex float-end pr-8 pb-5 pt-5  ">
        <label className="px-1 font-semibold">Select User: </label>
        <select onChange={handleChangeInput}>
        {userOption?.data?.map(ele=>{
            return  (<option key={ele.id} className=" bg-gray-200" value={ele.id}>{ele.username}</option>)
          })
          }
        </select>
      </div>
      
      {userId!=0 ? 
        <div>
          <UserList id={userId}
          isModalOpen={isModalOpen}
          handleEditUserClick={handleEditUserClick}
          usersOptions={userOption?.data}
          homeId = {homeId}
          SetHomeId= {SetHomeId}
          handleModalClose={handleModalClose} />
           </div>
         : <div className=" max-w-fit ml-auto mr-auto pt-[18rem]"> <h1 className=" font-semibold text-lg">Noting to show</h1></div> 

      } 
       
    </>
  );
};

export default userDashboard;
