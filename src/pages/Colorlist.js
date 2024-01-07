import React, {useEffect, useState} from "react";
import { Table } from "antd";
import { useDispatch,useSelector } from "react-redux";
import { getColors, deleteColor, resetState} from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";


const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setColorId(e);
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
    dispatch(resetState())
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
      data1.push({
        key: i+1,
        title: colorState[i].title,
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/color/${colorState[i]._id}`}
            >
              <BiEdit />
            </Link>{" "}
            <button
              className="ms-2 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(colorState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
  }
  const delColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delColor(colorId);
        }}
        title="Are you sure you want to delete this color"
      />
    </>
  );
};

export default Colorlist;
