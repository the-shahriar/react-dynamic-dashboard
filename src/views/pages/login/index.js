import React from "react";
import loginImage from "../../../assets/images/login.png";
import LoginForm from "../../components/login_form";

const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
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
            <LoginForm onSubmit={onSubmit} />
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default Login;
