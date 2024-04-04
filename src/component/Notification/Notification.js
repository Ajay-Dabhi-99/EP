import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotificationLIstItem from "./NotificationLIstItem";
import { MoonLoader } from 'react-spinners';
import NotificationPage from "./NotificationPage";
import { useDispatch } from "react-redux";
import { userNotification } from "./notificationSlice";
import { useIntl } from "react-intl";


const Notification = () => {
  const intl = useIntl();
  const dispatch = useDispatch()
  const params = useParams();
  const navigate = useNavigate();
  const [allNotifications, setAllNotifications] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  localStorage.removeItem("notificationid");
  const limit = 5;

  const getAllNotification = async () => {
    const payload = {
      page: pageNo,
      limit: limit,
    }
    try {
      const response = await dispatch(userNotification(payload)).unwrap()
      setAllNotifications(response.data.Data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllNotification();
  }, [pageNo]);
  return (

    <div className="wrapper min-h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center max-[768px]:flex-col">
          <Link to="/" className="flex items-center">
            <h1>{intl.formatMessage({id: "NOTIFICATION"})}</h1>
          </Link>
          <div className="flex items-center  space-x-5 max-[768px]:pt-3">
            <button className="btn-primary" onClick={() => navigate("/notification/history")}>
              <i className="icon-time mr-3"></i>
              <span>{intl.formatMessage({id: "HISTORY"})}</span>
            </button>
            <button className="btn-primary" onClick={() => navigate("/notification/details")} >
              <i className="icon-plus mr-3"></i>
              <span>{intl.formatMessage({id: "CREATE NEW"})}</span>
            </button>
          </div>
        </div>
        {/* <!-- main-content  --> */}
        <div className="space-y-5">
          <MoonLoader
            cssOverride={{ margin: "100px auto" }}
            color={"#20c0E8"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {allNotifications.docs?.map(ele => (
            <NotificationLIstItem key={ele._id} data={ele} />
          ))}
          {/* {!loading && ((booking?.totalPages > 0) ? <BookPage booking={booking} limit={limit} setPageNo={setPageNo} pageNo={pageNo} /> : <h1 style={{ margin: "100px 0" }}>No Booking Found</h1>)} */}
          {/* {!loading && ((allNotifications?.totalPages > 0) ? <NotificationPage allNotifications={allNotifications} limit={limit} setPageNo={setPageNo} pageNo={pageNo} /> : <h1 style={{ margin: "100px 0" }}>No Notification Found</h1>)} */}
          {!loading && ((allNotifications?.totalPages > 0) ? <NotificationPage allNotifications={allNotifications} limit={limit} setPageNo={setPageNo} pageNo={pageNo} /> : <h1 style={{ margin: "100px 0" }}>No Notification Found</h1>)}
          {/* <!-- advisement --> */}
          {/* {!loading && <Advertisement />} */}
          {/* <!-- next preview button  --> */}
        </div>
      </div>
    </div>
  );
}

export default Notification;