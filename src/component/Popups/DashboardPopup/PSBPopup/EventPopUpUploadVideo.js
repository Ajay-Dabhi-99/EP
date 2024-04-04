import React from 'react'
import { Link } from 'react-router-dom'
import { useIntl } from "react-intl";

const EventPopUpUploadVideo = ({ handleClose }) => {
	const intl = useIntl();
  return (
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12">
            <div className="flex justify-between items-center">
              <h1 className="h1">{intl.formatMessage({ id: "UPLOAD VIDEO" })}</h1>
              <div>
                <button onClick={() => handleClose(false)} className="text-xl"><i className="icon-close"></i></button>
              </div>
            </div>
            <form className="py-7 space-y-5">
              <div className="upload-holder">
                <h6 className="text-sm font-bold text-quicksilver">{intl.formatMessage({ id: "SELECT VIDEO" })} <span className="text-10">{intl.formatMessage({ id: "2" })} {intl.formatMessage({ id: "VIDEOS" })} ({intl.formatMessage({ id: "UP TO 512MB" })} / {intl.formatMessage({ id: "VIDEO" })})</span></h6>
                <label htmlfor="upload" className="upload upload-popup">
                  <input type="file" name="images" id="upload" className="appearance-none hidden" />
                  <span className="input-titel mt-1"><i className="icon-video-play mr-2"></i>{intl.formatMessage({ id: "UPLOAD VIDEO" })}</span>
                </label>
              </div>
              <div className="w-full">
                <span className="input-titel">{intl.formatMessage({ id: "DETAILS" })}</span>
                <textarea name="" id="" cols="30" rows="5" className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md"></textarea>
              </div>
            </form>
            <Link to="/" className="btn-primary w-full uppercase">{intl.formatMessage({ id: "SUBMIT" })}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPopUpUploadVideo