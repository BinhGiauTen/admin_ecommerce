import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const Addcolor = () => {
  return (
    <>
      <h3 className="mb-4 title">Add Color</h3>
      <div className="">
        <form action="">
          <CustomInput type="color" label="Enter color" />
          <button className="btn btn-success border-0 rounded-3 my-3">
            Add Color
          </button>
        </form>
      </div>
    </>
  );
};
export default Addcolor;
