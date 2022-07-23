import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ActiveUsers from "../../components/active_users";
import NoData from "../../components/no_data/index";
import FilterByDevice from "../../components/by_device";
import FilterByGender from "../../components/by_gender";
import FilterByCountry from "../../components/by_country";
import TopUsers from "../../components/top_users";
import AddUser from "../../components/add_user";
import { Reorder } from "framer-motion";
const Header = React.lazy(() => import("../../components/header"));
const Sidebar = React.lazy(() => import("../../components/sidebar"));

const Home = () => {
  const { data, context } = useAuth();
  const { component, showBtn, setShowBtn, setComponent } = data;
  const { user } = context;

  const componentToRender = (component) => {
    // eslint-disable-next-line array-callback-return
    return component.map((name, index) => {
      // eslint-disable-next-line default-case
      switch (name) {
        case "active":
          return <ActiveUsers key={index} name={name} />;
        case "gender":
          return <FilterByGender key={index} name={name} />;
        case "device":
          return <FilterByDevice key={index} name={name} />;
        case "country":
          return <FilterByCountry key={index} name={name} />;
        case "manage":
          return <AddUser key={index} name={name} />;
        case "top15":
          return <TopUsers key={index} name={name} />;
      }
    });
  };

  // update localstorage
  const updateData = (component) => {
    let exist = localStorage.getItem("component")
      ? JSON.parse(localStorage.getItem("component"))
      : {};
    if (exist[user.id]) {
      Object.keys(exist).forEach((key) => {
        if (key === user.id) {
          exist[key] = component;
          localStorage.setItem("component", JSON.stringify(exist));
          setShowBtn(false);
        }
      });
    } else {
      exist[user.id] = component;
      localStorage.setItem("component", JSON.stringify(exist));
      setShowBtn(false);
    }
  };

  // clearAll from localStorage
  const removeAll = () => {
    const exist = localStorage.getItem("component")
      ? JSON.parse(localStorage.getItem("component"))
      : {};
    if (exist[user.id]) {
      delete exist[user.id];
    }

    localStorage.setItem("component", JSON.stringify(exist));
    setComponent([]);
  };

  // functio to track drag event
  const onDrag = (data) => {
    setShowBtn(true);
    setComponent(data);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 w-4/5">
        <Header />
        {showBtn && (
          <div className="pr-5 flex justify-end items-center mt-4">
            <button
              onClick={() => updateData(component)}
              className="bg-white dark:bg-indigo-500 text-gray-50 px-4 py-2 mr-0"
            >
              Save <span className="text-lg">&#43;</span>
            </button>
          </div>
        )}

        {component.length > 0 && (
          <div className="pr-5 flex justify-end items-center mt-4">
            <button
              onClick={() => removeAll()}
              className="bg-white dark:bg-gray-600 text-gray-50 px-4 py-2 mr-0"
            >
              Remove All
            </button>
          </div>
        )}

        {/* Show Component on Screen */}
        {componentToRender(component).length ? (
          <Reorder.Group values={component} onReorder={(data) => onDrag(data)}>
            <div className="px-5 py-4 grid grid-cols-2 gap-4">
              {componentToRender(component)}
            </div>
          </Reorder.Group>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Home;
