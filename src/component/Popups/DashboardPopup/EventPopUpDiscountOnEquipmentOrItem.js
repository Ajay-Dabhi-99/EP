import React, { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch } from 'react-redux';
import { discountId, getSelectServiceId } from '../../../Pages/Dashboard/Event/Discount/discountSlice';
import { useIntl } from "react-intl";

const EventPopUpDiscountOnEquipmentOrItem = ({ handleClose, eventId, allDiscount, setAllDiscount, setSelectedDiscount, selectedDiscount, serviceOn, activeList }) => {
	const dispatch = useDispatch()
	const intl = useIntl();
	const [discount, setDiscount] = useState("");
	const [error, setError] = useState("");
	const [errors, setErrors] = useState("");
	const [selecetdServiceId, setSelectedServiceId] = useState("");
	const [selectList, setSelectList] = useState([]);
	const [preSelectList, setPreSelectList] = useState([]);
	const [isValid, setIsValid] = useState(false)
	const [list, setList] = useState([]);

	const getServiceList = async () => {
		try {
			const eventDetails = await dispatch(getSelectServiceId(eventId)).unwrap()
			if (eventDetails?.data.IsSuccess) {
				try {
					const res = await dispatch(discountId(eventId)).unwrap()
					// get equipment or item part
					res?.data?.Data?.discounts.filter(type => (type.discounttype === "discount_on_equipment_or_item")).map((e, i) => {
						eventDetails?.data?.Data.map((m, i) => {
							let isMatched = false;
							e.services.map((o) => {
								if (o === m._id) {
									isMatched = true;
									setList(current => [...current, e]);
									setPreSelectList(cuurent => [...cuurent, m])
								}
							})
							e.equipments.map((o) => {
								if (o === m._id) {
									isMatched = true;
									setList(current => [...current, e]);
									setPreSelectList(cuurent => [...cuurent, m])
								}
							})
							e.items.map((o) => {
								if (o === m._id) {
									isMatched = true;
									setList(current => [...current, e]);
									setPreSelectList(cuurent => [...cuurent, m])
								}
							})
						})
						// if ((e.services.length === 0) && (e.equipments.length === 0) && (e.items.length === 0)) {
						// 	console.log("all zero");
						// }
					})
					setSelectList(eventDetails?.data?.Data);
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getServiceList();
	}, []);

	const optionChangeHandler = (e) => {
		return e.map(ele => {
			setSelectedServiceId(cuurent => [...cuurent, ele.value])
		})
	}

	const validateDiscount = (e) => {
		setIsValid(false)
		if (!e.target.value || e.target.value == '') {
			setError("Discount Is Required");
			handleClose(true)
		} else if ((e.target.value <= 100) && (e.target.value >= 0)) {
			setDiscount(e.target.value);
			setError(null);
			setIsValid(true)
		} else {
			handleClose(true)
			setError("Enter Valid Discount value");
		}

	}

	const handleSubmit = async () => {
		if(!list.length){
			setErrors("Discount On Equipment Or Item Is Required");
			return
		}
		if(!discount){
			setError("Discount Is Required");
		}
		if (isValid) {
			setDiscount(discount);
			let allList = Object.assign([],allDiscount)
      		let i
			let services = []
			let equipments = []
			let items = []
			list?.map((e, i) => {
				// e.isAdded = true;
				e.type === "service" ? (services).push(e._id) :
					((e.type === "equipment" ? (equipments).push(e._id) :
						(items).push(e._id)))
			})
			if(selectedDiscount.sid){
				 i = allList.findIndex((x)=> x.sid === selectedDiscount.sid )
			}else{
				 i = allList.findIndex((x)=>  x._id === selectedDiscount._id)
			}
			if(i > -1) {
				allList[i] = {...allList[i], isAdded: true, services: services, equipments: equipments, items: items, discount: discount + "%" }
				setAllDiscount(allList)
			}
			handleClose(false);
		}
	}

	// const val = [
	// 	{ name: "Option 1", cat: "Group 1" },
	// 	{ name: "Option 2", cat: "Group 1" }
	// ]

	return (
		<>

			<div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
				<div className="table-cell align-middle">
					<div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
						<div className="bg-brightGray p-7 space-y-7">
							<h2 className="h1 w-full max-w-[60%] max-[768px]:max-w-[80%] text-center mx-auto"> {selectedDiscount?.discountname} </h2>
							<form className="flex items-center space-x-5 max-[768px]:flex-col max-[768px]:space-x-0">
								<div className="w-full lg:w-2/3 inputHolder">
									<label className="input-titel">{intl.formatMessage({ id: "EQUIPMENT OR ITEM" })}</label>
									<Multiselect
										options={selectList} // Options to display in the dropdown
										displayValue="name"
										// isObject={false}
										onRemove={(e) => setList(e)}
										selectedValues={preSelectList}
										onSelect={(e) => setList(e)}
										// showCheckbox	
										className="w-full arrow option input-0 bg-white rounded"
									/>
									<span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{errors} </span>
								</div>
								<div className={serviceOn ? "w-full inputHolder" : "w-full lg:w-1/3 inputHolder"}>
									<label className="input-titel">{intl.formatMessage({ id: "DISCOUNT" })}</label>
									<input className="input option" type="text" onChange={validateDiscount} />
									<span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{error} </span>
								</div>
							</form>
							<ul className="space-y-2.5">
								<li className="text-xs font-medium">* {intl.formatMessage({ id: "TERMS & CONDITIONS" })}</li>
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
		</>
	)
}

export default EventPopUpDiscountOnEquipmentOrItem