import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth";

const ActiveUsers = ({ name }) => {
  const [userData, setUserData] = useState([]);

  // get remove componet function from provider
  const { data } = useAuth();
  const { removeComponent } = data;

  // fetch data from server
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/active-user/all")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log("on active_users fetching", error);
      });
  }, []);

  return (
    <div className="drop-shadow-lg">
      <div className="min-w-0 p-4 bg-gray-50 rounded-lg shadow-xs">
        <div className="flex justify-between items-center">
          <h4 className="mb-4 font-semibold text-black">Active Users</h4>
          {/* Remove component from render screen */}
          <button onClick={() => removeComponent(name)}>&#10060;</button>
        </div>
        <BarChart width={450} height={300} data={userData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
};

export default ActiveUsers;
