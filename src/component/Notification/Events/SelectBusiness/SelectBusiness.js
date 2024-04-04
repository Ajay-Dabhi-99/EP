import React, { useEffect } from "react";
import cardImage1 from "../../../../assest/svg/have-you-places.svg";
import cardImage2 from "../../../../assest/svg/personal-skills-business.svg";
import cardImage3 from "../../../../assest/svg/group-skils-business.svg";
import cardImage4 from "../../../../assest/svg/all-user.svg";
import cardImage5 from "../../../../assest/svg/existing-user.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { increment } from '../../../../Common/CommonSlice/notificationstepPogressCountSlice';
import NotificationStepProgressBar from "../../NotificationStepProgressBar";
import { toast } from 'react-toastify';
import { businessSelected } from "./selectBusinessSlice";
import { useIntl } from "react-intl";

const SelectBusiness = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const notificationId = localStorage.getItem("notificationid");
  const clickBackHander = () => {
    navigate(-1);
  }

  const nHyp = async () => {
    const payload = { notificationid: notificationId, usertype: "haveyouplace" };
    try {
      const response = dispatch(businessSelected(payload)).unwrap()
      console.log(response);
      dispatch(increment());
      localStorage.setItem("usertype", "haveyouplace")
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }

  }
  const nPsb = async () => {
    const payload = { notificationid: notificationId, usertype: "personalskillsbusiness" };
    try {
      const response = dispatch(businessSelected(payload)).unwrap()
      console.log(response);
      dispatch(increment());
      localStorage.setItem("usertype", "personalskillsbusiness")
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  }
  const nGsb = async () => {
    const payload = { notificationid: notificationId, usertype: "groupskillsbusiness" };
    try {
      const response = dispatch(businessSelected(payload)).unwrap()
      console.log(response);
      dispatch(increment());
      localStorage.setItem("usertype", "groupskillsbusiness")
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  }
  const nAlluser = async () => {
    const payload = { notificationid: notificationId, usertype: "allusers" };
    try {
      const response = dispatch(businessSelected(payload)).unwrap()
      console.log(response);
      dispatch(increment());
      localStorage.setItem("usertype", "allusers")
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  }
  const nExisting = async () => {
    const payload = { notificationid: notificationId, usertype: "existingusers" };
    try {
      const response = await dispatch(businessSelected(payload)).unwrap()
      console.log(response);
      dispatch(increment());
      localStorage.setItem("usertype", "existingusers")
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  }

  return (
    <div className="wrapper min-h-full">
      {/* <!-- title-holder  -->/ */}
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={clickBackHander}><i className="icon-back-arrow mr-4 text-2xl"></i>
          <h1>{intl.formatMessage({id: "PROMOTE"})}</h1>
        </div>
      </div>
      <br />
      {/* <StepProgressBar /> */}
      <NotificationStepProgressBar />
      <br />
      <div className="flex flex-wrap justify-center pt-4 -mx-4 ax-[640px]:mflex-col ax-[640px]:items-center">
        {/* Have you Places */}
        <Link to="nhyp/selectbusinesspromote" onClick={nHyp} className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group max-[640px]:w-[90%]">
          <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall" >
            <div className="w-32 h-32">
              <img
                src={cardImage1}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap truncate w-full">
            {intl.formatMessage({ id: "PLACES" })}
            </p>
          </div>
        </Link>
        {/* Personal Skills Business */}
        <Link to="npsb/selectbusinesspromote" onClick={nPsb} className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group max-[640px]:w-[90%]">
          <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
            <div className="w-32 h-32">
              <img
                src={cardImage2}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap truncate w-full">
            {intl.formatMessage({ id: "PERSONAL SKILLS" })}
            </p>
          </div>
        </Link>
        {/* Group Skils Business */}
        <Link to="ngsb/selectbusinesspromote" onClick={nGsb} className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group max-[640px]:w-[90%]">
          <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
            <div className="w-32 h-32">
              <img
                src={cardImage3}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap truncate w-full">
            {intl.formatMessage({ id: "GROUP SKILLS" })}
            </p>
          </div>
        </Link>
        {/* All User */}
        <Link to="nalluser/alluserpalns" onClick={nAlluser} className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group max-[640px]:w-[90%]">
          <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
            <div className="w-32 h-32">
              <img
                src={cardImage4}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap truncate w-full">
            {intl.formatMessage({ id: "ALL USER" })}
            </p>
          </div>
        </Link>
        {/* Existing User */}
        <Link to="nexistinguser/existinguserpromote" onClick={nExisting} className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group max-[640px]:w-[90%]">
          <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
            <div className="w-32 h-32">
              <img
                src={cardImage5}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap truncate w-full">
            {intl.formatMessage({ id: "EXISTING USER" })}
            </p>
          </div>
        </Link>
      </div>
    </div >
  );
}

export default SelectBusiness;