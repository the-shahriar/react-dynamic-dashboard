import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const useServer = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    axios
      .post("http://localhost:8000/api/v1/auth/login", data)
      .then((data) => {
        if (data) {
          setUser(data.data.user);
        }
      })
      .catch((error) => {
        setError(error.status);
      })
      .finally(() => setLoading(false));
  };
  // get all user
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   console.log(loggedInUser);
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/app/auth")
      .then((data) => {
        setUser(data.data.user);
      })
      .catch((error) => {
        setError(error.status);
      })
      .finally(() => setLoading(false));
  }, []);

  // const logoutAction = () => {
  //   axios
  //     .get("http://localhost:5000/app/auth/logout")
  //     .then((data) => {
  //       if (data.data.status === "unsuccessfull") {
  //         setUser({});
  //         return 1;
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error.status);
  //     });
  // };

  return {
    user,
    setUser,
    error,
    loading,
    login,
  };
};
export default useServer;
