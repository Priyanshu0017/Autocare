import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Backbutton from "../components/Backbutton";

const AllUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const { allusers, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }

    dispatch(getUsers());

    if (isError && message) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [user, isError, message]);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="min-h-screen p-10">
      <Backbutton url={"/"}/>
      <h1 className="text-xl text-center font-bold my-10">All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allusers?.map((user) => {
          return (
            <div className=" relative p-4 border border-gray-400">
              <h1 className="font-bold my-2">{user.name} </h1>
              <p className="font-bold my-2">{user.email} </p>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
