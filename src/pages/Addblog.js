import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Addblog = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (value) => {
    setDesc(value);
  };
  return (
    <>
      <h3 className="mb-4 title">Add blog</h3>
      <div className="">
        <form action="">
          <CustomInput type="text" label="Enter Blog Title" />
          <select className="form-control py-3 mb-3">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill theme="snow" value={desc} onChange={handleDesc} />
          <div className="my-3">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          </div>
          <button className="btn btn-success border-0 rounded-3 my-3">
            Add Blog
          </button>
        </form>
      </div>
    </>
  );
};
export default Addblog;
