import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const useServer = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginAction = (data) => {
    setLoading(true);
    axios
      .post("https://tier-5-backend.herokuapp.com/api/v1/auth/login", data)
      .then((res) => {
        if (res) {
          setUser(res.data.data);
          const userData = res.data.data;
          Cookies.set("SSID", `${userData.id}`);
          Cookies.set("activityId", `${userData.activityId}`);
          const stringifiedUser = JSON.stringify(userData);
          localStorage.setItem("user", stringifiedUser);
        }
      })
      .catch((error) => {
        setError(error.status);
      })
      .finally(() => setLoading(false));
  };

  // get all user
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // logout
  const logoutAction = () => {
    localStorage.removeItem("user");
    Cookies.remove("SSID");
    Cookies.remove("activityId");
    axios
      .post("https://tier-5-backend.herokuapp.com/api/v1/auth/logout")
      .then((data) => {
        if (data) {
          setUser({});
        }
      })
      .catch((error) => {
        setError(error.status);
      });
  };

  return {
    user,
    setUser,
    error,
    loading,
    loginAction,
    logoutAction,
  };
};
export default useServer;
