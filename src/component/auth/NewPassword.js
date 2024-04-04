import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BgImage from "./BgImage";
import { toast, ToastContainer } from "react-toastify";
import { newPassword } from "./authSlice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";


const NewPassword = () => {
	const dispatch = useDispatch()
	const parmas = useParams();
	const username = parmas.username;
	const navigate = useNavigate();
	const [pass, setPass] = useState("");
	const [cpass, setCpass] = useState("");
	const [isVisible, setIsVisible] = useState(false);


  const initialState = {
    password: ""
  };

	const ValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `Make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.`
      )
      .required("Password is required*"),
    password2: Yup.string()
      .min(6, "Too Short!")
      .required("Password is required*"),
  });

	const onSubmitHandler = async (values) => {
		// values.preventDefault();
		const payload = {
			mobile: username,
			password: values.password,
		}
		if (values.password !== values.password2) {
			toast.warn("confirm password and password is not matching");
      return;
    }
		try {
			const response = await dispatch(newPassword(payload)).unwrap()
			if (response.data?.IsSuccess) {
				toast.success(response.data?.Message);
				setTimeout(() => {
					navigate("../login");
				}, 200);
			} else {
				toast.error(response.data?.Message);
			}
		} catch (err) {
			toast.error("Error while resetting password");
			console.log(err);
		}
	}

	// const onSubmitHandler = (v) => {
	// 	console.log("in fun");
	// }
	// const formik = useFormik({
  //   initialValues: initialState,
  //   validationSchema: validationSchema,
  //   onSubmit: onSubmitHandler,
  // });

	return (
		<div className="flex min-h-screen overflow-hidden">
			<div className="flex w-full flex-wrap bg-white">
				<BgImage />
				<div className="w-full relative lg:w-1/2 flex px-4 overflow-y-auto py-5">
					<div className="max-w-md w-full m-auto">
						<h1>Enter new Password</h1>
						<p className="sm:text-lg xl:text-xl text-quicksilver font-normal sm:pt-3.5">Please enter a new password</p>
						<div className="w-full pt-7 sm:pt-10">
						<Formik
                initialValues={initialState}
                validationSchema={ValidationSchema}
                onSubmit={onSubmitHandler}
              >
							 {({ errors, touched, formik }) => (
							<Form className="space-y-5">
								<div className="relative">
									<label htmlFor="" className="input-titel">Password</label>
									<Field name="password" className="input_box pr-10" value={formik?.values.password} type="password" />
									<ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 text-xs whitespace-nowrap"
                        />
									{/* <input name="Phone Number" className="input_box pr-10" onChange={(e)=>setPass(e.target.value)} type={isVisible?"text":"password"} /> */}
									{/* <span className={isVisible ? "icon-eye text-xl opacity-50 absolute right-3 bottom-3 cursor-pointer" : "icon-pass-hide text-xl opacity-50 absolute right-3 bottom-3 cursor-pointer"} onClick={()=>setIsVisible(!isVisible)}></span> */}
								</div>
								<div className="relative">
									<label htmlFor="" className="input-titel">Confirm Password</label>
									<Field name="password2" className="input_box pr-10" value={formik?.values.password2} type={isVisible ? "text" : "password"} />
									<span className={isVisible ?
										"icon-eye text-xl opacity-50 absolute right-3 bottom-3 cursor-pointer" :
										"icon-pass-hide text-xl opacity-50 absolute right-3 bottom-3 cursor-pointer"}
										onClick={() => setIsVisible(!isVisible)}>
									</span>
									<ErrorMessage
                          name="password2"
                          component="span"
                          className="text-red-500 text-xs"
                        />
								</div>
								<button  type="submit" className="btn-primary w-full py-[15px] uppercase">Submit a new password</button>
							</Form>
							 )}
							 </Formik>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-right"
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
}

export default NewPassword
