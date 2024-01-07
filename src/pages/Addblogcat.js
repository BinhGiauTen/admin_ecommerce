import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBCategory,
  resetState,
  getaBCategory,
  updateBCategory,
} from "../features/bcategory/bcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Blog category is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBCategoryId = location.pathname.split("/")[3];
  const newBCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createdBCategory, bcategoryName, updatedBCategory } = newBCategory;
  useEffect(() => {
    if (getBCategoryId !== undefined) {
      dispatch(getaBCategory(getBCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBCategoryId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bcategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBCategoryId !== undefined) {
        const data = { id: getBCategoryId, bcategoryData: values };
        dispatch(updateBCategory(data));
      }else{
        dispatch(createBCategory(values));
      formik.resetForm();
      }
      
    },
  });

  
  useEffect(() => {
    if (isSuccess && createdBCategory) {
      toast.success("Blog Category Added Successfullly!");
    }
    if (isSuccess && updatedBCategory) {
      toast.success("Blog Category Updated Successfullly!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <>
      <h3 className="mb-4 title">{getBCategoryId !== undefined ? "Edit" : "Add"} blog category</h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
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
            {getBCategoryId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </>
  );
};
export default Addblogcat;
