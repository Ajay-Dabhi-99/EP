import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotificationStepProgressBar from "../../NotificationStepProgressBar";
import { decrement, increment } from "../../../../Common/CommonSlice/notificationstepPogressCountSlice";
import { toast } from "react-toastify";
import { selectUser } from "./userSlice";
import { useIntl } from "react-intl";

function SelectBusinessPromote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [isSelect, setIsSelect] = useState(true);
  const notificationId = localStorage.getItem("notificationid");
  const notificationType = localStorage.getItem("usertype");
  const token = localStorage.getItem("Token");
  const intl = useIntl();
  const header = {
    Authorization: `Token ${token}`,
  };

  const clickNextHandler = async () => {
    try {
      let payload = {
        notificationid: notificationId,
        userType: notificationType,
        numberofusers: user,
        is_selected_all: isSelect,
      };
      const response = await dispatch(selectUser(payload)).unwrap()
      if (response.data.IsSuccess) {
        navigate("../publishdatetime");
        dispatch(increment());
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: `${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`})}`); 
      navigate(`/auth/login`);
      console.log(error);
    }
  };

  function handleAddrTypeChange(e) {
    setUser(e.target.value == "true" ? "" : e.target.value);
    setIsSelect(e.target.value == "true");
  }

  const clickBackHander = () => {
    navigate(-1);
    localStorage.removeItem("usertype")
    dispatch(decrement());
  };
  return (
    <div className="wrapper min-h-full">
      {/* <!-- title-holder  -->/ */}
      <div className="flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={clickBackHander}
        >
          <i className="icon-back-arrow mr-4 text-2xl"></i>
          <h1>{intl.formatMessage({id: "PROMOTE"})}</h1>
        </div>
      </div>
      <br />
      <NotificationStepProgressBar />
      <br />
      <div className="flex items-end justify-between max-[820px]:items-start max-[820px]:flex-col">
        <div className="w-1/2 max-[820px]:w-full">
          <h3 className="pb-3">{intl.formatMessage({id: "SELECT USER"})}</h3>
          <select
            className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-[18px] relative arrow option"
            onChange={(e) => handleAddrTypeChange(e)}
          >
            <option value={true}>{intl.formatMessage({ id: "SELECT ALL" })}</option>
            <option value={100}>{intl.formatMessage({ id: "100" })}</option>
            <option value={200}>{intl.formatMessage({ id: "200" })}</option>
            <option value={300}>{intl.formatMessage({ id: "300" })}</option>
          </select>
        </div>
        <div className="bg-white p-[18px] rounded-md max-[820px]:mt-3 max-[820px]:w-full">
          <span className="text-base font-bold text-japaneseIndigo">
          {intl.formatMessage({id: "TOTAL USER : 500"})}
          </span>
        </div>
      </div>
      <div className="prw-next-btn mt-auto">
        <button
          type="button"
          className="flex items-center"
          onClick={clickBackHander}
        >
          <i className="icon-back-arrow mr-3"></i>
          <h3>{intl.formatMessage({id: "BACK"})}</h3>
        </button>
        <button
          type="button"
          className="flex items-center active"
          onClick={clickNextHandler}
        >
          <h3>{intl.formatMessage({id: "NEXT"})}</h3>
          <i className="icon-next-arrow ml-3"></i>
        </button>
      </div>
    </div>
  );
}

export default SelectBusinessPromote;
