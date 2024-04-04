import React, { useEffect, useState } from "react";
import celebration from "../../../../assest/svg/celebration.svg";
import Modal from "../../../../Common/Modals/Modal";
import StepProgressBar from "../../StepProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import {
  decrement,
  increment,
} from "../../../../Common/CommonSlice/stepProgressCountSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import EventPopUpDiscountOnEquipmentOrItem from "../../../../component/Popups/DashboardPopup/EventPopUpDiscountOnEquipmentOrItem";
import EventPopUpDiscountOnTotalBill from "../../../../component/Popups/DashboardPopup/EventPopUpDiscountOnTotalBill";
import {
  discountId,
  discounts,
  getSelectServiceId,
  listOfDiscount,
} from "./discountSlice";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { MoonLoader } from 'react-spinners';

const EventDiscounts = () => {
  const intl = useIntl();
  const displayName = localStorage.getItem("displayName");
  const [isDiscountPopUpOpen, setIsDiscountPopUpOpen] = useState(false);
  const [allDiscount, setAllDiscount] = useState([]);
  const params = useParams();
  const eventId = localStorage.getItem("eventId");
  const eventType = params.eventType;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serviceOn, setServiceOn] = useState(false);
  const [activeList, setActiveList] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDiscount = async () => {
    const displayDiscount = [];
    try {
      const response = await dispatch(listOfDiscount()).unwrap();
      if (response.data.IsSuccess) {
        try {
          const res = await dispatch(discountId(eventId)).unwrap();
          response.data.Data.map((element) => {
            let isMatched = false;
            res.data.Data.discounts.map((selement) => {
              if (selement.sid === element._id) {
                displayDiscount.push(selement);
                isMatched = true;
                setActiveList((current) => [...current, selement]);
              }
            });
            if (!isMatched) {
              displayDiscount.push(element);
            }
          });
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
        setAllDiscount(displayDiscount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDiscount();
    getServiceList();
  }, []);

  const createActiveDiscount = async () => {
    let payload = { eventid: eventId, discounts: activeList };
    try {
      const response = await dispatch(discounts(payload)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const initialRender = useRef(true);
  const initialRender2 = useRef(true);

  const clickNextHandler = async () => {
    let allList = Object.assign([], allDiscount);
    let activeListData = allList.filter(
      (val) => val?.isAdded !== undefined && val.isAdded === true
    );
    let isBack = false;
    activeListData.map((e) => {
      if (e?.discounttype === "discount_on_equipment_or_item") {
        if (eventType === "hyp") {
          if (!e.services?.length && !e.items?.length) {
            toast.error(
              `${intl.formatMessage({ id: "PLEASE SELECT ANY SERVICES" })}`
            );
            isBack = true;
            return;
          }
        }
        if (eventType === "psb") {
          if (!e.equipments?.length && !e.items?.length) {
            toast.error(
              `${intl.formatMessage({ id: "PLEASE SELECT ANY EQUIPMENTS" })}`
            );
            isBack = true;
            return;
          }
        }
        if (eventType === "gsb") {
          if (!e.equipments?.length && !e.items?.length) {
            toast.error(
              `${intl.formatMessage({
                id: "PLEASE SELECT ANY EQUIPMENTS OR ITEMS",
              })}`
            );
            isBack = true;
            return;
          }
        }
      }
    });
    if (!isBack) {
      try {
        let payload = {
          eventid: eventId,
          discounts: activeListData,
        };
        await dispatch(discounts(payload)).unwrap();
      } catch (error) {
        console.log(error);
      }
      dispatch(increment());
      navigate(`../calender`);
    }
    // toast.success("Data saved Successfully.");
  };

  const clickBackHandler = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const gradientStyle = (type) => {
    if (type === "discount_on_total_bill")
      return " from-[#13e1b094] to-[#13E1B0] ";
    if (type === "discount_on_equipment_or_item")
      return " from-[#20c0e878] to-[#20C0E8] ";
    if (type === "advance_and_discount_confirmation")
      return " from-[#faba1585] to-[#FABA15] ";
  };
  const getServiceList = async () => {
    try {
      setServiceList([]);
      const response = await dispatch(getSelectServiceId(eventId)).unwrap();
      setLoading(false);
      setServiceList([]);
      response.data.Data.map((ele) => {
        setServiceList((current) => [
          ...current,
          { value: ele._id, label: ele.name },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkboxHandler = (e, ele) => {
    let allList = Object.assign([], allDiscount);
    if (e.target.checked) {
      if (ele?.discounttype === "discount_on_equipment_or_item") {
        if (!serviceList.length) {
          toast.error(
            `${intl.formatMessage({
              id: "ANY EQUIPMENT OR ITEM NOT AVAILABLE",
            })}`
          );
          return;
        }
      }
      let i;
      if (ele.sid) {
        i = allList.findIndex((x) => x.sid === ele.sid);
      } else {
        i = allList.findIndex((x) => x._id === ele._id);
      }
      if (i > -1) {
        allList[i] = {
          ...allList[i],
          isAdded: true,
          sid: ele._id ? ele._id : ele.sid,
        };
        setAllDiscount(allList);
      }
    } else {
      let i;
      if (ele.sid) {
        i = allList.findIndex((x) => x.sid === ele.sid);
      } else {
        i = allList.findIndex((x) => x._id === ele._id);
      }
      if (i > -1) {
        allList[i] = { ...allList[i], isAdded: false };
        setAllDiscount(allList);
      }
    }
  };

  const editButtonHandler = (ele) => {
    setSelectedDiscount(ele);
    setIsDiscountPopUpOpen(!isDiscountPopUpOpen);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        eventid: eventId,
        discounts: activeList,
      };
      await dispatch(discounts(payload)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //    <!-- Content In -->
    <div className="flex flex-col gap-7 min-h-full wrapper">

      {/* <!-- title-holder  --> */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i
              className="icon-back-arrow mr-4 text-2xl"
              onClick={clickBackHandler}
            ></i>
            <h1>{displayName}</h1>
          </div>
        </div>
        {/* <!-- step-progress-bar  --> */}
        <div className="w-full overflow-hidden">
          <StepProgressBar eventType={eventType} />
        </div>
      </div>
      {/* <!-- main-content  --> */}
      {
        loading ?
          <MoonLoader
            cssOverride={{ margin: "100px auto" }}
            color={"#20c0E8"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          :

          <div className="space-y-5">
            {allDiscount.map((ele, index) => {
              return (
                <div
                  className="w-full flex items-center max-[768px]:relative"
                  id={ele._id}
                  key={index}
                >
                  <label className="checkbox w-16 max-[768px]:absolute max-[768px]:top-1 max-[768px]:left-1 max-[768px]:justify-start max-[768px]:z-[1]">
                    <input
                      type="checkbox"
                      className="bg-white"
                      checked={ele.isAdded ?? false}
                      onChange={(e) => checkboxHandler(e, ele)}
                      disabled={
                        ele?.discounttype ===
                        "advance_and_discount_confirmation"
                      }
                    />
                    <i className="icon-right"></i>
                  </label>
                  <div
                    className={
                      gradientStyle(ele.discounttype) +
                      "bg-gradient-to-r p-5 pr-8 max-[768px]:pr-5 relative overflow-hidden rounded-lg w-full"
                    }
                  >
                    <div className="flex justify-between item-basline">
                      <div>
                        <h1 className="text-white">{ele.discountname}</h1>
                        <div className="text-[40px] text-black font-bold">
                          {ele.discount}
                        </div>

                        {
                          // ele?.services?.length > 0 ?
                          // 	ele?.services?.map((e, i) => (
                          // 		<span className="text-xs text-white font-normal">
                          // 			{e.name}
                          // 		</span>
                          // 	))
                          // 	// <div className="media-upload-holder">
                          // 	// 	{/* <!-- photo-holder --> */}
                          // 	// 	<div className="w-full">
                          // 	// 		<div className="flex flex-wrap -mx-2" >
                          // 	// 			{data?.photos?.map((e, i) => (
                          // 	// 				<DashboardEventViewOverviewPhoto key={i} alt={e.description} imageUrl={s3Url + "/" + e?.url} />
                          // 	// 			))}
                          // 	// 		</div>
                          // 	// 	</div>
                          // 	// </div>
                          // 	:
                          // 	(ele?.equipments?.length > 0 ?
                          // 		ele?.equipments?.map((e, i) => (
                          // 			<span className="text-xs text-white font-normal">
                          // 				{e.name}
                          // 			</span>
                          // 		))
                          // 		:
                          // 		ele?.items?.length > 0 ?
                          // 			ele?.items?.map((e, i) => (
                          // 				<span className="text-xs text-white font-normal">
                          // 					{e.name}
                          // 				</span>
                          // 			))
                          // 			: ele.description
                          // 	)
                        }
                        {/* <span className="text-xs text-white font-normal">{ele?.services.length > 0 ? "a" : "b"}</span>
											<span className="text-xs text-white font-normal">{ele?.equipments ? "c" : "d"}</span>
											<span className="text-xs text-white font-normal">{ele?.items ? "e" : "f"}</span> */}
                        <span className="text-xs text-white font-normal">
                          {ele?.description}
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() => editButtonHandler(ele)}
                          className="bg-white p-2 rounded-md text-sm font-bold"
                        >
                          <i className="text-sm edit text-black icon-edit mr-2"></i>
                          {intl.formatMessage({ id: "EDIT" })}
                        </button>
                        <div
                          className="absolute"
                          style={{
                            right: "40px",
                            top: "65%",
                            transform: "scale(1.2)",
                          }}
                        >
                          <img src={celebration} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      }
      {/* <!-- advisement --> */}
      {/* <Advertisement /> */}
      {/* <!-- next preview button --> */}
      <div className={"prw-next-btn mt-auto " + (loading ? "hidden" : '')}>
        <button
          type="button"
          className="flex items-center"
          onClick={clickBackHandler}
        >
          <i className="icon-back-arrow mr-3"></i>
          <h3>{intl.formatMessage({ id: "BACK" })}</h3>
        </button>
        <button
          type="button"
          className="flex items-center active btn-primary"
          onClick={clickNextHandler}
        >
          {intl.formatMessage({ id: "GO TO CALENDER" })}
        </button>
      </div>
      <Modal isOpen={isDiscountPopUpOpen}>
        {selectedDiscount.discounttype === "discount_on_total_bill" ? (
          <EventPopUpDiscountOnTotalBill
            handleClose={setIsDiscountPopUpOpen}
            allDiscount={allDiscount}
            setAllDiscount={setAllDiscount}
            eventId={eventId}
            setSelectedDiscount={setSelectedDiscount}
            selectedDiscount={selectedDiscount}
            serviceOn={serviceOn}
            activeList={activeList}
          />
        ) : (
          <EventPopUpDiscountOnEquipmentOrItem
            handleClose={setIsDiscountPopUpOpen}
            allDiscount={allDiscount}
            setAllDiscount={setAllDiscount}
            eventId={eventId}
            setSelectedDiscount={setSelectedDiscount}
            selectedDiscount={selectedDiscount}
            serviceOn={serviceOn}
            activeList={activeList}
          />
        )}
        {/* <EventPopUpDiscount handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} /> */}
      </Modal>
    </div>
  );
};

export default EventDiscounts;
