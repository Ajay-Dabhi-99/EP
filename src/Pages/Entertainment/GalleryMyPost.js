import React from "react";
import { useGallery } from "./gallerySlice";
import { useProfileDetails } from "../Profile/profileSlice";

const GalleryMyPost = () => {
  const galleryPic = useGallery();
  const profileDetails = useProfileDetails();

  return (
    <div>
      {galleryPic?.length &&
        galleryPic
          ?.filter((val) => val?.createdBy?._id === profileDetails._id)
          .map((item) => {
            return <>{item ? <img src={item.url} /> : "No Post Yet"}</>;
          })}
    </div>
  );
};

export default GalleryMyPost;
