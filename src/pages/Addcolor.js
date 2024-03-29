import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  resetState,
  getaColor,
  updateColor,
} from "../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getaColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter color"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </>
  );
};
export default Addcolor;
