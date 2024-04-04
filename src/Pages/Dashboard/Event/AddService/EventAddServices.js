import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "../../../../Common/Modals/Modal";
import EventPopUpAddService from '../../../../component/Popups/DashboardPopup/EventPopUpAddService';
import EventAddServicesListItem from './EventAddServiceListItem';
import StepProgressBar from '../../StepProgressBar';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { toast, ToastContainer } from 'react-toastify';
import { MoonLoader } from 'react-spinners';
import { selectServiceGet, servicesList, useSelectServices } from './addServiceSlice';
import { useIntl } from "react-intl";

const EventAddServices = () => {
	const intl = useIntl();
	const selectServices = useSelectServices();
	const displayName = localStorage.getItem("displayName");
	const navigate = useNavigate();
	const params = useParams();
	const eventType = params.eventType;
	const eventId = localStorage.getItem("eventId");
	const event_type = localStorage.getItem("event_type");
	const dispatch = useDispatch();
	const [isAddServicesPopUpOpen, setIsAddServicesPopUpOpen] = useState(false);
	const [serviceList, setServiceList] = useState([]);
	const [activeList, setActiveList] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(true);

	const getServiceList = async () => {
		try {
			const response = await dispatch(servicesList(event_type)).unwrap();
			if (response.data.Data) {
				setServiceList(response.data.Data);
				setLoading(false);
				await dispatch(selectServiceGet(eventId)).unwrap();
			}
			if (!response.data.IsSuccess) {
				toast.error(`${intl.formatMessage({ id: "ENABLE TO FETCH DATA." })}`);
			}
		} catch (error) {
			// toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
			console.log(error);
		}
	}

	useEffect(() => {
		let temp = selectServices?.services?.map(e => {
			return e._id
		})
		setActiveList(temp);
	}, [selectServices])

	useEffect(() => {
		getServiceList();
	}, [isAddServicesPopUpOpen, reload]);

	const clickNextHandler = () => {
		// toast.success("Services saved Successfully.");
		dispatch(increment());
		if (eventType === "hyp") navigate("../personaldetails");
		else if (eventType === "gsb") navigate(`../addequipments`)
		else navigate(`../othercost`);
	};

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}

	return (
		//  <!-- Content In -->
		<div className="wrapper min-h-full flex flex-col">
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i>
						<h1>{displayName}</h1>
					</div>
					<button onClick={() => setIsAddServicesPopUpOpen(true)} className="btn-primary flex items-center"><i className="icon-plus mr-3"></i><span>{eventType === "hyp" ? `${intl.formatMessage({ id: "ADD SERVICE" })}` : `${intl.formatMessage({ id: "ADD ITEM" })}`}</span></button>
				</div>
				{/* <!-- step-progress-bar  --> */}
				<StepProgressBar eventType={eventType} />
				{loading ?
					<MoonLoader
						cssOverride={{ margin: "100px auto" }}
						color={"#20c0E8"}
						loading={loading}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/> :
					<div className="pt-5 space-y-3">
						{serviceList?.map(element => <EventAddServicesListItem data={element} key={element._id} eventId={eventId} edit={true} setReload={setReload} activeList={activeList} setActiveList={setActiveList} />)}
					</div>
				}
			</div>
			{/* <!-- next preview button  --> */}
			<div className="prw-next-btn mt-auto">
				<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
				<button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>{intl.formatMessage({ id: "NEXT" })}</h3><i className="icon-next-arrow ml-3"></i></button>
			</div>
			<Modal isOpen={isAddServicesPopUpOpen}>
				<EventPopUpAddService isItem={eventType === "hyp" ? false : true} handleClose={setIsAddServicesPopUpOpen} setReload={setReload} edit={false} />
			</Modal>
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
	)
}

export default EventAddServices