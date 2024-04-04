import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import StepProgressBar from "../../StepProgressBar";
import { s3Url } from "../../../../config";
import {
  decrement,
  increment,
} from "../../../../Common/CommonSlice/stepProgressCountSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCallback } from "react";
import {
  documentType,
  imageType,
  videoType,
} from "../../../../shared/constants";
import {
  getProfileDetails,
  useProfileDetails,
} from "../../../Profile/profileSlice";
import {
  companyDetailId,
  detailsOfCompany,
  uploadCompanyImg,
  uploadCompanyVideos,
  uploadPdf,
  useCompanyDetailId,
} from "./companyDetailsSlice";
import { useIntl } from "react-intl";
import PhoneInput from "react-phone-input-2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MoonLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import { AllMedia } from "../Photos&Videos/photoAndVideoSlice";

const EventCompanyDetails = () => {
  const intl = useIntl();
  const profileDetails = useProfileDetails();
  const stateCompanyDetailId = useCompanyDetailId();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventType = params.eventType;
  const eventId = localStorage.getItem("eventId");
  const displayName = localStorage.getItem("displayName");
  const [gstFile, setGstFile] = useState(null);
  const [gstFileError, setGstFileError] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    mobile: Yup.number()
      .typeError(`${intl.formatMessage({ id: "THE VALUE MUST BE A DIGIT" })}`)
      .integer()
      .positive(
        `${intl.formatMessage({ id: "CONTACT NUMBER MUST BE POSITIVE" })}`
      ),
    email: Yup.string().email(
      `${intl.formatMessage({ id: "INVALID EMAIL FORMAT" })}`
    ),
    about: Yup.string(),
    flat_no: Yup.string(),
    street: Yup.string(),
    area: Yup.string(),
    city: Yup.string().matches(
      /^[a-zA-Z ]*$/,
      `${intl.formatMessage({
        id: "CITY NAME CAN ONLY CONTAIN ENGLISH CHARACTERS",
      })}`
    ),
    state: Yup.string().matches(
      /^[a-zA-Z ]*$/,
      `${intl.formatMessage({
        id: "STATE NAME CAN ONLY CONTAIN ENGLISH CHARACTERS",
      })}`
    ),
    pincode: Yup.string()
      .matches(
        /^[0-9]*$/,
        `${intl.formatMessage({ id: "THE VALUE MUST BE A DIGIT" })}`
      )
      .min(
        6,
        `${intl.formatMessage({ id: "PINCODE SHOULD BE SIX DIGIT LONG." })}`
      )
      .max(
        6,
        `${intl.formatMessage({ id: "PINCODE SHOULD BE SIX DIGIT LONG." })}`
      ),
  });
  const onDrop = useCallback(async acceptedFiles => {
    const size = 5;
    let selected = acceptedFiles;
    if (imageList.length >= 5) {
      toast.info(`${intl.formatMessage({ id: "IMAGE UPLOAD LIMIT EXCEED." })}`);
      return;
    }
    try {
      console.log(imageList,"");
      console.log(acceptedFiles.length,imageList.length,"+++++++");
      if (acceptedFiles.length + imageList.length > 4) {
        let array = Object.assign([], acceptedFiles);
        array.splice(0, acceptedFiles.length + imageList.length - 5);
        console.log(array,"+++++++");
        for (let index = 0; index < array.length; index++) {
        if (array[index] && imageType.includes(array[index].type)) {
          if (array[index].size < 5000000) {
            try {
              const formDataImage = new FormData();
              formDataImage.append("file", array[index]);
              const response = await dispatch(
                uploadCompanyImg(formDataImage)
              ).unwrap();
              if (response.data.IsSuccess) {
                toast.success(response.data.Message);
                setErrorMessage(null);
                setError(false);
                setImageList((current) => [
                  ...current,
                  { url: response.data.Data.url },
                ]);
              } else {
                toast.error(response.data.Message);
              }
            } catch (error) {
              toast
                .error
                // `${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`
                ();
              console.log(error);
            }
          } else {
            setErrorMessage(
              `${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` +
                size +
                " MB"
            );
            setError(true);
          }
        } else {
          setErrorMessage(
            `${intl.formatMessage({ id: "PLEASE SELECT VALID IMAGE FILE." })}`
          );
          setError(true);
        }
      }
    }
    else{
      for (let index = 0; index < selected.length; index++) {
        if (selected[index] && imageType.includes(selected[index].type)) {
          if (selected[index].size < 5000000) {
            try {
              const formDataImage = new FormData();
              formDataImage.append("file", selected[index]);
              const response = await dispatch(
                uploadCompanyImg(formDataImage)
              ).unwrap();
              if (response.data.IsSuccess) {
                toast.success(response.data.Message);
                setErrorMessage(null);
                setError(false);
                setImageList((current) => [
                  ...current,
                  { url: response.data.Data.url },
                ]);
              } else {
                toast.error(response.data.Message);
              }
            } catch (error) {
              toast
                .error
                // `${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`
                ();
              console.log(error);
            }
          } else {
            setErrorMessage(
              `${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` +
                size +
                " MB"
            );
            setError(true);
          }
        } else {
          setErrorMessage(
            `${intl.formatMessage({ id: "PLEASE SELECT VALID IMAGE FILE." })}`
          );
          setError(true);
        }
      }
    }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, [])
  const photoChangeHandler = async (event) => {
    console.log("sfdf");

    const size = 5;
    let selected = acceptedFiles;
    if (imageList.length >= 5) {
      toast.info(`${intl.formatMessage({ id: "IMAGE UPLOAD LIMIT EXCEED." })}`);
      return;
    }
    try {
      for (let index = 0; index < selected.length; index++) {
        if (selected[index] && imageType.includes(selected[index].type)) {
          if (selected[index].size < 5000000) {
            try {
              const formDataImage = new FormData();
              formDataImage.append("file", selected[index]);
              const response = await dispatch(
                uploadCompanyImg(formDataImage)
              ).unwrap();
              if (response.data.IsSuccess) {
                toast.success(response.data.Message);
                setErrorMessage(null);
                setError(false);
                setImageList((current) => [
                  ...current,
                  { url: response.data.Data.url },
                ]);
              } else {
                toast.error(response.data.Message);
              }
            } catch (error) {
              toast
                .error
                // `${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`
                ();
              console.log(error);
            }
          } else {
            setErrorMessage(
              `${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` +
                size +
                " MB"
            );
            setError(true);
          }
        } else {
          setErrorMessage(
            `${intl.formatMessage({ id: "PLEASE SELECT VALID IMAGE FILE." })}`
          );
          setError(true);
        }
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }

  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        imageType,
        // "image/jpeg": [],
        // "image/png": [],
        // "image/jpg": [],
        // "image/gif": [],
        // "image/webp": [],
      },
      onDrop,
      maxFiles: 5,
      // maxSize: 3140021,
    });
  console.log(imageList);
  console.log(acceptedFiles, "acceptedFiles");
  const initialState = {
    name: "",
    country_code: "",
    mobile: "",
    email: "",
    about: "",
    flat_no: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  };
  const clickNextHandler = async (values) => {
    // return
    if (formik.values.about.length < 1001) {
      try {
        const payload = {
          ...values,
          gst: gstFile,
          photos: imageList,
          videos: videoList,
          eventid: eventId,
        };
        // payload["mobile"] = values?.mobile.slice(values.country_code?.length)
        const response = await dispatch(detailsOfCompany(payload)).unwrap();
        if (response.data.IsSuccess) {
          // toast.success(response.data.Message);
          dispatch(increment());
          navigate(`../termsandconditions`);
        } else {
          toast.success(response.data.Message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`About text limit exceeded!`);
    }
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: clickNextHandler,
  });

  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
    } catch (error) {
      console.log(error);
    }
    setCount(true);
  };

  useEffect(() => {
    if (profileDetails?.businessProfile) {
      formik.setValues({
        ...formik.values,
        name: profileDetails?.businessProfile?.name,
        country_code: profileDetails?.businessProfile?.country_code,
        mobile: profileDetails?.businessProfile?.mobile,
        email: profileDetails?.businessProfile?.email,
        about: profileDetails?.businessProfile?.about,
      });
    }
  }, [profileDetails]);

  useEffect(() => {
    if (stateCompanyDetailId?.companydetail) {
      formik.setValues(stateCompanyDetailId?.companydetail);
      setImageList(stateCompanyDetailId?.companydetail?.photos);
      setVideoList(stateCompanyDetailId?.companydetail?.videos);
      setGstFile(stateCompanyDetailId?.companydetail?.gst);
    }
  }, [stateCompanyDetailId]);

  const getCompanyDetail = async () => {
    try {
      const response = await dispatch(companyDetailId(eventId)).unwrap();
      setLoading(false);
      //   setImageList(stateCompanyDetailId?.companydetail?.photos)
      //   setVideoList(stateCompanyDetailId?.companydetail?.videos)
      //   setGstFile(stateCompanyDetailId?.companydetail?.gst)
      if (!response.data.IsSuccess) {
        toast.error(
          `${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   formik.setValues(stateCompanyDetailId?.companydetail);
  //   setImageList(stateCompanyDetailId?.companydetail?.photos)
  //   setVideoList(stateCompanyDetailId?.companydetail?.videos)
  //   setGstFile(stateCompanyDetailId?.companydetail?.gst)
  // }, [stateCompanyDetailId])
  // useEffect(() => {
  //   getProfile();
  // }, []);

  useEffect(() => {
    getCompanyDetail();
  }, []);

  const pdfUpload = async (e) => {
    const selected = e.target.files[0];
    console.log("SELETYEDf", selected);
    const size = 1;
    if (e.target.files.length > 0) {
      // if (e.target.files[0] && documentType.includes(e.target.files[0].type)) {
      if (e.target.files[0] && documentType.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > size * 1024 * 1024) {
          setGstFileError("File size should be less than " + size + " MB.");
        } else {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          try {
            const response = await dispatch(uploadPdf(formData)).unwrap();
            if (response.data.IsSuccess) {
              setGstFile(response.data.Data.url);
              setGstFileError(null);
              toast.success(response.data.Message);
            } else {
              toast.error(response.data.Message);
            }
          } catch (error) {
            // toast.error(
            //   `${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`
            // );
            console.log(error);
          }
        }
      } else {
        setGstFileError(
          `${intl.formatMessage({ id: "PLEASE SELECT PDF FILE." })}`
        );
      }
    } else {
      setGstFileError(null);
    }
  };

  const videoChangeHandler = async (event) => {
    let selected = event.target.files[0];
    const size = 1024;
    if (videoList.length >= 2) {
      toast.info(`${intl.formatMessage({ id: "VIDEO UPLOAD LIMIT EXCEED." })}`);
      return;
    }
    try {
      if (selected && videoType.includes(selected.type)) {
        if (selected.size < size * 1024 * 1024) {
          try {
            const formDataVideo = new FormData();
            formDataVideo.append("file", selected);
            const response = await dispatch(
              uploadCompanyVideos(formDataVideo)
            ).unwrap();
            if (response.data.IsSuccess) {
              toast.success(response.data.Message);
              setErrorMessage(null);
              setError2(false);
              setVideoList((current) => [
                ...current,
                { url: response.data.Data.url },
              ]);
            } else {
              toast.error(response.data.Message);
            }
          } catch (error) {
            toast
              .error
              // `${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`
              ();
            console.log(error);
          }
        } else {
          setErrorMessage(
            `${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` +
              size +
              " Mb."
          );
          setError2(true);
        }
      } else {
        setErrorMessage(
          `${intl.formatMessage({ id: "PLEASE SELECT VALID VIDEO FILE." })}`
        );
        setError2(true);
      }
    } catch (error) {
      console.log(error);
      setError2(true);
    }
  };

  const removeImageClick = async (index) => {
    const tmpList = imageList;
    tmpList.splice(index, 1);
    setImageList([...tmpList]);
  };

  const removeVideoClick = async (index) => {
    const tmpList = [...videoList];
    if (tmpList === videoList) console.log(true);
    setVideoList([]);
    tmpList.splice(index, 1);
    setVideoList([...tmpList]);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="wrapper min-h-full flex flex-col"
    >
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
        {/* <!-- step-progress-bar  --> */}
        <StepProgressBar eventType={eventType} />
        {/* <!-- main-content  --> */}
        {loading ? (
          <MoonLoader
            cssOverride={{ margin: "100px auto" }}
            color={"#20c0E8"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <div className="space-y-5 -mx-2 max-[768px]:space-y-1">
              <div className="w-full flex items-end flex-wrap">
                <div className="w-full md:w-1/2 px-2 inputHolder">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "COMPANY NAME" })}
                  </span>
                  <input
                    type="text"
                    className="input"
                    name="name"
                    value={formik.values?.name}
                    onChange={(e) =>
                      formik.setFieldValue("name", e.target.value)
                    }
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.name}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/2 px-2 inputHolder">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "COMPANY GST" })} (
                    {intl.formatMessage({ id: "OPTIONAL" })})
                  </span>
                  <label htmlFor="upload" className="upload upload-popup">
                    <input
                      type="file"
                      name="images"
                      id="upload"
                      className="appearance-none hidden"
                      onChange={pdfUpload}
                    />
                    <span className="input-titel mt-1">
                      <i className="icon-pdf mr-2"></i>
                      {intl.formatMessage({ id: "UPLOAD PDF" })}
                    </span>
                  </label>
                  {gstFileError && (
                    <span className="text-red-500 text-xs">{gstFileError}</span>
                  )}
                  {!gstFileError && gstFile !== null && (
                    <span className="text-[#20C0E8] text-xs">
                      <a target="blank" href={s3Url + "/" + gstFile}>
                        {intl.formatMessage({ id: "PREVIEW LINK" })}
                      </a>
                    </span>
                  )}
                  <br />
                </div>
              </div>
              <div className="w-full flex items-end flex-wrap">
                <div className="w-full md:w-1/2 px-2 inputHolder">
                  <div className="input-label-holder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "COMPANY CONTACT NO" })}{" "}
                    </label>
                  </div>
                  {/* {country_code} */}
                  <div className="flex">
                    {/* <PhoneInput
                          country={"us"}
                          value={formik.values.mobile}
                          className="input"
                          defaultErrorMessage="kjnihiou"
                          onChange={(e, i, o) => {
                            console.log(e, i, "gsfds");
                            formik.setValues({ ...formik.values, mobile: e, country_code: i.dialCode })
                            // formik.setFieldValue("mobile", e);
                            // formik.setFieldValue("country_code", i.dialCode);
                          }}
                        /> */}
                    <input
                      type="text"
                      className="input max-w-[80px] w-full mr-3"
                      name="country_code"
                      value={formik.values?.country_code}
                      onChange={(e) =>
                        formik.setFieldValue("country_code", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="input"
                      name="mobile"
                      value={formik.values?.mobile}
                      onChange={(e) =>
                        formik.setFieldValue("mobile", e.target.value)
                      }
                    />
                  </div>
                  <small className="text-red-500 text-xs">
                    {formik.errors.mobile}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/2 px-2 inputHolder">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "COMPANY EMAIL" })}
                  </span>
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={formik.values?.email}
                    onChange={(e) =>
                      formik.setFieldValue("email", e.target.value)
                    }
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.email}
                  </small>
                  <br />
                </div>
                <div className="w-full space-y-2.5">
                  <h3>
                    {intl.formatMessage({ id: "ABOUT PLACE" })}
                    <span
                      className="text-xs"
                      style={{
                        color: "#20C0E8",
                      }}
                    >
                      {" "}
                      {formik.values.about.length} /{" "}
                    </span>
                    <span className="text-xs">1000</span>
                  </h3>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      formik.setFieldValue("about", editor.getData());
                    }}
                    data={formik.values.about}
                  />
                </div>
                {/* <div className="w-full px-2 mt-3">
                      <span className="input-titel">
                        {intl.formatMessage({ id: "COMPANY ABOUT" })}
                        <span className="text-xs" style={{
                          color: '#20C0E8'
                        }}> {(formik.values.about).length} / </span><span className='text-xs'>2000</span>
                      </span> */}
                {/* <CKEditor
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                          formik.setFieldValue("about", editor.getData())
                        }}
                        data={formik.values.about}
                      /> */}
                {/* <textarea
                  name="about"
                  id=""
                  cols="30"
                  rows="3"
                  className="outline-none flex items-center w-full bg-white rounded-md p-3"
                  value={formik.values?.about}
                  onChange={(e) => formik.setFieldValue("about", e.target.value)}
                ></textarea> */}
                {/* <small className="text-red-500 text-xs">
                        {formik.errors.about}
                      </small>
                      <br />
                    </div> */}
              </div>
              <div className="space-y-5 max-[768px]:space-y-0">
                <h3 className="px-2">
                  {intl.formatMessage({ id: "ADDRESS" })}
                </h3>
                <div className="w-full flex flex-wrap">
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <span className="input-titel">
                      {intl.formatMessage({ id: "FLAT NO." })}
                    </span>
                    <input
                      type="text"
                      className="input"
                      name="flat_no"
                      value={formik.values?.flat_no}
                      onChange={(e) =>
                        formik.setFieldValue("flat_no", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.area}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <span className="input-titel">
                      {intl.formatMessage({ id: "STREET NAME." })}
                    </span>
                    <input
                      type="text"
                      className="input"
                      name="street"
                      value={formik.values?.street}
                      onChange={(e) =>
                        formik.setFieldValue("street", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.street}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <span className="input-titel">
                      {intl.formatMessage({ id: "AREA NAME." })}
                    </span>
                    <input
                      type="text"
                      className="input"
                      name="area"
                      value={formik.values?.area}
                      onChange={(e) =>
                        formik.setFieldValue("area", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.area}
                    </small>
                    <br />
                  </div>
                </div>
                <div className="w-full flex flex-wrap">
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "CITY" })}
                    </label>
                    <input
                      type="text"
                      className="input"
                      name="city"
                      value={formik.values?.city}
                      onChange={(e) =>
                        formik.setFieldValue("city", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.city}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "STATE" })}
                    </label>
                    <input
                      type="text"
                      className="input"
                      name="state"
                      value={formik.values?.state}
                      onChange={(e) =>
                        formik.setFieldValue("state", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.state}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "PINCODE" })}
                    </label>
                    <input
                      type="text"
                      className="input"
                      name="pincode"
                      value={formik.values?.pincode}
                      onChange={(e) =>
                        formik.setFieldValue("pincode", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.pincode}
                    </small>
                    <br />
                  </div>
                </div>
              </div>
              <div className="upload-holder px-2">
                <span className="input-titel ">
                  {intl.formatMessage({
                    id: "COMPANY PHOTOS MAX 5 IMAGES (UP TO 5MB/IMAGE)",
                  })}
                </span>
                <label
                  htmlFor="uploadimages"
                  {...getRootProps({ className: "upload upload-popup" })}
                >
                  <input
                    {...getInputProps()}
                    type="file"
                    name="images"
                    id="uploadimages"
                    className="appearance-none hidden"
                    onClick={() => photoChangeHandler()}
                  />
                  <span className="input-titel mt-1">
                    <i className="icon-image mr-2"></i>
                    {intl.formatMessage({ id: "UPLOAD IMAGES" })}
                  </span>
                </label>
                {error && (
                  <small className="text-red-500 text-xs">
                    {errorMessage}{" "}
                  </small>
                )}
                <br />
              </div>
              <div className="media-upload-holder ml-2">
                {imageList?.length !== 0 && (
                  <span className="input-titel">
                    {intl.formatMessage({ id: "UPLOADED PHOTO" })}
                  </span>
                )}
                <div className="flex flex-wrap herobox">
                  {imageList?.map((img, index) => (
                    <div key={index} className="mt-2 mr-2">
                      <div className="upload-box">
                        <div className="rounded relative overflow-hidden flex justify-center items-center h-full">
                          <img
                            src={s3Url + "/" + img.url}
                            alt={"upload-" + index}
                          />
                          <button
                            type="button"
                            onClick={() => removeImageClick(index)}
                          >
                            {intl.formatMessage({ id: "REMOVE" })}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="upload-holder px-2">
                <span className="input-titel ">
                  {intl.formatMessage({
                    id: "COMPANY VIDEO MAX 2 VIDEOS (UP TO 512MB/VIDEO)",
                  })}
                </span>
                <label htmlFor="upload2" className="upload">
                  <input
                    type="file"
                    name="images"
                    id="upload2"
                    className="appearance-none hidden"
                    onChange={videoChangeHandler}
                  />
                  <div className="mt-1 flex items-baseline justify-center">
                    <i className="icon-video-play text-base mr-2"></i>{" "}
                    <span className="input-titel pt-1">
                      {intl.formatMessage({ id: "UPLOAD VIDEOS" })}
                    </span>
                  </div>
                </label>
                {error2 && (
                  <small className="text-red-500 text-xs">
                    {errorMessage}{" "}
                  </small>
                )}
                <br />
              </div>
              <div className="media-upload-holder ml-2">
                {videoList?.length !== 0 && (
                  <span className="input-titel">
                    {intl.formatMessage({ id: "UPLOADED VIDEOS" })}
                  </span>
                )}
                <div className="flex space-x-2.5">
                  {videoList?.map((vid, index) => (
                    <div className="upload-box" key={index}>
                      <div className="rounded relative overflow-hidden h-full">
                        <video className="h-full">
                          <source
                            src={s3Url + "/" + vid.url}
                            alt={"upload-" + index}
                          />
                        </video>
                        <button
                          type="button"
                          onClick={() => removeVideoClick(index)}
                        >
                          {intl.formatMessage({ id: "REMOVE" })}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <span className="input-titel capitalize">
              {intl.formatMessage({
                id: "DISCLAIMER - THESE IMAGES AND VIDEOS WILL FIRST BE VERIFIED BY THE ADMIN AND THEN GIVEN THE AUTHORITY.",
              })}
            </span>
          </>
        )}
      </div>
      <div className={"prw-next-btn mt-auto " + (loading ? "hidden" : "")}>
        <button
          type="button"
          className="flex items-center"
          onClick={clickBackHander}
        >
          <i className="icon-back-arrow mr-3"></i>
          <h3>{intl.formatMessage({ id: "BACK" })}</h3>
        </button>
        <button type="submit" className="flex items-center active">
          <h3>{intl.formatMessage({ id: "NEXT" })}</h3>
          <i className="icon-next-arrow ml-3"></i>
        </button>
      </div>
    </form>
  );
};

export default EventCompanyDetails;
