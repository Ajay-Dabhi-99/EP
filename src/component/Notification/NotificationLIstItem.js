import React from "react";
import { s3Url } from "../../config"
import { Link } from "react-router-dom";
import notificationSvg2 from "../../assest/svg/notification-2.svg";
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { increment, reset } from "../../Common/CommonSlice/notificationstepPogressCountSlice"; 
import { useEffect } from "react";
import { useIntl } from "react-intl";


const NotificationLIstItem = ({ data }) => {
  const dispatch = useDispatch();
  const intl = useIntl();


  useEffect(() => {
    dispatch(reset())
  }, [])


  return (

    <div className="bg-white p-5 rounded-md">
      <div className="flex justify-between items-center max-[640px]:flex-col max-[640px]:items-start">
        <div className="w-2/12 max-[820px]:w-full max-[768px]:w-[30%] max-[640px]:w-full">
          <img src={(data && data.banner && data.banner != '') ? (s3Url + "/" + data.banner) : notificationSvg2} alt="" className="max-h-[130px] h-full  w-full object-cover max-[640px]:max-h-[250px]" />
        </div>
        <div className="w-10/12 max-[640px]:flex flex-col items-start">
          <div className="flex justify-between pl-4 max-[640px]:p-0 mt-1">
            <h2>{data?.notification_title}</h2>
          </div>
          <p className="text-gray-400 text-base pt-3 font-medium pl-4 max-[640px]:pl-0 max-[640px]:pt-1 ">
            {parse(data?.description)}
          </p>
          <div className="flex justify-end max-[820px]:justify-start pl-4 pt-2 max-[640px]:p-0 mt-2">
            <Link to="selectbusiness" onClick={() => { localStorage.setItem("notificationid", data?._id); dispatch(increment()) }} >
              <button className="btn-primary small flex items-center">
                <i className="icon-fill-megaphone mr-2"></i>
                {intl.formatMessage({id: "PROMOTE"})}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}

export default NotificationLIstItem;