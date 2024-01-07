import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getBCategories,
  deleteBCategory,
  resetState,
} from "../features/bcategory/bcategorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [bCategoryId, setBCategoryId] = useState("");
  const showModal = (e) => {
    setBCategoryId(e);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBCategories());
  }, []);
  const bCategoryState = useSelector((state) => state.bCategory.bcategories);
  const data1 = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: bCategoryState[i].title,
      action: (
        <>
          <Link
            className="fs-3 text-danger"
            to={`/admin/blog-category/${bCategoryState[i]._id}`}
          >
            <BiEdit />
          </Link>{" "}
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delBCategory = (e) => {
    dispatch(deleteBCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBCategories());
    }, 100);
  };
  return (
    <>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delBCategory(bCategoryId);
        }}
        title="Are you sure you want to delete this blog category"
      />
    </>
  );
};

export default Blogcatlist;
