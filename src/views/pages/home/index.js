import React from "react";
import useAuth from "../../../hooks/useAuth";

const Home = () => {
  const { logoutAction } = useAuth();

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={logoutAction}
        className=" p-5 bg-neutral-400 text-lime-50"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
