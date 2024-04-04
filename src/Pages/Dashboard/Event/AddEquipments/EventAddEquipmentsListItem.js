import React, { useState } from 'react';
import { s3Url } from '../../../../config';
import Modal from '../../../../Common/Modals/Modal';
import EventPopUpAddEquipment from '../../../../component/Popups/DashboardPopup/EventPopUpAddEquipment';
import imagePreview from "../../../../assest/images/image-preview.png";
import { useDispatch } from 'react-redux';
import { deleteEquipment, selectEquipment } from './addEquipmentsSlices';
import { useIntl } from "react-intl";
import RemoveEquipment from '../../../../component/Popups/DashboardPopup/RemoveEquipment';
import ToolTips from '../../../ToolTips';

const EventAddEquipmentsListItem = ({ data, edit, eventId, setReload, setActiveList, activeList }) => {
	const intl = useIntl();
	const [isAddServicesPopUpOpen, setIsAddServicesPopUpOpen] = useState(false);
	const [removeEquipment, setRemoveEquipment] = useState(false);
	const dispatch = useDispatch()
	const [isLive, setIsLive] = useState(false);

	const addService = () => {
		if (isLive && !activeList?.includes(data._id)) {
			setActiveList(current => [...current, data._id]);
		}
		if (activeList.includes(data._id)) {
			setActiveList(current => current.filter(e => e !== data._id))
		}
	}

	const toggleService = async (e) => {
		let equipmentList = [];
		if (e.target.checked) {
			equipmentList = [...activeList, data._id];
		} else {
			equipmentList = [...activeList.filter(e => e !== data._id)];
		}
		try {
			let payload = {
				eventid: eventId,
				equipments: equipmentList
			}
			const response = await dispatch(selectEquipment(payload)).unwrap()
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
						<img src={data?.photos[0]?.url ? s3Url + "/" + data.photos[0]?.url : imagePreview} alt="" className="w-full h-full object-cover" />
					</div>
				</div>
				<div className="w-full pl-5 max-[600px]:pt-2 max-[600px]:px-2">
					<div className="flex justify-between max-[600px]:flex-col-reverse">
						<h2 className='max-[600px]:pt-3'>{data.name}</h2>
						<div className="flex items-center space-x-5 max-[600px]:space-x-3 max-[600px]:justify-between max-[600px]:flex-wrap">
							<div className="flex items-center">
								<input type="checkbox" checked={activeList?.includes(data?._id)} id="on" className="switch mx-3 order-2" onChange={toggleService} />
								<span className="off text-base font-bold anim order-1 text-caribbeanGreen">{intl.formatMessage({ id: "OFF" })}</span>
								<span className="on text-base font-bold anim order-3">{intl.formatMessage({ id: "ON" })}</span>&nbsp;
								<svg class="w-5 h-5 tooltip order-4" data-pr-tooltip={intl.formatMessage({ id: "LET USERS KNOW THE AVAILABILITY OF THE EQUIPMENT" })}
									data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
								</svg>
							</div>
							{data.quantity && <span
								className="inline-block text-base text-spiroDiscoBall font-bold bg-brightGray py-1.5 px-3.5 rounded">{data.quantity} Qty</span>}
							<a href="#"
								// title="Delete" 
								onClick={() => setRemoveEquipment(true)}><i className="text-center icon-fill-delete text-xl tooltip" data-pr-tooltip={intl.formatMessage({ id: "DELETE THIS EQUIPMENT" })}
									data-pr-position="top"></i></a>
							<a href="#"
								//  title="Edit" 
								onClick={() => setIsAddServicesPopUpOpen(true)}><i className="text-center icon-edit text-xl tooltip" data-pr-tooltip={intl.formatMessage({ id: "EDIT YOUR LISTING" })}
									data-pr-position="top"></i></a>
						</div>
					</div>
					<p className="text-quicksilver text-sm font-normal leading-6 max-[600px]:pt-0 pt-3 xl:max-w-[90%]"> {data.description} </p>
					<h3 className="text-right max-[600px]:text-left">{data.price} INR</h3>
				</div>
			</div>
			<Modal isOpen={isAddServicesPopUpOpen}>
				<EventPopUpAddEquipment handleClose={setIsAddServicesPopUpOpen} data={data} edit={edit} setReload={setReload} />
			</Modal>
			<Modal isOpen={removeEquipment}>
				<RemoveEquipment handleClose={setRemoveEquipment} data={data} setReload={setReload} />
			</Modal>
			<ToolTips />
		</div>
	)
}

export default EventAddEquipmentsListItem;
