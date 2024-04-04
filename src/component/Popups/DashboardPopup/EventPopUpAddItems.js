import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { imageType, onlyDigits } from '../../../shared/constants';
import { baseUrl } from '../../../api/baseUrl';
import { s3Url } from '../../../config';
import { uploadPhoto } from '../../../Pages/Dashboard/Event/Photos&Videos/photoAndVideoSlice';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../Pages/Dashboard/Event/AddItems/addItemsSlice';
import { useIntl } from "react-intl";

const EventPopUpAddItems = ({ isItem, handleClose, data, setReload, edit }) => {
  const dispatch = useDispatch()
  const intl = useIntl();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceType, setPriceType] = useState("per_day");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const eventId = localStorage.getItem("eventId");
  const event_type = localStorage.getItem("event_type");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const eventType = params.eventType;

  useEffect(() => {
    if (data && edit) {
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setPriceType(data.price_type);
      setQuantity(data.quantity);
      setImage(data.photos[0].url)
    }
  }, [handleClose, data, edit]);

  const photoChangeHandler = (event) => {
    const size = 3;
    let selected = event.target.files[0];

    try {
      if (selected && imageType.includes(selected.type)) {
        if (selected.size < (size * 1024 * 1024)) {
          setImage(selected);
          setErrorMessage(null);
          setError(false);
        }
        else {
          setErrorMessage(`${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` + size + " MB");
          setError(true);
        }
      } else {
        setErrorMessage(`${intl.formatMessage({ id: "PLEASE SELECT VALID IMAGE FILE." })}`);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  const addServices = async () => {

    if (name.trim() === "" || price.trim() === "" || quantity.trim() === "") {
      toast.warn(`${intl.formatMessage({ id: "PLEASE FILL ALL THE REQIRED FIELDS." })}`);
      return
    }
    if (!(onlyDigits.test(price.trim()))) {
      toast.warn(`${intl.formatMessage({ id: "PLEASE ENTER VALID PRICE." })}`);
      return
    }
    if (!(onlyDigits.test(quantity.trim()))) {
      toast.warn(`${intl.formatMessage({ id: "PLEASE ENTER VALID QUNATITY." })}`);
      return
    }

    const payload = {
      eventType: event_type,
      name: name,
      price: price,
      price_type: priceType,
      description: description,
      quantity: quantity,
      photos: []
    }
    if (edit) payload.itemid = data._id;

    const formData = new FormData();
    formData.append("file", image);
    let url;
    if (eventType === "hyp")
      try {
        if (typeof image === "object") {
          const response = await dispatch(uploadPhoto(formData)).unwrap()
          if (response.data.IsSuccess) {
            url = response.data.Data.url;
          }
        }
        payload.photos.push({ url: url || image });
        // Object.keys(payload).forEach(key => {
        //   if (payload[key] === null) {
        //     delete payload[key];
        //   }
        // });
        const res = await dispatch(addItem(payload)).unwrap()
        setReload(current => !current);
        if (res.data.IsSuccess) {
          toast.success(res.data.Message);
          handleClose(false);
        } else {
          toast.error(res.data.Message);
        }
      } catch (error) {
        // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`) 
        console.log(error);
      } else
      try {
        if (typeof image === "object") {
          const response = await dispatch(uploadPhoto(formData)).unwrap()
          if (response.data.IsSuccess) {
            url = response.data.Data.url;
          }
        }
        payload.photos.push({ url: url || image });
        const res = await dispatch(addItem(payload)).unwrap()
        setReload(current => !current);
        if (res.data.IsSuccess) {
          toast.success(res.data.Message);
          handleClose(false);
        } else {
          toast.error(res.data.Message);
        }
      } catch (error) {
        // toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`) 
        console.log(error);
      }
  }

  return (
    //   <!-- Add Service  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-45px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12 max-[640px]:px-5">
            <div className="flex justify-between items-center">
              <h1 className="h1">{intl.formatMessage({ id: "ADD ITEM" })}</h1>
              <div className="flex items-center space-x-6">
                {/* <Link to="/" className="text-base font-bold text-spiroDiscoBall"><i className="icon-plus font-bold text-xs"></i> <span>Add Service</span></Link> */}
                <button onClick={() => handleClose(false)} href="#" className="text-xl"><i className="icon-close"></i></button>
              </div>
            </div>
            <form className="space-y-5 py-8">
              <div className="w-full inputHolder">
                <label className="input-titel">{intl.formatMessage({ id: "NAME" })} <span>*</span></label>
                <input className="input option" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {/* <input className="input option" type="text" value="Catering" onChange={(e) => setName(e.target.value) }/> */}
              </div>
              <div className="w-full">
                <span className="input-titel">{intl.formatMessage({ id: "PRICE" })} <span>*</span></span>
                <label htmlFor="" className="flex items-center w-full bg-white p-2 px-3.5 rounded-md max-[640px]:flex-col">
                  <div className="w-full px-3.5">
                    <input type="text" className="w-full outline-none text-spiroDiscoBall font-bold text-base" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className="selectPrice flex items-center space-x-3">
                    <label className="block cursor-pointer">
                      <input type="radio" name="price" value="perDay" className="hidden" checked={priceType === "per_day" && true} onChange={(e) => setPriceType("per_day")} />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block max-[640px]:px-0.5">
                      {intl.formatMessage({ id: "PER" })} /{" "}
                      {intl.formatMessage({ id: "DAY" })}
                      </span>
                    </label>
                    <label className="block cursor-pointer">
                      <input type="radio" name="price" value="perPerson" className="hidden" checked={priceType === "per_person" && true} onChange={(e) => setPriceType("per_person")} />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block max-[640px]:px-0.5">
                      {intl.formatMessage({ id: "PER" })} /{" "}
                      {intl.formatMessage({ id: "PERSON" })}
                      </span>
                    </label>
                    <label className="block cursor-pointer">
                      <input type="radio" name="price" value="perEvent" className="hidden" checked={priceType === "per_event" && true} onChange={(e) => setPriceType("per_event")} />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block max-[640px]:px-0.5">
                      {intl.formatMessage({ id: "PER" })} /{" "}
                      {intl.formatMessage({ id: "EVENT" })}
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="w-full inputHolder">
                <label className="input-titel">{intl.formatMessage({ id: "ADD QUANTITY" })}<span>*</span></label>
                <input className="input option" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="upload-holder">
                {/* <h6 className="text-sm font-bold text-quicksilver">Select Photo <span className="text-10">2 images (up to 3MB/Image)</span></h6> */}
                <h6 className="text-sm font-bold text-quicksilver">{intl.formatMessage({ id: "SELECT PHOTO" })} <span className="text-10">({intl.formatMessage({ id: "UP TO 3MB" })})</span></h6>
                <label htmlFor="upload" className="upload upload-popup">
                  <input type="file" name="images" id="upload" className="appearance-none hidden" onChange={photoChangeHandler} />
                  <span className="input-titel mt-1"><i className="icon-image mr-2"></i>{intl.formatMessage({ id: "CHOOSE IMAGES" })}</span>
                </label>
                {error ? <span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{errorMessage} </span> : <span className="mt-1" style={{ fontSize: "14px" }}>{image?.name || (image && <a className="text-10 " target="blank" href={s3Url + "/" + image}>{intl.formatMessage({ id: "IMAGE LINK" })}</a>)}</span>}
              </div>
              <div className="w-full">
                <span className="input-titel">{intl.formatMessage({ id: "DESCRIPTION" })}</span>
                <textarea name="" id="" cols="30" rows="5" className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </form>
            <div className="btn-primary w-full uppercase" onClick={addServices}>{intl.formatMessage({ id: "SUBMIT" })}</div>
            {/* <Link to="/" className="btn-primary w-full uppercase" onClick={addServices}>Submit</Link> */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventPopUpAddItems