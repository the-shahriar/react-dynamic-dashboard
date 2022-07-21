import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import loginImage from "../../../assets/images/login.png";
import useAuth from "../../../hooks/useAuth";
import LoginForm from "../../components/login_form";

const Login = () => {
  const [error, setError] = useState(null);

  // use auth
  const { loginAction, user } = useAuth();

  //
  const navigate = useNavigate();

  if (user?.email) {
    return <Navigate to="home" replace />;
  }

  // on submit form
  const onSubmit = (e) => {
    setError(null);
    e.preventDefault();
    if (!e.target.email.value) {
      setError("Please enter email address");
    } else if (!e.target.password.value) {
      setError("Please enter password");
    } else {
      const body = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      // login
      loginAction(body);
      navigate("home");
    }
  };

  return (
    <div>
      <section className="h-screen bg-gray-50">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            {/* Image */}
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img src={loginImage} className="w-full" alt="Phone" />
            </div>
            {/* Login form */}
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={onSubmit}>
                <LoginForm error={error} />
              </form>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default Login;
