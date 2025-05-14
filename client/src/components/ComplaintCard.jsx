import React from "react";
import { Link } from 'react-router-dom'

const ComplaintCard = ( { complaint}) => {
  return (
    <>
      <div className=" relative p-4 border border-gray-400">
        <div className={complaint?.status === 'open' ?"absolute top-6 right-6 bg-green-500 p-0.5 my-2 rounded-4xl text-white text-center font-semibold py-1 px-4" : complaint?.status === "pending" ?"absolute top-6 right-6 bg-gray-500 p-0.5 my-2 rounded-4xl text-white text-center font-semibold py-1 px-4 " : "absolute top-6 right-6 bg-red-500 p-0.5 my-2 rounded-4xl text-white text-center font-semibold py-1 px-4"}>
          {complaint.status}
        </div>
        <h1 className="font-bold my-2">Product : {complaint?.cars}</h1>
        <p className="text-sm font-semibold text-gray-500 mb-3">{new Date(complaint?.createdAt).toLocaleDateString('en-IN')}</p>
        <Link
          className="bg-black my-2 rounded-4xl text-white font-semibold py-1 px-4 hover:bg-white hover:text-black hover:border duration-200"
          to={`/complaints/${complaint?._id}`}
        >
          View
        </Link>
      </div>
    </>
  );
};

export default ComplaintCard;
