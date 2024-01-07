import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBCategories } from "../features/bcategory/bcategorySlice";
import {
  createBlog,
  resetState,
  getaBlog,
  updateBlog,
} from "../features/blog/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Blog Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  

  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const blogCategoryState = useSelector((state) => state.bCategory.bcategories);
  const blogState = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, blogName, blogDesc, blogCategory, blogImages, updatedBlog } =
    blogState;
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getaBlog(getBlogId));
      img.push(blogImages)
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(getBCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfullly!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
      }
    },
  });
  
  return (
    <>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} blog
      </h3>
      <div className="">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div className=" mb-3">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {blogCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </>
  );
};
export default Addblog;
