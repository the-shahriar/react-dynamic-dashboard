import React from "react";
import useAuth from "../../../hooks/useAuth";
const ActiveUsers = React.lazy(() => import("../../components/active_users"));
const Header = React.lazy(() => import("../../components/header"));
const Sidebar = React.lazy(() => import("../../components/sidebar"));
const NoData = React.lazy(() => import("../../components/no_data/index"));

const Home = () => {
  const { data } = useAuth();
  const { component, showBtn, setShowBtn } = data;

  const componentToRender = (component) => {
    // eslint-disable-next-line array-callback-return
    return component.map((name, index) => {
      // eslint-disable-next-line default-case
      switch (name) {
        case "active":
          return <ActiveUsers key={index} name={name} />;
        case "filter":
          return <ActiveUsers key={index} name={name} />;
        case "add":
          return <ActiveUsers key={index} name={name} />;
        case "top15":
          return <ActiveUsers key={index} name={name} />;
      }
    });
  };

  const updateData = (component) => {
    localStorage.setItem("component", JSON.stringify(component));
    setShowBtn(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 w-4/5">
        <Header />
        {/* Show Component on Screen */}
        {componentToRender(component).length ? (
          <div className="px-5 py-4 grid grid-cols-2 gap-4">
            {componentToRender(component)}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Home;
