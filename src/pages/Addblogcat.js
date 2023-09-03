import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const Addblogcat = () => {
  return (
    <>
      <h3 className="mb-4 title">Add blog category</h3>
      <div className="">
        <form action="">
          <CustomInput type="text" label="Enter Blog Category" />
          <button className="btn btn-success border-0 rounded-3 my-3">
            Add Blog Category
          </button>
        </form>
      </div>
    </>
  );
};
export default Addblogcat;
