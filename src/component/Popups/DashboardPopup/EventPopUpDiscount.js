import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { discountGetSelectServiceId } from '../../../Pages/Dashboard/Event/Discount/discountSlice';
import { useIntl } from "react-intl";

const EventPopUpDiscount = ({ handleClose, eventId, setSelectedDiscount, selectedDiscount, serviceOn }) => {
	const dispatch = useDispatch()
	const [value, setValue] = useState("");
	const [serviceList, setServiceList] = useState([]);
	const [selecetdServiceId, setSelectedServiceId] = useState([]);
	const [error, setError] = useState("");
	const token = localStorage.getItem("Token");
	const intl = useIntl();

	const getServiceList = async () => {
		try {
			setServiceList([]);
			const response = await dispatch(discountGetSelectServiceId(eventId)).unwrap()
			setServiceList([]);
			response.data.Data.services.map(ele => {
				setServiceList(current => [...current, { value: ele._id, label: ele.name }]);
			})
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getServiceList();
	}, []);

	const optionChangeHandler = (e) => {
		e.map(ele => {
			setSelectedServiceId(cuurent => [...cuurent, ele.value])
		})
	}

	const validateDiscount = (e) => {
		if ((e.target.value <= 100) && (e.target.value >= 0)) {
			setValue(e.target.value);
			setError(null);
		} else {
			setError("Enter Valid Discount value");
		}
	}


	const handleSubmit = async () => {
		setSelectedDiscount({ ...selectedDiscount, services: selecetdServiceId, discount: value + "%" });
		try {
			// const response = await axios.put(`${baseUrl}/api/org/discount/${discountId}?event_id=${eventId}`,{equipment_id: selecetdServiceId, discount: value+"%"},{headers: header});
			handleClose(false);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		//  <!--  Discount on Particular Equipment Or Item  -->
		<div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
			<div className="table-cell align-middle">
				<div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
					<div className="bg-brightGray p-7 space-y-7">
						<h2 className="h1 w-full max-w-[60%] text-center mx-auto"> {selectedDiscount?.discountname} </h2>
						<form className="flex items-center space-x-5">
							{serviceOn && <div className="w-full lg:w-1/2 inputHolder">
								<label className="input-titel">{intl.formatMessage({ id: "EQUIPMENT OR ITEM" })}</label>
								<Select className="w-full arrow option" options={serviceList} isMulti onChange={(e) => optionChangeHandler(e)} />
							</div>}
							<div className={serviceOn ? "w-full lg:w-1/2 inputHolder" : "w-full inputHolder"}>
								<label className="input-titel">{intl.formatMessage({ id: "DISCOUNT" })}</label>
								<input className="input option" type="text" onChange={validateDiscount} />
								<span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{error} </span>
							</div>
						</form>
						<ul className="space-y-2.5">
							<li className="text-xs font-medium">*{intl.formatMessage({ id: "TERMS & CONDITIONS" })}</li>
							{selectedDiscount?.tandc}
						</ul>
						<div className="flex items-center space-x-5">
							<button onClick={() => handleClose(false)} className="btn-primary btn-cancel w-full">{intl.formatMessage({ id: "CANCEL" })}</button>
							<button onClick={handleSubmit} className="btn-primary w-full">{intl.formatMessage({ id: "APPLY" })}</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default EventPopUpDiscount