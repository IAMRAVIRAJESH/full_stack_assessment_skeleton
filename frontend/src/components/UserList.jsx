import React from "react";

const userList = ({ data }) => {
  return data.map((item,index) => {
    return (
      <div key={index} className="flex  max-w-52 max-h-80 shadow-md mb-5  rounded-md">
        <div className="px-5 py-4 relative " key={item.id}>
          <p className="font-bold ">{item.title}</p>
          <div className="text-sm pt-1 h-[180px]  overflow-hidden">
            <p>List Price: $791204</p>
            <p>State: Arizona</p>
            <p>Zip: 05378</p>
            <p>Sqft: 2945.89</p>
            <p>Beds: 1</p>
            <p>Baths: 3</p>
          </div>

          <div className=" pb-3 absolute bottom-3 ">
            <button className="px-4 py-2 bg-blue-500 text-white rounded font-semibold text-sm">
              Edit Users
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default userList;
