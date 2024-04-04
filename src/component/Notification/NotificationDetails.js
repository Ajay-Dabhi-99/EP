import React, { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../../Common/Modals/Modal";
import { toast } from "react-toastify";
import NotificationDetailsPreviewPopup from "../Popups/NotificationPopup/NotificationDetailsPreviewPopup";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  photoUploadNotification,
  userCreateNotification,
} from "./notificationSlice";
import { useIntl } from "react-intl";
import { useFormik } from "formik";

const NotificationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("Token");
  const [banner, setBanner] = useState("");
  const notificationId = localStorage.getItem("notificationId");
  const [
    isNotificationDetailPreviewPopupOpen,
    setIsNotificationDetailPreviewPopupOpen,
  ] = useState(false);

  const ValidationSchema = Yup.object().shape({
    notification_title: Yup.string().required("Notification Title Is Required"),
    link: Yup.string().required("Link Is Required"),
  });

  const initialState = {
    notification_title: "",
    link: "",
  };

  const handelcreatNotification = async (values) => {
    try {
      const requestObj = {
        ...values,
        notificationid: notificationId,
        description: description,
        banner: banner,
      };
      console.log(requestObj, "requestObjrequestObj");
      const response = await dispatch(
        userCreateNotification(requestObj)
      ).unwrap();
      if (response.data.IsSuccess) {
        navigate("../");
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: ValidationSchema,
    onSubmit: handelcreatNotification,
  });

  const photoChangeHandler = (event) => {
    const types = ["image/png", "image/jpeg", "image/jpg"];
    let selected = event.target.files[0];
    console.log("selected", selected);
    try {
      if (selected && types.includes(selected.type)) {
        if (selected.size < 3 * 1024 * 1024) {
          setBanner(selected);
          addBanner(selected);
        } else {
          toast.warn(
            `${intl.formatMessage({ id: "FILE SIZE IS GREATER THAN 3MB" })}`
          );
        }
      } else {
        toast.warn(
          `${intl.formatMessage({
            id: "PLEASE SELECT IMAGE FILE WITH JPEG/PNG.",
          })}`
        );
      }
    } catch (error) {
      console.log(error);
      // toast.error(`${intl.formatMessage({ id: "ERROR WHILE SELECTING IMAGE." })}`);
    }
  };

  const addBanner = async (selected) => {
    const formData = new FormData();
    formData.append("file", selected);
    try {
      const response = await dispatch(
        photoUploadNotification(formData)
      ).unwrap();
      console.log(response.data.IsSuccess, "responseresponse");
      if (response.data.IsSuccess) {
        setBanner(response.data.Data.url);
        console.log(response);
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
    }
  };

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  return (
    <div className="wrapper min-h-full">
      <form onSubmit={formik.handleSubmit} className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <Link to="../../notification" className="flex items-center">
            <i className="icon-back-arrow mr-4 text-2xl"></i>
            <h1>{intl.formatMessage({ id: "CREATE NEW NOTIFICATION" })}</h1>
          </Link>
        </div>
        {/* <!-- main-content  --> */}
        <div className="space-y-5">
          <div className="w-full flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 inputHolder">
              <span className="input-titel text-lg text-japaneseIndigo font-bold">
                {intl.formatMessage({ id: "NOTIFICATION TITLE" })}
                <span className="line-hight">*</span>
              </span>
              <input
                type="text"
                className="input"
                name="notification_title"
                value={formik.values?.notification_title}
                onChange={(e) =>
                  setInputValue("notification_title", e.target.value)
                }
              />
              <small className="text-red-500 text-xs">
                {formik.errors.notification_title}
              </small>
            </div>
            <div className="w-full md:w-1/2 px-2 inputHolder max-[768px]:pt-3">
              <span className="input-titel text-lg text-japaneseIndigo font-bold">
                {intl.formatMessage({ id: "LINK" })}
                <span className="line-hight">*</span>
              </span>
              <input
                type="text"
                className="input"
                name="link"
                value={formik.values?.link}
                onChange={(e) => setInputValue("link", e.target.value)}
              />
              <small className="text-red-500 text-xs">
                {formik.errors.link}
              </small>
            </div>
          </div>
          <div className="upload-holder">
            <h3>
              <span className="flex items-end">
                {intl.formatMessage({ id: "PHOTO" })}
              </span>
            </h3>
            <label htmlFor="upload2" className="upload">
              <input
                type="file"
                name="images"
                id="upload2"
                className="appearance-none hidden"
                onChange={photoChangeHandler}
              />
              <div className="mt-1 flex items-baseline justify-center">
                <i className="icon-image text-base mr-2"></i>
                <span className="input-titel pt-1">
                  {intl.formatMessage({ id: "UPLOAD IMAGES" })}
                </span>
              </div>
            </label>
            <span className="input-titel ml-2">
              {banner
                ? banner.name || banner
                : `${intl.formatMessage({ id: "PLEASE SELECT IMAGES" })}`}
            </span>
          </div>
          <div className="w-full space-y-2.5">
            <h3>{intl.formatMessage({ id: "DESCRIPTION" })}</h3>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                setDescription(editor.getData());
              }}
            />
            {/* <div className="w-full bg-white rounded">
              <div className="p-8 w-full border-b-2 border-brightGray flex items-center space-x-6">
                <div className="flex space-x-2.5">
                  <button type="button">
                    <i className="icon-bold"></i>
                  </button>
                  <button type="button">
                    <i className="icon-capitals"></i>
                  </button>
                  <button type="button">
                    <i className="icon-underline"></i>
                  </button>
                  <button type="button">
                    <i className="icon-italic"></i>
                  </button>
                </div>
                <div className="flex space-x-2.5">
                  <button type="button">
                    <i className="icon-left-alignment"></i>
                  </button>
                  <button type="button">
                    <i className="icon-center-alignment"></i>
                  </button>
                  <button type="button">
                    <i className="icon-left-alignment-"></i>
                  </button>
                </div>
                <div className="flex space-x-2.5">
                  <button type="button">
                    <i className="icon-list-alpha text-xl"></i>
                  </button>
                  <button type="button">
                    <i className="icon-list text-xl"></i>
                  </button>
                  <button type="button">
                    <i className="icon-list-num text-xl"></i>
                  </button>
                </div>
              </div>
              <textarea
                cols="30"
                rows="5"
                className="w-full outline-none p-7 py-5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div> */}
          </div>
          {formik.values?.notification_title && formik.values?.link !== "" ? (
            <div className="text-right">
              <button
                type="button"
                className="btn-primary"
                onClick={(e) => setIsNotificationDetailPreviewPopupOpen(true)}
              >
                {intl.formatMessage({ id: "PREVIEW" })}
              </button>
            </div>
          ) : (
            ""
          )}
          {/* <BottomNavigation /> */}
          <div className="prw-next-btn mt-auto">
            <button type="button" className="flex items-center">
              <i className="icon-back-arrow mr-3"></i>
              <h3>{intl.formatMessage({ id: "BACK" })}</h3>
            </button>
            <button
              onClick={console.log("Click")}
              className="btn-primary"
              type="submit"
            >
              {intl.formatMessage({ id: "DONE" })}
            </button>
          </div>
        </div>
      </form>
      <Modal isOpen={isNotificationDetailPreviewPopupOpen}>
        <NotificationDetailsPreviewPopup
          handleClose={setIsNotificationDetailPreviewPopupOpen}
          notification_title={formik.values?.notification_title}
          link={link}
          banner={banner}
          description={description}
        />
      </Modal>
    </div>
  );
};

export default NotificationDetails;
