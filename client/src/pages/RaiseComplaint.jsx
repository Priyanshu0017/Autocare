import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { raiseComplaint } from "../features/complaint/complaintSlice";
import { useNavigate } from "react-router-dom";

const RaiseComplaint = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    car: "",
    description: "",
    image: "",
  });

  const { car, description, image } = formData;

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(raiseComplaint(formData));
    navigate("/complaints");
  };

  return (
    <div className="min-h-screen p-10">
      <BackButton url={"/"} />
      <h1 className="text-center font-bold text-xl"> Raise New Complaint</h1>

      <div className=" p-5 border my-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={user.name}
            className="my-2 border border-gray-400 p-2 w-full disabled:bg-sky-200 text-sm "
            disabled
          />
          <input
            type="email"
            value={user.email}
            className="my-2 border border-gray-400 p-2 w-full disabled:bg-sky-200 text-sm "
            disabled
          />
          <select
            required
            onChange={(e) => handleChange(e)}
            name="car"
            value={car}
            className="w-full my-2 border p-2 text-sm border-gray-400 outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Please select Your Car Brand
            </option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="hyundai">Hyundai</option>
            <option value="tata">Tata</option>
            <option value="mahindra">Mahindra</option>
            <option value="bmw">BMW</option>
          </select>
          <textarea
            required
            onChange={(e) => handleChange(e)}
            name="description"
            value={description}
            className="p-2 my-2 outline-gray-500 border border-gray-400 w-full"
            placeholder="describe your issue here..."
          ></textarea>
          <input
            required
            onChange={(e) => handleChange(e)}
            name="image"
            value={image}
            type="text"
            placeholder="Image URL"
            className="my-2 border outline-gray-500 border-gray-400 p-2 w-full text-sm"
          />

          <button className="w-full py-2 px-45 my-2 bg-black text-white font-bold hover:bg-green-700 hover:border hover:cursor-pointer duration-200">
            Raise Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
