import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { useQuery } from "@tanstack/react-query";
const dashboard = () => {
  const [user, SetUser] = useState(2);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:3000/user/find-all`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="flex float-end pr-8 pb-5 pt-5  ">
        <label className="px-1 font-semibold">Select User: </label>
        <select onChange={(e) => SetUser(e.target.value)}>
          <option className=" bg-gray-200" value={2}>
            None
          </option>
          <option className=" bg-gray-200" value={7}>
            user7
          </option>
          <option className=" bg-gray-200" value={3}>
            user3
          </option>
          <option className=" bg-gray-200" value={10}>
            user10
          </option>
          <option className=" bg-gray-200" value={6}>
            user6
          </option>
          <option className=" bg-gray-200" value={4}>
            user4
          </option>
          <option className=" bg-gray-200" value={9}>
            user9
          </option>
          <option className=" bg-gray-200" value={8}>
            user8
          </option>
          <option className=" bg-gray-200" value={1}>
            user1
          </option>
        </select>
      </div>
      {data ? (
        <div className=" grid grid-cols-1 gap-2 pl-6 w-[100%] lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 esm:grid-cols-2 exsm:grid-cols-1 ">
          <UserList data={data} />
        </div>
      ) : (
        <div>
          <h1>Noting to show</h1>
        </div>
      )}
    </>
  );
};

export default dashboard;
