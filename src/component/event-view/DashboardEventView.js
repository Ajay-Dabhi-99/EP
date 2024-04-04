import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dashboardBgImage from "../../assest/images/dashboard-bg.png";
import { MoonLoader } from 'react-spinners';
import { s3Url } from '../../config';
import DashboardEventAttendee from './DashboardEventAttendee';
import DashboardEventReview from './DashboardEventReview';
import DashboardEventViewOverview from './DashboardEventViewOverview';
import bannerPreview from "../../assest/images/banner-preview.png";
import EventPopUpShareEvent from '../Popups/EventPopUpShareEvent';
import Modal from '../../Common/Modals/Modal';
import { useDispatch } from 'react-redux';
import { getOneEventDetails } from '../../Pages/Dashboard/Event/Calendar/calenderSlice';
import { useIntl } from "react-intl";

const DashboardEventView = () => {
  const intl = useIntl();
  const dispatch = useDispatch()
  const [tab, setTab] = useState(1);
  const [event, setEvent] = useState({});
  const [attendee, setAttendee] = useState({});
  const [review, setReview] = useState({});
  const [capacity, setCapacity] = useState({});
  const [socials, setsocials] = useState({});
  const [company, setCompany] = useState({});
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharePopUpOpen, setSharePopUpOpen] = useState(false);
  const url = "https://eventopackage.com/";
  const eventId = localStorage.getItem("eventId");
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("Token");




  const getEventById = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getOneEventDetails(eventId)).unwrap();
      if (response.data.IsSuccess) {
        setEvent(response.data.Data);
        setCapacity(response.data.Data.capacity);
        setsocials(response.data.Data.tandc);
        setCompany(response.data.Data.companydetail);
        setService(response.data.Data.services);
        setReview(response.data.Data.reviews);
        setAttendee(response.data.Data.attendee);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventById();
  }, [eventId]);

  return (
    <>
      {loading ?
        <MoonLoader
          cssOverride={{ margin: "100px auto" }}
          color={"#20c0E8"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <>
          <div className="-mt-12 relative -z-10">
            <div className="-mt-12 relative -z-10 h-[300px] xl:h-[400px]">
              <img src={(event && event?.aboutplace && event?.aboutplace?.banner && event?.aboutplace?.banner != '') ? (s3Url + "/" + event?.aboutplace?.banner) : (
                event && event?.personaldetail && event?.personaldetail?.banner && event?.personaldetail?.banner != '' ? (s3Url + "/" + event?.personaldetail?.banner) : bannerPreview
              )} alt="dashboard-bg" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="wrapper -mt-14 z-10">

            <div className="flex items-center justify-between bg-white py-5 px-7 rounded-md">
              <h2>{event?.display_name}</h2>
              <div className="space-y-4">
                <div className="flex space-x-6 items-center justify-end">
                  <Link to="../../../notification">
                    <button type="button" className="py-1 px-2 bg-spiroDiscoBall text-sm font-bold text-white">{intl.formatMessage({ id: "PROMOTION" })}</button></Link>
                  <button onClick={() => setSharePopUpOpen(true)} className="w-8 h-8 bg-brightGray rounded-full flex items-center justify-center"><i className="icon-share text-sm"></i></button>
                </div>
                <div className="flex items-center text-base font-semibold text-ufoGreen space-x-1">
                  <a href="#">{(capacity?.facilities) ? (capacity?.facilities?.replace("_", " ").replace("_", " / ").toUpperCase()) : ""}</a>
                  {/* <a href="#">Romantic Dinner</a>
                    <span>/</span>
                    <a href="#">Lunch</a> */}
                </div>
              </div>
            </div>
            {/* <!-- tab-contents-holder --> */}
            {/* <!-- tab-holder  --> */}
            <div className="teb-holder">
              <button type="button" data-tab="overview" className={tab === 1 ? "active" : undefined} onClick={() => setTab(1)}>{intl.formatMessage({ id: "OVERVIEW" })}</button>
              {attendee && (attendee.length !== 0) ?
                <button type="button" data-tab="attendee" className={tab === 2 ? "active" : undefined} onClick={() => setTab(2)}>{intl.formatMessage({ id: "ATTENDEE" })}</button>
                : ""}
              {review && (review.length !== 0) ?
                <button type="button" data-tab="reviews" className={tab === 3 ? "active" : undefined} onClick={() => setTab(3)}>{intl.formatMessage({ id: "REVIEWS" })}</button>
                : ""}
            </div>
            {tab === 1 && <DashboardEventViewOverview data={event} capacity={capacity} socials={socials} company={company} service={service} />}
            {tab === 2 && <DashboardEventAttendee />}
            {tab === 3 && <DashboardEventReview />}
            <Modal isOpen={sharePopUpOpen}>
              <EventPopUpShareEvent handleClose={setSharePopUpOpen} url={url} />
            </Modal>
          </div>
        </>
      }
    </>
  )
}

export default DashboardEventView;