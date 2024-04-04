import React, { useEffect, useRef } from "react";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
import {
  decrement,
  reset,
} from "../../../../Common/CommonSlice/stepProgressCountSlice";
import { useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import moment from "moment/moment";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import {
  getOneEventDetails,
  idCalendar,
  useEventCalender,
} from "./calenderSlice";
import { useIntl } from "react-intl";
import { MoonLoader } from "react-spinners";

const EventCalendarView = () => {
  const [isChange, setIsChange] = useState(false);
  const calendarRef = useRef();
  const intl = useIntl();
  const stateEventCalender = useEventCalender();
  const displayName = localStorage.getItem("displayName");
  const eventId = localStorage.getItem("eventId");
  const [date, setDate] = useState(new Date());
  const [isMonthChange, setIsMonthChange] = useState();
  const newDate = moment(isMonthChange).format("MM").toString();
  const ChangeDate = newDate === "01" ? newDate === "12" : newDate - 1 < 10
    ? "0" + (newDate - 1)
    : newDate - 1
  const ChangeYear = moment(isMonthChange).format("MM").toString() == "01" ? (moment(isMonthChange).format("YYYY").toString() - 1) : moment(isMonthChange).format("YYYY").toString()

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [values, setValues] = useState({
    month:
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const CalendarViewList = async () => {
    try {
      const response = await dispatch(getOneEventDetails(eventId)).unwrap();
      // const attendeeArr = stateEventCalender?.attendee;
      // const calendarEvents = [];
      // attendeeArr.forEach((attendee) => {
      //   console.log(attendee,"attendeeArrattendeeArr");
      //   calendarEvents.push({
      //     title: attendee.name,
      //     start: new Date(
      //       moment.unix(attendee.start_timestamp / 1000).toString()
      //     ),
      //     end: new Date(moment.unix(attendee.end_timestamp / 1000).toString()),
      //     color: generateRandomColor(),
      //   });
      // });
      // console.log(calendarEvents,"calendarEventscalendarEvents");
      // setTimeout(()=>{
      //   setCalendarEvents(calendarEvents);
      // },[2000])
    } catch (error) {
      console.log(error);
    }
  };
  const setMonthYear = () => {
    let mon = new Date();
    mon.setMonth(values.month - 1);
    mon.setFullYear(values.year);
    setDate(mon);
    setTimeout(() => {
      setIsChange(false);
    }, [3000]);
  };

  const IdCalendar = async () => {
    try {
      setIsChange(true);
      const response = await dispatch(
        idCalendar({
          eventId: eventId,
          month: values.month,
          year: values.year,
        })
      ).unwrap();
      if (response) {
        const calendarEvents = [];
        Object.keys(response.data.Data).forEach((val) => {
          if (response.data.Data[val].length) {
            for (let i = 0; i < response.data.Data[val].length; i++) {
              calendarEvents.push({
                title: response.data.Data[val][i].name,
                start: new Date(
                  response.data.Data[val][i].start_date +
                  " " +
                  response.data.Data[val][i].start_time
                ),
                end: new Date(
                  response.data.Data[val][i].end_date +
                  " " +
                  response.data.Data[val][i].end_time
                ),
                color: generateRandomColor(),
              });
            }
            setCalendarEvents(calendarEvents);
            setIsChange(false);
          }
        });
        setMonthYear();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CalendarViewList();
  }, []);
  useEffect(() => {
    IdCalendar();
  }, [values]);

  // const CalendarViewList = async () => {
  // 	try {
  // 		const response = await dispatch(idCalendar(eventId)).unwrap()
  // 		const attendeeArr = stateEventCalender?.attendee;
  // 		const calendarEvents = [];
  // 		attendeeArr.forEach(attendee => {
  // 			calendarEvents.push({
  // 				title: attendee.name,
  // 				start: new Date((moment.unix(attendee.start_timestamp / 1000)).toString()),
  // 				end: new Date((moment.unix(attendee.end_timestamp / 1000)).toString()),
  // 				color: generateRandomColor()
  // 			});
  // 		});
  // 		setCalendarEvents(calendarEvents);
  // 	} catch (error) {
  // 		console.log(error);
  // 	}
  // }

  const clickNextHandler = () => {
    dispatch(reset());
    navigate("/dashboard");
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const generateRandomColor = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };

  const year = new Date().getFullYear();

  return (
    // <!-- Content In -->
    <div className="wrapper h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i
              className="icon-back-arrow mr-4 text-2xl"
              onClick={clickBackHander}
            ></i>
            <h1>{displayName}</h1>
          </div>
        </div>
        {/* <!-- main-content  --> */}
        <div className="flex flex-col h-[calc(100%-100px)]">
          <div className="flex items-end -mx-3.5 max-[820px]:flex-col mb-5">
            <div className="w-full lg:w-1/2 px-3.5 max-[820px]:pt-1">
              <h3 className="pb-2">{intl.formatMessage({ id: "MONTHS" })}</h3>
              <select
                className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-4 relative arrow"
                value={ChangeDate ? ChangeDate : values.month}
                onChange={(e) => {
                  setIsChange(true);
                  setValues({ ...values, month: e.target.value });
                }}
              >
                <option value="01">
                  {intl.formatMessage({ id: "JANUARY" })}
                </option>
                <option value="02">
                  {intl.formatMessage({ id: "FEBRUARY" })}
                </option>
                <option value="03">
                  {intl.formatMessage({ id: "MARCH" })}
                </option>
                <option value="04">
                  {intl.formatMessage({ id: "APRIL" })}
                </option>
                <option value="05">
                  {intl.formatMessage({ id: "MAY" })}
                </option>
                <option value="06">
                  {intl.formatMessage({ id: "JUNE" })}
                </option>
                <option value="07">
                  {intl.formatMessage({ id: "JULY" })}
                </option>
                <option value="08">
                  {intl.formatMessage({ id: "AUGUST" })}
                </option>
                <option value="09">
                  {intl.formatMessage({ id: "SEPTEMBER" })}
                </option>
                <option value="10">
                  {intl.formatMessage({ id: "OCTOBER" })}
                </option>
                <option value="11">
                  {intl.formatMessage({ id: "NOVEMBER" })}
                </option>
                <option value="12">
                  {intl.formatMessage({ id: "DECEMBER" })}
                </option>
              </select>
            </div>
            <div className="w-full lg:w-1/2 px-3.5 max-[820px]:pt-1">
              <h3 className="pb-2">{intl.formatMessage({ id: "YEARS" })}</h3>
              <select
                className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-4 relative arrow"
                value={ChangeYear ? ChangeYear : values.year}
                onChange={(e) => {
                  setIsChange(true);
                  setValues({ ...values, year: e.target.value });
                }}
              >
                <option>{year}</option>
                <option>{year + 1}</option>
                <option>{year + 2}</option>
                <option>{year + 3}</option>
                <option>{year + 4}</option>
                <option>{year + 5}</option>
                <option>{year + 6}</option>
                <option>{year + 7}</option>
                <option>{year + 8}</option>
                <option>{year + 9}</option>
              </select>
            </div>
          </div>

          {!isChange ? (
            <div className="calendar inline-block justify-center items-center rounded-md drop-shadow-one bg-white w-full px-12 py-7">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents ? calendarEvents : null}
                initialDate={date}
                datesSet={(e) => {
                  setIsMonthChange(e.end);
                }}
              />
            </div>
          ) : (
            <div className="calendar inline-block- flex justify-center items-center rounded-md drop-shadow-one bg-white w-full px-12 py-7">
              <MoonLoader
                cssOverride={{ margin: "100px auto" }}
                color={"#20c0E8"}
                loading={isChange}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          <div className={"prw-next-btn flex justify-end mt-auto " + (!isChange ? "" : "hidden")}>
            <button className="btn-primary" onClick={clickNextHandler}>
              {intl.formatMessage({ id: "DONE" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendarView;
