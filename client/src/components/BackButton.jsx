import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link
      to={url}
      className="bg-black my-2 text-white font-semibold py-1 px-4 hover:bg-gray-700 hover:cursor-pointer duration-200 rounded-4xl"
    >
    Go Back
    </Link>
  );
};

export default BackButton;