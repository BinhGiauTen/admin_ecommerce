import React, {useEffect, useState} from "react";
import { Table } from "antd";
import { useDispatch,useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getPCategories, deletePCategory, resetState } from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setCategoryId(e);
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
    dispatch(getPCategories());
  }, []);
  const pCategoryState = useSelector((state) => state.category.categories);
  const data1 = [];
  for (let i = 0; i < pCategoryState.length; i++) {
      data1.push({
        key: i+1,
        title: pCategoryState[i].title,
        action: (
          <>
            <Link className="fs-3 text-danger" to={`/admin/category/${pCategoryState[i]._id}`}>
              <BiEdit />
            </Link>{" "}
            <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
          </>
        ),
      });
  }
  const delCategory = (e) => {
    dispatch(deletePCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getPCategories());
    }, 100);
  };
  return (
    <>
      <h3 className="mb-4 title">Category list</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delCategory(categoryId);
        }}
        title="Are you sure you want to delete this category"
      />
    </>
  );
};

export default Categorylist;
