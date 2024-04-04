import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEventType } from "../../../shared/helper";
import { addNewCategory } from "../../../Pages/Dashboard/eventSlice";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";


const EventPopUpCategory = ({ handleClose }) => {
  const intl = useIntl();
  const params = useParams();
  const dispatch = useDispatch();
  const [catagoryInputName, setcatagoryInputName] = useState();
  const eventType = getEventType(params.eventType);

  const addCategory = async () => {
    try {
      let payload = {
        category_name: catagoryInputName,
        event_type: eventType,
      };
      const response = await dispatch(addNewCategory(payload)).unwrap();
      if (response.data.IsSuccess) {
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
      handleClose(false);
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  };

  return (
    //  <!-- Add Category  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12 max-[640px]:p-9">
            <div className="flex justify-between items-center">
              <h1 className="h1">{intl.formatMessage({ id: "ADD CATEGORY" })}</h1>
              <div>
                <button onClick={() => handleClose(false)} className="text-xl">
                  <i className="icon-close"></i>
                </button>
              </div>
            </div>
            <form className="py-7">
              <div className="w-full inputHolder">
                <label className="input-titel">{intl.formatMessage({ id: "CATEGORY NAME" })}</label>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setcatagoryInputName(e.target.value)}
                />
              </div>
            </form>
            <div
              className="btn-primary w-full uppercase"
              onClick={() => {
                addCategory();
              }}
            >
              {intl.formatMessage({id:"SUBMIT"})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopUpCategory;
