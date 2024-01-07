import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createPCategory,
  getaPCategory,
  updatePCategory,
  resetState,
} from "../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});
const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const newPCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newPCategory;
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getaPCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updatePCategory(data));
      } else {
        dispatch(createPCategory(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <>
      <h3 className="mb-4 title">{getCategoryId !== undefined ? "Edit" : "Add"} Category</h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
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
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </>
  );
};
export default Addcat;
