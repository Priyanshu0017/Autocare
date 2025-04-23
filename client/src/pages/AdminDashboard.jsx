import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-xl text-center font-bold">Welcome Admin</h1>

      <div className="flex flex-col p-5 border md:border-none my-5 items-center">
        <Link
          to={"/admin/users"}
          className="bg-black text-center text-white font-semibold px-8 py-2 w-full md:w-1/2 my-2 hover:cursor-pointer hover:bg-white hover:text-black duration-200 border "
        >
         All Users
        </Link>

        <Link
          to={"/complaints"}
          className="bg-black text-center text-white font-semibold px-8 py-2 w-full md:w-1/2 my-2 hover:cursor-pointer hover:bg-white hover:text-black duration-200 border "
        >
          All Complaints
        </Link>
        <Link
          to={"/admin/comments"}
          className="bg-black text-center text-white font-semibold px-8 py-2 w-full md:w-1/2 my-2 hover:cursor-pointer hover:bg-white hover:text-black duration-200 border "
        >
          All Comments
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
