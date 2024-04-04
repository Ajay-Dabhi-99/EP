import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import {
  clickNum,
  setNumber,
} from "../../Common/CommonSlice/stepProgressCountSlice";
import { useNavigate, useParams } from "react-router-dom";

function StepProgressBar({ eventType }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const param = useParams();
  const navigate = useNavigate();

  const placesProgressBarList = [
    `${intl.formatMessage({ id: "ADD PLACE" })}`,
    `${intl.formatMessage({ id: "ABOUT PLACE" })}`,
    `${intl.formatMessage({ id: "LOCATION" })}`,
    `${intl.formatMessage({ id: "PHOTOS & VIDEOS" })}`,
    `${intl.formatMessage({ id: "ADD SERVICE" })}`,
    `${intl.formatMessage({ id: "PERSONAL DETAILS" })}`,
    `${intl.formatMessage({ id: "COMPANY DETAILS" })}`,
    `${intl.formatMessage({ id: "TERMS & CONDITIONS" })}`,
    `${intl.formatMessage({ id: "DISCOUNT" })}`,
    `${intl.formatMessage({ id: "CALENDAR" })}`,
  ];

  const personalSkillProgressVBarList = [
    `${intl.formatMessage({ id: "SELECT SKILL" })}`,
    `${intl.formatMessage({ id: "PERSONAL DETAILS" })}`,
    `${intl.formatMessage({ id: "PHOTOS & VIDEOS" })}`,
    `${intl.formatMessage({ id: "EQUIPMENT" })}`,
    `${intl.formatMessage({ id: "OTHER COST" })}`,
    `${intl.formatMessage({ id: "COMPANY DETAILS" })}`,
    `${intl.formatMessage({ id: "TERMS & CONDITIONS" })}`,
    `${intl.formatMessage({ id: "DISCOUNT" })}`,
    `${intl.formatMessage({ id: "CALENDAR" })}`,
  ];

  const groupSkillProgressBarList = [
    `${intl.formatMessage({ id: "SELECT SKILL" })}`,
    `${intl.formatMessage({ id: "PERSONAL DETAILS" })}`,
    `${intl.formatMessage({ id: "PHOTOS & VIDEOS" })}`,
    `${intl.formatMessage({ id: "ADD ITEM" })}`,
    `${intl.formatMessage({ id: "EQUIPMENT" })}`,
    `${intl.formatMessage({ id: "OTHER COST" })}`,
    `${intl.formatMessage({ id: "COMPANY DETAILS" })}`,
    `${intl.formatMessage({ id: "TERMS & CONDITIONS" })}`,
    `${intl.formatMessage({ id: "DISCOUNT" })}`,
    `${intl.formatMessage({ id: "CALENDAR" })}`,
  ];

  const count = useSelector((state) => state?.stepProgressCount?.count);

  const goTo = (index) => {
    if (
      eventType === "hyp" &&
      localStorage.getItem("isEdit") == "true" &&
      localStorage.getItem("isFormSubmitted") == "true"
    ) {
      dispatch(clickNum(index));

      switch (index) {
        case 0:
          navigate("/dashboard/event/" + eventType + "/addplaces");
          break;
        case 1:
          navigate("/dashboard/event/" + eventType + "/aboutplace");
          break;
        case 2:
          navigate("/dashboard/event/" + eventType + "/location");
          break;
        case 3:
          navigate("/dashboard/event/" + eventType + "/photosandvideos");
          break;
        case 4:
          navigate("/dashboard/event/" + eventType + "/addservices");
          break;
        case 5:
          navigate("/dashboard/event/" + eventType + "/personaldetails");
          break;
        case 6:
          navigate("/dashboard/event/" + eventType + "/companydetails");
          break;
        case 7:
          navigate("/dashboard/event/" + eventType + "/termsandconditions");
          break;
        case 8:
          navigate("/dashboard/event/" + eventType + "/discounts");
          break;
        case 9:
          navigate("/dashboard/event/" + eventType + "/calender");
          break;
      }
    } else if (
      eventType === "psb" &&
      localStorage.getItem("isEdit") == "true" &&
      localStorage.getItem("isFormSubmitted") == "true"
    ) {
      dispatch(clickNum(index));

      switch (index) {
        case 0:
          navigate("/dashboard/event/" + eventType + "/addplaces");
          break;
        case 1:
          navigate("/dashboard/event/" + eventType + "/personalinfo");
          break;
        case 2:
          navigate("/dashboard/event/" + eventType + "/photosandvideos");
          break;
        case 3:
          navigate("/dashboard/event/" + eventType + "/addequipments");
          break;
        case 4:
          navigate("/dashboard/event/" + eventType + "/othercost");
          break;
        case 5:
          navigate("/dashboard/event/" + eventType + "/companydetails");
          break;
        case 6:
          navigate("/dashboard/event/" + eventType + "/termsandconditions");
          break;
        case 7:
          navigate("/dashboard/event/" + eventType + "/discounts");
          break;
        case 8:
          navigate("/dashboard/event/" + eventType + "/calender");
          break;
      }
    } else if (
      eventType === "gsb" &&
      localStorage.getItem("isEdit") == "true" &&
      localStorage.getItem("isFormSubmitted") == "true"
    ) {
      dispatch(clickNum(index));

      switch (index) {
        case 0:
          navigate("/dashboard/event/" + eventType + "/addplaces");
          break;
        case 1:
          navigate("/dashboard/event/" + eventType + "/personalinfo");
          break;
        case 2:
          navigate("/dashboard/event/" + eventType + "/photosandvideos");
          break;
        case 3:
          navigate("/dashboard/event/" + eventType + "/additem");
          break;
        case 4:
          navigate("/dashboard/event/" + eventType + "/addequipments");
          break;
        case 5:
          navigate("/dashboard/event/" + eventType + "/othercost");
          break;
        case 6:
          navigate("/dashboard/event/" + eventType + "/companydetails");
          break;
        case 7:
          navigate("/dashboard/event/" + eventType + "/termsandconditions");
          break;
        case 8:
          navigate("/dashboard/event/" + eventType + "/discounts");
          break;
        case 9:
          navigate("/dashboard/event/" + eventType + "/calender");
          break;
      }
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <ul className="flex justify-between step-progress-holder">
        {eventType === "hyp" &&
          placesProgressBarList.map((element, index) => {
            return (
              <li className={count >= index + 1 ? "active" : ""} key={index}>
                <div
                  onClick={(e) => {
                    goTo(index);
                  }}
                >
                  <span
                    className={
                      count >= index + 1
                        ? "active cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    {index + 1}
                  </span>
                </div>
                <h3>{element}</h3>
              </li>
            );
          })}

        {eventType === "psb" &&
          personalSkillProgressVBarList.map((element, index) => (
            <li className={count >= index + 1 ? "active" : ""} key={index}>
              <div
                onClick={(e) => {
                  goTo(index);
                }}
              >
                <span
                  className={
                    count >= index + 1
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  {index + 1}
                </span>
              </div>
              <h3>{element}</h3>
            </li>
          ))}

        {eventType === "gsb" &&
          groupSkillProgressBarList.map((element, index) => (
            <li className={count >= index + 1 ? "active" : ""} key={index}>
              <div
                onClick={(e) => {
                  goTo(index);
                }}
              >
                <span
                  className={
                    count >= index + 1
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  {index + 1}
                </span>
              </div>
              <h3>{element}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default StepProgressBar;
