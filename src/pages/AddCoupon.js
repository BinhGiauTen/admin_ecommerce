import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  resetState,
  getaCoupon,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  expiry: yup.string().required("Expiry is Required"),
  discount: yup.number().required("Discount is Required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponData,
    updatedCoupon,
  } = newCoupon;
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getaCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponData?.name || "",
      expiry: couponData?.expiry || "",
      discount: couponData?.discount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Coupon expiry"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Coupon discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCoupon;
