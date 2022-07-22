import React, { useEffect } from "react";
import Login from "./views/pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
const Home = React.lazy(() => import("./views/pages/home"));
const NotFound = React.lazy(() => import("./views/pages/404"));
const PrivateRoute = React.lazy(() => import("./utils/private_route"));

function App() {
  const { context, data } = useAuth();
  const { user, loading } = context;
  const { setComponent } = data;

  useEffect(() => {
    const getComponent = async () => {
      const exist = localStorage.getItem("component")
        ? JSON.parse(localStorage.getItem("component"))
        : {};
      if (exist[user?.id]) {
        Object.entries(exist).forEach(([key, value]) => {
          if (key === user?.id) {
            setComponent(value);
          }
        });
      } else {
        setComponent([]);
      }
    };
    getComponent();
  }, [setComponent, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute user={user} loading={loading} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
