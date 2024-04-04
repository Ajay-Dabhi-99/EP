import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import NotificationStepProgressBar from "../../NotificationStepProgressBar";
import { increment, decrement } from "../../../../Common/CommonSlice/notificationstepPogressCountSlice";
import moment from "moment/moment";
import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { setScheduleNotification } from "./publishDateAndTimeSlice";
import { useIntl } from "react-intl";

const PublishDateTime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date())
  const token = localStorage.getItem("Token");
  const notificationId = localStorage.getItem("notificationid");
  const [notification, setNotification] = useState(true);
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);

  let minDateValue = new Date(new Date().setDate(new Date().getDate() + 1));
  const clickNextHandler = async () => {
    const payload = {
      notificationid: notificationId,
      notification_date: moment(date).format('YYYY-MM-DD'),
      notification_time: moment(time, 'hh:mm A').format('HH:mm'),
      is_notification: notification,
      is_email: email, is_sms: sms
    };
    try {
      await dispatch(setScheduleNotification(payload)).unwrap()
      dispatch(increment());
      navigate("../notificationmode");
    } catch (error) {
      console.log(error);
    }
  }


  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
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
      <NotificationStepProgressBar />
      <br />

      <div className="flex items-end justify-between space-x-5">
        <div className="w-1/2">
          <h3 className="pb-3">{intl.formatMessage({id: "DATE"})}</h3>
          <div className="nPublickDate w-full relative">
            <Calendar id="minmax" value={date || new Date()} onChange={(e) => setDate(e.value)} minDate={minDateValue} dateFormat="mm-dd-yy" className="w-full py-1.5 bg-white block rounded-md relative" readOnlyInput />

            <i className="icon-calendar2 absolute top-6 right-5"></i>
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="pb-3">{intl.formatMessage({id: "TIME"})}</h3>
          <div className="nPublickTime w-full relative">

            <Calendar id="time12" value={time || new Date()} onChange={(e) => setTime(e.value)} timeOnly hourFormat="24" className="w-full py-1.5 bg-white block rounded-md relative" readOnlyInput />
            <i className="icon-light-fill-time absolute top-6 right-5"></i>

          </div>
        </div>

      </div>
      <br />
      <div className="w-1/2">
        <h3 className="pb-3">{intl.formatMessage({ id: "SELECT CATEGORY" })}</h3>
        <div className="flex items-center  rounded-md cursor-pointer w-full p-4">
          <label className="checkbox w-8 h-8">
            <input type="checkbox" name="is_notification" defaultChecked onChange={() => setNotification(!notification)} className="bg-white" />

            <i className="icon-right"></i>
          </label>
          <span className="text-base text-japaneseIndigo font-bold ml-5">{intl.formatMessage({ id: "NOTIFICATIONS" })}</span>
        </div>
        <div className="flex items-center  rounded-md cursor-pointer w-full p-4">
          <label className="checkbox w-8 h-8">
            <input type="checkbox" name="is_sms" onChange={() => setSms(!sms)} className="bg-white" />

            <i className="icon-right"></i>
          </label>
          <span className="text-base text-japaneseIndigo font-bold ml-5">{intl.formatMessage({ id: "SMS" })}</span>
        </div>
        <div className="flex items-center  rounded-md cursor-pointer w-full p-4">
          <label className="checkbox w-8 h-8">
            <input type="checkbox" name="is_email" onChange={() => setEmail(!email)} className="bg-white" />
            <i className="icon-right"></i>
          </label>
          <span className="text-base text-japaneseIndigo font-bold ml-5">{intl.formatMessage({ id: "EMAIL" })}</span>
        </div>
      </div>
      <div className="prw-next-btn mt-auto">
        <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({id: "BACK"})}</h3></button>
        <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>{intl.formatMessage({id: "NEXT"})}</h3><i className="icon-next-arrow ml-3"></i></button>
      </div>
    </div>
  );
}

export default PublishDateTime;