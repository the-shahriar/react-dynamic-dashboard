import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/404.png";

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center">
        <img className="text-center" src={image} width="600" alt="Not Found" />
      </div>

      <div className="flex justify-center">
        <Link to="/home" className="bg-slate-600 text-white px-4 py-3">
          Back To Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
