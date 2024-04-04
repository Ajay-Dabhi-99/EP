import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "../../../../Common/Modals/Modal";
import NotificationCouponPopUp from "../../../Popups/NotificationPopup/NotificationCouponPopUp";
import NotificationStepProgressBar from "../../NotificationStepProgressBar";
import {
  increment,
  decrement,
} from "../../../../Common/CommonSlice/notificationstepPogressCountSlice";
import {
  notificationGetone,
  notificationPayNow,
  settingNotification,
  useGetOneDetails,
  useSetting,
} from "./billDetailsSlice";
import { useIntl } from "react-intl";

const NotificationMode = () => {
  const notificationGetOneDetails = useGetOneDetails();
  const settingNotificationDetails = useSetting();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const [
    isNotificationDetailPreviewPopupOpen,
    setIsNotificationDetailPreviewPopupOpen,
  ] = useState(false);
  const [emailCost, setEmailCost] = useState(0);
  const [notificationCost, setNotificationCost] = useState(0);
  const [smsCost, setSmsCost] = useState(0);
  const notificationId = localStorage.getItem("notificationid");
  const [totalNotificationPrice, setTotalNotificationPrice] = useState(0);
  const [totalSmsPrice, setTotalSmsPrice] = useState(0);
  const [totalEmailPrice, setTotalEmailPrice] = useState(0);

  const [handleClose, setHandleClose] = useState(false);

  const billMode = async () => {
    try {
      await dispatch(settingNotification()).unwrap();
      getNotificationData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    billMode();
  }, []);

  const getNotificationData = async () => {
    let payload = { notificationid: notificationId };
    try {
      await dispatch(notificationGetone(payload)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    setEmailCost(
      settingNotificationDetails[0]?.emailcost
        ? settingNotificationDetails[0]?.emailcost
        : 0
    );
    setNotificationCost(
      settingNotificationDetails[0]?.notificationcost
        ? settingNotificationDetails[0]?.notificationcost
        : 0
    );
    setSmsCost(
      settingNotificationDetails[0]?.smscost
        ? settingNotificationDetails[0]?.smscost
        : 0
    );

    setTotalNotificationPrice(
      notificationGetOneDetails?.is_notification === true && notificationGetOneDetails?.numberofusers
        ? notificationCost * notificationGetOneDetails?.numberofusers
        : 0
    );
    setTotalSmsPrice(
      notificationGetOneDetails?.is_sms === true && notificationGetOneDetails?.numberofusers
        ? smsCost * notificationGetOneDetails?.numberofusers
        : 0
    );
    setTotalEmailPrice(
      notificationGetOneDetails?.is_email === true && notificationGetOneDetails?.numberofusers
        ? emailCost * notificationGetOneDetails?.numberofusers
        : 0
    );
  }, [notificationGetOneDetails, settingNotificationDetails]);

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };
  const clickNextHandler = async () => {
    const payload = {
      notificationid: notificationId,
      notification_amt: totalNotificationPrice,
      sms_amt: totalSmsPrice,
      email_amt: totalEmailPrice,
      discount_coupon: 0,
      total: totalNotificationPrice + totalSmsPrice + totalEmailPrice,
    };
    try {
      await dispatch(notificationPayNow(payload)).unwrap();
      dispatch(increment());
      navigate("../notificationpayment");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="">
        <div className="wrapper min-h-full">
          {/* <!-- title-holder  -->/ */}
          <div className="flex justify-between items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={clickBackHander}
            >
              <i className="icon-back-arrow mr-4 text-2xl"></i>
              <h1>{intl.formatMessage({ id: "PROMOTE" })}</h1>
            </div>
          </div>
          <br />
          <NotificationStepProgressBar />
          <br />
          <h3>{intl.formatMessage({ id: "BILL DETAILS" })}</h3>
          <div className="bg-white rounded p-8 mt-6 space-y-5">
            {notificationGetOneDetails?.is_notification &&
              notificationGetOneDetails?.is_notification === true ? (
              <div className="flex items-start">
                <i className="w-8 icon-bell text-2xl mr-5"></i>
                <div className="w-full flex justify-between">
                  <div className="">
                    <p className="text-base text-japaneseIndigo font-bold">
                      {intl.formatMessage({ id: "NOTIFICATIONS" })}
                    </p>
                    <span className="text-sm text-gray-300 font-normal">
                      {notificationGetOneDetails?.numberofusers} {intl.formatMessage({ id: "USERS" })} x{" "}
                      {notificationCost} ₹
                    </span>
                  </div>
                  <div className="flex items-center text-2xl text-japaneseIndigo">
                    <i className="icon-rs rs-black text-base mr-3"></i>
                    {totalNotificationPrice}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {notificationGetOneDetails?.is_sms &&
              notificationGetOneDetails?.is_sms === true ? (
              <div className="flex items-start">
                <i className="w-8 icon-fill-massage text-2xl mr-5"></i>
                <div className="w-full flex justify-between">
                  <div className="">
                    <p className="text-base text-japaneseIndigo font-bold">
                      {intl.formatMessage({ id: "SMS" })}
                    </p>
                    <span className="text-sm text-gray-300 font-normal">
                      {notificationGetOneDetails?.numberofusers}{intl.formatMessage({ id: "PHONE NUMBER" })} x{" "}
                      {smsCost} ₹
                    </span>
                  </div>
                  <div className="flex items-center text-2xl text-japaneseIndigo">
                    <i className="icon-rs rs-black text-base mr-3"></i>
                    {totalSmsPrice}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {notificationGetOneDetails?.is_email &&
              notificationGetOneDetails?.is_email === true ? (
              <div className="flex items-start">
                <i className="w-8 icon-email text-2xl mr-5"></i>
                <div className="w-full flex justify-between">
                  <div className="">
                    <p className="text-base text-japaneseIndigo font-bold">
                      {intl.formatMessage({ id: "EMAIL" })}
                    </p>
                    <span className="text-sm text-gray-300 font-normal">
                      {notificationGetOneDetails?.numberofusers} {intl.formatMessage({ id: "EMAIL ID" })}x{" "}
                      {emailCost} ₹
                    </span>
                  </div>
                  <div className="flex items-center text-2xl text-japaneseIndigo">
                    <i className="icon-rs rs-black text-base mr-3"></i>
                    {totalEmailPrice}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* Discount Apply Text */}
            <div className="flex items-start">
              <div className="w-full flex justify-between">
                <span className="text-xl font-bold text-[#FE4D5F] capitalize">
                  {intl.formatMessage({ id: "DISCOUNT SAVINGS" })}
                </span>
                <div className="flex items-center text-2xl text-[#FE4D5F]">
                  - ₹ 30
                </div>
              </div>
            </div>
            <span className="block border-b-2 border-dashed border-gray-300"></span>
            <div className="flex justify-between capitalize">
              <h1>{intl.formatMessage({ id: "TOTAL" })}</h1>
              <h2>
                <i className="icon-rs rs-black text-lg"></i> {totalNotificationPrice + totalSmsPrice + totalEmailPrice}
              </h2>
            </div>
          </div>
          {/* Before Apply Discount  */}
          <div className="mt-5">
            <h3 className="text-xl font-bold pb-3">{intl.formatMessage({ id: "DISCOUNT COUPON" })}</h3>
            <div className="bg-white p-[30px] rounded-md">
              <div className="flex w-full justify-between items-center">
                <div className="w-full">
                  <div className="flex justify-between items-center pl-4 max-[600px]:flex-col max-[600px]:pl-0">
                    <div className="flex">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.28873 13.0659C6.74029 13.0659 6.27734 13.67 6.27734 14.3842C6.27734 15.0991 6.74023 15.7032 7.28873 15.7032C7.83717 15.7032 8.30064 15.0991 8.30064 14.3842C8.30064 13.67 7.83717 13.0659 7.28873 13.0659Z"
                          fill="#20C0E8"
                        />
                        <path
                          d="M16.1576 20.0379C15.6092 20.0379 15.1462 20.642 15.1462 21.3568C15.1462 22.0711 15.6091 22.6752 16.1576 22.6752C16.7061 22.6752 17.1696 22.0711 17.1696 21.3568C17.1696 20.642 16.7061 20.0379 16.1576 20.0379Z"
                          fill="#20C0E8"
                        />
                        <path
                          d="M21.9053 9.35687C12.9942 1.15738 13.45 1.47056 12.7416 1.19535C11.7347 0.795975 10.5367 1.0048 9.70922 1.76605L1.45963 9.35687C0.532031 10.21 0 11.4241 0 12.6885V26.1305C0 27.7143 1.28209 29.0034 2.85768 29.0034H20.5066C22.0823 29.0034 23.3643 27.7143 23.3643 26.1305V12.6885C23.3644 11.4241 22.8323 10.21 21.9053 9.35687ZM10.8319 6.47523C10.8852 5.96441 11.3537 5.60166 11.8779 5.70004C12.3792 5.80457 12.6616 6.28562 12.5681 6.73363C12.4688 7.21094 12.0198 7.51498 11.5345 7.42387C11.0711 7.32719 10.7882 6.90613 10.8319 6.47523ZM4.51945 14.3842C4.51945 12.6879 5.7617 11.308 7.28871 11.308C8.81631 11.308 10.0585 12.6879 10.0585 14.3842C10.0585 16.0805 8.81625 17.461 7.28871 17.461C5.7617 17.461 4.51945 16.0805 4.51945 14.3842ZM9.55811 23.7393C8.93701 23.7393 8.50353 23.1025 8.74834 22.52L13.027 12.3223C13.2151 11.8746 13.7301 11.6637 14.1778 11.8518C14.6254 12.0393 14.8358 12.5549 14.6483 13.0026L10.369 23.2002C10.2278 23.5366 9.90205 23.7393 9.55811 23.7393ZM16.1577 24.433C14.6307 24.433 13.3885 23.0532 13.3885 21.3569C13.3885 19.6606 14.6307 18.2801 16.1577 18.2801C17.6847 18.2801 18.9275 19.6606 18.9275 21.3569C18.9275 23.0532 17.6847 24.433 16.1577 24.433Z"
                          fill="#20C0E8"
                        />
                        <path
                          d="M29.7793 19.0096C26.9176 10.6791 25.3281 6.04736 25.3056 5.99474C24.8081 4.84279 23.8412 3.94689 22.6541 3.53732C22.586 3.51417 22.9879 3.61179 16.6135 2.09943L23.0948 8.0631C24.3832 9.24786 25.1222 10.9336 25.1222 12.6885V24.0791L28.284 22.7256C29.7143 22.1068 30.3793 20.4457 29.7793 19.0096Z"
                          fill="#20C0E8"
                        />
                      </svg>
                      <div className="ml-4">
                        <div className="text-base font-bold">{intl.formatMessage({ id: "APPLY COUPONS" })}</div>
                        <p className="text-sm font-normal text-[#9BA0A8]">
                          {intl.formatMessage({ id: "THERE IS BEST OFFER FOR YOU PLEASE CHECK" })}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-base btn-primary whitespace-nowrap uppercase max-[600px]:mt-3"
                      onClick={() =>
                        setIsNotificationDetailPreviewPopupOpen(true)
                      }
                    >
                      {intl.formatMessage({ id: "APPLY CODE" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* After Discount  */}
          {/* <div className="mt-5">
            <h3 className="text-xl font-bold pb-3">{intl.formatMessage({ id: "DISCOUNT COUPON" })}
            </h3>
            <div className="bg-[#E9FBF7] p-[30px] rounded-md border-[#13E1B0] border">
              <div className="flex w-full justify-between items-center">
                <div className="w-full">
                  <div className="flex justify-between items-center pl-4">
                    <div className="ml-4">
                      <div className="text-xl text-[#13E1B0] font-bold">{intl.formatMessage({ id: "COUPON APPLIED  -  YOU SAVED ₹30" })}</div>
                      <p className="text-sm font-normal text-[#A6A6A6] pt-2">{intl.formatMessage({ id: "COUPON CODE" })} : <span>5489off</span></p>
                    </div>
                    <button type="button">
                      <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2812 20.2656C15.7989 20.2656 16.2188 19.8458 16.2188 19.3281V9.95312C16.2188 9.43544 15.7989 9.01562 15.2812 9.01562C14.7636 9.01562 14.3438 9.43544 14.3438 9.95312V19.3281C14.3438 19.8458 14.7636 20.2656 15.2812 20.2656Z" fill="#FE4D5F" />
                        <path d="M8.71875 20.2656C9.23644 20.2656 9.65625 19.8458 9.65625 19.3281V9.95312C9.65625 9.43544 9.23644 9.01562 8.71875 9.01562C8.20106 9.01562 7.78125 9.43544 7.78125 9.95312V19.3281C7.78125 19.8458 8.20106 20.2656 8.71875 20.2656Z" fill="#FE4D5F" />
                        <path d="M15.75 1.98438C16.2677 1.98438 16.6875 1.56456 16.6875 1.04688C16.6875 0.529187 16.2677 0.109375 15.75 0.109375H8.25C7.73231 0.109375 7.3125 0.529187 7.3125 1.04688C7.3125 1.56456 7.73231 1.98438 8.25 1.98438H15.75Z" fill="#FE4D5F" />
                        <path d="M1.6875 2.92188C1.16981 2.92188 0.75 3.34169 0.75 3.85938C0.75 4.37706 1.16981 4.79688 1.6875 4.79688H2.625V22.0469C2.625 24.1655 4.35 25.8906 6.46875 25.8906H17.5312C19.6499 25.8906 21.375 24.1656 21.375 22.0469V4.79688H22.3125C22.8302 4.79688 23.25 4.37706 23.25 3.85938C23.25 3.34169 22.8302 2.92188 22.3125 2.92188H20.4375H3.5625H1.6875ZM19.5 4.79688V22.0469C19.5 23.1344 18.6187 24.0156 17.5312 24.0156H6.46875C5.38125 24.0156 4.5 23.1344 4.5 22.0469V4.79688H19.5Z" fill="#FE4D5F" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
          <br />
          <button
            type="button"
            className="btn-primary w-full uppercase"
            onClick={clickNextHandler}
          >
            <h3>{intl.formatMessage({ id: "PAY NOW" })}</h3>
          </button>
          <div className="prw-next-btn mt-auto">
            <button
              type="button"
              className="flex items-center"
              onClick={clickBackHander}
            >
              <i className="icon-back-arrow mr-3"></i>
              <h3>{intl.formatMessage({ id: "BACK" })}</h3>
            </button>
            <button
              type="button"
              className="flex items-center active"
              onClick={clickNextHandler}
            >
              <h3>{intl.formatMessage({ id: "NEXT" })}</h3>
              <i className="icon-next-arrow ml-3"></i>
            </button>
          </div>
        </div>
        <Modal isOpen={isNotificationDetailPreviewPopupOpen}>
          <NotificationCouponPopUp
            handleClose={setIsNotificationDetailPreviewPopupOpen}
          />
        </Modal>
      </div>
    </>
  );
};

export default NotificationMode;
