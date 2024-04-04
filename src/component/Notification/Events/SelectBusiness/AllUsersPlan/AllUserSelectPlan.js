import React from "react";
import celebrationSvg from "../../../../../assest/svg/celebration.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { increment, decrement } from "../../../../../Common/CommonSlice/notificationstepPogressCountSlice";
import NotificationStepProgressBar from "../../../NotificationStepProgressBar"; 
import { useIntl } from "react-intl";

const AllUserSelectPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();

  const clickNextHandler = () => {
    dispatch(increment());
    navigate("../publishdatetime");
  }

  const clickBackHander = () => {
    dispatch(decrement());
    localStorage.removeItem("usertype")
    navigate(-1);
  }
  return (
    <div>
      <div className="wrapper min-h-full">
        {/* <!-- title-holder  -->/ */}
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={clickBackHander}><i className="icon-back-arrow mr-4 text-2xl"></i>
            <h1>{intl.formatMessage({id: "PROMOTE"})}</h1>
          </div>
        </div>
        <br />
        <NotificationStepProgressBar />
        <br />
        {/* <!-- select user card  --> */}
        <div className="">
          <h3>{intl.formatMessage({id: "SELECT USER PLAN"})}</h3>
          <div className="flex justify-between space-x-5 items-center py-5 max-[820px]:flex-col max-[820px]:space-x-0">
            {/* <UserPlanCard totalUser={999} notificationCount={69} smsCount={399} emailCount={89} allCount={475} colorFrom={"#13e1b094"} colorTo={"#13E1B0"} />
          <UserPlanCard totalUser={9999} notificationCount={69} smsCount={399} emailCount={89} allCount={475} />
          <UserPlanCard totalUser={99999} notificationCount={69} smsCount={399} emailCount={89} allCount={475} /> */}

            <div className="w-1/3 max-[820px]:w-[80%]  max-[600px]:w-full">
              <div className="bg-gradient-to-r from-[#13e1b094] to-[#13E1B0] p-5 rounded-xl relative overflow-hidden">
                <div className="absolute -left-3 -bottom-3">
                  <img src={celebrationSvg} alt="celebration" />
                </div>
                <label htmlFor="user-999" className="relative">
                  <div className="flex items-center">
                    <div className="radio">
                      <input className="radio" type="radio" name="radio-card" id="user-999" />
                      <i className="icon-right"></i>
                    </div>
                    <span className="text-xl font-normal text-white ml-5">{intl.formatMessage({ id: "FOR 999 USERS" })}</span>
                  </div>
                  <div className="pt-7 space-y-3">
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({id: "NOTIFICATION"})}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "69 FOR 999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "SMS" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "399 FOR 999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "EMAIL" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "89 FOR 999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "ALL" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "475 FOR 999 USERS" })}</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="w-1/3 max-[820px]:w-[80%] mt-3 max-[600px]:w-full">
              <div className="bg-gradient-to-r from-[#20c0e878] to-[#20C0E8] p-5 rounded-xl relative overflow-hidden">
                <div className="absolute -left-3 -bottom-3">
                  <img src={celebrationSvg} alt="celebration" />
                </div>
                <label htmlFor="user-9999" className="relative">
                  <div className="flex items-center">
                    <div className="radio">
                      <input className="radio" type="radio" name="radio-card" id="user-9999" checked />
                      <i className="icon-right"></i>
                    </div>
                    <span className="text-xl font-normal text-white ml-5">{intl.formatMessage({ id: "FOR 9999 USERS" })}</span>
                  </div>
                  <div className="pt-7 space-y-3">
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({id: "NOTIFICATION"})}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "299 FOR 9999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "SMS" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "1999 FOR 9999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "EMAIL" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "8399 FOR 9999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "ALL" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "2299 FOR 9999 USERS" })}</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="w-1/3 max-[820px]:w-[80%] mt-4 max-[600px]:w-full">
              <div className="bg-gradient-to-r from-[#faba1585] to-[#FABA15] p-5 rounded-xl relative overflow-hidden">
                <div className="absolute -left-3 -bottom-3">
                  <img src={celebrationSvg} alt="celebration" />
                </div>
                <label htmlFor="user-99999" className="relative">
                  <div className="flex items-center">
                    <div className="radio">
                      <input className="radio" type="radio" name="radio-card" id="user-99999" />
                      <i className="icon-right"></i>
                    </div>
                    <span className="text-xl font-normal text-white ml-5">{intl.formatMessage({ id: "FOR 99999 USERS" })}</span>
                  </div>
                  <div className="card-content pt-7 space-y-3">
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({id: "NOTIFICATION"})}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "1799 FOR 99999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "SMS" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "16999 FOR 99999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "EMAIL" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "3399 FOR 99999 USERS" })}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "ALL" })}</span>
                      <span className="text-sm text-japaneseIndigo font-bold">{intl.formatMessage({ id: "475 FOR 99999 USERS" })}</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>
        {/* <!-- dashed border   --> */}
        <h2 className="border-t-2 border-gray-400 border-dashed text-center relative my-10">
          <small className="text-japaneseIndigo py-1 px-10 absolute -mt-5 bg-brightGray">
          {intl.formatMessage({ id: "OR" })}
          </small>
        </h2>
        {/* <!-- main-content  --> */}
        <div>
          <div className="flex items-end justify-between  max-[600px]:items-start max-[600px]:flex-col">
            <div className="w-1/2 max-[600px]:w-full">
              <h3 className="pb-3">{intl.formatMessage({ id: "SELECT ALL APP USER" })}</h3>
              <select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-[18px] relative arrow option">
                <option>{intl.formatMessage({ id: "SELECT ALL" })}</option>
                <option>{intl.formatMessage({ id: "1" })}</option>
                <option>{intl.formatMessage({ id: "2" })}</option>
              </select>
            </div>
            <div className="bg-white p-[18px] rounded-md max-[600px]:w-full max-[600px]:mt-3">
              <span className="text-base font-bold text-japaneseIndigo">
              {intl.formatMessage({ id: "TOTAL USER : 10000" })}
              </span>
            </div>
          </div>
          <div className="flex pt-7">
            <div className="w-1/2 max-[600px]:w-full">
              <h3 className="pb-3">{intl.formatMessage({ id: "ADS PUBLISH LOCATION" })}</h3>
              <select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-[18px] relative location option max-[600px]:w-full">
                <option>{intl.formatMessage({ id: "SURAT" })}</option>
                <option>{intl.formatMessage({ id: "RAJKOT" })}</option>
                <option>{intl.formatMessage({ id: "AHMADABAD" })}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="prw-next-btn mt-auto">
          <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
          <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>{intl.formatMessage({ id: "NEXT" })}</h3><i className="icon-next-arrow ml-3"></i></button>
        </div>
      </div>

    </div>
  );
}

export default AllUserSelectPlan;