import React, { useState } from "react";
import googlelogo from "../../assest/images/landing-page/google.webp";
import facebooklogo from "../../assest/images/landing-page/facebook.webp";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BgImage from "./BgImage";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { registration } from "./authSlice";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    country_code: "+91",
    refer_code: "",
    agentid: searchParams.get("agent_id") ? searchParams.get("agent_id") : null,
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordReqExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Full name is required*"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required*"),
    mobile: Yup.string()
      .required("Phone no is required")
      .matches(phoneRegExp, `Phone number is not valid`)
      .min(10, "Phone no is 10 digit required")
      .max(10, "Phone no is 10 digit required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .matches(passwordReqExp, `Make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.`
      )
      .required("Password is required*"),
    password2: Yup.string()
      .min(8, "Too Short!")
      .required("Password is required*"),
  });

  const clickSubmitHandler = async (values) => {
    if (values.password !== values.password2) {
      toast.warn("confirm password and password is not matching");
      return;
    }
    try {
      let payload = Object.assign({}, values);
      const response = await dispatch(registration(payload)).unwrap();
      if (response.data?.IsSuccess) {
        toast.success(response.data.IsSuccess?.Message);
        if (searchParams.get("agent_id")) {
          navigate(
            `../verify/${values.mobile}/${true}/?agent_id=${searchParams.get(
              "agent_id"
            )}`
          );
        } else {
          navigate(`../verify/${values.mobile}/${true}`);
        }
      } else {
        toast.error(response.data?.IsSuccess.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex w-full h-[100vh] flex-wrap bg-white">
        <BgImage />
        <div className="w-full h-full relative lg:w-1/2 flex px-4 overflow-y-auto py-5">
          <div className="max-w-md w-full m-auto">
            <h1>Create an Account</h1>
            <p className="sm:text-lg xl:text-xl text-quicksilver font-normal sm:pt-3.5">
              Let’s get you all set up you can verify your personal account and
              login setting up your profile
            </p>
            <div className="w-full pt-7 sm:pt-10">
              <Formik
                initialValues={initialState}
                validationSchema={ValidationSchema}
                onSubmit={clickSubmitHandler}
              >
                {({ errors, touched, formik }) => (
                  <Form className="space-y-5">
                    <div>
                      <label htmlFor="" className="input-titel">
                        Your Name
                      <span className="line-hight">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="input_box"
                        value={formik?.values.name}
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="input-titel">
                        Email
                        <span className="line-hight">*</span>
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="input_box"
                        value={formik?.values.email}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="" className="input-titel">
                        Phone Number
                        <span className="line-hight">*</span>
                      </label>
                      <Field
                        type="text"
                        name="mobile"
                        className="input_box"
                        value={formik?.values.mobile}
                      />
                      {/* <span className="cursor-pointer text-[#E58F0D] text-sm font-semibold absolute right-4 top-10" >Verify</span> */}
                      {/* <span className="cursor-pointer text-caribbeanGreen text-sm font-semibold absolute right-4 bottom-4" >Verify</span> */}
                      <ErrorMessage
                        name="mobile"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="flex justify-between flex-wrap space-y-5 sm:space-y-0">
                      <div className="relative w-full sm:w-[48%]">
                        <label htmlFor="" className="input-titel">
                          Password
                          <span className="line-hight">*</span>
                        </label>
                        <Field
                          type={isVisible ? "text" : "password"}
                          name="password"
                          className="input_box pr-10"
                          value={formik?.values.password}
                        />
                        <span
                          className={
                            isVisible
                              ? "icon-eye text-xl opacity-50 absolute right-3 top-10 cursor-pointer"
                              : "icon-pass-hide text-xl opacity-50 absolute right-3 top-10 cursor-pointer"
                          }
                          onClick={() => setIsVisible(!isVisible)}
                        ></span>
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 text-xs whitespace-nowrap"
                        />
                        {/* <span className="icon-eye text-xl opacity-50 absolute right-3 bottom-3 cursor-pointer"></span> */}
                      </div>
                      <div className="relative w-full sm:w-[48%]">
                        <label htmlFor="" className="input-titel">
                          Confirm Password
                          <span className="line-hight">*</span>
                        </label>
                        <Field
                          type={isVisible1 ? "text" : "password"}
                          name="password2"
                          className="input_box pr-10"
                          value={formik?.values.password2}
                        />
                        <span
                          className={
                            isVisible1
                              ? "icon-eye text-xl opacity-50 absolute right-3 top-10 cursor-pointer"
                              : "icon-pass-hide text-xl opacity-50 absolute right-3 top-10 cursor-pointer"
                          }
                          onClick={() => setIsVisible1(!isVisible1)}
                        ></span>
                        <ErrorMessage
                          name="password2"
                          component="span"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="" className="input-titel">
                        Refer Code
                      </label>
                      <Field
                        type="text"
                        name="refer_code"
                        className="input_box"
                        value={formik?.values.refer_code}
                      />
                      <span className="text-quicksilver text-sm font-light absolute right-0 top-0">
                        (Optional)
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-[15px] uppercase"
                    >
                      Register Now
                    </button>
                    {/* <div type="button" className="relative py-5">
                      <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-brightGray"></span>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max p-2 bg-white">
                        or
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        className="btn p-3 relative w-[48%] font-bold text-base text-japaneseIndigo border-2 border-[#D3DCEA] rounded"
                      >
                        <img
                          src={googlelogo}
                          className="absolute top-1/2 left-3.5 -translate-y-1/2"
                          alt="google"
                        />
                        Google
                      </button>
                      <button
                        type="button"
                        className="btn p-3 relative w-[48%] font-bold text-base text-japaneseIndigo border-2 border-[#D3DCEA] rounded"
                      >
                        <img
                          src={facebooklogo}
                          className="absolute top-1/2 left-3.5 -translate-y-1/2 w-4"
                          alt="google"
                        />
                        Facebook
                      </button>
                    </div> */}
                    <span className="block text-sm text-japaneseIndigo font-bold text-center">
                      Have an account? <Link to="../login">Login</Link>
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
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
      />
    </div>
  );
};

export default Register;
