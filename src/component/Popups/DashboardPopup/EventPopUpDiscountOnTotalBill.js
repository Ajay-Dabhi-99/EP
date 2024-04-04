import React, { useState } from 'react';
import { useIntl } from "react-intl";

const EventPopUpDiscountOnTotalBill = ({ handleClose, allDiscount, setAllDiscount, eventId, setSelectedDiscount, selectedDiscount, serviceOn, activeList }) => {
	const intl = useIntl();
  const [value, setValue] = useState("");
  const token = localStorage.getItem("Token");
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(selectedDiscount.discount)
  const [tandc, setTandc] = useState(selectedDiscount.tandc);
  const [isValid, setIsValid] = useState(false)


  const validateDiscount = (e) => {
    setIsValid(false)
    if (!e.target.value || e.target.value == '') {
      setError("Discount Is Required");
      handleClose(true)
    } else if ((e.target.value <= 100) && (e.target.value > 0)) {
      setValue(e.target.value);
      setDiscount(e.target.value);
      setError(null);
      setIsValid(true)
    } else {
      handleClose(true)
      setError("Enter Valid Discount value");
    }
  }

  const handleSubmit = async () => {
    if(!value){
      setError("Discount Is Required");
    }
    if (isValid) {
      handleClose(false)
      setDiscount(discount);
		  let allList = Object.assign([],allDiscount)
      let i
			if(selectedDiscount.sid){
				 i = allList.findIndex((x)=> x.sid === selectedDiscount.sid )
			}else{
				 i = allList.findIndex((x)=>  x._id === selectedDiscount._id)
			}
			if(i > -1) {
				allList[i] = {...allList[i], discount: discount + "%" }
				setAllDiscount(allList)
			}
    }
  }

  return (
    //   <!--  Discount On Total Bill/ Advance and Discount Confirmation  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-7 space-y-7">
            <h2 className="h1 w-full max-w-xs text-center mx-auto"> {intl.formatMessage({ id: "DISCOUNT ON TOTAL BILL" })} {isValid}</h2>
            <form>
              <div className={serviceOn ? "w-full lg:w-1/2 inputHolder" : "w-full inputHolder"}>
                <label className="input-titel">{intl.formatMessage({ id: "DISCOUNT ON TOTAL BILL" })}</label>
                <input className="input option" type="number" value={discount} onChange={validateDiscount} />
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

  )
}

export default EventPopUpDiscountOnTotalBill