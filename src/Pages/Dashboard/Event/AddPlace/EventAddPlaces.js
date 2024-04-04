import React, { useEffect, useState } from "react";
import EventAddPlacesEventList from "../EventAddPlacesEventList";
import { useNavigate, useParams } from "react-router-dom";
import StepProgressBar from "../../StepProgressBar";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
} from "../../../../Common/CommonSlice/stepProgressCountSlice";
import { toast, ToastContainer } from "react-toastify";
import { addPlaces, useAddPlaces } from "./eventAddPlaceSlice";
import { useIntl } from "react-intl";
import { MoonLoader } from "react-spinners";

const EventAddPlaces = () => {
  const intl = useIntl();
  const addPlace = useAddPlaces();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const eventType = params.eventType;
  const [newEvent, setNewEvent] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const eventId = localStorage.getItem("eventId");
  const displayName = localStorage.getItem("displayName");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const getAddedEvent = async () => {
    try {
      const response = await dispatch(addPlaces(eventId)).unwrap();
      console.log(response, "response");
      if (!response.data.IsSuccess) {
        toast.error(
          `${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`
        );
        setNewEvent(response?.data?.Data);
        setCategoryName(addPlace?.event_category?.category_name);
      }
      localStorage.setItem(
        "isFormSubmitted",
        response.data.Data.isFormSubmitted
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddedEvent();
  }, [reload]);

  useEffect(() => {
    setNewEvent(addPlace);
    setCategoryName(addPlace?.event_category?.category_name);
  }, [addPlace]);

  const clickNextHandler = () => {
    dispatch(increment());
    if (eventType === "hyp") navigate(`../aboutplace`);
    else navigate(`../personalinfo`);
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  return (
    //  <!-- Content In -->
    <>
      <div className="wrapper min-h-full flex flex-col">
        <div className="space-y-8 h-full">
          {/* <!-- title-holder  --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i
                className="icon-back-arrow mr-4 text-2xl"
                onClick={clickBackHander}
              ></i>
              <h1>{displayName && displayName !== '' ? displayName : intl.formatMessage({ id: "CREATE NEW" })}</h1>
            </div>
          </div>
          {/* <!-- step-progress-bar  --> */}
          <StepProgressBar eventType={eventType} />
          {/* <!-- main-content  --> */}
          {loading ? (
            <MoonLoader
              cssOverride={{ margin: "100px auto" }}
              color={"#20c0E8"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <div className=" space-y-3">
              <EventAddPlacesEventList
                displayName={newEvent?.display_name}
                categoryName={categoryName}
                eventId={newEvent?._id}
                setReload={setReload}
              />
            </div>
          )}
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
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default EventAddPlaces;
