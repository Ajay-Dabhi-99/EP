import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  AllMedia,
  uploadPhoto,
} from "../../../Pages/Dashboard/Event/Photos&Videos/photoAndVideoSlice";
import { imageType } from "../../../shared/constants";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";
import Loader from "../../../assest/images/loader.gif";

const EventPopUpUploadPhoto = ({ handleClose, eventId, imageList }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  //const [currentImageList, setCurrentImageList] = useState(imageList);
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(true);
  const [loading, setLoading] = useState(true);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        imageType
        // "image/jpeg": [],
        // "image/png": [],
        // "image/jpg": [],
        // "image/gif": [],
        // "image/webp": [],
      },
      maxFiles: 15,
      // maxSize: 3140021,
    });
  console.log(getInputProps,"getInputProps");

  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Token ${token}`,
  };
  const imageHeader = {
    Authorization: `Token ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const uploadImage = async () => {
    if (acceptedFiles) {


      try {
        if (acceptedFiles.length + imageList.length > 14) {
          let array = Object.assign([], acceptedFiles);
          array.splice(0, acceptedFiles.length + imageList.length - 15);
          const newArr = [];
          for (let index = 0; index < array.length; index++) {
            if (array[index].size < 8000000) {
              let formDataImage = new FormData();
              formDataImage.append("file", array[index]);

              var response = new Promise((resolve, reject) => {
                const result = dispatch(uploadPhoto(formDataImage)).unwrap();
                if (result) resolve(result);
              });
              newArr.push(response);
            } else {
              toast.error("Please Upload a file less than 8MB!");
            }
          }
          let array1 = Object.assign([], newArr);

          Promise.all(array1).then((res) => {
            res.forEach((imageRes) => {
              if (imageRes) {
                imageList.push({
                  url: imageRes.data.Data.url,
                  description: details,
                });
              }
            });

            const payload = {
              eventid: eventId,
              photos: [...imageList],
            };
            const result = dispatch(AllMedia(payload))
              .unwrap()
              .then((r) => {
                if (r.data.IsSuccess) {
                  handleClose(false);
                } else {
                  console.log("else");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        } else {
          const newArr = [];
          for (let index = 0; index < acceptedFiles.length; index++) {
            console.log(acceptedFiles[index]);
            console.log("GG", acceptedFiles.type);

            if (acceptedFiles[index].size < 3145728) {
              let formDataImage = new FormData();

              formDataImage.append("file", acceptedFiles[index]);

              var response = new Promise((resolve, reject) => {
                const result = dispatch(uploadPhoto(formDataImage)).unwrap();
                if (result) resolve(result);
              });
              newArr.push(response);
            } else {
              toast.error("Please Upload a file less than 3MB!");
            }
          }
          Promise.all(newArr).then((res) => {
            res.forEach((imageRes) => {
              if (imageRes) {
                imageList.push({
                  url: imageRes.data.Data.url,
                  description: details,
                });
              }
            });

            const payload = {
              eventid: eventId,
              photos: [...imageList],
            };
            const result = dispatch(AllMedia(payload))
              .unwrap()
              .then((r) => {
                if (r.data.IsSuccess) {
                  handleClose(false);
                } else {
                  console.log("else");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      } catch (error) {
        // toast.success(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
        console.log(error);
      }
    } else {
      toast.success(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
    }

  };

  const submitHandler = async () => {
    if (details.length < 501) {
      if (!error) {
        uploadImage();
        setIsSubmit(false);
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
    //  <!-- Upload Photo  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12 max-[640px]:px-10">
            <div className="flex justify-between items-center">
              <h1 className="h1">
                {intl.formatMessage({ id: "UPLOAD PHOTO" })}
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
                  {intl.formatMessage({ id: "SELECT PHOTO" })}
                  <span className="text-10">
                    {intl.formatMessage({ id: "15 IMAGES" })} (
                    {intl.formatMessage({ id: "UP TO 3MB" })} /{" "}
                    {intl.formatMessage({ id: "IMAGE" })})
                  </span>
                </h6>
                <div {...getRootProps({ className: "upload upload-popup" })}>
                  <input
                    {...getInputProps()}
                    name="images"
                    id="upload"
                    className="appearance-none hidden"
                  />
                  <span className="input-titel mt-1">
                    <i className="icon-image mr-2"></i>
                    {intl.formatMessage({ id: "CHOOSE IMAGES" })}
                  </span>
                </div>
                {fileRejections.length > 0 ? (
                  <span
                    className="mt-1"
                    style={{ color: "red", fontSize: "14px" }}
                  >
                    {errorMessage}{" "}
                  </span>
                ) : (
                  <span className="mt-1" style={{ fontSize: "14px" }}>
                    {image.name}
                  </span>
                )}
              </div>
              {acceptedFiles.length > 1 ? null : (
                <div className="w-full">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "DETAILS" })}
                  </span>
                  <textarea
                    name="details"
                    id=""
                    cols="30"
                    rows="5"
                    className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md"
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                </div>
              )}
            </form>
            {/* <Link to="/" className="btn-primary w-full uppercase">Submit</Link> */}
            {loading ? (
              <div
                className="btn-primary w-full uppercase cursor-pointer flex items-center justify-center"
                onClick={isSubmit && submitHandler}
              >
                {intl.formatMessage({ id: "SUBMIT" })}
              </div>
            ) : (
              <div className="btn-primary hover:bg-spiroDiscoBall w-full uppercase cursor-pointer flex items-center justify-center">
                <svg
                  className="flex items-center justify-center w-6 h-6"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#fff"
                >
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
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            )}
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

export default EventPopUpUploadPhoto;
