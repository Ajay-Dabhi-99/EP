import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { videoType } from "../../../shared/constants";
import {
  AllMedia,
  uploadVideo,
} from "../../../Pages/Dashboard/Event/Photos&Videos/photoAndVideoSlice";
import { MoonLoader } from "react-spinners";
import { useIntl } from "react-intl";

const EventPopUpUploadVideo = ({ handleClose, eventId, videoList }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [video, setVideo] = useState("");
  //const [currentVideoList, setCurrentVideoList] = useState(videoList);
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Token ${token}`,
  };
  const videoHeader = {
    Authorization: `Token ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const videoChangeHandler = (event) => {
    let selected = event.target.files[0];
    const size = 512;
    try {
      if (selected && videoType.includes(selected.type)) {
        if (selected.size < size * 1024 * 1024) {
          setVideo(selected);
          setErrorMessage(null);
          setError(false);
          toast.error("FILE SIZE IS GREATER THEN"); 
        } else {
          setErrorMessage(
            `${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` +
            size +
            " Mb."
          );
          setError(true);
        }
      } else {
        setErrorMessage(
          `${intl.formatMessage({ id: "PLEASE SELECT VALID VIDEO FILE." })}`
        );
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const videoUpload = async () => {
    try {
      let formDataVideo = new FormData();
      formDataVideo.append("file", video);
      const response = await dispatch(uploadVideo(formDataVideo)).unwrap();
      if (response.data.IsSuccess) {
        let payload = {
          eventid: eventId,
          videos: [
            ...videoList,
            {
              url: response.data.Data.url,
              description: details,
            },
          ],
        };
        const res = await dispatch(AllMedia(payload)).unwrap();
        toast.success(res.data.Message);
        setLoading(false);
        handleClose(false);
      } else {
        toast.error(response.data.Message);
        setLoading(false);
        handleClose(false);
      }
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
      setLoading(false);
      handleClose(false);
    }
  };

  const submitHandler = async () => {
    if (details.length < 501) {
      if (!error) {
        videoUpload();
        setLoading(false);
      } else {
        console.log("error occured");
      }
    } else {
      toast.error(
        `${intl.formatMessage({ id: "ABOUT TEXT LIMIT EXCEEDED!" })}`
      );
    }
  };

  return (
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12 max-[640px]:px-10">
            <div className="flex justify-between items-center">
              <h1 className="h1">
                {intl.formatMessage({ id: "UPLOAD VIDEO" })}
              </h1>
              <div>
                <button onClick={() => handleClose(false)} className="text-xl">
                  <i className="icon-close"></i>
                </button>
              </div>
            </div>
            <form className="py-7 space-y-5">
              <div className="upload-holder">
                <h6 className="text-sm font-bold text-quicksilver">
                  {intl.formatMessage({ id: "SELECT VIDEO" })}{" "}
                  <span className="text-10">
                    {intl.formatMessage({ id: "2" })}{" "}
                    {intl.formatMessage({ id: "VIDEOS" })} (
                    {intl.formatMessage({ id: "UP TO 512MB" })} /{" "}
                    {intl.formatMessage({ id: "VIDEO" })})
                  </span>
                </h6>
                <label htmlfor="upload" className="upload upload-popup">
                  <input
                    type="file"
                    name="video"
                    id="upload"
                    className="appearance-none hidden"
                    onChange={videoChangeHandler}
                  />
                  <span className="input-titel mt-1">
                    <i className="icon-video-play mr-2"></i>
                    {intl.formatMessage({ id: "UPLOAD VIDEO" })}
                  </span>
                </label>
                {error ? (
                  <span
                    className="mt-1"
                    style={{ color: "red", fontSize: "14px" }}
                  >
                    {errorMessage}{" "}
                  </span>
                ) : (
                  <span className="mt-1" style={{ fontSize: "14px" }}>
                    {video.name}
                  </span>
                )}
              </div>
              <div className="w-full">
                <span className="input-titel">
                  {intl.formatMessage({ id: "DETAILS" })}
                </span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md"
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </div>
            </form>
            {/* <MoonLoader
              cssOverride={{ margin: "100px auto" }}
              color={"#20c0E8"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> */}
            {loading ?
              <div className="btn-primary w-full uppercase cursor-pointer" onClick={submitHandler} >
                {intl.formatMessage({ id: "SUBMIT" })}
              </div>
              :
              <div className="btn-primary hover:bg-spiroDiscoBall flex items-center justify-center w-full uppercase cursor-pointer">
                <svg className="flex items-center justify-center w-6 h-6" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                      <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="1s"
                          repeatCount="indefinite" />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            }
          </div>
        </div>
      </div>
      {/* <ToastContainer
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
      /> */}
    </div>
  );
};

export default EventPopUpUploadVideo;
