import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Reorder } from "framer-motion";

const FilterByCountry = ({ name }) => {
  // get remove componet function from provider
  const { data, context } = useAuth();
  const { removeComponent } = data;
  const { user } = context;

  const [users, setUsers] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://blooming-citadel-15619.herokuapp.com/api/v1/filter/byCountry",
        {
          headers: {
            country: countryName,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.data.users);
      })
      .catch((error) => {
        console.log("by country", error);
      });
  }, [countryName]);

  // sliced users
  const slicedUsers = users.slice(0, 20);

  // get countries list
  useEffect(() => {
    axios
      .get(
        "https://blooming-citadel-15619.herokuapp.com/api/v1/filter/country-list"
      )
      .then((res) => {
        setCountries(res.data.data.countries);
      })
      .catch((error) => {
        console.log("get country", error);
      });
  }, []);

  //
  const handleSelect = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
  };

  return (
    <Reorder.Item drag value={name} id={name}>
      <div>
        <div className="drop-shadow-lg cursor-all-scroll">
          <div className="min-w-0 px-2 py-4 bg-gray-50 rounded-lg shadow-xs">
            <div className="flex justify-between items-center">
              <h4 className="mb-4 font-semibold text-black">
                Country Wise Users
              </h4>
              {/* Remove component from render screen */}
              <button onClick={() => removeComponent(user.id, name)}>
                &#10060;
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="flex justify-end items-center mt-2">
                <select
                  onChange={handleSelect}
                  className="px-4 py-2 bg-gray-50 border border-gray-300"
                >
                  <option value="">--select country--</option>
                  {countries.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b">
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Device</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y dark:divide-gray-700">
                  {slicedUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-3 text-sm text-center text-black"
                      >
                        No Data Found!
                      </td>
                    </tr>
                  )}

                  {slicedUsers.map((user) => (
                    <tr key={user._id} className="text-black">
                      <td className="px-4 py-3 text-sm uppercase text-black">
                        {user?.email}
                      </td>
                      <td className="px-4 py-3 text-sm uppercase text-black">
                        {user?.country}
                      </td>
                      <td className="px-4 py-3 text-sm uppercase text-black">
                        {user?.device}
                      </td>
                      <td className="px-4 py-3 text-sm uppercase text-black">
                        {user?.gender}
                      </td>
                      <td className="px-4 py-3 text-sm uppercase text-black">
                        &#10060;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
};

export default FilterByCountry;
