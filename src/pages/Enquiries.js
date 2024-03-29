import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getEnquiries,
  resetState,
  deleteEnquiry,
  updateEnquiry
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setenqId(e);
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select
              name=""
              defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) =>setEnquiryStatus(e.target.value, enquiryState[i]._id)}
            >
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Submitted">Submitted</option>
            </select>
        </>
      ),
      action: (
        <>
          <Link className="ms-2 fs-3 text-danger" to={`/admin/enquiries/${enquiryState[i]._id}`}>
            <AiOutlineEye />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delEnquiry = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  const setEnquiryStatus = (e, i) =>{
    const data = {id: i, enquiryData: e};
    dispatch(updateEnquiry(data));
  }
  return (
    <>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delEnquiry(enqId);
        }}
        title="Are you sure you want to delete this enquiry"
      />
    </>
  );
};

export default Enquiries;
