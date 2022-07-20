import React, { useState } from "react";
import loginImage from "../../../assets/images/login.png";
import useAuth from "../../../hooks/useAuth";
import LoginForm from "../../components/login_form";

const Login = () => {
  const [error, setError] = useState(null);

  const { loginAction, user, logoutAction } = useAuth();
  console.log(user);

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

      loginAction(body);
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
            <LoginForm onSubmit={onSubmit} error={error} />
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default Login;
