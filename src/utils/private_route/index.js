import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ user, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return user?.email ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
