import React, { useState, useEffect } from "react";
import EventPopUpCategory from "./EventPopUpCategory.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getEventType } from "../../../shared/helper.js";
import {
  createNewEvent,
  getCategoryByType,
} from "../../../Pages/Dashboard/eventSlice.js";
import { increment } from "../../../Common/CommonSlice/stepProgressCountSlice.jsx";
import Modal from "../../../Common/Modals/Modal.js";
import { useIntl } from "react-intl";
import ToolTips from "../../../Pages/ToolTips.js";

const EventPopUpCreateNew = ({
  handleClose,
  selectedCategory,
  displayName,
  edit,
  eventId,
  setReload,
}) => {
  const intl = useIntl();
  const [isCategoryPopUpOpen, setIsCategoryPopUpOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState(0);
  const [newCategoryDisplayName, setNewCategoryDisplayName] = useState("");

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const eventType = getEventType(params.eventType);

  const getCategory = async () => {
    let catType = [];
    let catId = "";
    try {
      const response = await dispatch(getCategoryByType(eventType)).unwrap();
      (response.data.Data).map((type) => (
        catType.push(type)
      ))
      setCategory(catType.sort((a, b) => a.category_name > b.category_name ? 1 : -1));
      catType.map((i) => {
        if (i.category_name == selectedCategory) {
          catId = i._id;
        }
      })
      if (selectedCategory) {
        setNewCategoryId(catId);
      } else {
        setNewCategoryId(catType[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    if (edit) {
      setNewCategoryDisplayName(displayName);
    }
  }, [handleClose, isCategoryPopUpOpen]);

  const clickHandler = async () => {
    try {
      let payload = {
        event_type: eventType,
        display_name: newCategoryDisplayName,
        event_category: newCategoryId,
      };
      if (edit) {
        payload['eventid'] = eventId;
      }
      if (newCategoryDisplayName === "" || newCategoryDisplayName === null) {
        toast.warn(`${intl.formatMessage({ id: "DISPLAY NAME CAN NOT BE EMPTY." })}`);
        return;
      }
      const response = await dispatch(createNewEvent(payload)).unwrap();
      if (eventId) {
        setReload((current) => !current);
      }
      if (response.data.IsSuccess) {
        // localStorage.setItem("displayName", response.data.Data?.display_name);
        toast.success(response.data.Message);
        setLoading(false);
        handleClose(false);
        if (!edit) {
          dispatch(increment());
          navigate("./addplaces");
        }
        localStorage.setItem("eventId", response.data.Data._id);
        localStorage.setItem("event_type", response.data.Data.event_type);
      } else {
        toast.error(response.data.Message);
        handleClose(false);
      }
    } catch (error) {
      // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`); 
      console.log(error);
    }
  };

  return (
    //    <!-- Create New  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12  max-[640px]:p-8">
            <div className="flex justify-between items-center max-[640px]:items-start max-[640px]:flex-col">
              <h1 className="h1">{intl.formatMessage({ id: "CREATE NEW" })}</h1>
              <div className="flex items-center space-x-6 max-[640px]:justify-between max-[640px]:space-x-20">
                <button
                  onClick={() => {
                    setIsCategoryPopUpOpen(true);
                  }}
                  href="#"
                  className="text-base font-bold text-spiroDiscoBall max-[640px]:pt-2"
                >
                  <div className='flex justify-start items-center'>
                  <i className="icon-plus font-bold text-xs"></i>{" "}
                  <span>{intl.formatMessage({ id: "ADD CATEGORY" })}</span>&nbsp;
                  <ToolTips/>
                <svg class="w-5 h-5 tooltip" data-pr-tooltip={intl.formatMessage({ id: "SELECT OR ADD A NEW CATEGORY" })}
                  data-pr-position="top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                  </div>
                </button>
                <button
                  onClick={() => handleClose(false)}
                  href="#"
                  className="text-xl max-[640px]:pl-6"
                >
                  <i className="icon-close"></i>
                </button>
              </div>
            </div>
            <form className="space-y-5 pt-7">
              <div className="w-full inputHolder">
                <label className="input-titel">{intl.formatMessage({ id: "SELECT CATEGORY" })}</label>
                <select
                  defaultValue={selectedCategory}
                  className="w-full arrow option"
                  onChange={(e) => {
                    setNewCategoryId(
                      e.target[e.target.selectedIndex].getAttribute("data-id")
                    );
                  }}
                >
                  {category &&
                    category.map((element) => (
                      <option
                        key={element._id}
                        value={element.category_name}
                        selected={element.category_name === selectedCategory}
                        data-id={element._id}
                      >
                        {element.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full inputHolder">
                <label className="input-titel">
                  {intl.formatMessage({ id: "GIVE DISPLAY NAME OF YOUR CATEGORY" })}
                </label>
                <input
                  className="input"
                  type="text"
                  value={newCategoryDisplayName}
                  onChange={(e) => setNewCategoryDisplayName(e.target.value)}
                />
              </div>
              {loading ? 
              <a
                href="#"
                className="btn-primary w-full uppercase"
                onClick={() => {clickHandler(); setLoading(false)}}
              >
                {intl.formatMessage({ id: "SUBMIT" })}
              </a>
              : 
              <div className="btn-primary hover:bg-spiroDiscoBall w-full uppercase cursor-pointer flex items-center justify-center">
                <svg className="flex items-center justify-center w-6 h-6" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                      <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="1s"
                          repeatCount="indefinite" />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>}
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={isCategoryPopUpOpen}>
        <EventPopUpCategory handleClose={setIsCategoryPopUpOpen} />
      </Modal>
    </div>
  );
};

export default EventPopUpCreateNew;
