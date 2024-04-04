import React from "react";
import { s3Url } from "../../../config";

function EntertainmentFullImg({ handleClose,  entertainmentUrl }) {
  return (
    <div className="fixed w-full inset-0 z-40 bg-black h-screen pt-14 pb-5 px-5">
      <button
        onClick={() => {
          handleClose(false);
        }}
        className="absolute top-6 right-7 text-xl text-white"
      >
        <i className="inline-block icon-close"></i>
      </button>
      <div className="flex w-full items-center justify-center h-full rounded-lg overflow-hidden">
        {entertainmentUrl.type === "photo" ? (
          <img
            src={s3Url + "/" + entertainmentUrl.url}
            alt="Gallery images"
            className="object-cover cursor-pointer"
          />
        ) : (
          <video
            src={s3Url + "/" + entertainmentUrl.url}
            autoPlay
            className="object-cover cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default EntertainmentFullImg;
