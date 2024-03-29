import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getCoupons,
  deleteCoupon,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setCouponId(e);
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
      title: "Expiry",
      dataIndex: "expiry",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      action: (
        <>
          <Link
            className="fs-3 text-danger"
            to={`/admin/coupon/${couponState[i]._id}`}
          >
            <BiEdit />
          </Link>{" "}
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delCoupon = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };
  return (
    <>
      <h3 className="mb-4 title">Coupon list</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delCoupon(couponId);
        }}
        title="Are you sure you want to delete this coupon"
      />
    </>
  );
};

export default Couponlist;
