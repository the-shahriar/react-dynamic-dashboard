import React from "react";
import useAuth from "../../../hooks/useAuth";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const Home = () => {
  const { data } = useAuth();
  const { component, showBtn } = data;

  const componentToRender = (component) => {
    // eslint-disable-next-line array-callback-return
    return component.map((name, index) => {
      // eslint-disable-next-line default-case
      switch (name) {
        case "active":
          return <p key={index}>{name}</p>;
        case "filter":
          return <p key={index}>{name}</p>;
        case "add":
          return <p key={index}>{name}</p>;
        case "top15":
          return <p key={index}>{name}</p>;
      }
    });
  };

  const updateData = (component) => {
    localStorage.setItem("component", JSON.stringify(component));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 w-4/5">
        <Header />
        <div className="px-5 py-4">{componentToRender(component)}</div>
        <p className="px-5">
          {showBtn ? (
            <button
              className="px-4 py-3 bg-blue-200 text-black"
              onClick={() => updateData(component)}
            >
              Update Data
            </button>
          ) : (
            "No Btn"
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;
