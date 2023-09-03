import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const Addcat = () => {
  return (
    <>
      <h3 className="mb-4 title">Add Category</h3>
      <div className="">
        <form action="">
          <CustomInput type="text" label="Enter Blog Category" />
          <button className="btn btn-success border-0 rounded-3 my-3">
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};
export default Addcat;
