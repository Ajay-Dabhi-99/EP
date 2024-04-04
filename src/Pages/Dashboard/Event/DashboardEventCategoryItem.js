import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { s3Url, baseUrl } from "../../../config";
import { useDispatch } from "react-redux";
import { increment } from "../../../Common/CommonSlice/stepProgressCountSlice";
import bannerPreview from "../../../assest/images/banner-preview.png";
import axios from "axios";
import Modal from "../../../Common/Modals/Modal";
import EventPopUpShareEvent from "../../../component/Popups/EventPopUpShareEvent";
import { liveOneEvents } from "../eventSlice";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import ToolTips from "../../ToolTips";

const DashboardEventCategoryItem = ({ data, getAllEvents, handleClick }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const Star = ({ ratings }) => {
    const numberRating = Number(ratings);
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
      let number = index + 0.5;
      return (
        <span key={index}>
          {numberRating >= index + 1 ? (
            <i className="icon-fillStar text-sm"></i>
          ) : numberRating >= number ? (
            <i className="icon-half-star text-sm"></i>
          ) : (
            <i className="icon-star text-sm"></i>
          )}
        </span>
      );
    });
    return <div>{ratingStar}</div>;
  };

  const [sharePopUpOpen, setSharePopUpOpen] = useState(false);
  const url = "https://eventopackage.com/";
  const params = useParams();
  const eventType = params.eventType;

  const toggleEvent = async (id) => {
    try {
      let payload = {
        eventid: data._id,
      };
      let res = await dispatch(liveOneEvents(payload)).unwrap();
      if (res.data.IsSuccess) {
        toast.success(res.data.Message);
        getAllEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const flat_no = data?.personaldetail?.flat_no + ", ";
  const street = data?.personaldetail?.street + ", ";
  const area = data?.personaldetail?.area + ", ";
  const city = data?.personaldetail?.city + ", ";
  const state = data?.personaldetail?.state + "-";
  const pincode = data?.personaldetail?.pincode;
  return (
    <div className="w-full flex items-center">
      <div className="flex space-x-5 max-[820px]:space-x-0 w-full p-4 max-[820px]:pr-4 pr-7 bg-white rounded max-[820px]:flex-col">
        <div className="max-w-xs h-[200px] w-full">
          <Link
            to={`../event-view/${eventType}`}
            className=""
            onClick={() => {
              localStorage.setItem("eventId", data?._id);
            }}
          >
            <img
              className="object-cover w-full h-full"
              src={
                data &&
                data.aboutplace &&
                data.aboutplace.banner &&
                data.aboutplace.banner != ""
                  ? s3Url + "/" + data.aboutplace.banner
                  : data &&
                    data.personaldetail &&
                    data.personaldetail.banner &&
                    data.personaldetail.banner !== ""
                  ? s3Url + "/" + data.personaldetail.banner
                  : bannerPreview
              }
              alt="images"
            />
          </Link>
        </div>
        <div className="w-full max-[820px]:mt-5">
          <div className="flex justify-between border-b-2 pb-4 max-[820px]:flex-col">
            <div className="capitalize">
              <span className="text-sm text-white bg-spiroDiscoBall px-3 py-1">
                {data?.event_category?.category_name}
              </span>
              <span className="text-sm text-white bg-verified px-3 py-1 ml-2 capitalize">
                {data?.is_approved == true
                  ? intl.formatMessage({ id: "VERIFIED" })
                  : intl.formatMessage({ id: "UNVERIFIED" })}
              </span>
              <h2 className="text-japaneseIndigo pt-5">{data?.display_name}</h2>
              <div className="text-sm text-quicksilver pt-3">
                <i className="icon-fill-location mr-3"></i>
                {/* {data?.capacity?.address}{data?.personaldetail?.area + "," + data?.personaldetail?.city + "," + data?.personaldetail?.state} */}
                {data?.capacity?.address ? (
                  data?.capacity?.address
                ) : (
                  <>
                    {data?.personaldetail?.flat_no ? flat_no : ""}
                    {data?.personaldetail?.street ? street : ""}
                    {data?.personaldetail?.area ? area : ""}
                    {data?.personaldetail?.city ? city : ""}
                    {data?.personaldetail?.state ? state : ""}
                    {data?.personaldetail?.pincode ? pincode : ""}
                  </>
                )}
              </div>
            </div>
            <div className="max-[820px]:flex max-[820px]:justify-between max-[820px]:flex-row-reverse max-[820px]:pt-3">
              <div className="flex items-center justify-end">
                {data?.is_approved == true ? (
                  <input
                    type="checkbox"
                    className="switch mr-3"
                    // defaultChecked={data?.is_live}
                    id="on"
                    checked={data?.is_live}
                    // onClick={() => singleEventlive(data?._id)}
                    onChange={() => toggleEvent(data)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="switch mr-3 opacity-30 "
                    // defaultChecked={data?.is_live}
                    id="on"
                    disabled
                  />
                )}

                <label htmlFor="">
                  <div className="flex justify-start items-center">
                    <h3>{intl.formatMessage({ id: "LIVE" })}</h3>&nbsp;
                    <svg
                      class="w-5 h-5 tooltip"
                      data-pr-tooltip={intl.formatMessage({
                        id: "TO LET USERS VIEW YOUR LISTING SWITCH THIS ON",
                      })}
                      data-pr-position="top"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </label>
              </div>
              {/* <h1 className="pt-7">{parseFloat(data?.).toFixed(2)} INR</h1> */}
              <h1 className="pt-7 max-[820px]:pt-0">
                {/* {data?.aboutplace ?
									<>{data?.aboutplace?.place_price ?
										<>{parseFloat(data?.aboutplace?.place_price).toFixed(2)} INR</> : ""} </> :
									<>{data?.personaldetail?.price ? <> {parseFloat(data?.personaldetail?.price).toFixed(2)} INR</> : ""}
									</>} */}
                {data?.aboutplace?.place_price ? (
                  <>
                    {parseFloat(data?.aboutplace?.place_price).toFixed(2)} INR
                  </>
                ) : data?.personaldetail?.price ? (
                  <> {parseFloat(data?.personaldetail?.price).toFixed(2)} INR</>
                ) : (
                  "0 INR"
                )}
              </h1>
            </div>
          </div>
          <div className="flex justify-between pt-4 max-[820px]:flex-col">
            <div className="flex items-center max-[820px]:flex-col max-[820px]:items-start">
              <div className="flex items-center space-x-1 max-[820px]:space-x-2">
                <Star ratings={data?.ratings} />
                <span className="text-quicksilver text-xs font-bold pl-2">
                  {data?.totalreview} {intl.formatMessage({ id: "RATINGS" })}
                </span>
              </div>
              <div className="flex text-spiroDiscoBall text-xs font-bold ml-6 max-[820px]:ml-0 max-[820px]:pt-2">
                {data?.discounts[0]?.discounttype ===
                "discount_on_total_bill" ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3563 6.99951L13.9705 8.60152C14.0379 8.77826 13.9854 8.97862 13.8375 9.09849L12.5058 10.1782L12.2364 11.8729C12.2066 12.0602 12.0596 12.2063 11.8724 12.236L10.1776 12.5055L9.09883 13.838C8.97983 13.9859 8.7751 14.0384 8.60273 13.971L6.99984 13.3559L5.39783 13.9702C5.22022 14.0384 5.0216 13.9842 4.90174 13.8372L3.82206 12.5046L2.1273 12.2352C1.94094 12.2054 1.79395 12.0584 1.7642 11.8721L1.49472 10.1773L0.162186 9.09762C0.0151959 8.97862 -0.0381755 8.77826 0.0291949 8.60152L0.643403 6.99951L0.0291949 5.39749C-0.0390504 5.22076 0.0151959 5.02039 0.162186 4.9014L1.49472 3.8226L1.7642 2.12784C1.79395 1.94061 1.94006 1.79362 2.1273 1.76387L3.82206 1.49439L4.90174 0.162727C5.0216 0.0139868 5.22197 -0.0385091 5.3987 0.0297362L6.99984 0.643069L8.60186 0.0288609C8.65261 0.00961224 8.7051 -1.04242e-05 8.75847 -1.04242e-05C8.88709 -1.04242e-05 9.01396 0.0568589 9.09883 0.162727L10.1776 1.49439L11.8724 1.76387C12.0596 1.79362 12.2066 1.94061 12.2364 2.12784L12.5058 3.8226L13.8375 4.9014C13.9854 5.02127 14.0379 5.22076 13.9705 5.39749L13.3563 6.99951Z"
                        fill="#20C0E8"
                      />
                      <path
                        d="M5.68741 7.87518C4.96383 7.87518 4.375 8.46401 4.375 9.18759C4.375 9.91117 4.96383 10.5 5.68741 10.5C6.41099 10.5 6.99982 9.91117 6.99982 9.18759C6.99982 8.46401 6.41099 7.87518 5.68741 7.87518ZM5.68741 9.62506C5.44593 9.62506 5.24994 9.42907 5.24994 9.18759C5.24994 8.94611 5.44593 8.75012 5.68741 8.75012C5.92889 8.75012 6.12488 8.94611 6.12488 9.18759C6.12488 9.42907 5.92889 9.62506 5.68741 9.62506Z"
                        fill="#FAFAFA"
                      />
                      <path
                        d="M8.31241 3.50018C7.58883 3.50018 7 4.08901 7 4.81259C7 5.53617 7.58883 6.125 8.31241 6.125C9.03599 6.125 9.62482 5.53617 9.62482 4.81259C9.62482 4.08901 9.03599 3.50018 8.31241 3.50018ZM8.31241 5.25006C8.0718 5.25006 7.87494 5.0532 7.87494 4.81259C7.87494 4.57198 8.0718 4.37512 8.31241 4.37512C8.55302 4.37512 8.74988 4.57198 8.74988 4.81259C8.74988 5.0532 8.55302 5.25006 8.31241 5.25006Z"
                        fill="#FAFAFA"
                      />
                      <path
                        d="M4.81306 3.49999C4.72469 3.49999 4.63632 3.52624 4.55932 3.58136C4.36246 3.72223 4.31697 3.99521 4.45783 4.19207L8.83253 10.3167C8.9734 10.5135 9.24638 10.559 9.44324 10.4181C9.6401 10.2782 9.68472 10.0043 9.54473 9.80831L5.17003 3.68373C5.08341 3.56387 4.94955 3.49999 4.81306 3.49999Z"
                        fill="#FAFAFA"
                      />
                    </svg>{" "}
                    <span className="ml-2 inline-block">
                      {data?.discounts[0]?.discount}{" "}
                      {intl.formatMessage({ id: "OFF ON TOTAL BILL" })}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex space-x-2 max-[820px]:space-x-3 max-[820px]:pt-3">
              <button
                className="bg-brightGray px-2 py-1 text-center rounded tooltip"
                data-pr-tooltip={intl.formatMessage({ id: "EDIT" })}
                data-pr-position="top"
              >
                <Link
                  to={`./addplaces`}
                  onClick={() => {
                    localStorage.setItem("eventId", data?._id);
                    localStorage.setItem("event_type", data?.event_type);
                    localStorage.setItem("isEdit", true);
                    localStorage.setItem("displayName", data?.display_name);
                    dispatch(increment());
                  }}
                >
                  <i
                    className="text-base edit text-black icon-edit"
                    style={{ color: "#000" }}
                  ></i>
                </Link>
              </button>
              <Link to="../../../../notification">
                <button
                  className="bg-brightGray px-2 py-1 text-center rounded tooltip"
                  data-pr-tooltip={intl.formatMessage({ id: "PROMOTIONS" })}
                  data-pr-position="top"
                >
                  <i className="icon-fill-megaphone text-base text-black"></i>
                </button>
              </Link>
              <Link
                to={`./calender-view`}
                onClick={() => {
                  localStorage.setItem("eventId", data?._id);
                  localStorage.setItem("displayName", data?.display_name);
                }}
              >
                <button
                  className="bg-brightGray px-2 py-1 text-center rounded tooltip"
                  data-pr-tooltip={intl.formatMessage({ id: "CALENDER" })}
                  data-pr-position="top"
                >
                  <i className="icon-calendar1 text-base text-black"></i>
                </button>
              </Link>
              <Link
                to={`./discount-view`}
                onClick={() => {
                  localStorage.setItem("eventId", data?._id);
                  localStorage.setItem("displayName", data?.display_name);
                }}
              >
                <button
                  className="bg-brightGray px-2 py-1 text-center rounded tooltip"
                  data-pr-tooltip={intl.formatMessage({ id: "DISCOUNT" })}
                  data-pr-position="top"
                >
                  <i className="icon-percentage text-base text-black"></i>
                </button>
              </Link>
              <button
                onClick={() => setSharePopUpOpen(true)}
                className="bg-brightGray px-2 py-1 text-center rounded tooltip"
                data-pr-tooltip={intl.formatMessage({ id: "SHARE" })}
                data-pr-position="top"
              >
                <i className="icon-share text-base text-black"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={sharePopUpOpen}>
        <EventPopUpShareEvent handleClose={setSharePopUpOpen} url={url} />
      </Modal>
      <ToolTips />
    </div>
  );
};

export default DashboardEventCategoryItem;
