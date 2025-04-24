import React, { useEffect } from "react";
import ComplaintCard from "../components/ComplaintCard";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../features/complaint/complaintSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { getAllComplaints } from "../features/admin/adminSlice";

const AllComplaints = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { complaints, isLoading, isError, message } = useSelector(
    (state) => state.complaint
  );
  const { allcomplaints , isLoading2 } = useSelector((state) => state.admin);

  useEffect(() => {
   

    if(user?.isAdmin){
      dispatch(getAllComplaints())
    } else {
      dispatch(getComplaints());
    }


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
  }, [isError, message ,user]);

  if (isLoading) {
    <Loading />;
  }
  if (isLoading2) {
    <Loading />;
  }

  return (
    <div className="min-h-screen p-10 ">
      <BackButton url={"/"} />
      <h1 className="text-center text-xl my-4 font-bold">All Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        { user?.isAdmin ? allcomplaints.map((complaint) => {
          return <ComplaintCard key={complaint._id} complaint={complaint} />;
        }) : complaints.map((complaint) => {
          return <ComplaintCard key={complaint._id} complaint={complaint} />;
        }) }
      </div>
    </div>
  );
};

export default AllComplaints;
