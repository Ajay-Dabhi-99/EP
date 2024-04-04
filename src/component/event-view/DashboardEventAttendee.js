import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners';
import { baseUrl } from '../../config';
import DashboardEventAtteneeListItem from './DashboardEventAtteneeListItem';
import AttendeePage from './AttendeePage';
import { useDispatch } from 'react-redux';
import { allAttendeesGet, exportAttendeeByID } from '../../Pages/Dashboard/eventSlice';
import { useIntl } from "react-intl";

const DashboardEventAttendee = () => {
  const dispatch = useDispatch()
  const intl = useIntl();
  const [allAttendee, setAllAttendee] = useState({});
  const [attendee, setAttendee] = useState([]);
  const eventId = localStorage.getItem("eventId");
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const limit = 7;

  // Attendee API Call
  const getAttendee = async () => {
    const payload = {
      eventid: eventId,
      page: pageNo,
      limit: limit
    }
    const response = await dispatch(allAttendeesGet(payload)).unwrap()
    setLoading(false);
    if (response.data.IsSuccess) {
      setAttendee(response.data.Data);
    }
  }

  // Export Attendee Data in Excel
  const allAttendees = async () => {
    let payload = {
      eventid: eventId
    }
    const response = await dispatch(exportAttendeeByID(payload)).unwrap()
    setLoading(false);
    if (response.data.IsSuccess) {
      setAllAttendee(response.data.Data);
    }
  }

  useEffect(() => {
    getAttendee();
    allAttendees();
  }, [pageNo]);

  return (
    <div className="pt-5 lg:pt-7">
      {/* <a href={allAttendee} className="flex justify-end mb-4">
          <button className='bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md whitespace-nowrap'>{intl.formatMessage({ id: "EXPORT ALL ATTENDEE" })}</button>
        </a> */}
      {
        attendee.length == 0 ?
          ""
          :
          <a href={allAttendee} className="flex justify-end mb-4">
            <button className='bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md whitespace-nowrap'>{intl.formatMessage({ id: "EXPORT ALL ATTENDEE" })}</button>
          </a>}
      {/* <!-- Attendee-Teb-Content   --> */}
      <div className="w-full space-y-7" id="attendee">
        <div className="w-full space-y-2.5">
          {loading ?
            <MoonLoader
              cssOverride={{ margin: "100px auto" }}
              color={"#20c0E8"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            : <>
              {attendee.docs?.map(ele => (
                <>
                  <DashboardEventAtteneeListItem key={ele._id} data={ele} />
                </>
              ))}
              {!loading && ((attendee?.totalPages > 0) ? <AttendeePage attendee={attendee} limit={limit} setPageNo={setPageNo} pageNo={pageNo} /> : <h1 style={{ margin: "100px 0" }}>{intl.formatMessage({ id: "NO ATTENDEE FOUND" })}</h1>)}
            </>
          }
          {/* </> */}
          {/* } */}
        </div>

      </div>
    </div>
  )
}

export default DashboardEventAttendee;