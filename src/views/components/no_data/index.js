import React from "react";
import plusIcon from "../../../assets/images/plus.png";

const NoData = () => {
  return (
    <div className="m-auto">
      <div>
        <img
          src={plusIcon}
          width="40"
          className="mx-auto mb-6"
          alt="Add Componet To Render"
        />
        <p className="font-semibold text-black">
          Click on sidebar items! To show component on screen.
        </p>
      </div>
    </div>
  );
};

export default NoData;
