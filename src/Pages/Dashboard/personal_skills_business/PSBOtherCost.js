import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import StepProgressBar from "../StepProgressBar";
import { baseUrl } from "../../../api/baseUrl";
import { decrement, increment } from "../../../Common/CommonSlice/stepProgressCountSlice";
import { otherCost, othercostId } from "../eventSlice";
import { useIntl } from "react-intl";
import ToolTips from "../../ToolTips";
import { MoonLoader } from "react-spinners";

const PSBOtherCost = () => {
  const intl = useIntl();
  const displayName = localStorage.getItem("displayName");
  const navigate = useNavigate();
  const params = useParams();
  const eventType = params.eventType;
  const eventId = localStorage.getItem("eventId");
  const dispatch = useDispatch();
  const [travelCost, setTravelCost] = useState("");
  const [travelCostOn, setTravelCostOn] = useState(false);
  const [accommodation, setAccommodation] = useState("");
  const [accommodationOn, setAccommodationOn] = useState(false);
  const [food, setFood] = useState("");
  const [foodOn, setFoodOn] = useState(false);
  const [loading, setLoading] = useState(true);

  const clickNextHandler = async () => {
    const payload = {
      eventid: eventId,
      othercost: [
        {
          travel_cost: travelCostOn,
          details: travelCost,
        },
        {
          accommodation: accommodationOn,
          details: accommodation,
        },
        {
          food: foodOn,
          details: food,
        },
      ],
    };
    try {
      const response = await dispatch(otherCost(payload)).unwrap()

      if (response.data.IsSuccess) {
        console.log("OtherCode", response);
        dispatch(increment());
        navigate(`../companydetails`);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const getOtherCost = async () => {
    try {
      const response = await dispatch(othercostId(eventId)).unwrap()
      setLoading(false);
      if (response.data.Data.othercost) {
        console.log(response.data);
        setTravelCost(response.data.Data.othercost[0]?.details);
        setTravelCostOn(response.data.Data.othercost[0]?.travel_cost);
        setAccommodation(response.data.Data.othercost[1]?.details);
        setAccommodationOn(response.data.Data.othercost[1]?.accommodation);
        setFood(response.data.Data.othercost[2]?.details);
        setFoodOn(response.data.Data.othercost[2]?.food);
      }
      if (!response.data.IsSuccess) {
        toast.error(`${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOtherCost();
  }, []);

  return (
    <div className="wrapper min-h-full flex flex-col">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i className="icon-back-arrow mr-4 text-2xl"></i>
            <h1>{displayName}</h1>
          </div>
        </div>
        {/* <!-- step-progress-bar  --> */}
        <StepProgressBar eventType={eventType} />
        {/* <!-- main-content  --> */}
        {loading ?
          <MoonLoader
            cssOverride={{ margin: "100px auto" }}
            color={"#20c0E8"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :
          <div className="space-y-5 pt-5">
            <div className="flex justify-between items-center space-x-5">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="flex justify-start items-center">
                  <h3>{intl.formatMessage({ id: "TRAVEL COST" })}</h3>&nbsp;
                  <svg class="w-5 h-5 tooltip" data-pr-tooltip={intl.formatMessage({ id: "INCLUDE IF YOU WANT TRAVEL EXPENSES FROM YOUR CLIENTS" })}
                    data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div className="bg-white shadow rounded-md mt-5">
                  <div className="flex items-center bg-brightGray px-8 py-3">
                    <input
                      type="checkbox"
                      id="on"
                      className="switch mx-3 order-2"
                      checked={travelCostOn}
                      onChange={() => setTravelCostOn(!travelCostOn)}
                    />
                    <span className="off text-base font-bold anim order-1 text-caribbeanGreen">
                      {intl.formatMessage({ id: "EXCLUDE" })}
                    </span>
                    <span className="on text-base font-bold anim order-3">
                      {intl.formatMessage({ id: "INCLUDE" })}
                    </span>
                  </div>
                  <div className="w-full px-8 py-5">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="outline-none flex items-center w-full bg-white rounded-md resize-none"
                      placeholder={intl.formatMessage({ id: "ENTER DETAILS..." })}
                      value={travelCost}
                      onChange={(e) => setTravelCost(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="flex justify-start items-center">
                  <h3>{intl.formatMessage({ id: "ACCOMMODATION COST" })}</h3>&nbsp;
                  <svg class="w-5 h-5 tooltip" data-pr-tooltip={intl.formatMessage({ id: "INCLUDE IF YOU WANT ACCOMMODATION EXPENSES FROM YOUR CLIENTS" })}
                    data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>


                </div>
                <div className="bg-white shadow rounded-md mt-5">
                  <div className="flex items-center bg-brightGray px-8 py-3">
                    <input
                      type="checkbox"
                      id="on"
                      className="switch mx-3 order-2"
                      checked={accommodationOn}
                      onChange={() => setAccommodationOn(!accommodationOn)}
                    />
                    <span className="off text-base font-bold anim order-1 text-caribbeanGreen">
                      {intl.formatMessage({ id: "EXCLUDE" })}
                    </span>
                    <span className="on text-base font-bold anim order-3">
                      {intl.formatMessage({ id: "INCLUDE" })}
                    </span>
                  </div>
                  <div className="w-full px-8 py-5">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="outline-none flex items-center w-full bg-white rounded-md resize-none"
                      placeholder={intl.formatMessage({ id: "ENTER DETAILS..." })}
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="flex justify-start items-center">
                  <h3>{intl.formatMessage({ id: "FOOD COST" })}</h3>&nbsp;
                  <svg class="w-5 h-5 tooltip" data-pr-tooltip={intl.formatMessage({ id: "INCLUDE IF YOU WANT FOOD EXPENSES FROM YOUR CLIENTS" })}
                    data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div className="bg-white shadow rounded-md mt-5">
                  <div className="flex items-center bg-brightGray px-8 py-3">
                    <input
                      type="checkbox"
                      id="on"
                      className="switch mx-3 order-2"
                      checked={foodOn}
                      onChange={() => setFoodOn(!foodOn)}
                    />
                    <span className="off text-base font-bold anim order-1 text-caribbeanGreen">
                      {intl.formatMessage({ id: "EXCLUDE" })}
                    </span>
                    <span className="on text-base font-bold anim order-3">
                      {intl.formatMessage({ id: "INCLUDE" })}
                    </span>
                  </div>
                  <div className="w-full px-8 py-5">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="outline-none flex items-center w-full bg-white rounded-md resize-none"
                      placeholder={intl.formatMessage({ id: "ENTER DETAILS..." })}
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* <!-- advisement --> */}
        {/* <Advertisement /> */}
      </div>
      <div className={"prw-next-btn mt-auto " + (loading ? "hidden" : '')}>
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
      <ToolTips />
    </div>
  );
}

export default PSBOtherCost;
