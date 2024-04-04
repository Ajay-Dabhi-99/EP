import React, { useState } from 'react';
import { s3Url } from '../../../../config';
import Modal from '../../../../Common/Modals/Modal';
import EventPopUpAddService from '../../../../component/Popups/DashboardPopup/EventPopUpAddService';
import imagePreview from "../../../../assest/images/image-preview.png";
import { selectService } from './addServiceSlice';
import { useDispatch } from 'react-redux';
import { useIntl } from "react-intl";
import RemoveServices from '../../../../component/Popups/DashboardPopup/RemoveServices';
import ToolTips from '../../../ToolTips';

const EventAddServiceListItem = ({ data, edit, eventId, setReload, setActiveList, activeList }) => {
	const intl = useIntl();
	const [isAddServicesPopUpOpen, setIsAddServicesPopUpOpen] = useState(false);
	const [removeService, setRemoveService] = useState(false);
	const dispatch = useDispatch()
	const [isLive, setIsLive] = useState(false);


	const addService = () => {
		if (isLive && !activeList.includes(data._id)) {
			setActiveList(current => [...current, data._id]);
		}
		if (activeList.includes(data._id)) {
			setActiveList(current => current.filter(e => e !== data._id))
		}
	}

	const toggleService = async (e) => {
		let serviceList = [];
		if (e.target.checked) {
			serviceList = [...activeList, data._id];
		} else {
			serviceList = [...activeList.filter(e => e !== data._id)];
		}
		try {
			let payload = {
				eventid: eventId,
				services: serviceList
			}
			await dispatch(selectService(payload)).unwrap()
			setReload(current => !current);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="bg-white rounderd px-7 py-4 max-[600px]:px-4">
			<div className="flex justify-between max-[600px]:flex-col">
				<div className="max-[600px]:justify-center max-[600px]:flex">
					<div className="w-28 max-[600px]:w-80 max-[600px]:h-64 h-28 border-2 border-brightGray rounded-md">
						<img src={data?.photos[0]?.url ? s3Url + "/" + data?.photos[0]?.url : imagePreview} alt="" className="w-full h-full object-cover" />
					</div>
				</div>
				<div className="w-full pl-5 max-[600px]:pt-2 max-[600px]:px-2">
					<div className="flex justify-between max-[600px]:flex-col-reverse">
						<h2 className='max-[600px]:pt-3'>{data.name}</h2>
						<div className="flex items-center space-x-5 max-[600px]:space-x-3 max-[600px]:justify-between max-[600px]:flex-wrap">
							<div className='flex items-center'>
							<div className="flex items-center">
								{data.is_approved === true ?
									<input type="checkbox" checked={activeList?.includes(data?._id)} id="on" className="switch mx-3 order-2" onChange={toggleService} /> :
									<input type="checkbox" className="switch mx-3 order-2 opacity-30 " id="on" disabled />
								}
								<span className="off text-base font-bold anim order-1 text-caribbeanGreen">{intl.formatMessage({ id: "OFF" })}</span>
								<span className="on text-base font-bold anim order-3">{intl.formatMessage({ id: "ON" })}</span>
							</div>
							<svg className="w-5 h-5 tooltip ml-2" data-pr-tooltip={intl.formatMessage({ id: "ADMIN APPROVED THAN ON OFF DO IT" })}
								data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
							</svg>
							<ToolTips />
							</div>
							{data.quantity && <span style={{ width: '120px' }}
								className="inline-block text-base text-spiroDiscoBall font-bold text-center bg-brightGray py-1.5 px-3.5 rounded">{data.quantity} Qty</span>}
							<a href="#" title="Delete" onClick={() => { setRemoveService(true) }}><i className="text-center icon-fill-delete text-xl"></i></a>
							<a href="#" title="Edit" onClick={() => setIsAddServicesPopUpOpen(true)}><i className="text-center icon-edit text-xl"></i></a>
						</div>
					</div>
					<p className="text-quicksilver text-sm font-normal leading-6 pt-3 max-[600px]:pt-0 xl:max-w-[90%]"> {data.description} </p>
					{/* <p className="text-quicksilver text-sm font-normal leading-6 pt-3 xl:max-w-[90%]">Lorem Ipsum is simply dummy text of the
				   printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
				   since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
				   specimen book 
				 </p> */}
					<h3 className="text-right max-[600px]:text-left">{(Number(data.price)).toLocaleString("en-IN")} INR</h3>
				</div>
			</div>
			<Modal isOpen={isAddServicesPopUpOpen}>
				<EventPopUpAddService handleClose={setIsAddServicesPopUpOpen} data={data} edit={edit} setReload={setReload} />
			</Modal>
			<Modal isOpen={removeService}>
				<RemoveServices handleClose={setRemoveService} setReload={setReload} data={data} />
			</Modal>
		</div>
	)
}

export default EventAddServiceListItem;