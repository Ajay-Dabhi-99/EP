import React from "react";
import { Link } from "react-router-dom";
import notificationSvg2 from "../../../assest/svg/notification-2.svg";
import parse from 'html-react-parser';
import { s3Url } from "../../../config";
import { useIntl } from "react-intl";

const NotificationDetailsPreviewPopup = ({ handleClose, notification_title, banner, description }) => {
  const intl = useIntl();
  return (
    <>
      <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
        <div className="table-cell align-middle">
          <div className="wrapper popin w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto">
            <div className="bg-brightGray p-7 space-y-7">
              <div className="flex justify-between items-center">
                <h1 className="h1">{intl.formatMessage({id: "NOTIFICATION"})}</h1>
                <div className="flex items-center space-x-6" onClick={() => handleClose(false)}>
                  <Link to="/notification/details" className="text-xl">
                    <i className="icon-close"></i>
                  </Link>
                </div>
              </div>
              <div className="bg-white p-5 rounded-md max-[640px]:p-4">
                <div className="flex justify-between items-center max-[640px]:flex-col max-[640px]:justify-center">
                  <div className="w-2/12 max-[640px]:p-0 max-[640px]:w-full">
                    <img src={banner ? s3Url + "/" + banner : notificationSvg2} alt="" className="max-h-[130px] h-full w-full object-cover" />
                  </div>
                  <div className="w-10/12">
                    <div className="flex justify-between pl-4 max-[640px]:p-0">
                      <h2>{notification_title}</h2>
                    </div>
                    <p className="text-gray-400 text-base pt-3 font-medium pl-4 max-[640px]:p-0">
                      {parse(description)}
                    </p>

                  </div>
                </div>
              </div>
              {/* <NotificationLIstItem data={requestObj} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationDetailsPreviewPopup;
