import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getaEnquiry, updateEnquiry, resetState } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getEnquiryId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const enquiryState = useSelector((state) => state.enquiry);
  const {
    enquiryName,
    enquiryMobile,
    enquiryEmail,
    enquiryComment,
    enquiryStatus,
  } = enquiryState;
  useEffect(() => {
    dispatch(getaEnquiry(getEnquiryId));
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) =>{
    const data = {id: i, enquiryData: e};
    dispatch(updateEnquiry(data));
    dispatch(resetState())
    setTimeout(() => {
      dispatch(getaEnquiry(getEnquiryId));
    }, 100);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-item-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button className="bg-transpatent border-0 fs-5 mb-0 align-items-center gap-1" onClick={goBack}>
          <BiArrowBack className="fs-5"/>
          Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Name:</h5>
          <p className="mb-0">{enquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Mobile:</h5>
          <p className="mb-0">
            <a href={`tel:${enquiryMobile}`}>{enquiryMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Email:</h5>
          <p className="mb-0">
            <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Comment:</h5>
          <p className="mb-0">{enquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Status:</h5>
          <p className="mb-0">{enquiryStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Change Status:</h5>
          <div>
            <select
              name=""
              defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) =>setEnquiryStatus(e.target.value, getEnquiryId)}
            >
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
