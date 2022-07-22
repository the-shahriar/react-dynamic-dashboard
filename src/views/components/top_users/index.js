import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import useAuth from "../../../hooks/useAuth";

const TopUsers = ({ name }) => {
  const [userData, setUserData] = useState([]);

  // get remove componet function from provider
  const { data, context } = useAuth();
  const { removeComponent } = data;
  const { user } = context;

  // fetch data from server
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/filter/byUsageTime")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log("on top_users fetching", error);
      });
  }, []);

  // sorting by duration
  const sortedData = userData.sort(function (a, b) {
    return b.duration - a.duration;
  });

  return (
    <div className="drop-shadow-lg">
      <div className="min-w-0 p-4 bg-gray-50 rounded-lg shadow-xs">
        <div className="flex justify-between items-center">
          <h4 className="mb-4 font-semibold text-black">
            Top 15 Users (By Milliseconds)
          </h4>
          {/* Remove component from render screen */}
          <button onClick={() => removeComponent(user.id, name)}>
            &#10060;
          </button>
        </div>
        <BarChart width={500} height={300} data={sortedData}>
          <XAxis dataKey="email" stroke="#8884d8" />
          <Tooltip wrapperStyle={{ width: 180, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 10,
              right: 10,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="duration" fill="#8884d8" barSize={25} />
        </BarChart>
      </div>
    </div>
  );
};

export default TopUsers;
