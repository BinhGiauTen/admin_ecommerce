import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";
import { BiArrowBack } from "react-icons/bi";


const ViewOrder = () => {
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
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
        title: "Color",
        dataIndex: "color",
      },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orderbyuser.products);
  console.log(orderState)
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      count: orderState[i].count,
      price: orderState[i].product.price,
      color: orderState[i].color,
      date: new Date(orderState[i].product.createdAt).toLocaleString(),
      action: (
        <>
          <Link className="ms-2 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <h3 className="mb-4 title">View Order</h3>
        <button className="bg-transpatent border-0 fs-5 mb-0 align-items-center gap-1" onClick={goBack}>
          <BiArrowBack className="fs-5"/>
          Go Back
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default ViewOrder;
