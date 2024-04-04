import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgImage from "./BgImage";
import { useDispatch } from "react-redux";
import { forgotPassword } from "./authSlice";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useIntl } from "react-intl";
import { toast, ToastContainer } from "react-toastify";


const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();



  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const ValidationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(phoneRegExp, `${intl.formatMessage({ id: "PHONE NUMBER IS NOT VALID" })}`)
      .required(`${intl.formatMessage({ id: "PHONE NO IS REQUIRED" })}`)
      .min(10, `${intl.formatMessage({ id: "PHONE NO IS 10 DIGIT REQUIRED" })}`)
      .max(10, `${intl.formatMessage({ id: "PHONE NO IS 10 DIGIT REQUIRED" })}`)
  });

  const initialState = {
    mobile: ""
  }

  const sendVerificationCode = async (values) => {
    try {
      if (values && values.mobile && values.mobile != '') {
        const payload = {
          mobile: values.mobile
        };
        // console.log("pay", payload);
        const response = await dispatch(forgotPassword(payload)).unwrap();
        if (response.data?.IsSuccess) {
          toast.success(response.data?.Message);
          setTimeout(() => {
            navigate(`../verify/${payload.mobile}/false`);
          }, 700);
        } else {
          toast.error(response.data?.Message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: ValidationSchema,
    onSubmit: sendVerificationCode
  });

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-wrap bg-white">
        <BgImage />
        <div className="w-full relative lg:w-1/2 flex px-4">
          <div className="max-w-md w-full m-auto">
            <h1 className="whitespace-nowrap">Forgotten Password?</h1>
            <p className="sm:text-lg xl:text-xl text-quicksilver font-normal sm:pt-3.5 xl:pr-8">
              Please enter your Phone number to Receive and Verification Code.
            </p>
            <div className="w-full pt-7 sm:pt-10">
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div>
                  <label className="input-titel">Phone number</label>
                  <input
                    type="text"
                    name="mobile"
                    className="input_box"
                    onChange={(e) => setInputValue("mobile", e.target.value)}
                    value={formik.values?.mobile}
                  />
                </div>
                <small className="text-red-500 text-xs">{formik.errors.mobile}</small>
                <button
                  type="submit"
                  className="btn-primary w-full py-[15px] uppercase"
                  onClick={sendVerificationCode}
                >
                  Send Verification Code
                </button>
              </form>
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

export default ForgetPassword;
