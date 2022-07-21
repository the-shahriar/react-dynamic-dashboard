import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const useServer = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginAction = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:8000/api/v1/auth/login", data)
      .then((res) => {
        if (res) {
          setUser(res.data.data);
          const user = JSON.stringify(res.data.data);
          localStorage.setItem("user", user);
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
    axios
      .post("http://localhost:8000/api/v1/auth/logout")
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
