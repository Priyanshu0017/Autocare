import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";
import Loading from "../components/Loading";


const Login = () => {


    const { user, isError, isLoading, message } = useSelector(
      (state) => state.auth
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [formData, setformData] = useState({
      email: "",
      password: "",
    });

    const { email, password } = formData;

    const handleChange = (e) => {
      setformData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };


    
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(loginUser(formData));
  };

  // Move useEffect to the top level of the component
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home page if user is registered
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
  }, [user, isError, message]);

  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center font-bold text-xl"> Login Here</h1>

      <div className=" p-5 border my-5">
        <form  onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="my-2 border border-gray-400 p-2 w-full outline-none text-sm "
            value={email}
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="my-2 border border-gray-400 p-2 w-full outline-none text-sm "
            value={password}
            required
            onChange={handleChange}
          />
          <button className="w-full py-2 px-4 my-2 bg-black text-white font-bold hover:bg-blue-700 hover:border hover:cursor-pointer duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
