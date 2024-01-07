import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

const Orders = () => {
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
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Amount",
      dataIndex: "amount",
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: `${orderState[i].orderby.firstname} ${orderState[i].orderby.lastname}`,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].paymentIntent.amout,
      date: new Date(orderState[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default Orders;
