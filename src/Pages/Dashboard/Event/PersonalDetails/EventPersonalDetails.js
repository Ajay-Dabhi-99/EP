import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Advertisement from '../Advertisement';
import StepProgressBar from "../../StepProgressBar";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
} from "../../../../Common/CommonSlice/stepProgressCountSlice";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  getProfileDetails,
  useProfileDetails,
} from "../../../Profile/profileSlice";
import { personalDetailId, personalDetails, pincodematchs } from "./personalDetailsSlice";
import { useIntl } from "react-intl";
import { MoonLoader } from 'react-spinners';
import axios from "axios";
import { baseUrl } from "../../../../api/baseUrl";

const EventPersonalDetails = () => {
  const intl = useIntl();
  const profileDetails = useProfileDetails();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventType = params.eventType;
  const eventId = localStorage.getItem("eventId");
  const displayName = localStorage.getItem("displayName");
  const [loading, setLoading] = useState(true);
  const [pinLoading, setPinLoading] = useState(false);

  const ValidationSchema = Yup.object().shape({
    professional_skill: Yup.string(),
    full_name: Yup.string()
      .min(2, `${intl.formatMessage({ id: "TOO SHORT!" })}`)
      .max(40, `${intl.formatMessage({ id: "TOO LONG!" })}`)
      .required(`${intl.formatMessage({ id: "FULL NAME IS REQUIRED*" })}`),
    country_code: Yup.string().required(`${intl.formatMessage({ id: "COUNTRY CODE IS REQUIRED*" })}`),
    mobile: Yup.number()
      .typeError(`${intl.formatMessage({ id: "CONTACT NUMBER MUST BE A DIGIT" })}`)
      .integer()
      .positive(`${intl.formatMessage({ id: "CONTACT NUMBER MUST BE POSITIVE" })}`)
      .required(`${intl.formatMessage({ id: "CONTACT NUMBER IS REQUIRED" })}`),
    alt_mobile_no: Yup.string()
      .matches(/^[0-9]*$/, `${intl.formatMessage({ id: "CONTACT NUMBER MUST BE A DIGIT" })}`)
      .min(10, `${intl.formatMessage({ id: "CONTACT NUMBER SHOULD BE TEN DIGIT LONG." })}`)
      .max(10, `${intl.formatMessage({ id: "CONTACT NUMBER BE TEN DIGIT LONG." })}`),
    email: Yup.string()
      .email(`${intl.formatMessage({ id: "INVALID EMAIL FORMAT" })}`)
      .required(`${intl.formatMessage({ id: "EMAIL ADDRESS IS REQUIRED*" })}`),
    flat_no: Yup.string(),
    street: Yup.string(),
    area: Yup.string(),
    city: Yup.string()
      .matches(/^[a-zA-Z ]*$/, `${intl.formatMessage({ id: "CITY NAME CAN ONLY CONTAIN ENGLISH CHARACTERS" })}`)
      .required(
        `${intl.formatMessage({ id: "CITY NAME IS REQUIRED*" })}`
      ),
    state: Yup.string()
      .matches(/^[a-zA-Z ]*$/, `${intl.formatMessage({ id: "STATE NAME CAN ONLY CONTAIN ENGLISH CHARACTERS" })}`)
      .required(
        `${intl.formatMessage({ id: "STATE NAME IS REQUIRED*" })}`
      ),
    pincode: Yup.string()
      .matches(/^[0-9]*$/, `${intl.formatMessage({ id: "THE VALUE MUST BE A DIGIT" })}`)
      .min(6, `${intl.formatMessage({ id: "PINCODE SHOULD BE SIX DIGIT LONG." })}`)
      .max(6, `${intl.formatMessage({ id: "PINCODE SHOULD BE SIX DIGIT LONG." })}`)
      .required(`${intl.formatMessage({ id: "PINCODE IS REQUIRED*" })}`),
  });

  const initialState = {
    professional_skill: "",
    full_name: "",
    country_code: "",
    mobile: "",
    alt_mobile_no: "",
    email: "",
    flat_no: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  };
  const [mobileNoHidden, setMobileNoHidden] = useState(false);
  const [emailHidden, setEmailHidden] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [count, setCount] = useState(false);

  const clickNextHandler = async (values) => {
    setPinLoading(true);
    const arrCity = (values.city).split(" ");
    const arrState = (values.state).split(" ");

    for (let i = 0; i < arrCity.length; i++) {
      arrCity[i] = arrCity[i].charAt(0).toUpperCase() + arrCity[i].slice(1);
    }
    values.city = arrCity.join(" ");
    for (let i = 0; i < arrState.length; i++) {
      arrState[i] = arrState[i].charAt(0).toUpperCase() + arrState[i].slice(1);

    }
    values.state = arrState.join(" ");
    try {
      // const pinResponse = await dispatch(pincodematchs(values?.pincode)).unwrap();
      const pinResponse = await axios.get(`https://api.postalpincode.in/pincode/${values?.pincode}`);
      if (pinResponse.data[0].Status) {
        if (pinResponse.data[0].PostOffice[0].State === values.state) {
          if (pinResponse.data[0].PostOffice[0].District === values.city) {

            let payload = {
              ...values,
              is_mobile_no_hidden: mobileNoHidden,
              is_email_hidden: emailHidden,
              eventid: eventId,
            };
            try {
              const response = await dispatch(personalDetails(payload)).unwrap();
              if (response.data.IsSuccess) {
                dispatch(increment());
                navigate(`../companydetails`);
                setPinLoading(false);
              } else {
                toast.error(response.data.Message);
              }
            } catch (error) {
              toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
              navigate(`/auth/login`);
              console.log(error);
              setPinLoading(false);
            }
          } else {
            toast.error(`${intl.formatMessage({ id: "PINCODE IS NOT MATCHING WITH CITY OR STATE." })}`);
            setPinLoading(false);
          }
        } else {
          toast.error(`${intl.formatMessage({ id: "PINCODE IS NOT MATCHING WITH CITY OR STATE." })}`);
          setPinLoading(false);
        }
      } else {
        toast.error(`${intl.formatMessage({ id: "PINCODE IS NOT VALID." })}`);
        setPinLoading(false);
      }
    } catch (error) {
      toast.error(`${intl.formatMessage({ id: "PINCODE IS NOT VALID." })}`)
      setPinLoading(false);
    }
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: ValidationSchema,
    onSubmit: clickNextHandler,
  });

  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
      // setCode(code);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // navigate(`/auth/login`);
    }
    setCount(true);
  };

  useEffect(() => {
    formik.values.full_name = profileDetails?.name;
    formik.values.mobile = profileDetails?.mobile;
    formik.values.email = profileDetails?.email;
    formik.values.country_code = profileDetails?.country_code;
  }, [profileDetails]);

  const getPersonalDetails = async () => {
    try {
      const response = await dispatch(personalDetailId(eventId)).unwrap();
      setLoading(false);
      if (response.data.Data.personaldetail) {
        formik.setValues(response.data.Data.personaldetail);
      }
      if (!response.data.IsSuccess) {
        toast.error(`${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`);
      }
    } catch (error) {
      console.log(error);
    }
    // formik.values.full_name = nam
  };
  // useEffect(() => {
  // 	// getProfile();
  // 	getPersonalDetails();
  // }, []);
  useEffect(() => {
    getProfile();
    getPersonalDetails();
  }, [count]);

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );
  return (
    <form onSubmit={formik.handleSubmit} className="wrapper min-h-full flex flex-col">
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
        {
          loading ?
            <MoonLoader
              cssOverride={{ margin: "100px auto" }}
              color={"#20c0E8"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            :
            <div className="space-y-5 -mx-2 max-[768px]:space-y-1">
              <div className="w-full flex items-end flex-wrap">
                <div className="w-full md:w-1/2 px-2 inputHolder">
                  <span className="input-titel">{intl.formatMessage({ id: "PROFESSIONAL SKILL" })}</span>
                  <input
                    type="text"
                    className="input"
                    name="professional_skill"
                    value={formik.values?.professional_skill}
                    onChange={(e) =>
                      setInputValue("professional_skill", e.target.value)
                    }
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.professional_skill}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/2 px-2 inputHolder">
                  <span className="input-titel">{intl.formatMessage({ id: "FULL NAME" })}({intl.formatMessage({ id: "MR" })} / {intl.formatMessage({ id: "MRS" })} / {intl.formatMessage({ id: "MS" })})
                    <span>*</span>
                  </span>
                  <input
                    type="text"
                    className="input"
                    name="full_name"
                    value={formik.values?.full_name}
                    disabled
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.full_name}
                  </small>
                  <br />
                </div>
              </div>
              <div className="w-full flex items-end flex-wrap">
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <div className="input-label-holder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "MOBILE NUMBER" })} <span>*</span>
                    </label>
                    {/* <div className="input-checkd">
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="is_mobile_hidden"
                      onChange={() => setMobileNoHidden(!mobileNoHidden)}
                    />
                    {intl.formatMessage({ id: "HIDDEN" })}
                  </div> */}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      className="input max-w-[80px] w-full mr-3"
                      name="country-code"
                      value={formik.values?.country_code}
                      disabled
                    />
                    <input
                      type="text"
                      className="input"
                      name="mobile"
                      value={formik.values?.mobile}
                      disabled
                    />
                  </div>
                  <small className="text-red-500 text-xs">
                    {formik.errors.mobile}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <label className="input-titel">
                    {intl.formatMessage({ id: "ALTERNATIVE" })} {intl.formatMessage({ id: "MOBILE NUMBER" })} <span></span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    name="alt_mobile_no"
                    value={formik.values?.alt_mobile_no}
                    onChange={(e) => setInputValue("alt_mobile_no", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.alt_mobile_no}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <div className="input-label-holder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "EMAIL ADDRESS" })} <span>*</span>
                    </label>
                    {/* <div className="input-checkd">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => setEmailHidden(!emailHidden)}
                    />
                    {intl.formatMessage({ id: "HIDDEN" })}
                  </div> */}
                  </div>
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={formik.values?.email}
                    readOnly
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.email}
                  </small>
                  <br />
                </div>
              </div>
              <div className="space-y-5 max-[768px]:space-y-0">
                <h3 className="px-2">{intl.formatMessage({ id: "ADDRESS" })}</h3>
                <div className="w-full flex flex-wrap">
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <span className="input-titel">{intl.formatMessage({ id: "FLAT NO." })}</span>
                    <input
                      type="text"
                      className="input"
                      name="flat_no"
                      value={formik.values?.flat_no}
                      onChange={(e) => setInputValue("flat_no", e.target.value)}
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.flat_no}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <span className="input-titel">{intl.formatMessage({ id: "STREET NAME." })}</span>
                    <input
                      type="text"
                      className="input"
                      name="street"
                      value={formik.values?.street}
                      onChange={(e) => setInputValue("street", e.target.value)}
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.street}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <span className="input-titel">{intl.formatMessage({ id: "AREA NAME." })}</span>
                    <input
                      type="text"
                      className="input"
                      name="area"
                      value={formik.values?.area}
                      onChange={(e) => setInputValue("area", e.target.value)}
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
                      {intl.formatMessage({ id: "CITY" })} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="input"
                      name="city"
                      value={formik.values?.city}
                      onChange={(e) => setInputValue("city", e.target.value)}
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.city}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "STATE" })} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="input"
                      name="state"
                      value={formik.values?.state}
                      onChange={(e) => setInputValue("state", e.target.value)}
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.state}
                    </small>
                    <br />
                  </div>
                  <div className="w-full md:w-1/3 px-2 inputHolder">
                    <label className="input-titel">
                      {intl.formatMessage({ id: "PINCODE" })} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="input"
                      name="pincode"
                      value={formik.values?.pincode}
                      onChange={(e) => setInputValue("pincode", e.target.value)}
                    />
                    <small className="text-red-500 text-xs">
                      {formik.errors.pincode}
                    </small>
                    <br />
                  </div>
                </div>
              </div>
            </div>
        }
        {/* <!-- advisement --> */}
        {/* <Advertisement /> */}
      </div>
      <div className="prw-next-btn flex items-center mt-auto">
        <button
          type="button"
          className="flex items-center"
          onClick={clickBackHander}
        >
          <i className="icon-back-arrow mr-3"></i>
          <h3>{intl.formatMessage({ id: "BACK" })}</h3>
        </button>
        {pinLoading ?
          <button type="submit" className="flex items-center active">
            <svg className="flex items-center justify-center" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#20C0E8">
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
          </button>
          :
          <>
            <button type="submit" className="flex items-center active">
              <h3>{intl.formatMessage({ id: "NEXT" })}</h3>
              <i className="icon-next-arrow ml-3"></i>
            </button>
          </>
        }
      </div>
    </form>
  );
};

export default EventPersonalDetails;
