import React from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const AddUser = ({ name }) => {
  // get remove componet function from provider
  const { data, context } = useAuth();
  const { removeComponent } = data;
  const { user } = context;

  // submit form
  const handleAddUser = (e) => {
    e.preventDefault();
    const { name, email, gender, country, password } = e.target;
    const body = {
      name: name.value,
      email: email.value,
      gender: gender.value,
      country: country.value,
      password: password.value,
    };
    axios
      .post("http://localhost:8000/api/v1/auth/add-user", body)
      .then((res) => {
        if (res) {
          window.alert("Succesfully user has been created");
          e.target.reset();
        }
      })
      .catch((error) => {
        console.log("on add user", error);
      });
  };

  return (
    <div className="drop-shadow-lg">
      <div className="min-w-0 p-4 bg-gray-50 rounded-lg shadow-xs">
        <div className="flex justify-between items-center">
          <h4 className="mb-4 font-semibold text-black">Add User</h4>
          {/* Remove component from render screen */}
          <button onClick={() => removeComponent(user.id, name)}>
            &#10060;
          </button>
        </div>
        <div className="py-2 bg-gray-50">
          <form onSubmit={handleAddUser}>
            <input
              className="block w-full py-1 px-2 bg-gray-50 border border-gray-300 mb-3"
              placeholder="Enter Name"
              type="text"
              required
              name="name"
            />
            <input
              className="block w-full py-1 px-2 bg-gray-50 border border-gray-300 mb-3"
              placeholder="Enter Email"
              type="email"
              required
              name="email"
            />
            <input
              className="block w-full py-1 px-2 bg-gray-50 border border-gray-300 mb-3"
              placeholder="Enter Password"
              type="password"
              required
              name="password"
            />
            <input
              className="block w-full py-1 px-2 bg-gray-50 border border-gray-300 mb-4"
              placeholder="Enter Country"
              type="text"
              required
              name="country"
            />
            <div className="text-sm">
              <span className="text-black">Select Gender</span>
              <div className="mt-2">
                <label className="inline-flex items-center text-black">
                  <input
                    type="radio"
                    className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    name="gender"
                    value="Male"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6 text-black">
                  <input
                    type="radio"
                    className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    name="gender"
                    value="Female"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-6 text-black">
                  <input
                    type="radio"
                    className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    name="gender"
                    value="Others"
                  />
                  <span className="ml-2">Others</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <input
                className="block mt-1 py-2 px-6 cursor-pointer bg-gray-50 border border-gray-500 hover:bg-gray-600 hover:text-white"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
