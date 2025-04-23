import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()

  useEffect(() =>{
    if(!user){
      navigate('/login')
    }
  },[user])

  return (
    <>
      <div
        className={
          comment?.user === user?.id
            ? "my-2 border bg-green-200 border-gray-400 p-4"
            : "my-2 bg-gray-200 border border-gray-400 p-4"
        }
      >
        <h2 className="text-lg font-semibold ">{comment?.message}</h2>
        <p className="text-gray-400 text-sm">
          {new Date(comment?.createdAt).toLocaleDateString("en-IN")}
        </p>
        <div className="text-gray-400 text-sm font-bold">{user.id === comment.user ? "By Me" : " By You"}</div>
      </div>
    </>
  );
};

export default Comment;
