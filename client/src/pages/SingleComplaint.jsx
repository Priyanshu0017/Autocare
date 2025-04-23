import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { getComplaint, updateComplaint } from "../features/complaint/complaintSlice";
import Comment from "../components/Comment";
import { getComments, raiseComment } from "../features/comment/commentSlice";

const SingleComplaint = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);

  const { singleComplaint, isLoading, isError, message } = useSelector(
    (state) => state.complaint
  );

  const { comments } = useSelector((state) => state.comment);

  const [text, setText] = useState();

  const handleAddcomment = (e) => {
    e.preventDefault();
    dispatch(raiseComment({ id: id, text: text }));
    setText("");
  };

  useEffect(() => {

    if(!user){
      navigate('/login')
    }
    // fetching the single complaint and comments
    dispatch(getComplaint(id));
    dispatch(getComments(id));

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
  }, [isError, message, id]);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="min-h-screen p-10">
      
      <h1 className="text-center text-xl font-bold">Complaint Details</h1>
      <div className="relative p-5 border border-gray-400 my-5 flex items-center justify-between flex-col md:flex-row">
        <div
          className={
            singleComplaint?.status === "open"
              ? "absolute top-3 left-3 bg-green-500 p-0.5 my-2 rounded-4xl text-white text-center font-semibold py-1 px-4"
              : singleComplaint?.status === "pending"
              ? "absolute top-3 left-3 bg-gray-500 p-0.5 my-2 rounded-4xl text-white text-center font-semibold py-1 px-4"
              : "absolute top-3 left-3 bg-red-500 p-0.5 my-2 rounded-4xl text-white text-center font-semibold py-1 px-4"
          }
        >
          {singleComplaint?.status}
        </div>
        <div className="my-10 w-full md:w-1/2 text-center md:text-left ">
          <h1 className="text-2xl font-bold my-2 uppercase ">
            Brand : {singleComplaint.laptop}
          </h1>
          <p className="text-sm font-semibold text-gray-600 my-2">
            {" "}
            {singleComplaint?.description}
          </p>
          <p className="text-sm font-semibold text-gray-600 my-2">
            Date :{" "}
            {new Date(singleComplaint?.createdAt).toLocaleDateString("en-IN")}
          </p>
          <p className="text-sm font-semibold text-gray-600 my-2">
            Complaint ID : {singleComplaint?._id}
          </p>
        </div>
        <img className="h-72" src={singleComplaint?.image} alt="" />
      </div>
      <div className="my-5 border border-gray-400 p-5">
        <form onSubmit={handleAddcomment} className="flex items-center">
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Enter Comment"
            className="my-2 border border-gray-500 p-2 w-3/4 outline-none text-sm h-10"
          />
          <button className="w-1/4 py-2 my-2 bg-black text-white font-bold hover:bg-green-700 hover:border hover:cursor-pointer duration-200 h-10">
            Add Comment
          </button>
        </form>
        {comments.map((comment) => {
          return <Comment key={comment._id} comment={comment} />;
        })}

        <button
        onClick={() => {
          dispatch(updateComplaint({id : id, status: "closed"}))
        }}
          className=" disabled:bg-gray-500 bg-red-500 text-center w-full my-2 py-2 font-semibold text-gray-200  hover:bg-red-700 hover:cursor-pointer duration-200"
          disabled={singleComplaint?.status === "closed"}
        >
          {user?.isAdmin ? singleComplaint?.status === "closed"
            ? "Closed"
            : "Close Complaint" : singleComplaint?.status === "closed"
            ? "Closed"
            : "Close My Complaint"}
        </button>
      </div>
    </div>
  );
};

export default SingleComplaint;
