import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import Advertisement from "../Advertisement";
import { useDispatch } from 'react-redux';
import StepProgressBar from '../../StepProgressBar';
import { decrement, increment } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { s3Url } from '../../../../config';

import { aboutPlaces, aboutPlacesId, aboutPlacesPickUpload } from './eventAboutPlaceSlice';
import { useIntl } from "react-intl";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ToolTips from '../../../ToolTips';
import { MoonLoader } from 'react-spinners';

const EventAboutPlace = () => {
	const [bannerSrc, setbannerSrc] = useState();
	const intl = useIntl();
	const displayName = localStorage.getItem("displayName");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const [banner, setBanner] = useState("");
	const [priceType, setPriceType] = useState("per_day");
	const [clearTime, setClearTime] = useState("0");
	const [maxDay, setMaxDay] = useState("0");
	const [about, setAbout] = useState("");
	const [loading, setLoading] = useState(true);
	const eventId = localStorage.getItem("eventId");
	const eventType = params.eventType;

	const ValidationSchema = Yup.object().shape({
		place_price: Yup.number().typeError(`${intl.formatMessage({ id: "PRICE MUST BE A DIGIT" })}`).integer().positive(`${intl.formatMessage({ id: "PRICE MUST BE POSITIVE" })}`).required(`${intl.formatMessage({ id: "PRICE IS REQUIRED" })}`),
		person_capacity: Yup.number().typeError('Person Capacity must be a digit').integer().positive("Person Capacity must be positive"),
		parking_capacity: Yup.number().typeError('Parking Capacity must be a digit').integer().positive("Parking Capacity must be positive"),
		// clearing_time: Yup.number()
		// 	.typeError(`${intl.formatMessage({ id: "CLEARING TIME MUST BE A DIGIT" })}`)
		// 	.required(`${intl.formatMessage({ id: "CLEARING TIME IS REQUIRED*" })}`),
		clearing_time: Yup.string()
			.typeError('TIME MUST BE A DIGIT')
			.matches(/^[0-9]|[.]*$/, `${intl.formatMessage({ id: "CLEARING TIME MUST BE A DIGIT" })}`)
			.required(`${intl.formatMessage({ id: "CLEARING TIME IS REQUIRED*" })}`),
		max_day: Yup.string().nullable(true)
			.test('len', 'MAX DAY SHOULD BE POSITIVE DIGIT', val => val >= 0)
	});

	const removeImage = () => {
		setbannerSrc("")
		setBanner("")
	}

	const initialState = {
		place_price: "",
		clearing_time: "0",
		max_day: "0",
		person_capacity: "0",
		parking_capacity: "0",
	}


	const clickNextHandler = async (values) => {
		if (about.length < 2001) {

			const payload = {
				...values,
				eventid: eventId,
				price_type: priceType,
				details: about,
				banner: banner,
			}
			try {
				const response = await dispatch(aboutPlaces(payload)).unwrap();
				if (response.data.IsSuccess) {
					toast.success(response.data.Message);
					dispatch(increment());
					navigate("../location");

				} else {
					toast.error(response.data.Message);
				}


			} catch (error) {
				console.log(error);
				// toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
			}
		} else {
			toast.error(`${intl.formatMessage({ id: "ABOUT TEXT LIMIT EXCEEDED!" })}`);
		}
	}

	const addBanner = async (selected) => {
		const formData = new FormData();
		formData.append("file", selected);
		try {
			const response = await dispatch(aboutPlacesPickUpload(formData)).unwrap();
			if (response.data.IsSuccess) {
				setBanner(response.data.Data.url);
				// toast.success(response.data.Message);
			} else {
				toast.error(response.data.Message);
			}
		} catch (error) {
			console.log(error);
			// toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
		}
	}

	const photoChangeHandler = (event) => {
		const types = ['image/png', 'image/jpeg', 'image/jpg'];

		let selected = event.target.files[0];
		setbannerSrc(URL.createObjectURL(selected))

		try {
			if (selected && types.includes(selected.type)) {
				if (selected.size < (3 * 1024 * 1024)) {
					setBanner(selected);
					addBanner(selected);
				}
				else {
					toast.warn(`${intl.formatMessage({ id: "FILE SIZE IS GREATER THAN 3MB" })}`);
				}
			} else {
				toast.warn(`${intl.formatMessage({ id: "PLEASE SELECT IMAGE FILE WITH JPEG/PNG." })}`);
			}
		} catch (error) {
			console.log(error);
			// toast.error(`${intl.formatMessage({ id: "ERROR WHILE SELECTING IMAGE." })}`); 
		}
	}

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}
	const formik = useFormik({
		initialValues: initialState,
		validationSchema: ValidationSchema,
		onSubmit: clickNextHandler,
	});

	const getAboutPlace = async () => {
		try {
			const response = await dispatch(aboutPlacesId(eventId)).unwrap()
			setLoading(false);
			console.log(response.data.Data);
			if (response.data.Data.aboutplace) {
				setAbout(response.data.Data.aboutplace.details);
				// setParkingcapacity(response.data.Data.aboutplace.parkingcapacity);
				// setPersoncapacity(response.data.Data.aboutplace.personcapacity);
				formik.setValues(response.data.Data.aboutplace);
				setPriceType(response.data.Data.aboutplace.price_type);
				setBanner(response.data.Data.aboutplace.banner);
				setbannerSrc(s3Url + "/" + response.data.Data.aboutplace.banner)
				setClearTime(response.data.Data.aboutplace.clearing_time);
				setMaxDay(response.data.Data.aboutplace.max_day);
			}
			if (!response.data.IsSuccess) {
				toast.error(`${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`)
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAboutPlace();
	}, []);

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);

	return (
		//  <!-- Content In -->
		<form onSubmit={formik.handleSubmit}>
			<div className="wrapper min-h-full flex flex-col">
				<div className="space-y-8 h-full">
					{/* <!-- title-holder  -->/ */}
					<div className="flex justify-between items-center">
						<div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i>
							<h1>{displayName}</h1>
						</div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					{/* <!-- main-content  --> */}
					{loading ?
						<MoonLoader
							cssOverride={{ margin: "100px auto" }}
							color={"#20c0E8"}
							loading={loading}
							size={50}
							aria-label="Loading Spinner"
							data-testid="loader"
						/> :
						<div className="space-y-3">
							<div className="upload-holder">
								<span className="input-titel ml-2">{intl.formatMessage({ id: "PLACE BANNER" })}</span>
								<label htmlFor="upload" className="upload relative flex justify-center items-center h-40 p-0">

									<input type="file" name="images" id="upload" className="appearance-none hidden" onChange={photoChangeHandler} />
									{bannerSrc ? <>
										<button className='absolute right-2 top-2 bg-sky-500/75 ... w-16 h-7 text-white' type="button" onClick={() => removeImage()}>Remove</button>
										<img src={bannerSrc} className="w-full h-full object-cover" />
									</> :
										<span className="input-titel flex justify-center"><i className="icon-image mr-2"></i>{intl.formatMessage({ id: "UPLOAD IMAGES" })}</span>
									}
								</label>
								<span className="input-titel ml-2">{banner ? (banner.name || banner) : `${intl.formatMessage({ id: "PLEASE SELECT IMAGES" })}`}</span>
							</div>

							{/* option 1 */}
							<div className="flex space-x-3 max-[820px]:flex-col max-[820px]:items-start max-[820px]:space-x-0">
								<div className={"inputHolder " + (priceType === "per_day" && true ? 'w-8/12 max-[820px]:w-full' : (priceType === "per_event" ? 'w-7/12 2xl:w-8/12 max-[820px]:w-full' : 'w-7/12 2xl:w-8/12 max-[820px]:w-full') && (priceType === "per_hour" ? 'w-8/12 max-[820px]:w-full' : 'w-8/12 max-[820px]:w-full'))}>
									<span className="input-titel">{intl.formatMessage({ id: "PRICE" })}<span className='line-hight'>*</span></span>
									<label htmlFor="" className="flex items-center w-full bg-white p-2 px-3.5 rounded-md max-[640px]:flex-col">
										<div className="w-full inputHolder max-[820px]:pb-1">
											<input type="text" className="w-full outline-none text-spiroDiscoBall font-bold text-base"
												value={formik.values?.place_price} name="place_price" onChange={(e) => setInputValue("place_price", e.target.value)} />
										</div>
										<div className="selectPrice flex items-center space-x-3 max-[768px]:w-full max-[768px]:justify-between">
											<label className="block cursor-pointer">
												<input type="radio" name="price" value="per_day" checked={priceType === "per_day" && true} className="hidden" onChange={(e) => setPriceType("per_day")} />
												<span
													className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
													{intl.formatMessage({ id: "PER" })} / {intl.formatMessage({ id: "DAY" })}
												</span>
											</label>
											<label className="block cursor-pointer">
												<input type="radio" name="price" value="per_hour" className="hidden" checked={priceType === "per_hour" && true} onChange={(e) => setPriceType("per_hour")} />
												<span
													className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
													{intl.formatMessage({ id: "PER" })} / {intl.formatMessage({ id: "HOUR" })}
												</span>
											</label>
											<label className="block cursor-pointer">
												<input type="radio" name="price" value="per_event" className="hidden" checked={priceType === "per_event" && true} onChange={(e) => setPriceType("per_event")} />
												<span
													className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
													{intl.formatMessage({ id: "PER" })} / {intl.formatMessage({ id: "EVENT" })}
												</span>
											</label>
										</div>
									</label>
									<small className="text-red-500 text-xs">{formik.errors.place_price}</small>
								</div>
								<div className={"inputHolder " + (priceType === "per_hour" ? 'w-4/12 max-[820px]:w-full' : (priceType === "per_event" ? 'w-4/12 2xl:w-2/12 max-[820px]:w-full' : (priceType === "per_day" ? 'w-4/12 max-[820px]:w-full' : 'hidden')))}>
									<div className='flex justify-start items-center'>
										<label className="input-titel ">{intl.formatMessage({ id: "CLEARING TIME (IN HOURS)" })} <span className="line-hight">*</span></label>
										<svg className="w-5 h-5 tooltip" data-pr-tooltip="After completion of your event, you must clear the place within the time you mention here."
											data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
										</svg>
										<ToolTips />
									</div>
									<input type="text" className="input py-[14px]" step='0.5' name='clearning time' value={formik.values?.clearing_time} onChange={(e) => setInputValue("clearing_time", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.clearing_time}</small>
								</div>
								{priceType === "per_event" ?
									<div className={"inputHolder " + (priceType === "per_event" ? 'w-2/12 max-[820px]:w-full' : 'hidden')}>
										<label className="input-titel">{intl.formatMessage({ id: "MAX DAY (IN DAYS)" })}</label>
										<input type="text" className="input py-[14px]" name='max_day' value={formik.values?.max_day} onChange={(e) => setInputValue("max_day", e.target.value)} required />
										<small className="text-red-500 text-xs">{formik.errors.max_day}</small>
									</div>
									: ""}
							</div>




							<div className="w-full inputHolder">
								<span className="input-titel">{intl.formatMessage({ id: "PERSON CAPACITY" })}<span>*</span></span>
								<input type="text" className="input font-bold" name="person_capacity" value={formik.values?.person_capacity} onChange={(e) => setInputValue("person_capacity", e.target.value)} />
							</div>
							<small className="text-red-500 text-xs">{formik.errors.person_capacity}</small>
							<div className="w-full inputHolder">
								<span className="input-titel">{intl.formatMessage({ id: "PARKING CAPACITY" })}<span>*</span></span>
								<input type="text" className="input font-bold" name="parking_capacity" value={formik.values?.parking_capacity} onChange={(e) => setInputValue("parking_capacity", e.target.value)} />
							</div>
							<small className="text-red-500 text-xs">{formik.errors.parking_capacity}</small>

							<div className="w-full space-y-2.5">
								<h3>{intl.formatMessage({ id: "ABOUT PLACE" })}<span className="text-xs" style={{
									color: '#20C0E8'
								}}> {about.length} / </span><span className='text-xs'>2000</span></h3>
								<CKEditor
									editor={ClassicEditor}
									onChange={(event, editor) => {
										setAbout(editor.getData());
									}}
									data={about}
								/>
							</div>

						</div>
					}
					{/* <!-- advisement --> */}
					{/* <Advertisement /> */}
				</div>
				<div className={"prw-next-btn mt-auto " + (loading ? "hidden" : '')}>
					<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
					<button type="submit" className="flex items-center active" ><h3>{intl.formatMessage({ id: "NEXT" })}</h3><i className="icon-next-arrow ml-3"></i></button>
				</div>
			</div>
		</form>
	)
}

export default EventAboutPlace