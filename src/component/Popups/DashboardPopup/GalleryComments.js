import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { baseUrl, s3Url } from "../../../config";
import {
  useGallery,
  userAllComment,
  userSendComment,
} from "../../../Pages/Entertainment/gallerySlice";
import DefaultProfile from "../../../assest/images/userdefault.jpg";
import moment from "moment";
// import EmojiPicker from 'emoji-picker-react';
import InputEmoji, { async } from "react-input-emoji";
import axios from "axios";
import authHeader from "../../../redux/services/authHeader";
import EyeIcon from "../../../assest/svg/eye-icon.svg";

// import LightGallery"./styles.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-share.css";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgHash from "lightgallery/plugins/hash";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";
import Modal from "../../../Common/Modals/Modal";
import EntertainmentFullImg from "./EntertainmentFullImg";

function GalleryComments({ handleClose, galleryComment }) {
  const [isFullImg, setIsFullImg] = useState(false);
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const entertainmentId = galleryComment._id;
  const entertainmentUrl = galleryComment.url;

  const getAllComment = async () => {
    const payload = {
      entertainment_id: entertainmentId,
      entertainment_url: entertainmentUrl,
    };
    try {
      const response = await dispatch(userAllComment(payload)).unwrap();
      // setLoading(false);
      setComment(response.data.Data);
      // console.log("Commment  >> ", response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelComment = (text) => {
    setText(text);
  };

  function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
    return <div ref={elementRef} />;
  }

  const SendComment = async () => {
    const payload = {
      entertainment_id: entertainmentId,
      entertainment_url: entertainmentUrl,
      comment: text.trim(),
    };
    if (text && text.trim() !== "") {
      try {
        const response = await dispatch(userSendComment(payload)).unwrap();
        if (response.data.IsSuccess) {
          getAllComment();
          setText("");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllComment();
}, []);

useEffect(() => {
  if(isFullImg){
    document.body.style.overflow = "hidden"
  }

  return () => {
    document.body.style.overflow = "unset"
  }
}, [isFullImg])


  return (
    <div className="fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen pt-14 pb-5 px-5">
      <button
        onClick={() => handleClose(false)}
        className="absolute top-6 right-7 text-xl text-white"
      >
        <i className="inline-block icon-close"></i>
      </button>
      <div className="flex items-center justify-center h-full">
        <div
        
          className="w-1/2 h-full"
        >
          {galleryComment.type === "photo" ? (
            <div onClick={() => {setIsFullImg(true)}} className="relative group cursor-pointer mb-3 overflow-hidden h-full">
              <img
                src={s3Url + "/" + galleryComment.url}
                alt="Gallery images"
                className="w-full h-full object-cover cursor-pointer"
              />
              <img
                src={EyeIcon}
                alt="Eye icon"
                className="block absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 group-hover:scale-125 anim"
              />
              <span className="box absolute inset-0 block w-full h-full group-hover:bg-[#000000] group-hover:opacity-50 anim"></span>
            </div>
          ) : (
            <div onClick={() => {setIsFullImg(true)}} className="relative group cursor-pointer mb-3 overflow-hidden h-full">
              <video
                src={s3Url + "/" + galleryComment.url}
                controls
                className="w-full h-full object-cover cursor-pointer"
              />
              <img
                src={EyeIcon}
                alt="Eye icon"
                className="block absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 group-hover:scale-125 anim"
              />
              <span className="box absolute inset-0 block w-full h-full group-hover:bg-[#000000] group-hover:opacity-50 anim"></span>
            </div>
          )}
        </div>
        <div className="w-1/2 h-full bg-white">
          <div className="flex flex-col h-full min-h-full">
            {/* <!-- comment-titel  --> */}
            <div className="p-5 py-3.5 bg-water flex items-center">
              <div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={
                      galleryComment?.createdBy?.profile_pic !== ""
                        ? s3Url + "/" + galleryComment.createdBy.profile_pic
                        : DefaultProfile
                    }
                    alt="upload-2"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="w-full pl-3.5">
                <h3 className="text-sm pb-1">
                  {galleryComment.createdBy.name}
                </h3>
                <span className="block text-10 leading-4 pb-0 break-all max-h-12 h-full">
                  {galleryComment.createdBy.about}
                </span>
              </div>
            </div>
            {/* <!-- comment-text  -->   */}
            <div className="relative grid grid-cols-1 gap-1 bg-black text-gray-200 bg-opacity-5 ng-star-inserted overflow-y-auto">
              {comment.map((e) => (
                <div
                  key={e._id}
                  className="relative flex items-start justify-between gap-1 last:border-b-0 border-b-2 border-quicksilver py-3 px-3"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden">
                    <img
                      src={
                        e?.user_id?.profile_pic !== ""
                          ? s3Url + "/" + e.user_id?.profile_pic
                          : DefaultProfile
                      }
                      alt="Commenter Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <pre className="text-japaneseIndigo text-base whitespace-pre-wrap break-words w-[calc(100%-20px-140px)]">
                    {e.comment}
                  </pre>
                  <div className="flex flex-col space-y-1 opacity-75">
                    <p className="text-japaneseIndigo relative text-10 whitespace-nowrap truncate overflow-hidden">
                      {e.user_id?.name}
                    </p>
                    <p className="text-japaneseIndigo text-10">
                      {moment(e?.timestamp).format("ll")} ,{" "}
                      {moment(e?.timestamp).format("LT")}
                    </p>
                    {/* 12 Apr 2023, 02:12 PM  */}
                  </div>
                  <ScrollToBottom />
                </div>
              ))}
            </div>
            {/* <!-- comment-input --> */}
            <div className="p-5 bg-water flex items-center space-x-3 mt-auto">
              {/* <EmojiPicker /> */}
              {/* onChange={(e) => setInput(e.target.value)} */}
              {/* <label className="block w-full">
                                <input type="text" placeholder={`$TYPE HERE...`} className="w-full outline-none" onChange={(e) => e.target.value} />
                            </label>
                            */}
              <InputEmoji
                value={text}
                onChange={handelComment}
                cleanOnEnter
                onEnter={SendComment}
                placeholder="Type a message"
                className="h-full"
              />
              <button
                type="submit"
                onClick={SendComment}
                className="icon-send text-2xl cursor-pointer"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isFullImg}>
        <EntertainmentFullImg
          handleClose={setIsFullImg}
          entertainmentUrl={galleryComment}
        />
      </Modal>
    </div>
  );
}

export default GalleryComments;
