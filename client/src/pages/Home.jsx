import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const {user} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin");
    }
  },[user?.isAdmin, navigate]);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-xl text-center font-bold">Welcome Users</h1>

      <div className="flex flex-col p-5 border md:border-none my-5 items-center">
        <Link
          to={"/raise-complaint"}
          className="bg-black text-center text-white font-semibold px-8 py-2 w-full md:w-1/2 my-2 hover:cursor-pointer hover:bg-white hover:text-black duration-200 border "
        >
          Raise Complaint
        </Link>

        <Link
          to={"/complaints"}
          className="bg-black text-center text-white font-semibold px-8 py-2 w-full md:w-1/2 my-2 hover:cursor-pointer hover:bg-white hover:text-black duration-200 border "
        >
          All Complaints
        </Link>
      </div>
    </div>
  );
};

export default Home;
